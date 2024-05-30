<script lang="ts">
  import { getContext } from "svelte";

  export let sigla: string[] = [];

  const cellWidth = getContext("cellWidth") as number;
  const letters = "ABCDEFGHIKLMNOPQRSTUVWXYZ".split("");
</script>

<div class="flex h-full">
  {#each sigla as siglum, i}
    <div
      class="flex flex-col items-center justify-center h-full text-primary-500 {i %
        2 ===
      0
        ? 'bg-inherit'
        : 'bg-secondary-100'}"
      style="width: {cellWidth}px"
    >
      <div class="font-bold">({letters[i]})</div>
      <p>
        {siglum}
      </p>
    </div>
  {/each}
</div>
