import { Context, DynamoDBScanRequest } from "@aws-appsync/utils";

export function request(ctx: Context): DynamoDBScanRequest {
  return {
    operation: "Scan",
  };
}

export function response(ctx: any) {
  return ctx.result.items;
}
