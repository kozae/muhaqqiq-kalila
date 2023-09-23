import { StackProps, Stack } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { KalilaLineDetectionStarter } from "./kalila-line-detection-starter";
import { IKalilaTableInfo } from "./utils";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";

export interface IKalilaLineDetectionStackProps extends StackProps {
  tableArns: IKalilaTableInfo;
  tableStreamArns: IKalilaTableInfo;
  tableNames: IKalilaTableInfo;
}

export class KalilaLineDetectionStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: IKalilaLineDetectionStackProps,
  ) {
    super(scope, id, props);

    const pagesBucket = Bucket.fromBucketArn(
      this,
      "KalilaPagesBucketLineDetectionConstruct",
      "arn:aws:s3:::kalila-pages",
    );

    const vpc = Vpc.fromLookup(this, "KalilaVpcLineDetectionConstruct", {
      vpcId: "vpc-02a0a94756a3ace7c",
    });

    const securityGroup = new SecurityGroup(this, "KalilaLineDetectionSG", {
      vpc,
      allowAllOutbound: true, // Will let your service to connect to the outside world
    });

    const cluster = new ecs.Cluster(this, "KalilaCluster", {
      vpc,
      enableFargateCapacityProviders: true,
    });

    const repository = Repository.fromRepositoryArn(
      this,
      "LineDetectionRepository",
      "arn:aws:ecr:eu-central-1:557976691964:repository/line_detection_service",
    );

    const taskDef = new ecs.FargateTaskDefinition(
      this,
      "LineDetectionTaskDef",
      { memoryLimitMiB: 512, cpu: 256 },
    );

    const logging = new ecs.AwsLogDriver({
      streamPrefix: "lineDetectionService",
    });

    const container = taskDef.addContainer("LineDetectionContainer", {
      image: ecs.ContainerImage.fromEcrRepository(repository, "latest"),
      logging,
    });

    const starter = new KalilaLineDetectionStarter(
      this,
      "LineDetectionStarterFunction",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        memorySize: 128,
        environment: {
          TASK_DEFINITION_ARN: taskDef.taskDefinitionArn,
          CONTAINER_NAME: container.containerName,
          SECURITY_GROUP: securityGroup.securityGroupId,
          SUBNET: vpc.privateSubnets[0].subnetId,
          CLUSTER_NAME: cluster.clusterName,
        },
      },
    );

    taskDef.grantRun(starter.fn);

    const jobsTable = dynamodb.Table.fromTableAttributes(
      this,
      "LineDetectionTaskJobTableConstruct",
      {
        tableArn: props.tableArns.lineDetectionJobs,
        tableStreamArn: props.tableStreamArns.lineDetectionJobs,
      },
    );

    starter.fn.addEventSource(
      new DynamoEventSource(jobsTable, {
        startingPosition: lambda.StartingPosition.LATEST,
        filters: [
          lambda.FilterCriteria.filter({
            eventName: lambda.FilterRule.isEqual("INSERT"),
          }),
        ],
      }),
    );

    taskDef.addToTaskRolePolicy(
      new iam.PolicyStatement({
        actions: ["dynamodb:Scan", "dynamodb:UpdateItem"],
        resources: [props.tableArns.lineDetectionJobs],
        effect: iam.Effect.ALLOW,
      }),
    );

    taskDef.addToTaskRolePolicy(
      new iam.PolicyStatement({
        actions: ["dynamodb:Query"],
        resources: [
          props.tableArns.textElements,
          props.tableArns.pages,
          `${props.tableArns.textElements}/index/*`,
          `${props.tableArns.pages}/index/*`,
        ],
        effect: iam.Effect.ALLOW,
      }),
    );

    taskDef.addToTaskRolePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject", "s3:PutObject"],
        resources: [pagesBucket.arnForObjects("*")],
        effect: iam.Effect.ALLOW,
      }),
    );

    taskDef.addToTaskRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"],
        effect: iam.Effect.ALLOW,
      }),
    );
  }
}
