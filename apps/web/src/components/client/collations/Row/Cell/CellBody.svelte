<script lang="ts">
  import type { SegmentContent } from "kalila-graphql";
  import CellLine from "./CellLine.svelte";
  import { setContext } from "svelte";
  import { matchPattern } from "@client/collations/state-controls";

  export let data: SegmentContent;
  export let unitOrder: number;
  export let mediumId: string;
  export let column: number;

  let isInSearchRange = false;

  $: {
    const { units, columns } = $matchPattern;
    isInSearchRange = units.has(unitOrder) && columns.has(column);
  }

  setContext("segmentId", data.id);
  setContext("mediumId", mediumId);
  const pageSet = new Set<any>(data.pages ?? []);
  const pages: Record<number, number[]> = {};

  data.lines?.forEach((line, i) => {
    const page = data.pages?.[i] ?? 0;
    if (!pages[page]) {
      pages[page] = [];
    }
    pages[page].push(line! + 1);
  });
</script>

<div class="flex flex-col">
  <p
    class="font-arabicnoto text-justify text-lg px-2 leading-loose {isInSearchRange
      ? 'border-t-4 border-dashed border-primary-500'
      : ''}"
    dir="rtl"
  >
    {#each data.lines ?? [] as line, i}
      <CellLine
        {unitOrder}
        {column}
        lineNumber={line ?? 0}
        pageNumber={data.pages?.[i] ?? 0}
        tokens={data.tokens?.[i] ?? []}
      />
    {/each}
  </p>

  <div class="flex flex-wrap">
    {#each pageSet as page}
      <a
        class="text-sm text-primary-500 px-2 underline"
        href={`/find-page/${mediumId}/${page}`}
        target="_blank"
      >
        P.{page} L.({pages[page]?.join(",")})
      </a>
    {/each}
  </div>
</div>
