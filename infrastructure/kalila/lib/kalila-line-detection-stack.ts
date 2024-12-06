import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as iam from "aws-cdk-lib/aws-iam";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { IKalilaTableInfo } from "./utils";

interface IKalilaLineDetectionStackProps extends StackProps {
    readonly stage: string;
    readonly userPoolId: string;
    readonly tableArns: IKalilaTableInfo;
}

export class KalilaLineDetectionStack extends Stack {
    constructor(scope: Construct, id: string, props: IKalilaLineDetectionStackProps) {
        super(scope, id, props);

        // Create Lambda execution role with permissions
        const lambdaRole = new iam.Role(this, "LineDetectionLambdaRole", {
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
        });

        // Grant S3 read/write access
        lambdaRole.addToPolicy(new iam.PolicyStatement({
            actions: ["s3:GetObject", "s3:PutObject"],
            resources: ["arn:aws:s3:::kalila-pages/*"],
        }));

        // Grant DynamoDB read access to all tables
        lambdaRole.addToPolicy(new iam.PolicyStatement({
            actions: ["dynamodb:GetItem", "dynamodb:Query", "dynamodb:Scan"],
            resources: Object.values(props.tableArns),
        }));

        // Add CloudWatch Logs permissions
        lambdaRole.addToPolicy(new iam.PolicyStatement({
            actions: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            resources: ["*"]
        }));

        // Create Lambda function
        const lineDetectionFunction = new lambda.Function(this, "LineDetectionFunction", {
            runtime: lambda.Runtime.PYTHON_3_9,
            handler: "index.handler",
            role: lambdaRole,
            code: lambda.Code.fromInline(`
def handler(event, context):
    return {
        'statusCode': 200,
        'body': 'Line detection endpoint'
    }
      `),
            environment: {
                STAGE: props.stage
            }
        });

        // Get reference to existing Cognito User Pool
        const userPool = UserPool.fromUserPoolId(
            this,
            "ImportedPool",
            props.userPoolId
        );

        // Create Cognito authorizer
        const authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, "LineDetectionAuthorizer", {
            cognitoUserPools: [userPool]
        });

        // Create API Gateway
        const api = new apigateway.RestApi(this, "LineDetectionApi", {
            restApiName: `line-detection-api-${props.stage}`,
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS
            }
        });

        // Add protected endpoint
        api.root.addMethod("POST",
            new apigateway.LambdaIntegration(lineDetectionFunction),
            {
                authorizer: authorizer,
                authorizationType: apigateway.AuthorizationType.COGNITO
            }
        );
    }
}
