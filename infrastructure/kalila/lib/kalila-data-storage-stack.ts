import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";

import { Role } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface IKalilaDataStorageStackProps extends StackProps {
  readonly authenticatedRole: Role;
  readonly stage: string;
}

export class KalilaDataStorageStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: IKalilaDataStorageStackProps,
  ) {
    super(scope, id, props);
    const pagesBucket = Bucket.fromBucketArn(
      this,
      "KalilaPagesBucket",
      "arn:aws:s3:::kalila-pages",
    );
    pagesBucket.grantReadWrite(props.authenticatedRole);
    new CfnOutput(this, "StorageBucketName", { value: pagesBucket.bucketName });



  }
}
