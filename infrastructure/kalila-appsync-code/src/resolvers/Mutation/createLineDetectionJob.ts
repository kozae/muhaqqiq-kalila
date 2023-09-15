import { Context, DynamoDBPutItemRequest, util } from "@aws-appsync/utils";
import { getTime } from "../../util";
import { CreateLineDetectionJobMutationVariables } from "kalila-graphql";

export function request(
  ctx: Context<CreateLineDetectionJobMutationVariables>,
): DynamoDBPutItemRequest {
  const { id = util.autoId(), ...attributes } = {
    ...ctx.args.input,
    version: getTime(),
  };
  const modAttributes = { ...attributes, state: 0 };
  return {
    operation: "PutItem",
    key: util.dynamodb.toMapValues({ id }),
    attributeValues: util.dynamodb.toMapValues(modAttributes),
  };
}

export function response(ctx: any) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result;
}
