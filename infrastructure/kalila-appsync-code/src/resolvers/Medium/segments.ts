import {
  Context,
  DynamoDBQueryRequest,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
  util,
} from "@aws-appsync/utils";
import {
  ListMediumSegmentsQueryVariables,
  SortDirection,
} from "kalila-graphql";

export function request(
  ctx: Context<ListMediumSegmentsQueryVariables>,
): DynamoDBQueryRequest {
  const {
    startPageGt = undefined,
    limit = undefined,
    startPageLt = undefined,
    nextToken = undefined,
    sort = SortDirection.ASC,
  } = ctx.args;

  const { id } = ctx.source;

  let expression = "mediumId = :id";
  let expressionValues: ExpressionAttributeValueMap = util.dynamodb.toMapValues(
    { ":id": id },
  );

  if (startPageGt !== undefined && startPageLt === undefined) {
    expression += " AND #startPage >= :startPageGt";
    expressionValues = {
      ...expressionValues,
      ...util.dynamodb.toMapValues({ ":startPageGt": startPageGt }),
    };
  }

  if (startPageLt !== undefined && startPageGt === undefined) {
    expression += " AND #startPage <= :startPageLt";
    expressionValues = {
      ...expressionValues,
      ...util.dynamodb.toMapValues({ ":startPageLt": startPageLt }),
    };
  }

  if (startPageLt !== undefined && startPageGt !== undefined) {
    expression += " AND #startPage BETWEEN :startPageGt AND :startPageLt";
    expressionValues = {
      ...expressionValues,
      ...util.dynamodb.toMapValues({
        ":startPageLt": startPageLt,
        ":startPageGt": startPageGt,
      }),
    };
  }

  const expressionNames: ExpressionAttributeNameMap | undefined =
    startPageGt !== undefined || startPageLt !== undefined
      ? { "#startPage": "startPage" }
      : undefined;

  return {
    operation: "Query",
    index: "segmentMediumIdIndex",
    limit: limit as number | undefined,
    nextToken: nextToken as string | undefined,
    scanIndexForward: sort === SortDirection.ASC,
    query: {
      expression,
      expressionValues,
      expressionNames,
    },
  };
}

export function response(ctx: any) {
  return ctx.result;
}
