import { type GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import {
  type CreateLineDetectionJobMutation,
  createLineDetectionJob,
  type LineDetectionJobInput,
} from "kalila-graphql";

export const postJob = async (input: LineDetectionJobInput) =>
  await API.graphql<GraphQLQuery<CreateLineDetectionJobMutation>>({
    query: createLineDetectionJob,
    variables: { input },
  });
