import {
  type GraphQLQuery,
  GRAPHQL_AUTH_MODE,
  type GraphQLResult,
} from "@aws-amplify/api";
import { API } from "aws-amplify";
import type { ListUnitsQuery } from "kalila-graphql";

const query = /* GraphQL */ `
  query ListUnits($parentId: ID!) {
    listUnits(parentId: $parentId, limit: 1000) {
      items {
        bookId
        id
        parentId
        commentary
        divider
        frame
        motifs
        order
        title
        topics
        variant
        children {
          items {
            bookId
            id
            parentId
            commentary
            divider
            frame
            motifs
            order
            title
            topics
            variant
            version
            __typename
            children {
              items {
                bookId
                id
                parentId
                commentary
                divider
                frame
                motifs
                order
                title
                topics
                variant
                version
                __typename
              }
              nextToken
              __typename
            }
          }
          nextToken
          __typename
        }
        version
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export async function listUnits(parentId: string) {
  const response = await API.graphql<GraphQLQuery<ListUnitsQuery>>({
    query,
    variables: { parentId },
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  });
  return (response as GraphQLResult<ListUnitsQuery>).data?.listUnits;
}
