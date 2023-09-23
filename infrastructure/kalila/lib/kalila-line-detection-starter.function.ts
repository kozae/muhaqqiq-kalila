import { ECS } from "aws-sdk";
import { LineDetectionJob } from "../../kalila-graphql/src/API";

const ecs = new ECS();

// http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_streams_StreamRecord.html
interface StreamRecord<T> {
  ApproximateCreationDateTime?: number;
  Keys?: { [key: string]: any };
  NewImage?: T;
  OldImage?: T;
  SequenceNumber?: string;
  SizeBytes?: number;
  StreamViewType?:
    | "KEYS_ONLY"
    | "NEW_IMAGE"
    | "OLD_IMAGE"
    | "NEW_AND_OLD_IMAGES";
}

// http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_streams_Record.html
interface DynamoDBRecord<T> {
  awsRegion?: string;
  dynamodb?: StreamRecord<T>;
  eventID?: string;
  eventName?: "INSERT" | "MODIFY" | "REMOVE";
  eventSource?: string;
  eventSourceARN?: string;
  eventVersion?: string;
  userIdentity?: any;
}

// http://docs.aws.amazon.com/lambda/latest/dg/eventsources.html#eventsources-ddb-update
interface DynamoDBStreamEvent<T> {
  Records: DynamoDBRecord<T>[];
}

export const handler = async (
  event: DynamoDBStreamEvent<any>,
): Promise<void> => {
  console.log({ event });
  if (!event.Records.some((r) => r.dynamodb?.NewImage?.state?.N === "0"))
    return;

  try {
    const params: ECS.RunTaskRequest = {
      cluster: process.env.CLUSTER_NAME!,
      launchType: "FARGATE",
      taskDefinition: process.env.TASK_DEFINITION_ARN!,
      count: 1,
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: [process.env.SUBNET!],
          securityGroups: [process.env.SECURITY_GROUP!],
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: process.env.CONTAINER_NAME!,
          },
        ],
      },
    };

    await ecs.runTask(params).promise();
  } catch (error) {
    console.error("Error starting Fargate task:", error);
  }
};
