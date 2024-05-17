#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

import { KalilaDataManagementStack } from "../lib/kalila-data-management-stack";
import { KalilaApiStack } from "../lib/kalila-api-stack";
import { KalilaAuthStack } from "../lib/kalila-auth-stack";
import { KalilaDataStorageStack } from "../lib/kalila-data-storage-stack";
import { KalilaDataAggregationStack } from "../lib/kalila-data-aggregation-stack";
import { createCommonEnvironmentVariablesRecord } from "../lib/utils";

const environments: Record<string, { account: string; region: string }> = {
  dev: {
    account: "557976691964",
    region: "eu-central-1",
  },
  stage: {
    account: "557976691964",
    region: "eu-central-1",
  },
  prod: {
    account: "557976691964",
    region: "eu-central-1",
  },
};

const app = new cdk.App();

const environment: string = app.node.tryGetContext("environment") || "dev";
const env = environments[environment];

const authStack = new KalilaAuthStack(app, `KalilaAuthStack-${environment}`, {
  env,
  stage: environment,
});

const dataStack = new KalilaDataManagementStack(
  app,
  `KalilaDataManagementStack-${environment}`,
  { env, stage: environment },
);

const envVariables = createCommonEnvironmentVariablesRecord(environment, dataStack.tableNames);

new KalilaApiStack(app, `KalilaApiStack-${environment}`, {
  tableArns: dataStack.tableArns,
  userPoolId: authStack.userPoolId,
  env,
  stage: environment,
  vars: envVariables,
});
new KalilaDataStorageStack(app, `KalilaDataStorageStack-${environment}`, {
  authenticatedRole: authStack.authenticatedRole,
  env,
  stage: environment,
});

new KalilaDataAggregationStack(
  app,
  `KalilaDataAggregationStack-${environment}`,
  {
    // tableArns: dataStack.tableArns,
    // tableStreamArns: dataStack.tableStreamArns,
    // tableNames: dataStack.tableNames,
    env,
    stage: environment,
    vars: envVariables,
  },
);

