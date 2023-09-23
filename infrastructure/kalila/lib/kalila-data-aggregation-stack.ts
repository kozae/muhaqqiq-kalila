import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IKalilaTableInfo, KalilaTableConstructs } from "./utils";
import {
  Code,
  Architecture,
  Runtime,
  Function as LambdaFunction,
  StartingPosition,
} from "aws-cdk-lib/aws-lambda";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

interface IKalilaDataAggregationStackProps extends StackProps {
  readonly tableArns: IKalilaTableInfo;
  readonly tableStreamArns: IKalilaTableInfo;
  readonly itemCountTableName: string;
}

export class KalilaDataAggregationStack extends Stack {
  private readonly tables: KalilaTableConstructs;
  constructor(
    scope: Construct,
    id: string,
    props: IKalilaDataAggregationStackProps,
  ) {
    super(scope, id, props);
    this.tables = this.createTableConstructs(
      props.tableArns,
      props.tableStreamArns,
    );
    this.createCountAggregator(props.tableArns, props.itemCountTableName);
  }

  private createCountAggregator(
    itableArns: IKalilaTableInfo,
    itemCountTableName: string,
  ) {
    const handler = new LambdaFunction(this, "KalilaCountAggregator", {
      code: Code.fromAsset("../../../kalila-rs/target/lambda/count_handler"),
      architecture: Architecture.ARM_64,
      runtime: Runtime.PROVIDED_AL2,
      handler: "does_not_matter",

      functionName: "kalila-item-count-aggregator",
      environment: {
        ITEM_COUNT_NAME: itemCountTableName,
        BOOK_ARN: itableArns.books,
        MEDIUM_ARN: itableArns.media,
      },
    });
    this.tables.itemCounts.grantWriteData(handler);
    Object.entries(this.tables)
      .filter(([key, _]) => key !== "itemCounts")
      .forEach(([_, table]) => {
        handler.addEventSource(
          new DynamoEventSource(table, {
            startingPosition: StartingPosition.TRIM_HORIZON,
          }),
        );
      });
  }

  private createTableConstructs(
    arns: IKalilaTableInfo,
    streamArns: IKalilaTableInfo,
  ) {
    return Object.entries(arns).reduce(
      (acc, [key, tableArn]: [string, string]) => {
        const table = Table.fromTableAttributes(
          this,
          `${key}Table_Lambda_Construct`,
          {
            tableArn,
            tableStreamArn: streamArns[key as keyof IKalilaTableInfo],
          },
        );
        acc[key as keyof IKalilaTableInfo] = table;
        return acc;
      },
      {} as KalilaTableConstructs,
    );
  }
}
