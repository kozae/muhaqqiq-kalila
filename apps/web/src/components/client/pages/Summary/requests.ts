import { generateClient, type GraphQLQuery, type GraphQLResult } from "@aws-amplify/api";
import { type UpdatePageMutation, updatePageTags, type PageTagsInput, type UpdatePageTagsMutation, type Page, type GetMediumQuery } from "kalila-graphql";

const client = generateClient();

export async function postPageTagsUpdate(input: PageTagsInput) {

    const response = await client.graphql<GraphQLQuery<UpdatePageTagsMutation>>({
        query: updatePageTags,
        variables: { input },
        authMode: "userPool",
    });
    return (response as GraphQLResult<UpdatePageMutation>).data;
}

export async function getMediumPages(id: string) {

    const query = /* GraphQL */  `query GetMedium($id: ID!) {
  getMedium(id: $id) {
    siglum
    pages {
      items {
        id
        mediumId
        number
        image
        commentary
        foliation
        pagination
        tags
      }
    }
    editor
  }
}
`

    const response = await client.graphql<GraphQLQuery<GetMediumQuery>>({
        query,
        variables: { id, limit: 1000 },
        authMode: "userPool",
    });

    const pages = (response as GraphQLResult<GetMediumQuery>).data?.getMedium?.pages?.items as Page[];
    const siglum = (response as GraphQLResult<GetMediumQuery>).data?.getMedium?.siglum;
    const editor = (response as GraphQLResult<GetMediumQuery>).data?.getMedium?.editor;


    return { pages, siglum, editor };
}

