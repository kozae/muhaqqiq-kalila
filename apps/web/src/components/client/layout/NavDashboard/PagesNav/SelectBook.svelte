<script lang="ts">
  import { useQuery } from "@sveltestack/svelte-query";
  import { generateClient } from "aws-amplify/api";
  import { type GraphQLQuery } from "@aws-amplify/api";
  import { listBooks, type ListBooksQuery } from "kalila-graphql";
  import Selector from "../Selector.svelte";
  import Loading from "@client/reusable/Loading.svelte";
  export let bookId: string | undefined = undefined;
  const queryResult = useQuery("listBooks", async () => {
    const client = generateClient();
    const response = await client.graphql<GraphQLQuery<ListBooksQuery>>({
      query: listBooks,
      authMode: "userPool",
    });
    return response.data?.listBooks;
  });
</script>

{#if $queryResult.data}
  <Selector
    label="filter-books"
    placeholder="filter books"
    items={$queryResult.data.map((item) => item?.title ?? "") ?? []}
    on:selected={(e) =>
      (bookId = $queryResult.data?.find((b) => b?.title === e.detail)?.id)}
  />
{:else}
  <Loading />
{/if}
