import {
  Context,
  DynamoDBQueryRequest,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
  util,
} from "@aws-appsync/utils";
import { ListUnitsQueryVariables, SortDirection } from "kalila-graphql";

export function request(
  ctx: Context<ListUnitsQueryVariables>,
): DynamoDBQueryRequest {
  const {
    orderGt = undefined,
    limit = undefined,
    orderLt = undefined,
    nextToken = undefined,
    sort = SortDirection.ASC,
  } = ctx.args;

  const { id: parentId } = ctx.source;
  let expression = "parentId = :id";
  let expressionValues: ExpressionAttributeValueMap = util.dynamodb.toMapValues(
    { ":id": parentId },
  );

  if (orderGt !== undefined) {
    expression += " AND #order > :orderGt";
    expressionValues = {
      ...expressionValues,
      ":orderGt": orderGt,
    };
  }

  if (orderLt !== undefined) {
    expression += " AND #order < :orderLt";
    expressionValues = {
      ...expressionValues,
      ":orderLt": orderLt,
    };
  }

  const expressionNames: ExpressionAttributeNameMap | undefined =
    orderGt !== undefined || orderLt !== undefined
      ? { "#order": "order" }
      : undefined;

  return {
    operation: "Query",
    index: "parentIdOrderIndex",
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
