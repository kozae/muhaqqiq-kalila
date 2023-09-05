import { Context, DynamoDBQueryRequest, util } from "@aws-appsync/utils";
import { ListBookMediaQueryVariables, SortDirection } from "kalila-graphql";

export function request(
  ctx: Context<ListBookMediaQueryVariables>
): DynamoDBQueryRequest {
  const {
    id,
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
