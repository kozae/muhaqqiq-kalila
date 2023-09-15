<script lang="ts">
  import { useQuery } from "@sveltestack/svelte-query";
  import { API } from "aws-amplify";
  import { type GraphQLQuery, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
  import { type GetBookQuery } from "kalila-graphql";
  import Loading from "@client/reusable/Loading.svelte";

  import Selector from "../Selector.svelte";

  const getBook = /* GraphQL */ `
    query GetBook($id: ID!) {
      getBook(id: $id) {
        siglum
        media {
          items {
            id
            editor
            siglum
            format
          }
        }
      }
    }
  `;

  export let bookId: string | undefined = undefined;
  export let mediumId: string | undefined = undefined;

  const queryResult = useQuery(`get_${bookId}_media`, async () => {
    const response = await API.graphql<GraphQLQuery<GetBookQuery>>({
      query: getBook,
      variables: { id: bookId },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    return {
      media: response.data?.getBook?.media?.items,
      siglum: response.data?.getBook?.siglum,
    };
  });
</script>

{#if $queryResult.data}
  <Selector
    label={`filter-${$queryResult.data.siglum ?? ""}`}
    placeholder={`filter ${$queryResult.data?.siglum ?? ""} media`}
    items={$queryResult.data?.media?.map((item) => item?.siglum ?? "") ?? []}
    on:selected={(e) =>
      (mediumId = $queryResult.data?.media?.find(
        (b) => b?.siglum === e.detail,
      )?.id)}
  />
{:else}
  <Loading />
{/if}
