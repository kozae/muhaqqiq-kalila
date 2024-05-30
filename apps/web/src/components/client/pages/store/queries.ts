import {
  type GraphQLQuery,
  type GraphQLResult,
} from "@aws-amplify/api";
import { getUrl } from 'aws-amplify/storage';
import { updatePage, changeMediumEditor, type GetMediumQuery, type GetPageQuery, type LemmaData, type UpdatePageMutation, type PageUpdateInput, type ChangeMediumEditorMutation } from "kalila-graphql";
import { loadImageAsDataUrl } from "../StateControls/helpers";
import { generateClient } from "aws-amplify/api";


const client = generateClient();

export async function getMedium(id: string) {
  const query = /* GraphQL */ `
    query GetMedium($id: ID!) {
      getMedium(id: $id) {
        editor
        siglum
      }
    }
  `;
  const response = await client.graphql<GraphQLQuery<GetMediumQuery>>({
    query,
    variables: { id },
    authMode: "userPool",
  });

  const siglum = (response as GraphQLResult<GetMediumQuery>).data?.getMedium?.siglum;
  const editor = (response as GraphQLResult<GetMediumQuery>).data?.getMedium?.editor;

  return { siglum, editor };
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
        openSegments {
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
            __typename
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
          __typename
        }
        endingSegments {
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
            __typename
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
          __typename
        }
      }
    }
  `;

  const response = await client.graphql<GraphQLQuery<GetPageQuery>>({
    query,
    variables: { id },
    authMode: "userPool",
  });

  return (response as GraphQLResult<GetPageQuery>).data?.getPage;
}

export async function getImage(url: string) {
  const { url: signedUrl } = await getUrl({ key: `pages/${url}` });
  return loadImageAsDataUrl(signedUrl.toString());
}

export async function getPageData(pageId: string) {
  const page = await getPage(pageId);
  const imageDataUrl = await getImage(page!.image!);

  return { page, imageDataUrl };
}

export async function postPageForLemmatization(data: any) {
  const url = 'https://camel.kalila-and-dimna.de/lemmatize_page';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return (await response.json()) as LemmaData[];
}

export async function postPageUpdate(update: PageUpdateInput) {

  console.log(update);

  const response = await client.graphql<GraphQLQuery<UpdatePageMutation>>({
    query: updatePage,
    variables: { update },
    authMode: "userPool",
  });
  return (response as GraphQLResult<UpdatePageMutation>).data;
}

export async function postChangeMediumEditor(mediumId: string, editor: string) {
  const response = await client.graphql<GraphQLQuery<ChangeMediumEditorMutation>>({
    query: changeMediumEditor,
    variables: { mediumId, editor },
    authMode: "userPool",
  });
  return (response as GraphQLResult<ChangeMediumEditorMutation>).data;
}

