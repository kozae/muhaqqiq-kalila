import { Context, DynamoDBBatchGetItemRequest, util } from "@aws-appsync/utils";
import { GetManySegmentContentsQueryVariables } from "kalila-graphql";

export function request(
    ctx: Context<GetManySegmentContentsQueryVariables>,
): DynamoDBBatchGetItemRequest {
    const { ids } = ctx.args;
    const table = ctx.env.SEGMENT_CONTENTS_TABLE
    return {
        operation: "BatchGetItem",
        tables: {
            [table]: {
                keys: ids!.map((id) => util.dynamodb.toMapValues({ id })),
            },
        },
    };
}

export function response(ctx: any) {
    return ctx.result.data[ctx.env.SEGMENT_CONTENTS_TABLE];
}
