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
import { IKalilaTableInfo } from "./utils";

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

export interface IKalilaDataManagementStackProps extends StackProps {
  readonly stage: string;
}

export class KalilaDataManagementStack extends Stack {
  public readonly tableArns: IKalilaTableInfo;
  public readonly tableStreamArns: IKalilaTableInfo;
  public readonly tableNames: IKalilaTableInfo;
  private readonly stage: string;

  constructor(
    scope: Construct,
    id: string,
    props: IKalilaDataManagementStackProps,
  ) {
    super(scope, id, props);

    this.stage = props.stage;
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
      segmentContents: this.createSegmentContentsTable(),
      chapterCollations: this.createChapterCollationsTable(),
      lineDetectionJobs: this.createLineDetectionJobsTable(),
      lemmas: this.createLemmasTable(),
      invertedLemmas: this.createInvertedLemmasTable(),
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

      tableName: `ItemCount_${this.stage}`,
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

      tableName: `Book_${this.stage}`,
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

  private createChapterCollationsTable() {
    const cfnTable = new CfnTable(this, "ChapterCollationsTable", {
      ...commonCfnTableOptions,

      tableName: `ChapterCollation_${this.stage}`,
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

  private createMediaTable() {
    const cfnTable = new CfnTable(this, "MediaTable", {
      ...commonCfnTableOptions,
      tableName: `Medium_${this.stage}`,
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
      tableName: `Unit_${this.stage}`,
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
      tableName: `Page_${this.stage}`,
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
      tableName: `TextElement_${this.stage}`,
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
      tableName: `Line_${this.stage}`,
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
      tableName: `ImageElement_${this.stage}`,
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
      tableName: `Segment_${this.stage}`,
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
          indexName: "segmentMediumIdVersionIndex",
          keySchema: [
            {
              attributeName: "mediumId",
              keyType: "HASH",
            },
            {
              attributeName: "version",
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
        {
          attributeName: "version",
          attributeType: AttributeType.NUMBER,
        },
      ],
    });

    return {
      name: cfnTable.tableName as string,
      arn: cfnTable.attrArn as string,
      streamArn: cfnTable.attrStreamArn as string,
    };
  }

  private createSegmentContentsTable() {
    const cfnTable = new CfnTable(this, "SegmentContentsTable", {
      ...commonCfnTableOptions,

      tableName: `SegmentContent_${this.stage}`,
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

  private createLineDetectionJobsTable() {
    const cfnTable = new CfnTable(this, "LineDetectionJobsTable2", {
      ...commonCfnTableOptions,

      tableName: `LineDetectionJob_${this.stage}`,
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

  private createLemmasTable() {
    const cfnTable = new CfnTable(this, "LemmassTable", {
      ...commonCfnTableOptions,

      tableName: `Lemma_${this.stage}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
      ],
      globalSecondaryIndexes: [
        {
          indexName: "lemmaPageIdIndex",
          keySchema: [
            {
              attributeName: "lemma",
              keyType: "HASH",
            },
            {
              attributeName: "pageId",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.ALL,
          },
        },
        {
          indexName: "pageIdIndex",
          keySchema: [
            {
              attributeName: "pageId",
              keyType: "HASH",
            },
            {
              attributeName: "id",
              keyType: "RANGE",
            },
          ],
          projection: {
            projectionType: ProjectionType.KEYS_ONLY,
          },
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "lemma",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "pageId",
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

  private createInvertedLemmasTable() {
    const cfnTable = new CfnTable(this, "InvertedLemmasTable", {
      ...commonCfnTableOptions,

      tableName: `InvertedLemma_${this.stage}`,
      keySchema: [
        {
          attributeName: "id",
          keyType: "HASH",
        },
        {
          attributeName: "line",
          keyType: "RANGE",
        },
      ],
      attributeDefinitions: [
        {
          attributeName: "id",
          attributeType: AttributeType.STRING,
        },
        {
          attributeName: "line",
          attributeType: AttributeType.NUMBER,
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
