import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  CfnIdentityPool,
  CfnIdentityPoolRoleAttachment,
  UserPool,
  UserPoolClient,
} from "aws-cdk-lib/aws-cognito";
import { Role, FederatedPrincipal } from "aws-cdk-lib/aws-iam";

import { Construct } from "constructs";

export class KalilaAuthStack extends Stack {
  public readonly userPoolId: string;
  public readonly userPoolClient: UserPoolClient;
  public readonly identityPool: CfnIdentityPool;
  public readonly authenticatedRole: Role;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const userPool = new UserPool(this, "KalilaUserPool", {
      userPoolName: "kalilaUserPool",
      selfSignUpEnabled: false,
      signInAliases: {
        email: true,
        username: true,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
        email: {
          required: true,
          mutable: true,
        },
        profilePicture: {
          required: false,
          mutable: true,
        },
      },
    });
    this.userPoolId = userPool.userPoolId;
    this.userPoolClient = userPool.addClient("KalilaUserPoolClient", {
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });

    this.identityPool = new CfnIdentityPool(this, "IdentityPool", {
      allowUnauthenticatedIdentities: false, // We only allow authenticated users
      cognitoIdentityProviders: [
        {
          clientId: this.userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    this.authenticatedRole = new Role(this, "CognitoDefaultAuthenticatedRole", {
      assumedBy: new FederatedPrincipal(
        "cognito-identity.amazonaws.com",
        {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": this.identityPool.ref,
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "authenticated",
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
    });

    new CfnIdentityPoolRoleAttachment(this, "RolesAttachment", {
      identityPoolId: this.identityPool.ref,
      roles: {
        authenticated: this.authenticatedRole.roleArn,
      },
    });

    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });
    new CfnOutput(this, "UserPoolClientId", {
      value: this.userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, "IdentityPoolId", {
      value: this.identityPool.ref,
    });
  }
}
