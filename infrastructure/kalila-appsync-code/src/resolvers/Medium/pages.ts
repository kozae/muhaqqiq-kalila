import {
  Context,
  DynamoDBQueryRequest,
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
  util,
} from "@aws-appsync/utils";
import { ListMediumPagesQueryVariables, SortDirection } from "kalila-graphql";

export function request(
  ctx: Context<ListMediumPagesQueryVariables>
): DynamoDBQueryRequest {
  const {
    numberGt = undefined,
    limit = undefined,
    numberLt = undefined,
    nextToken = undefined,
    sort = SortDirection.ASC,
  } = ctx.args;
  const { id } = ctx.source;
  let expression = "mediumId = :id";
  let expressionValues: ExpressionAttributeValueMap = util.dynamodb.toMapValues(
    { ":id": id }
  );

  if (numberGt !== undefined && numberLt === undefined) {
    expression += " AND #number >= :numberGt";
    expressionValues = {
      ...expressionValues,
      ...util.dynamodb.toMapValues({ ":numberGt": numberGt }),
    };
  }

  if (numberLt !== undefined && numberGt === undefined) {
    expression += " AND #number <= :numberLt";
    expressionValues = {
      ...expressionValues,
      ...util.dynamodb.toMapValues({ ":numberLt": numberLt }),
    };
  }

  if (numberLt !== undefined && numberGt !== undefined) {
    expression += " AND #number BETWEEN :numberGt AND :numberLt";
    expressionValues = {
      ...expressionValues,
      ...util.dynamodb.toMapValues({
        ":numberLt": numberLt,
        ":numberGt": numberGt,
      }),
    };
  }

  const expressionNames: ExpressionAttributeNameMap | undefined =
    numberGt !== undefined || numberLt !== undefined
      ? { "#number": "number" }
      : undefined;

  return {
    operation: "Query",
    index: "pageMediumIdIndex",
    limit: limit as number | undefined,
    nextToken: nextToken as string | undefined,
    scanIndexForward: sort === SortDirection.ASC,
    query: {
      expression,
      expressionValues,
      expressionNames,
    },
  };
}

export function response(ctx: any) {
  return ctx.result;
}
