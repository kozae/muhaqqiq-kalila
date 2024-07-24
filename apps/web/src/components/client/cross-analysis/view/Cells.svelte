<script lang="ts">
  import Chart from "./Chart.svelte";
  import type { ColoredPassages } from "./model";

  export let coloredPassages: ColoredPassages;
  export let sigla: string[];

  const cellWidth = 150;
  const letters = "ABCDEFGHIKLMNOPQRSTUVWXYZ".split("");
</script>

<div class="flex justify-center">
  {#each sigla as siglum, i}
    <div
      class="flex flex-col {i % 2 === 0 ? 'bg-inherit' : 'bg-white'}"
      style="width: {cellWidth}px"
    >
      <div class="flex flex-col items-center justify-center">
        <div class="font-bold">({letters[i]})</div>
        <p>
          {siglum}
        </p>
      </div>
      {#if coloredPassages[siglum]}
        <div
          class="font-arabicnoto text-justify text-md px-2 leading-loose"
          dir="rtl"
        >
          {#each coloredPassages[siglum] as fragment}
            <span
              style="background-color: {fragment.bgcolor}; color: {fragment.textColor}"
              >{fragment.text + " "}</span
            >
          {/each}
        </div>
      {:else}
        <div class="text-center">
          [{siglum === "IH" ? "missing or excluded" : "missing"}]
        </div>
      {/if}
    </div>
  {/each}
</div>
