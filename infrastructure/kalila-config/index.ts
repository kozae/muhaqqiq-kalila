import type { ResourcesConfig } from "aws-amplify";

export const awsConfig: ResourcesConfig = {
  "Auth": {
    "Cognito": {
      "userPoolId": "eu-central-1_YkB2BvVhf",
      "userPoolClientId": "7fjdp9q38g8v5k3jgu459bt7t1",
      "identityPoolId": "eu-central-1:a9393bce-1b3b-47d8-a031-de0d01168b11"
    }
  },
  "Storage": {
    "S3": {
      "bucket": "kalila-pages",
      "region": "eu-central-1"
    }
  },
  "API": {
    "GraphQL": {
      "region": "eu-central-1",
      "defaultAuthMode": "userPool",
      "endpoint": "https://t2lactjjbfctbhdd4zfo5ajd5e.appsync-api.eu-central-1.amazonaws.com/graphql"
    }
  }
};
