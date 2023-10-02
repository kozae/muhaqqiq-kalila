import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  AttributeType,
  StreamViewType,
  BillingMode,
  TableClass,
  ProjectionType,
  CfnTable,
  CfnTableProps,
} from "aws-cdk-lib/aws-dynamodb";
import { IKalilaTableInfo, getSuffixFromStack } from "./utils";

const commonCfnTableOptions: Partial<CfnTableProps> = {
  tableClass: TableClass.STANDARD,
  billingMode: BillingMode.PAY_PER_REQUEST,
  pointInTimeRecoverySpecification: {
    pointInTimeRecoveryEnabled: true,
  },
  streamSpecification: {
    streamViewType: StreamViewType.NEW_IMAGE,
  },
};

export class KalilaDataManagementStack extends Stack {
  public readonly tableArns: IKalilaTableInfo;
  public readonly tableStreamArns: IKalilaTableInfo;
  public readonly tableNames: IKalilaTableInfo;
  private readonly suffix: string;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.suffix = getSuffixFromStack(this);
    const info: Record<
      keyof IKalilaTableInfo,
      { name: string; arn: string; streamArn: string }
    > = {
      itemCounts: this.createItemCountTable(),
      books: this.createBooksTable(),
      media: this.createMediaTable(),
      units: this.createUnitsTable(),
      pages: this.createPagesTable(),
      textElements: this.createTextElementsTable(),
      lines: this.createLinesTable(),
      images: this.createImageElementsTable(),
      segments: this.createSegmentsTable(),
      chapterCollations: this.createChapterCollationsTable(),
      lineDetectionJobs: this.createLineDetectionJobsTable(),
    };
    this.tableNames = Object.entries(info).reduce((acc, [key, { name }]) => {
      acc[key as keyof IKalilaTableInfo] = name;
      return acc;
    }, {} as IKalilaTableInfo);
    this.tableArns = Object.entries(info).reduce((acc, [key, { arn }]) => {
      acc[key as keyof IKalilaTableInfo] = arn;
      return acc;
    }, {} as IKalilaTableInfo);

    this.tableStreamArns = Object.entries(info).reduce(
      (acc, [key, { streamArn }]) => {
        acc[key as keyof IKalilaTableInfo] = streamArn;
        return acc;
      },
      {} as IKalilaTableInfo,
    );
  }

  private createItemCountTable() {
    const cfnTable = new CfnTable(this, "ItemCountsTable", {
      ...commonCfnTableOptions,

      tableName: `ItemCount_${this.suffix}`,
      keySchema: [
        {
          attributeName: "table",
          keyType: "HASH",
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "table",
          attributeType: AttributeType.STRING,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/item_count/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createBooksTable() {
    const cfnTable = new CfnTable(this, "BooksTable", {
      ...commonCfnTableOptions,

      tableName: `Book_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/book/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createChapterCollationsTable() {
    const cfnTable = new CfnTable(this, "ChapterCollationsTable", {
      ...commonCfnTableOptions,

      tableName: `ChapterCollation_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/chapter_collation/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createMediaTable() {
    const cfnTable = new CfnTable(this, "MediaTable", {
      ...commonCfnTableOptions,
      tableName: `Medium_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      globalSecondaryIndexes: [
        {
          indexName: "mediumBookIdIndex",
          keySchema: [
            {
              attributeName: "bookId",
              keyType: "HASH",
            },
            {
              attributeName: "siglum",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "bookId",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "siglum",
          attributeType: AttributeType.STRING,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/medium/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createUnitsTable() {
    const cfnTable = new CfnTable(this, "UnitsTable", {
      ...commonCfnTableOptions,
      tableName: `Unit_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      globalSecondaryIndexes: [
        {
          indexName: "parentIdOrderIndex",
          keySchema: [
            {
              attributeName: "parentId",
              keyType: "HASH",
            },
            {
              attributeName: "order",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "parentId",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "order",
          attributeType: AttributeType.NUMBER,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/unit/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createPagesTable() {
    const cfnTable = new CfnTable(this, "PagesTable", {
      ...commonCfnTableOptions,
      tableName: `Page_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      globalSecondaryIndexes: [
        {
          indexName: "pageMediumIdIndex",
          keySchema: [
            {
              attributeName: "mediumId",
              keyType: "HASH",
            },
            {
              attributeName: "number",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "mediumId",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "number",
          attributeType: AttributeType.NUMBER,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/page/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createTextElementsTable() {
    const cfnTable = new CfnTable(this, "TextElementsTable", {
      ...commonCfnTableOptions,
      tableName: `TextElement_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      globalSecondaryIndexes: [
        {
          indexName: "textPageIdIndex",
          keySchema: [
            {
              attributeName: "pageId",
              keyType: "HASH",
            },
            {
              attributeName: "order",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "pageId",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "order",
          attributeType: AttributeType.NUMBER,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/text/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }
  private createLinesTable() {
    const cfnTable = new CfnTable(this, "LinesTable", {
      ...commonCfnTableOptions,
      tableName: `Line_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      globalSecondaryIndexes: [
        {
          indexName: "lineElementIdIndex",
          keySchema: [
            {
              attributeName: "elementId",
              keyType: "HASH",
            },
            {
              attributeName: "order",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "elementId",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "order",
          attributeType: AttributeType.NUMBER,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/line/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createImageElementsTable() {
    const cfnTable = new CfnTable(this, "ImageElementsTable", {
      ...commonCfnTableOptions,
      tableName: `ImageElement_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      globalSecondaryIndexes: [
        {
          indexName: "imagePageIdIndex",
          keySchema: [
            {
              attributeName: "pageId",
              keyType: "HASH",
            },
            {
              attributeName: "order",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
        {
          indexName: "imageUnitIdIndex",
          keySchema: [
            {
              attributeName: "unitId",
              keyType: "HASH",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "pageId",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "unitId",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "order",
          attributeType: AttributeType.NUMBER,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/image/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createSegmentsTable() {
    const cfnTable = new CfnTable(this, "SegmentsTable", {
      ...commonCfnTableOptions,
      tableName: `Segment_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      globalSecondaryIndexes: [
        {
          indexName: "segmentMediumIdIndex",
          keySchema: [
            {
              attributeName: "mediumId",
              keyType: "HASH",
            },
            {
              attributeName: "startPage",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
        {
          indexName: "segmentMediumIdEndPageIndex",
          keySchema: [
            {
              attributeName: "mediumId",
              keyType: "HASH",
            },
            {
              attributeName: "endPage",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
        {
          indexName: "segmentUnitIdIndex",
          keySchema: [
            {
              attributeName: "unitId",
              keyType: "HASH",
            },
            {
              attributeName: "mediumId",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "mediumId",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "unitId",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "startPage",
          attributeType: AttributeType.NUMBER,
        },
        {
          attributeName: "endPage",
          attributeType: AttributeType.NUMBER,
        },
      ],
      importSourceSpecification: {
        inputFormat: "DYNAMODB_JSON",
        s3BucketSource: {
          s3Bucket: "kalila-data",
          s3KeyPrefix: "kalila_dynamo_imports/segment/",
        },
      },
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createLineDetectionJobsTable() {
    const cfnTable = new CfnTable(this, "LineDetectionJobsTable2", {
      ...commonCfnTableOptions,

      tableName: `LineDetectionJob_${this.suffix}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
      ],
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }
}
