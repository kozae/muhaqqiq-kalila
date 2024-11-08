import { generateClient, type GraphQLQuery } from "@aws-amplify/api";
import type { GetManySegmentContentsQuery, SegmentContent, GetUnitQuery, GetMediumQuery } from "kalila-graphql";




const client = generateClient();

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

export async function getSegmentContentIds(unitId: string) {

    const query =/* GraphQL */ `query GetUnit($id: ID!) {
                getUnit(id: $id) {
                    frame
                    order
                    title
                    segments {
                    id
                    mediumId
                    }
                    version
                    __typename
                }
}`

    const response = await client.graphql<GraphQLQuery<GetUnitQuery>>({
        query,
        variables: { id: unitId },
        authMode: "userPool",
    });

    const segments = response.data?.getUnit?.segments?.map(segment => ({ id: segment?.id, mediumId: segment?.mediumId }))
    const info = {
        frame: response.data?.getUnit?.frame,
        order: response.data?.getUnit?.order,
        title: response.data?.getUnit?.title,
        version: response.data?.getUnit?.version
    }

    return { segments, info };

}


export async function getSigla(mediaIds: string[]) {

    const getMedium = /* GraphQL */ `query GetMedium($id: ID!) {
  getMedium(id: $id) {

    siglum

  }
}
`
    const idToSigla: Record<string, string> = {};

    for (const id of mediaIds) {
        const response = await client.graphql<GraphQLQuery<GetMediumQuery>>({
            query: getMedium,
            variables: { id },
            authMode: "userPool",
        });

        idToSigla[id] = response.data?.getMedium?.siglum ?? "";
    }

    return idToSigla;

}

export async function runCrossAnalysis(data: { key: string, passages: Record<string, string> }, version: string) {
    const url = `https://cross-analysis-api.kozae.de/${version}/analyze`;
    const payload = { ...data, password: "T<'<^]4|uto<maKr49S`GAK>O4Q'f|WSP:s81!TX[0:/Mr-g9" }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    return await response.json();
}

export async function getSiglaOrder(chapter: string) {
    const url = `https://cross-analysis-api.kozae.de/sigla/${chapter}`;
    const response = await fetch(url);

    return await response.json();
}

export async function listCachedVersions(key: string) {
    const url = `https://cross-analysis-api.kozae.de/list-cached/${key}`;
    const response = await fetch(url);

    return await response.json();
}

export async function loadCachedFile(key: string, version: string, timestamp: string) {
    const url = `https://cross-analysis-api.kozae.de/get_cached/${version}/${key}/${timestamp}`;
    const response = await fetch(url);

    return await response.json();
}