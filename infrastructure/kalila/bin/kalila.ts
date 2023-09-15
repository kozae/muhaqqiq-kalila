#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

import { KalilaDataManagementStack } from "../lib/kalila-data-management-stack";
import { KalilaApiStack } from "../lib/kalila-api-stack";
import { KalilaAuthStack } from "../lib/kalila-auth-stack";
import { KalilaDataStorageStack } from "../lib/kalila-data-storage-stack";
import { KalilaDataAggregationStack } from "../lib/kalila-data-aggregation-stack";
import { KalilaLineDetectionStack } from "../lib/kalila-line-detection-stack";

const env = { account: "557976691964", region: "eu-central-1" };

const app = new cdk.App();

const authStack = new KalilaAuthStack(app, "KalilaAuthStack", { env });

const dataStack = new KalilaDataManagementStack(
  app,
  "KalilaDataManagementStack",
  { env },
);

new KalilaApiStack(app, "KalilaApiStack", {
  tableArns: dataStack.tableArns,
  tableNames: dataStack.tableNames,
  userPoolId: authStack.userPoolId,
  env,
});
new KalilaDataStorageStack(app, "KalilaDataStorageStack", {
  authenticatedRole: authStack.authenticatedRole,
  env,
});

new KalilaDataAggregationStack(app, "KalilaDataAggregationStack", {
  tableArns: dataStack.tableArns,
  tableStreamArns: dataStack.tableStreamArns,
  itemCountTableName: dataStack.tableNames.itemCounts,
  env,
});

new KalilaLineDetectionStack(app, "KalilaLineDetectionStack", {
  tableArns: dataStack.tableArns,
  tableStreamArns: dataStack.tableStreamArns,
  tableNames: dataStack.tableNames,
  env: { account: "557976691964", region: "eu-central-1" },
});
