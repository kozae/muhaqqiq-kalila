import { Context, DynamoDBGetItemRequest, util } from "@aws-appsync/utils";
import { GetItemCountQueryVariables } from "kalila-graphql";

export function request(
  ctx: Context<GetItemCountQueryVariables>,
): DynamoDBGetItemRequest {
  const { table } = ctx.args;
  return {
    operation: "GetItem",
    key: util.dynamodb.toMapValues({ table }),
  };
}

export function response(ctx: any) {
  return ctx.result;
}
