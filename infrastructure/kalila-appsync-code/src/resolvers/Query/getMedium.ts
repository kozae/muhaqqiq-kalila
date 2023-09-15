import { Context, DynamoDBGetItemRequest, util } from "@aws-appsync/utils";
import { GetMediumQueryVariables } from "kalila-graphql";

export function request(
  ctx: Context<GetMediumQueryVariables>,
): DynamoDBGetItemRequest {
  const { id } = ctx.args;
  return {
    operation: "GetItem",
    key: util.dynamodb.toMapValues({ id }),
  };
}

export function response(ctx: any) {
  const item = ctx.result;
  return item;
}
