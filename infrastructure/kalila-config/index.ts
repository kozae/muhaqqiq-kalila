export const awsConfig = {
  Auth: {
    region: "eu-central-1",
    userPoolId: "eu-central-1_h5n9M32Il",
    userPoolWebClientId: "ede93nu3obc0fqe76i1gukslc",
    identityPoolId: "eu-central-1:73c5dfd3-047f-4a1f-b281-d5c1f526c2c8",
  },
  Storage: {
    AWSS3: {
      bucket: "kalila-pages",
      region: "eu-central-1",
    },
  },
  aws_appsync_graphqlEndpoint:
    "https://elfvqbn6z5amrjyrmzwz2sktpm.appsync-api.eu-central-1.amazonaws.com/graphql",
  aws_appsync_region: "eu-central-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
};
