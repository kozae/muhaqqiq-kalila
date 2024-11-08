import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from "constructs";
import { AwsLogDriver, Cluster, ContainerImage, CpuArchitecture, FargateService, FargateTaskDefinition, OperatingSystemFamily } from 'aws-cdk-lib/aws-ecs';
import { Peer, Port, SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { PrivateDnsNamespace } from 'aws-cdk-lib/aws-servicediscovery';
import { HttpApi, VpcLink } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpServiceDiscoveryIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';




interface IKalilaCrossAnalysisStackProps extends cdk.StackProps {
    readonly stage: string;
    readonly vars: Record<string, string>;
}

export class KalilaCrossAnalysisStack extends cdk.Stack {
    private readonly stage: string;
    constructor(scope: Construct, id: string, props: IKalilaCrossAnalysisStackProps) {
        super(scope, id, props);
        this.stage = props.stage;

        const taskRole = new iam.Role(this, 'KalilaCrossAnalysisTaskRole', {
            assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
        });

        const executionRole = new iam.Role(this, 'KalilaCrossAnalysisExecutionRole', {
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


        const taskDefinition = new FargateTaskDefinition(this, 'KalilaCrossAnalysisTask', {
            memoryLimitMiB: 512,
            cpu: 256,
            runtimePlatform: {
                operatingSystemFamily: OperatingSystemFamily.LINUX,
                cpuArchitecture: CpuArchitecture.X86_64
            },
            taskRole,
            executionRole
        });

        const logging = new AwsLogDriver({
            streamPrefix: "kalila-cross-analysis",
            logRetention: RetentionDays.ONE_WEEK
        })

        taskDefinition.addContainer('KalilaCrossAnalysisTask', {
            image: ContainerImage.fromRegistry('557976691964.dkr.ecr.eu-central-1.amazonaws.com/cross_analysis_api'),
            logging,
            environment: { ...props.vars, ASPNETCORE_ENVIRONMENT: 'Production', ASPNETCORE_URLS: 'http://*:8080' },
            portMappings: [{ containerPort: 8080 }]
        });

        taskDefinition.taskRole.addToPrincipalPolicy(new iam.PolicyStatement({
            actions: ['dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:Scan', 's3:*'],
            resources: ['*'],
        }));

        const vpc = Vpc.fromLookup(this, "KalilaVpc", {
            vpcId: "vpc-02a0a94756a3ace7c"
        })

        const cloudMapNamespace = new PrivateDnsNamespace(this, 'CloudMapNamespace', {
            vpc,
            name: 'kalila',
        });




        const cluster = new Cluster(this, 'KalilaCrossAnalysisCluster', {
            vpc,
        });


        const securityGroup = new SecurityGroup(this, 'KalilaCrossAnalysisSecurityGroup', {
            securityGroupName: `KalilaCrossAnalysisTaskSecurityGroup-${this.stage}`,
            vpc,
            description: 'Allow all TCP connections',
            allowAllOutbound: true,
        });

        securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcpRange(0, 65535), 'Allow all TCP connections');

        new CfnOutput(this, 'SecurityGroupArn', {
            value: securityGroup.securityGroupId,
            exportName: `KalilaCrossAnalysisTaskSecurityGroupId-${this.stage}`,
        });


        const service = new FargateService(this, 'KalilaCrossAnalysisService', {
            cluster: cluster,
            taskDefinition: taskDefinition,
            desiredCount: 1,
            assignPublicIp: true,
            securityGroups: [securityGroup],
            cloudMapOptions: {
                cloudMapNamespace,
                name: 'cross-analysis-app',
            },
        });

        const vpcLink = new VpcLink(this, 'KalilaCrossAnalysisVpcLink', {
            vpc,
            vpcLinkName: 'KalilaCrossAnalysisVpcLink',
            securityGroups: [securityGroup],
        });

        const integration = new HttpServiceDiscoveryIntegration('KalilaCrossAnalysisDefaultIntegration', service.cloudMapService!, {
            vpcLink,
        })

        const httpApi = new HttpApi(this, 'HttpApi', {
            apiName: 'cross-analysis-api',
            defaultIntegration: integration,
        });

        httpApi.addRoutes({
            path: '/',
            integration: integration,
        });

        // Output the API Gateway URL
        new cdk.CfnOutput(this, 'ApiUrl', {
            value: httpApi.apiEndpoint,
            description: 'The URL of the API Gateway for the application',
        });


    }
}