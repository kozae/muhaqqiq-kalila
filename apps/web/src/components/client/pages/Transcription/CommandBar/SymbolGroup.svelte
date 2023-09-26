<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let symbols: any[];
  const dispatch = createEventDispatcher();
</script>

<div class="py-1">
  {#each symbols as { symbol, label }, index (index)}
    <button
      on:click={() => dispatch("itemSelected", symbol)}
      class="group flex items-center px-4 py-2 text-sm"
    >
      <span
        class="mr-1 h-5 w-8 text-bold text-gray-600 text-lg group-hover:text-gray-500"
        aria-hidden="true"
      >
        {symbol}
      </span>
      {label}
    </button>
  {/each}
</div>
