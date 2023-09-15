import { Context, DynamoDBGetItemRequest, util } from "@aws-appsync/utils";
import { GetUnitQueryVariables } from "kalila-graphql";

export function request(
  ctx: Context<GetUnitQueryVariables>,
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
