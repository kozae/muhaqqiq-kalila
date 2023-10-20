import { Fn, Stack } from "aws-cdk-lib";
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
