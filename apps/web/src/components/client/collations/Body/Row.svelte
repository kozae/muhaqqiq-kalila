<script lang="ts">
  import Cell from "./Cell.svelte";

  export let data: any[];
  export let numberOfColumns: number;

  const width = `${350 * numberOfColumns}px`;
</script>

<div
  style="width: {width}; direction: rtl;"
  class="flex flex-row-reverse justify-start min-h-[50px] font-arabicnoto text-xl"
>
  {#each data as item, index}
    {#if item}
      <Cell data={item} bg={index % 2 === 0 ? "bg-white" : "bg-secondary-50"} />
    {:else}
      <div
        class="{index % 2 === 0
          ? 'bg-white'
          : 'bg-secondary-50'} w-[350px] flex items-center justify-center"
      >
        <p>[absent]</p>
      </div>
    {/if}
  {/each}
</div>
