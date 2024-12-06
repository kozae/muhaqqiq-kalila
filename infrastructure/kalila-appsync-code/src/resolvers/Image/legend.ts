import { Context, DynamoDBGetItemRequest } from "@aws-appsync/utils";

export function request(ctx: Context): DynamoDBGetItemRequest {
  const { legendId } = ctx.source;

  return {
    operation: "GetItem",
    key: util.dynamodb.toMapValues({ id: legendId }),
  };
}

export function response(ctx: any) {
  return ctx.result;
}
