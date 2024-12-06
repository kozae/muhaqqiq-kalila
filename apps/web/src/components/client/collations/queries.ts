import { generateClient, type GraphQLQuery } from "aws-amplify/api";
import { getChapterCollationSkeleton, type EditMultiplePagesMutation, type GetChapterCollationSkeletonQuery, type GetManySegmentContentsQuery, type PageUpdateTargetInput, type SegmentContent, editMultiplePages } from "kalila-graphql";

import { QueryClient } from "@sveltestack/svelte-query";

export const queryClient = new QueryClient();

const client = generateClient();

export async function getCollationSkeleton(id: string) {


    const response = await client.graphql<GraphQLQuery<GetChapterCollationSkeletonQuery>>({
        query: getChapterCollationSkeleton,
        variables: { id },
        authMode: "userPool",
    });



    return response.data?.getChapterCollationSkeleton;
}

export async function getSegmentContents(ids: string[]) {

    const query = /* GraphQL */ `query GetManySegmentContents($ids: [ID!]) {
                                                                getManySegmentContents(ids: $ids) {
                                                                    id
                                                                    tokens
                                                                    lines
                                                                    pages
                                                                    breaks
                                                                }
                                                        }`

    const response = await client.graphql<GraphQLQuery<GetManySegmentContentsQuery>>({
        query,
        variables: { ids },
        authMode: "userPool",
    });

    const result: Record<string, SegmentContent> = {}

    for (const segment of response.data?.getManySegmentContents ?? []) {
        if (segment && segment.id) {
            result[segment.id] = segment;
        }
    }

    return result;

}

export async function postUpdates(update: PageUpdateTargetInput[]) {

    const response = await client.graphql<GraphQLQuery<EditMultiplePagesMutation>>({
        query: editMultiplePages,
        variables: { update },
        authMode: "userPool",
    });

    return response.data?.editMultiplePages;
}


export async function getLemmas(data: { sentence: string }) {
    const url = 'https://camel.kalila-and-dimna.de/';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}