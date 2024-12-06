import { Context, DynamoDBGetItemRequest, util } from "@aws-appsync/utils";

export function request(ctx: Context): DynamoDBGetItemRequest {
    const { id } = ctx.source;

    return {
        operation: "GetItem",
        key: util.dynamodb.toMapValues({ id }),
    };
}

export function response(ctx: any) {
    return ctx.result;
}
