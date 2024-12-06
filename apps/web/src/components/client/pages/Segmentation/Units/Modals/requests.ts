import { generateClient } from "aws-amplify/api";
import { type GraphQLQuery } from "@aws-amplify/api";
import {
  deleteUnit,
  createUnit,
  updateUnit,
  type DeleteUnitMutation,
  type DeleteUnitInput,
  type CreateUnitMutation,
  type CreateUnitInput,
  type UpdateUnitMutation,
  type UpdateUnitInput,
} from "kalila-graphql";

const client = generateClient();


export async function requestDelete(input: DeleteUnitInput) {


  await client.graphql<GraphQLQuery<DeleteUnitMutation>>({
    query: deleteUnit,
    variables: { input },
    authMode: "userPool",
  });
}

export async function requestCreate(input: CreateUnitInput) {
  await client.graphql<GraphQLQuery<CreateUnitMutation>>({
    query: createUnit,
    variables: { input },
    authMode: "userPool",
  });
}

export async function requestUpdate(input: UpdateUnitInput) {
  await client.graphql<GraphQLQuery<UpdateUnitMutation>>({
    query: updateUnit,
    variables: { input },
    authMode: "userPool",
  });
}
