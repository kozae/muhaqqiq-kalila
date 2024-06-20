import type { SSTConfig } from "sst";
import { AstroSite, Api } from "sst/constructs";
import { CachePolicy, FunctionCode, OriginAccessIdentity, ViewerProtocolPolicy, Function, FunctionEventType, type IFunction, CacheQueryStringBehavior } from "aws-cdk-lib/aws-cloudfront";
import { Duration } from "aws-cdk-lib/core";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { aws_s3 as s3 } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";



export default {
  config(_input) {
    return {
      name: "KalilaFrontendStack",
      region: "eu-central-1",
    };
  },
  stacks(app) {

    app.stack(function Site({ stack }) {

      const bucket = s3.Bucket.fromBucketName(stack, "KalilaAssetsBucket", "kalila-pages");
      const longTermCachePolicy = new CachePolicy(
        stack,
        "KalilaFrontendCachePolicy",
        {
          comment:
            "Custom cache policy that keeps the item until manually invalidated",
          defaultTtl: Duration.days(365),
          minTtl: Duration.days(365),
          maxTtl: Duration.days(365),
          enableAcceptEncodingGzip: true,
          enableAcceptEncodingBrotli: true,
          queryStringBehavior: CacheQueryStringBehavior.all()
        },
      );
      const noCachePolicy = new CachePolicy(
        stack,
        "KalilaNoCachePolicy",
        {
          comment: "Custom cache policy for never caching any items",
          defaultTtl: Duration.seconds(0),
          minTtl: Duration.seconds(0),
          maxTtl: Duration.seconds(0),
        },
      );
      const api = new Api(stack, "api", {
        defaults: {
          function: {
            runtime: "go",
            memorySize: 256,
          },
        },
        cors: {
          allowMethods: ["POST"],
          allowOrigins: ["*"],
        },
        routes: {
          "POST /": "functions/revalidate.go",
        },
      });

      const originAccessIdentity = new OriginAccessIdentity(stack, "OAI", { comment: "Kalila Frontend Assets Access Identity" });

      const dataRemapFunction = new Function(stack, "DataRemapFunction", {
        code: FunctionCode.fromFile({
          filePath: stack.stage === "prod" ? "functions/data-remap.function.js" : "functions/data-dev-remap.function.js",
        }),
      }) as IFunction;

      const pageRemapFunction = new Function(stack, "PageRemapFunction", {
        code: FunctionCode.fromFile({
          filePath: "functions/page-scan-remap.function.js",
        }),
      }) as IFunction;



      const site = new AstroSite(stack, "site", {
        cdk: {
          serverCachePolicy: longTermCachePolicy,
          distribution: {
            additionalBehaviors: {
              "/srv/data/*": {
                origin: new S3Origin(bucket, { originAccessIdentity }),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                functionAssociations: [
                  {
                    eventType: FunctionEventType.VIEWER_REQUEST,
                    function: dataRemapFunction,
                  },
                ],
                cachePolicy: noCachePolicy,
              },
              "/srv/page/*": {
                origin: new S3Origin(bucket, { originAccessIdentity }),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                functionAssociations: [
                  {
                    eventType: FunctionEventType.VIEWER_REQUEST,
                    function: pageRemapFunction,
                  },
                ],
                cachePolicy: longTermCachePolicy,
              }
            }
          }
        },
        permissions: [
          new iam.PolicyStatement({
            actions: ["s3:Get*", "s3:List*"],
            resources: ["arn:aws:s3:::*"],
          }),
          new iam.PolicyStatement({
            actions: ["dynamodb:Scan", "dynamodb:Query", "dynamodb:GetItem", "dynamodb:BatchGetItem"],
            resources: [
              "arn:aws:dynamodb:*:*:table/*",
              "arn:aws:dynamodb:*:*:table/*/index/*",
            ],
          }),
        ],
        bind: [api],
        environment: {
          STAGE: stack.stage,
        },
      });


      const fn = api.getFunction("POST /")!;
      fn.addEnvironment(
        "DISTRIBUTION_ID",
        site.cdk?.distribution.distributionId ?? "",
      );

      site.cdk?.distribution.grantCreateInvalidation(fn.grantPrincipal);

      bucket.grantRead(originAccessIdentity.grantPrincipal);


      stack.addOutputs({
        url: site.url,
        api: api.url,
        oai: originAccessIdentity.originAccessIdentityId,
      });
    });
  },
} satisfies SSTConfig;
