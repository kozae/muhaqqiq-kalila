export const awsConfig = {
  "Auth": {
    Cognito: {
      "region": "eu-central-1",
      "userPoolId": "eu-central-1_qd0ilnSEg",
      "userPoolClientId": "1knr6jorruj5dlqhfjd217b1jp",
      "identityPoolId": "eu-central-1:c53a1611-ea3e-4706-94bb-a2fddddf3086"
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
      "defaultAuthMode": "AMAZON_COGNITO_USER_POOLS",
      "endpoint": "https://6d6azgco2zcw7m7glyzvhbgbii.appsync-api.eu-central-1.amazonaws.com/graphql",
    }
  }
};
