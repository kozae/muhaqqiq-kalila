import { Context, DynamoDBPutItemRequest, util } from "@aws-appsync/utils";
import { CreateBookInput } from "kalila-graphql";
import { getTime } from "../../util";

export function request(
  ctx: Context<{ input: CreateBookInput }>
): DynamoDBPutItemRequest {
  const { id = util.autoId(), ...attributes } = {
    ...ctx.args.input,
    version: getTime(),
  };
  return {
    operation: "PutItem",
    key: util.dynamodb.toMapValues({ id }),
    attributeValues: util.dynamodb.toMapValues(attributes),
  };
}

export function response(ctx: any) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result;
}
