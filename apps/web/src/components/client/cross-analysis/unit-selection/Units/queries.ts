import {
  type GraphQLQuery,
  type GraphQLResult,
} from "@aws-amplify/api";
import { generateClient } from "aws-amplify/api";
import type { ListUnitsQuery } from "kalila-graphql";
import { Subject } from "rxjs";

const query = /* GraphQL */ `
  query ListUnits($parentId: ID!, $mediumIds: [ID]) {
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
        segments(mediumIds: $mediumIds) {
          id
          startPage
          startLine
          startToken
          endPage
          endLine
          endToken
          lacuna
          tags
          type
          version
          __typename
        }
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

export async function listUnits(parentId: string, mediumId: string) {
  const client = generateClient();

  const response = await client.graphql<GraphQLQuery<ListUnitsQuery>>({
    query,
    variables: { parentId, mediumIds: [mediumId] },
    authMode: "userPool"
  });
  return (response as GraphQLResult<ListUnitsQuery>).data?.listUnits;
}

export const unitFilter = new Subject<string>();
