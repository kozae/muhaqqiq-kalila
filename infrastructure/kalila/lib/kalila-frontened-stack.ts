import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { OriginAccessIdentity, Distribution } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { existsSync } from "fs";
import { join } from "path";
import { getSuffixFromStack } from "./utils";

export class KalilaFrontendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    const deploymentBucket = new Bucket(this, "uiDeploymentBucket", {
      bucketName: `kalila-frontend-${suffix}`,
    });

    const uiDir = join(__dirname, "..", "..", "..", "apps", "host", "dist");
    if (!existsSync(uiDir)) {
      console.warn("Ui dir not found: " + uiDir);
      return;
    }

    const originIdentity = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    deploymentBucket.grantRead(originIdentity);

    const distribution = new Distribution(this, "KalilaUIDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(deploymentBucket, {
          originAccessIdentity: originIdentity,
        }),
      },
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: "/index.html",
          responseHttpStatus: 200, // This returns a 200 OK status code with the content of index.html
        },
      ],
    });

    new BucketDeployment(this, "KalilaUIDeployment", {
      destinationBucket: deploymentBucket,
      sources: [Source.asset(uiDir)],
      distribution: distribution, // associate the CloudFront distribution
      distributionPaths: ["/*"], // invalidate all paths in CloudFront
    });

    new CfnOutput(this, "KalilaUIUrl", {
      value: distribution.distributionDomainName,
    });
  }
}
