import { Context, DynamoDBQueryRequest, util } from "@aws-appsync/utils";
import { SortDirection } from "kalila-graphql";

export function request(ctx: Context): DynamoDBQueryRequest {
  const { id } = ctx.source;
  const {
    limit = undefined,
    nextToken = undefined,
    sort = SortDirection.ASC,
  } = ctx.args;
  return {
    operation: "Query",
    index: "mediumBookIdIndex",
    limit: limit as number | undefined,
    nextToken: nextToken as string | undefined,
    scanIndexForward: sort === SortDirection.ASC,
    query: {
      expression: "bookId = :id",
      expressionValues: util.dynamodb.toMapValues({ ":id": id }),
    },
  };
}

export function response(ctx: any) {
  return ctx.result;
}
