import { Context, DynamoDBQueryRequest, util } from "@aws-appsync/utils";

export function request(ctx: Context): DynamoDBQueryRequest {
  const { number, mediumId } = ctx.source;

  return {
    operation: "Query",
    index: "segmentMediumIdEndPageIndex",
    scanIndexForward: true,
    query: {
      expression: "mediumId = :mediumId AND endPage = :endPage",
      expressionValues: util.dynamodb.toMapValues({
        ":mediumId": mediumId,
        ":endPage": -1,
      }),
    },
    filter: {
      expression: "startPage <> :startPage",
      expressionValues: util.dynamodb.toMapValues({
        ":startPage": number,
      }),
    },
  };
}

export function response(ctx: any) {
  return ctx.result.items;
}
