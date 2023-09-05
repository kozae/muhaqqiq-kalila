import { Context, DynamoDBQueryRequest, util } from "@aws-appsync/utils";

export function request(ctx: Context): DynamoDBQueryRequest {
  const { number, mediumId } = ctx.source;

  return {
    operation: "Query",
    index: "segmentMediumIdIndex",
    scanIndexForward: true,
    query: {
      expression: "mediumId = :mediumId AND startPage = :startPage",
      expressionValues: util.dynamodb.toMapValues({
        ":mediumId": mediumId,
        ":startPage": number,
      }),
    },
  };
}

export function response(ctx: any) {
  return ctx.result.items;
}
