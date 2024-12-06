import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ecr from "aws-cdk-lib/aws-ecr";

interface IKalilaCrossAnalysisStackProps extends cdk.StackProps {
  readonly stage: string;
  readonly vars: Record<string, string>;
}

export class KalilaCrossAnalysisStack extends cdk.Stack {
  private readonly stage: string;
  constructor(
    scope: Construct,
    id: string,
    props: IKalilaCrossAnalysisStackProps,
  ) {
    super(scope, id, props);
    this.stage = props.stage;
    this.createApi();
  }

  private createApi() {
    const table = new cdk.aws_dynamodb.Table(this, "CrossAnalysisTable", {
      tableName: `CrossAnalysis_${this.stage}`,
      partitionKey: { name: "id", type: cdk.aws_dynamodb.AttributeType.STRING },
      sortKey: {
        name: "appVersion",
        type: cdk.aws_dynamodb.AttributeType.NUMBER,
      },
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const repository = ecr.Repository.fromRepositoryName(
      this,
      "CrossAnalysisRepository",
      "cross_analysis_service-dev",
    );
    const imageTag = "latest"; // Or the specific tag you want
    const lambdaFunction = new cdk.aws_lambda.DockerImageFunction(
      this,
      "CrossAnalysisFunction",
      {
        code: cdk.aws_lambda.DockerImageCode.fromEcr(repository, {
          tagOrDigest: imageTag,
        }),
        architecture: cdk.aws_lambda.Architecture.X86_64,
      },
    );

    table.grantReadWriteData(lambdaFunction);

    const api = new cdk.aws_apigatewayv2.HttpApi(this, "CrossAnalysisApi", {
      apiName: `kalila-cross-analysis-${this.stage}`,
    });
    const integration =
      new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration(
        "CrossAnalysisIntegration",
        lambdaFunction,
      );
    api.addRoutes({
      path: "/",
      methods: [cdk.aws_apigatewayv2.HttpMethod.GET],
      integration: integration,
    });
    new cdk.CfnOutput(this, "CAApiUrl", {
      value: api.url ?? "undefined",
    });
  }
}

// https://docs.aws.amazon.com/lambda/latest/dg/python-package.html
