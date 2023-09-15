import { Context, DynamoDBScanRequest } from "@aws-appsync/utils";
import { GetLineDetectionJobQueryVariables } from "kalila-graphql";

export function request(
  ctx: Context<GetLineDetectionJobQueryVariables>,
): DynamoDBScanRequest {
  const { state, manuscriptId } = ctx.args;
  return {
    operation: "Scan",
    filter: {
      expression: "#state = :stateVal AND #manuscriptId = :manuscriptIdVal",
      expressionNames: {
        "#state": "state",
        "#manuscriptId": "manuscriptId",
      },
      expressionValues: util.dynamodb.toMapValues({
        ":stateVal": state,
        ":manuscriptIdVal": manuscriptId,
      }),
    },
  };
}

export function response(ctx: any) {
  return ctx.result.items.length !== 0 ? ctx.result.items[0] : null;
}
