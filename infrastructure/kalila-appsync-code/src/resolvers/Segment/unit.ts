import { Context, DynamoDBGetItemRequest, util } from "@aws-appsync/utils";

export function request(ctx: Context): DynamoDBGetItemRequest {
  const { unitId } = ctx.source;

  return {
    operation: "GetItem",
    key: util.dynamodb.toMapValues({ id: unitId }),
  };
}

export function response(ctx: any) {
  return ctx.result;
}
