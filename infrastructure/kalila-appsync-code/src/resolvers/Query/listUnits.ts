import {
  Context,
  DynamoDBQueryRequest,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
  util,
} from "@aws-appsync/utils";
import { ListUnitsQueryVariables, SortDirection } from "kalila-graphql";

export function request(
  ctx: Context<ListUnitsQueryVariables>
): DynamoDBQueryRequest {
  const {
    parentId,
    orderGt = undefined,
    limit = undefined,
    orderLt = undefined,
    nextToken = undefined,
    sort = SortDirection.ASC,
  } = ctx.args;

  let expression = "parentId = :id";
  let expressionValues: ExpressionAttributeValueMap = util.dynamodb.toMapValues(
    { ":id": parentId }
  );

  if (orderGt !== undefined && orderLt === undefined) {
    expression += " AND #order >= :orderGt";
    expressionValues = {
      ...expressionValues,
      ...util.dynamodb.toMapValues({ ":orderGt": orderGt }),
    };
  }

  if (orderLt !== undefined && orderGt === undefined) {
    expression += " AND #order <= :orderLt";
    expressionValues = {
      ...expressionValues,
      ...util.dynamodb.toMapValues({ ":orderLt": orderLt }),
    };
  }

  if (orderLt !== undefined && orderGt !== undefined) {
    expression += " AND #order BETWEEN :orderGt AND :orderLt";
    expressionValues = {
      ...expressionValues,
      ...util.dynamodb.toMapValues({
        ":orderLt": orderLt,
        ":orderGt": orderGt,
      }),
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
