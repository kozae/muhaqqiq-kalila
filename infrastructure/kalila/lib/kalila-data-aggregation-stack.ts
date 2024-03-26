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
import * as iam from "aws-cdk-lib/aws-iam";

interface IKalilaDataAggregationStackProps extends StackProps {
  readonly tableArns: IKalilaTableInfo;
  readonly tableStreamArns: IKalilaTableInfo;
  readonly tableNames: IKalilaTableInfo;
  readonly stage: string;
}

export class KalilaDataAggregationStack extends Stack {
  private readonly tables: KalilaTableConstructs;
  private readonly stage: string;
  constructor(
    scope: Construct,
    id: string,
    props: IKalilaDataAggregationStackProps,
  ) {
    super(scope, id, props);
    this.stage = props.stage;
    this.tables = this.createTableConstructs(
      props.tableArns,
      props.tableStreamArns,
    );
    this.createCountAggregator(props.tableArns, props.tableNames.itemCounts);
    this.createS3DocWriter(props.tableArns, props.tableNames);
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

      functionName: `kalila-count-aggregator_${this.stage}`,
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

  private createS3DocWriter(itableArns: IKalilaTableInfo, tableNames: IKalilaTableInfo) {
    const handler = new LambdaFunction(this, "KalilaS3DocWriter", {
      code: Code.fromAsset("../../../kalila-rs/target/lambda/s3_doc_writer"),
      architecture: Architecture.ARM_64,
      runtime: Runtime.PROVIDED_AL2,
      handler: "does_not_matter",

      functionName: `kalila-s3-doc-writer${this.stage}`,
      environment: {
        BOOK: itableArns.books,
        MEDIUM: itableArns.media,
        PAGE: itableArns.pages,
        TEXT: itableArns.textElements,
        LINE: itableArns.lines,
        IMAGE: itableArns.images,
        UNIT: itableArns.units,
        SEGMENT: itableArns.segments,
        SEGMENT_CONTENT: itableArns.segmentContents,
        CHAPTER_COLLATION: itableArns.chapterCollations,
        LEMMA: itableArns.lemmas,
        INVERTED_LEMMA: itableArns.invertedLemmas,
        UNIT_TABLE: tableNames.units,
        STAGE: this.stage,
      },
    });
    Object.entries(this.tables)
      .filter(([key, _]) => key !== "itemCounts")
      .forEach(([_, table]) => {
        handler.addEventSource(
          new DynamoEventSource(table, {
            startingPosition: StartingPosition.LATEST,
          }),
        );
      });

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["s3:*"],
        resources: ["arn:aws:s3:::*"],
      }),
    );

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["dynamodb:GetItem", "dynamodb:Query", "dynamodb:Scan"],
        resources: ["*"],
      }),
    );

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
