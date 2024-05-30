<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { getSegmentContents } from "../queries";
  import CellBody from "./Cell/CellBody.svelte";

  export let cells: number[] = [];
  export let mediumIds: string[] = [];
  export let cellIds: (string | null)[] = [];
  export let id: string;
  export let order: number;

  setContext("unitId", id);

  const cellWidth = getContext("cellWidth") as number;

  const queryResult = useQuery(
    id,
    async () => {
      const ids = cellIds.filter((id) => id !== null) as string[];

      if (ids.length === 0) {
        return null;
      }
      return await getSegmentContents(ids);
    },
    {
      enabled: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );
</script>

{#if $queryResult.isLoading}
  <span>Loading...</span>
{:else if $queryResult.error}
  <span>An error has occurred: </span>
{:else}
  <div class="flex grow items-stretch">
    {#each cells as cell, i}
      <div
        style="width: {cellWidth}px"
        class="flex items-stretch justify-center py-4 {i % 2 === 0
          ? 'bg-white'
          : 'bg-secondary-100'}"
      >
        {#if cell === -1}
          <span>[missing]</span>
        {:else if cell === -2}
          <span>[possible lacuna]</span>
        {:else if cellIds[i] && $queryResult.data && $queryResult.data[cellIds[i] ?? ""]}
          <CellBody
            mediumId={mediumIds[i]}
            unitOrder={order}
            column={i}
            data={$queryResult.data[cellIds[i] ?? ""]}
          />
        {/if}
      </div>
    {/each}
  </div>
{/if}
