<script lang="ts">
  import { getContext, onMount, setContext } from "svelte";
  import Loading from "@client/reusable/Loading.svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { createVirtualizer } from "@tanstack/svelte-virtual";
  import { getCollationSkeleton } from "./queries";
  import Heading from "./Heading.svelte";
  import RowHeading from "./Row/RowHeading.svelte";
  import CellsWrapper from "./Row/CellsWrapper.svelte";

  export let dimensions: { width: number; height: number };
  export let cellWidth: number = 300;

  setContext("cellWidth", cellWidth);

  onMount(() => {
    document.documentElement.style.setProperty(
      "--scroll-container-height",
      `${dimensions.height}px`,
    );
    document.documentElement.style.setProperty(
      "--scroll-container-width",
      `${dimensions.width}px`,
    );
  });

  let virtualListEl: HTMLDivElement;
  let virtualItemEls: HTMLDivElement[] = [];

  const id = getContext("id") as string;

  const query = useQuery(
    ["collation", id],
    async () => {
      return await getCollationSkeleton(id);
    },
    {
      enabled: !!id,
    },
  );
  let count = 0;

  $: {
    if ($query.data) {
      count = $query.data.rows.length;
      const rowWidth = $query.data.columns.length * cellWidth;
      document.documentElement.style.setProperty(
        "--row-width",
        `${rowWidth}px`,
      );
      setContext("chapter", $query.data.meta!.chapter);
    }
  }

  $: virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
    count,
    getScrollElement: () => virtualListEl,
    estimateSize: () => 50,
  });

  $: items = $virtualizer.getVirtualItems();

  $: {
    if (virtualItemEls.length)
      virtualItemEls.forEach((el) => $virtualizer.measureElement(el));
  }
</script>

{#if $query.isLoading}
  <div class="w-full flex items-center justify-center grow">
    <Loading dimensions="w-24 h-24" />
  </div>
{:else if $query.error}
  <span>An error has occurred: {$query.error}</span>
{:else}
  <div class="list scroll-container" bind:this={virtualListEl}>
    <div class="sigla-row">
      <Heading sigla={$query.data?.columns.map((c) => c.siglum)} />
    </div>
    <div
      style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;"
    >
      <div
        style="position: absolute; top: 0; left: 0; width: var(--row-width); transform: translateY({items[0]
          ? items[0].start
          : 0}px);"
      >
        {#each items as row, idx (row.index)}
          <div bind:this={virtualItemEls[idx]} data-index={row.index}>
            <div class="flex flex-col">
              <RowHeading data={$query.data?.rows[row.index]} />
              <CellsWrapper
                order={$query.data?.rows[row.index].order ?? 0}
                cells={$query.data?.columns.map((c) => c.cells[row.index])}
                cellIds={$query.data?.columns.map((c) => c.cellIds[row.index])}
                id={$query.data?.rows[row.index].id ?? ""}
                mediumIds={$query.data?.columns.map((c) => c.id)}
              />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .scroll-container {
    height: var(--scroll-container-height);
    width: var(--scroll-container-width);
    overflow-y: auto;
    contain: strict;
  }

  .sigla-row {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #fff;
    border-bottom: 1px solid #ddd;
    width: var(--row-width);
  }
</style>
