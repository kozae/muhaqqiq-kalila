import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE, type GraphQLQuery } from "@aws-amplify/api";
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

export async function requestDelete(input: DeleteUnitInput) {
  await API.graphql<GraphQLQuery<DeleteUnitMutation>>({
    query: deleteUnit,
    variables: { input },
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  });
}

export async function requestCreate(input: CreateUnitInput) {
  await API.graphql<GraphQLQuery<CreateUnitMutation>>({
    query: createUnit,
    variables: { input },
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  });
}

export async function requestUpdate(input: UpdateUnitInput) {
  await API.graphql<GraphQLQuery<UpdateUnitMutation>>({
    query: updateUnit,
    variables: { input },
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  });
}
