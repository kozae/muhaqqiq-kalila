import type { SSTConfig } from "sst";
import { AstroSite, Api } from "sst/constructs";
import { CachePolicy } from "aws-cdk-lib/aws-cloudfront";
import { Duration } from "aws-cdk-lib/core";

export default {
  config(_input) {
    return {
      name: "KalilaFrontendStack",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const customCachePolicy = new CachePolicy(
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
        },
      );
      const api = new Api(stack, "api", {
        defaults: {
          function: {
            runtime: "go1.x",
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

      const site = new AstroSite(stack, "site", {
        cdk: {
          serverCachePolicy: customCachePolicy,
        },
        bind: [api],
        environment: {
          SRAGE: stack.stage,
        },
      });

      const fn = api.getFunction("POST /")!;
      fn.addEnvironment(
        "DISTRIBUTION_ID",
        site.cdk?.distribution.distributionId ?? "",
      );

      site.cdk?.distribution.grantCreateInvalidation(fn.grantPrincipal);
      stack.addOutputs({
        url: site.url,
        api: api.url,
      });
    });
  },
} satisfies SSTConfig;
