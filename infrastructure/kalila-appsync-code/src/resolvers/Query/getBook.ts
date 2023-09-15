import { Context, DynamoDBGetItemRequest, util } from "@aws-appsync/utils";
import { GetBookQueryVariables } from "kalila-graphql";

export function request(
  ctx: Context<GetBookQueryVariables>,
): DynamoDBGetItemRequest {
  const { id } = ctx.args;
  return {
    operation: "GetItem",
    key: util.dynamodb.toMapValues({ id }),
  };
}

export function response(ctx: any) {
  return ctx.result;
}
