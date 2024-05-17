import { CfnOutput, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { KalilaTableConstructs } from "./utils";
import * as iam from "aws-cdk-lib/aws-iam";
import { AwsLogDriver, Cluster, ContainerImage, CpuArchitecture, FargateTaskDefinition, OperatingSystemFamily } from "aws-cdk-lib/aws-ecs";
import { Peer, Port, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';


interface IKalilaDataAggregationStackProps extends StackProps {
  // readonly tableArns: IKalilaTableInfo;
  // readonly tableStreamArns: IKalilaTableInfo;
  // readonly tableNames: IKalilaTableInfo;
  readonly stage: string;
  readonly vars: Record<string, string>;
}

export class KalilaDataAggregationStack extends Stack {
  private readonly tables: KalilaTableConstructs;
  private readonly stage: string;
  constructor(
    scope: Construct,
    id: string,
    props: IKalilaDataAggregationStackProps,
  ) {
    super(scope, id, props);
    this.stage = props.stage;
    this.createDataTransformationTask(props.vars);
    this.createEditionDataGithubPipeline();
  }

  private createEditionDataGithubPipeline() {
    const bucket = s3.Bucket.fromBucketName(this, 'ExistingBucket', 'kalila-pages');

    const sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: 'GitHub_Source',
      owner: 'kalila-and-dimna',
      repo: 'edition-data',
      oauthToken: SecretValue.unsafePlainText("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"),
      output: sourceOutput,
      branch: 'main',
    });

    const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'npm install -g aws-cli',
            ],
          },
          build: {
            commands: [
              'aws s3 sync data s3://kalila-pages/public/data_dev/edition_data',
              'aws s3 sync images s3://kalila-pages/public/data_dev/edition_data/images',
            ],
          },
        },
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      },
    });

    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: 'Build',
      project: buildProject,
      input: sourceOutput,
    });

    new codepipeline.Pipeline(this, 'GitHubToS3Pipeline', {
      pipelineName: 'GitHubToS3Pipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Build',
          actions: [buildAction],
        },
      ],
    });

    // Grant the necessary permissions for CodeBuild to access S3
    bucket.grantReadWrite(buildProject.role!);

  }


  private createDataTransformationTask(vars: Record<string, string>) {



    const taskRole = new iam.Role(this, 'DataTransformationTaskRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    const executionRole = new iam.Role(this, 'DataTransformationExecutionRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });



    executionRole.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: [
        'ecr:*',
        'logs:CreateLogStream',
        'logs:PutLogEvents',
      ],
      resources: ['*'],
    }));

    const parameterStorePolicy = new iam.PolicyStatement({
      actions: ['ssm:GetParameter', 'ssm:GetParameters'],
      resources: [
        `arn:aws:ssm:${this.region}:${this.account}:parameter/kalila/${this.stage}/*`,
      ],
    });

    taskRole.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: [
        'logs:CreateLogStream',
        'logs:PutLogEvents',
        's3:GetObject',
        's3:PutObject',
        'dynamodb:BatchGetItem',
        'dynamodb:GetRecords',
        'dynamodb:GetShardIterator',
        'dynamodb:Query',
        'dynamodb:GetItem',
        'dynamodb:Scan',
      ],
      resources: ['*'],
    }));

    taskRole.addToPrincipalPolicy(parameterStorePolicy);

    const taskDefinition = new FargateTaskDefinition(this, 'KalilaDataTransformationTask', {
      memoryLimitMiB: 512,
      cpu: 256,
      runtimePlatform: {
        operatingSystemFamily: OperatingSystemFamily.LINUX,
        cpuArchitecture: CpuArchitecture.ARM64
      },
      taskRole,
      executionRole
    });

    const logging = new AwsLogDriver({
      streamPrefix: "kalila-edition-data-transformation",
    })

    taskDefinition.addContainer('KalilaDataTransformationTask', {
      image: ContainerImage.fromRegistry('557976691964.dkr.ecr.eu-central-1.amazonaws.com/edition_data_service-dev:latest'),
      logging,
      environment: { ...vars, FILE_SYSTEM_PATH: "/usr/src/app" },
    });


    taskDefinition.taskRole.addToPrincipalPolicy(new iam.PolicyStatement({
      actions: ['dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:Scan', 's3:*'],
      resources: ['*'],
    }));

    const vpc = Vpc.fromLookup(this, "KalilaVpc", {
      vpcId: "vpc-02a0a94756a3ace7c"
    })




    new Cluster(this, 'KalilaDataTransformationCluster', {
      vpc,
    });

    const securityGroup = new SecurityGroup(this, 'KalilaDataAggregationSecurityGroup', {
      securityGroupName: 'KalilaDataTransformationTaskSecurityGroup',
      vpc,
      description: 'Allow all TCP connections',
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcpRange(0, 65535), 'Allow all TCP connections');

    new CfnOutput(this, 'SecurityGroupArn', {
      value: securityGroup.securityGroupId,
      exportName: 'KalilaDataAggregationSecurityGroupId',
    });

  }

}
