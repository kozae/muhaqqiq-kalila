import { parse, visit } from "graphql";
import * as fs from "fs";
import { ITable } from "aws-cdk-lib/aws-dynamodb";

// export function getSuffixFromStack(stack: Stack) {
//   const shortStackId = Fn.select(2, Fn.split("/", stack.stackId));
//   const suffix = Fn.select(4, Fn.split("-", shortStackId));
//   return suffix;
// }

export interface IKalilaTableInfo {
  itemCounts: string;
  books: string;
  media: string;
  units: string;
  pages: string;
  segments: string;
  segmentContents: string;
  images: string;
  depictions: string;
  textElements: string;
  lines: string;
  chapterCollations: string;
  lineDetectionJobs: string;
  lemmas: string;
  invertedLemmas: string;
}
export type KalilaTableConstructs = Record<keyof IKalilaTableInfo, ITable>;
interface FieldWithSource {
  parent: string;
  name: string;
  source: (keyof IKalilaTableInfo) | "mutation_lambda" | "search_lambda",
}

export function extractFieldsWithSource(
  schemaFilePath: string,
): FieldWithSource[] {
  const schemaString = fs.readFileSync(schemaFilePath, "utf-8");
  const astNode = parse(schemaString);

  const fieldsWithSource: FieldWithSource[] = [];

  visit(astNode, {
    ObjectTypeDefinition(node) {
      const parentType = node.name.value;

      node.fields?.forEach((field) => {
        const sourceDirective = field.directives?.find(
          (d) => d.name.value === "source",
        );

        if (sourceDirective) {
          const tableArg = sourceDirective.arguments?.find(
            (arg) => arg.name.value === "value",
          );
          const table =
            tableArg && tableArg.value.kind === "EnumValue"
              ? tableArg.value.value
              : null;

          if (table) {
            fieldsWithSource.push({
              parent: parentType,
              name: field.name.value,
              source: table as (keyof IKalilaTableInfo) | "mutation_lambda" | "search_lambda",
            });
          }
        }
      });
    },
  });

  return fieldsWithSource;
}

export function createSchemaFileWithoutSourceDirective(
  sourcePath: string,
  destinationPath: string,
): void {
  // Read the file content from sourcePath
  const schema = fs.readFileSync(sourcePath, "utf-8");

  // 1. Remove the directive definition
  let resultSchema = schema.replace(
    /directive @source\([^)]+\) on FIELD_DEFINITION/g,
    "",
  );

  // 2. Remove all usages of the @source directive
  resultSchema = resultSchema.replace(/@source\([^)]+\)/g, "");

  // Write the modified schema to the destinationPath
  fs.writeFileSync(destinationPath, resultSchema);
}

export function createCommonEnvironmentVariablesRecord(env: string, tableNames: IKalilaTableInfo): Record<string, string> {
  return {
    'PAGES_TABLE': tableNames.pages,
    'MEDIA_TABLE': tableNames.media,
    'BOOKS_TABLE': tableNames.books,
    'TEXT_TABLE': tableNames.textElements,
    'IMAGES_TABLE': tableNames.images,
    'DEPICTIONS_TABLE': tableNames.depictions,
    'LINES_TABLE': tableNames.lines,
    'UNITS_TABLE': tableNames.units,
    'SEGMENTS_TABLE': tableNames.segments,
    'SEGMENT_CONTENTS_TABLE': tableNames.segmentContents,
    'CHAPTER_COLLATIONS_TABLE': tableNames.chapterCollations,
    'LEMMAS_TABLE': tableNames.lemmas,
    'INVERTED_LEMMAS_TABLE': tableNames.invertedLemmas,

    'BUCKET_NAME': "kalila-pages",
    'ENV': env,
    'DEFAULT_REGION': 'eu-central-1',

    'PAGES_MEDIUM_ID_INDEX': 'pageMediumIdIndex',
    'UNITS_PARENT_ID_INDEX': 'parentIdOrderIndex',
    'MEDIUM_BOOK_ID_INDEX': "mediumBookIdIndex",
    'TEXT_PAGE_ID_INDEX': "textPageIdIndex",
    'LINE_ELEMENT_ID_INDEX': 'lineElementIdIndex',
    'IMAGE_PAGE_ID_INDEX': 'imagePageIdIndex',
    'DEPICTION_UNIT_ID_INDEX': 'depictionUnitIdIndex',
    'SEGMENTS_UNIT_ID_INDEX': 'segmentUnitIdIndex',
    'SEGMENT_MEDIUM_ID_INDEX': 'segmentMediumIdIndex',
    'SEGMENT_MEDIUM_ID_VERSION_INDEX': 'segmentMediumIdVersionIndex',
    'SEGMENT_MEDIUM_ID_END_PAGE_INDEX': 'segmentMediumIdEndPageIndex',
    'LEMMA_PAGE_ID_INDEX': 'lemmaPageIdIndex',
    'PAGE_ID_LEMMA_INDEX': 'pageIdIndex',
  }
}

