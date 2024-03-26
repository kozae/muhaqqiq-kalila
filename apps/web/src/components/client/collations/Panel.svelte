<script lang="ts">
  import { useQuery } from "@sveltestack/svelte-query";
  import { getContext } from "svelte";
  import Body from "./Body/Body.svelte";
  import Loading from "@client/reusable/Loading.svelte";

  const id = getContext("id") as string;
  const queryResult = useQuery(`ChpaterCollation_${id}`, () =>
    fetch(`/srv/data/chapter_collations/${id}.json`, {
      cache: "no-store",
    }).then((res) => res.json()),
  );
</script>

{#if $queryResult.data}
  <div class="h-fit w-fit grow min-w-full">
    <Body
      chapter={$queryResult.data.chapter}
      media={$queryResult.data.mediumIds}
    />
  </div>
{:else if $queryResult.isLoading}
  <div class="w-full flex items-center justify-center grow">
    <Loading dimensions="w-24 h-24" />
  </div>
{/if}
