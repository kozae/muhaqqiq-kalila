import { Construct } from "constructs";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";

export class KalilaLineDetectionStarter extends Construct {
  public readonly fn: NodejsFunction;

  constructor(scope: Construct, id: string, props?: NodejsFunctionProps) {
    super(scope, id);
    this.fn = new NodejsFunction(this, "function", props);
  }
}
