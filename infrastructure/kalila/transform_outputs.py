import json

# File name for accumulated data
DATA_FILE = "temp_data.json"

# Load accumulated outputs
with open(DATA_FILE, "r") as f:
    all_outputs = json.load(f)

outputs = {item["OutputKey"]: item["OutputValue"] for item in all_outputs}

config = {
    "Auth": {
        "region": "eu-central-1",
        "userPoolId": outputs.get("UserPoolId", ""),
        "userPoolWebClientId": outputs.get("UserPoolClientId", ""),
        "identityPoolId": outputs.get("IdentityPoolId", ""),
    },
    "Storage": {
        "AWSS3": {
            "bucket": outputs.get("BucketName", "kalila-pages"),
            "region": "eu-central-1",
        },
    },
    "aws_appsync_graphqlEndpoint": outputs.get("ApiUrl", ""),
    "aws_appsync_region": "eu-central-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
}

with open("../kalila-config/index.ts", "w") as f:
    f.write("export const awsConfig = " + json.dumps(config, indent=2) + ";\n")
