import { type GraphQLQuery, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, Storage } from "aws-amplify";
import type { GetMediumQuery, GetPageQuery } from "kalila-graphql";
import { loadImageAsDataUrl } from "../StateControls/helpers";

export async function getMedium(id: string) {
  const query = /* GraphQL */ `
    query GetMedium($id: ID!) {
      getMedium(id: $id) {
        editor
        siglum
      }
    }
  `;
  const response = await API.graphql<GraphQLQuery<GetMediumQuery>>({
    query,
    variables: { id },
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  });
  return response.data?.getMedium?.siglum;
}

export async function getPage(id: string) {
  const query = /* GraphQL */ `
    query GetPage($id: ID!) {
      getPage(id: $id) {
        id
        mediumId
        number
        image
        commentary
        foliation
        pagination
        tags
        images {
          id
          pageId
          unitId
          legendId
          legend {
            id
            pageId
            order
            position
            region
            lines {
              id
              elementId
              order
              region
              states
              tokens
              version
            }
            version
          }
          location
          motifs
          order
          position
          region
          style
          version
        }
        text {
          id
          pageId
          order
          position
          region
          lines {
            id
            elementId
            order
            region
            states
            tokens
            version
          }
          version
        }
        segments {
          id
          mediumId
          unitId
          unit {
            bookId
            id
            commentary
            divider
            frame
            motifs
            order
            title
            topics
            variant
            version
          }
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
        }
        editor
        version
      }
    }
  `;

  const response = await API.graphql<GraphQLQuery<GetPageQuery>>({
    query,
    variables: { id },
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  });

  return response.data?.getPage;
}

export async function getImage(url: string) {
  const signedUrl = await Storage.get(`pages/${url}`);
  return loadImageAsDataUrl(signedUrl);
}

export async function getPageData(mediumId: string, pageId: string) {
  const siglum = await getMedium(mediumId);
  const page = await getPage(pageId);
  const imageDataUrl = await getImage(page!.image!);

  return { siglum, page, imageDataUrl };
}
