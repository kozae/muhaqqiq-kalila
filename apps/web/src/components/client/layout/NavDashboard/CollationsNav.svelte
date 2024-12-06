<script lang="ts">
  import { type GraphQLQuery, type GraphQLResult } from "@aws-amplify/api";
  import { useQuery } from "@sveltestack/svelte-query";
  import { generateClient } from "aws-amplify/api";
  import {
    type ListChapterCollationsQuery,
    listChapterCollations,
  } from "kalila-graphql";

  const queryResult = useQuery(`listCollations`, async () => {
    const client = generateClient();

    const response = (await client.graphql<
      GraphQLQuery<ListChapterCollationsQuery>
    >({
      query: listChapterCollations,
      authMode: "userPool",
    })) as GraphQLResult<ListChapterCollationsQuery>;
    return response.data?.listChapterCollations ?? [];
  });
</script>

{#if $queryResult.data}
  <div class="flex flex-col">
    <a
      href="/cross-analysis"
      class="text-secondary-900 hover:text-secondary-800 font-bold p-4"
      >Cross Analysis 0.5.0beta</a
    >
    {#each $queryResult.data as item}
      <a
        href="/collations/{item?.id}"
        class="text-secondary-900 hover:text-secondary-800 p-4">{item?.title}</a
      >
    {/each}
  </div>
{/if}

<style>
</style>
