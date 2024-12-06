import json

# File name for accumulated data
DATA_FILE = "temp_data.json"

# Load accumulated outputs
with open(DATA_FILE, "r") as f:
    all_outputs = json.load(f)

outputs = {item["OutputKey"]: item["OutputValue"] for item in all_outputs}

config = {
    "Auth": {
        "Cognito": {
            "userPoolId": outputs.get("UserPoolId", ""),
            "userPoolClientId": outputs.get("UserPoolClientId", ""),
            "identityPoolId": outputs.get("IdentityPoolId", ""),
        }
    },
    "Storage": {
        "S3": {
            "bucket": outputs.get("BucketName", "kalila-pages"),
            "region": "eu-central-1",
        },
    },
    "API": {
        "GraphQL": {
            "region": "eu-central-1",
            "defaultAuthMode": "userPool",
            "endpoint": outputs.get("ApiUrl", ""),
        }
    },
}

with open("../kalila-config/index.ts", "w") as f:
    f.write("export const awsConfig = " + json.dumps(config, indent=2) + ";\n")
