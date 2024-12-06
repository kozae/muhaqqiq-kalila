import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  AppsyncFunction,
  BaseDataSource,
  GraphqlApi,
  SchemaFile,
  AuthorizationType,
  Code,
  FunctionRuntime,
  FunctionRuntimeFamily,
  DynamoDbDataSource,
  LambdaDataSource,
} from "aws-cdk-lib/aws-appsync";

import * as path from "path";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { IUserPool, UserPool } from "aws-cdk-lib/aws-cognito";
import {
  IKalilaTableInfo,
  KalilaTableConstructs,
  createSchemaFileWithoutSourceDirective,
  extractFieldsWithSource,
} from "./utils";
import {
  Code as LambdaCode,
  Architecture,
  Runtime,
  Function as LambdaFunction,
} from "aws-cdk-lib/aws-lambda";

interface IKalilaApiStackProps extends StackProps {
  readonly tableArns: IKalilaTableInfo;
  readonly userPoolId: string;
  readonly stage: string;
  readonly vars: Record<string, string>;
}

type KalilaDataSources = Record<keyof IKalilaTableInfo, DynamoDbDataSource>;
type KalilaLamdas = Record<"mutationHandler" | "searchHandler", LambdaFunction>;

export class KalilaApiStack extends Stack {
  private readonly schemaPath: string;
  private readonly kalilaGraphQLApi: GraphqlApi;
  private readonly tables: KalilaTableConstructs;
  private readonly dataSources: KalilaDataSources;
  private readonly lambdas: KalilaLamdas;
  private readonly stage: string;

  constructor(scope: Construct, id: string, props: IKalilaApiStackProps) {
    super(scope, id, props);

    this.stage = props.stage;
    this.schemaPath = path.join(
      __dirname,
      "..",
      "..",
      "kalila-graphql",
      "schema.graphql",
    );

    this.kalilaGraphQLApi = this.createApi(
      UserPool.fromUserPoolId(this, "KalilaApiUserPool", props.userPoolId),
      props.vars,
    );
    this.tables = this.createTableConstructs(props.tableArns);
    this.dataSources = this.createDataSources();
    this.lambdas = this.createLambdas(props.vars);

    const mutationLambdaDataSource = this.kalilaGraphQLApi.addLambdaDataSource(
      "MutationHandler",
      this.lambdas.mutationHandler,
    );

    const searchLambdaDataSource = this.kalilaGraphQLApi.addLambdaDataSource(
      "SearchHandler",
      this.lambdas.searchHandler,
    );

    for (const { parent, name, source } of extractFieldsWithSource(
      this.schemaPath,
    )) {
      if (source === "mutation_lambda") {
        this.createLambdaResolver(parent, name, mutationLambdaDataSource);
      } else if (source === "search_lambda") {
        this.createLambdaResolver(parent, name, searchLambdaDataSource);
      } else {
        this.createResolver(parent, name, this.dataSources[source]);
      }
    }

    new CfnOutput(this, "ApiUrl", {
      value: this.kalilaGraphQLApi.graphqlUrl,
    });
  }

  private createApi(userPool: IUserPool, vars: Record<string, string>) {
    createSchemaFileWithoutSourceDirective(this.schemaPath, "schema.graphql");
    return new GraphqlApi(this, "KalilaApi", {
      name: `kalila-api_${this.stage}`,
      definition: {
        schema: SchemaFile.fromAsset("schema.graphql"),
      },
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
      xrayEnabled: true,
      environmentVariables: { ...vars },
    });
  }

  private createTableConstructs(names: IKalilaTableInfo) {
    return Object.entries(names).reduce(
      (acc, [key, tableName]: [string, string]) => {
        acc[key as keyof IKalilaTableInfo] = Table.fromTableArn(
          this,
          `${key}Table__API_Construct`,
          tableName,
        );
        return acc;
      },
      {} as KalilaTableConstructs,
    );
  }

  private createLambdas(vars: Record<string, string>) {
    const parameterStorePolicy = new PolicyStatement({
      actions: ["ssm:GetParameter", "ssm:GetParameters"],
      resources: [
        `arn:aws:ssm:${this.region}:${this.account}:parameter/kalila/${this.stage}/*`,
      ],
    });
    const mutationHandler = new LambdaFunction(this, "KalilaMutationHandler", {
      code: LambdaCode.fromAsset(
        "../../../kalila-rs/target/lambda/mutation_handler",
      ),
      architecture: Architecture.ARM_64,
      runtime: Runtime.PROVIDED_AL2,
      handler: "does_not_matter",
      timeout: Duration.seconds(10),
      memorySize: 512,
      functionName: `kalila-mutation-handler_${this.stage}`,
      environment: { ...vars },
    });
    for (const table of Object.values(this.tables)) {
      mutationHandler.addToRolePolicy(
        new PolicyStatement({
          actions: ["dynamodb:*"],
          resources: [table.tableArn, `${table.tableArn}/index/*`],
          effect: Effect.ALLOW,
        }),
      );
    }

    mutationHandler.addToRolePolicy(parameterStorePolicy);

    const searchHandler = new LambdaFunction(this, "KalilaSearchHandler", {
      code: LambdaCode.fromAsset(
        "../../../kalila-rs/target/lambda/search_handler",
      ),
      architecture: Architecture.ARM_64,
      runtime: Runtime.PROVIDED_AL2,
      timeout: Duration.seconds(10),
      memorySize: 1024,
      handler: "does_not_matter",

      functionName: `kalila-search-handler_${this.stage}`,
      environment: { ...vars },
    });
    for (const table of Object.values(this.tables)) {
      searchHandler.addToRolePolicy(
        new PolicyStatement({
          actions: ["dynamodb:*"],
          resources: [table.tableArn, `${table.tableArn}/index/*`],
          effect: Effect.ALLOW,
        }),
      );
    }

    searchHandler.addToRolePolicy(parameterStorePolicy);

    return { mutationHandler, searchHandler };
  }

  private createDataSources() {
    return Object.entries(this.tables).reduce((acc, [key, table]) => {
      const dataSource = this.kalilaGraphQLApi.addDynamoDbDataSource(
        `${key}DataSource`,
        table,
      );

      dataSource.grantPrincipal.addToPrincipalPolicy(
        new PolicyStatement({
          actions: ["dynamodb:*"],
          resources: [`${table.tableArn}/index/*`],
          effect: Effect.ALLOW,
        }),
      );
      acc[key as keyof IKalilaTableInfo] = dataSource;
      return acc;
    }, {} as KalilaDataSources);
  }

  private createLambdaResolver(
    typeName: string,
    fieldName: string,
    dataSource: LambdaDataSource,
  ) {
    this.kalilaGraphQLApi.createResolver(`${typeName}_${fieldName}ResolverFn`, {
      typeName,
      fieldName,
      dataSource,
    });
  }

  private createResolver(
    typeName: string,
    fieldName: string,
    dataSource: BaseDataSource,
  ) {
    const func = new AppsyncFunction(
      this,
      `${typeName}_${fieldName}ResolverFunc`,
      {
        name: `${typeName}_${fieldName}_resolver_${this.stage}`,
        api: this.kalilaGraphQLApi,
        dataSource,
        code: Code.fromAsset(
          path.join(
            __dirname,
            "..",
            "..",
            "kalila-appsync-code",
            "dist",
            typeName,
            `${fieldName}.mjs`,
          ),
        ),
        runtime: FunctionRuntime.JS_1_0_0,
      },
    );

    this.kalilaGraphQLApi.createResolver(
      `${typeName}_${fieldName}ResolverPipeline_${this.stage}`,
      {
        typeName,
        fieldName,
        code: Code.fromAsset(
          path.join(
            __dirname,
            "..",
            "..",
            "kalila-appsync-code",
            "dist",
            "base",
            "pipeline.mjs",
          ),
        ),
        runtime: new FunctionRuntime(FunctionRuntimeFamily.JS, "1.0.0"),
        pipelineConfig: [func],
      },
    );
  }
}
