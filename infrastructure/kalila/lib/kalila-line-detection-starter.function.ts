import { ECS } from "aws-sdk";

const ecs = new ECS();

export const handler = async (event: any): Promise<void> => {
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
