import { Context, DynamoDBQueryRequest, util } from "@aws-appsync/utils";

export function request(ctx: Context): DynamoDBQueryRequest {
  const { id } = ctx.source;

  return {
    operation: "Query",
    index: "segmentUnitIdIndex",
    scanIndexForward: true,
    query: {
      expression: "unitId = :id",
      expressionValues: util.dynamodb.toMapValues({ ":id": id }),
    },
  };
}

export function response(ctx: any) {
  return ctx.result.items;
}
