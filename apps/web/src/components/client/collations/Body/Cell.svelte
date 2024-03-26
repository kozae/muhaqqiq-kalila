<script lang="ts">
  import { useQuery } from "@sveltestack/svelte-query";
  import Line from "./Line.svelte";
  import Loading from "@client/reusable/Loading.svelte";

  export let data: any;
  export let bg: string;

  const id = data.id;

  const queryResult = useQuery(`SegmentContent_${id}`, () =>
    fetch(`/srv/data/segment_contents/${id}.json`, {
      cache: "no-store",
    }).then((res) => res.json()),
  );
</script>

<div class="{bg} w-[350px] flex items-start justify-start py-4 px-1">
  {#if $queryResult.data}
    <p class="text-justify leading-loose">
      {#each $queryResult.data.tokens as tokens, line}
        <Line {tokens} />
      {/each}
    </p>
  {:else}
    <Loading />
  {/if}
</div>
