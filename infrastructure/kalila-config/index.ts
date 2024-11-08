export const awsConfig = {
  "Auth": {
    "Cognito": {
      "userPoolId": "eu-central-1_gU79wXRhZ",
      "userPoolClientId": "3t69gtd7s718k5300n3j0u8umv",
      "identityPoolId": "eu-central-1:a778339c-a854-4e2e-868d-3840ca310da1"
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
      "endpoint": "https://4sxrwzozw5bzrnie2xdna27vz4.appsync-api.eu-central-1.amazonaws.com/graphql"
    }
  }
};
