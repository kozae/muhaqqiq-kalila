<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ChevronLeftIcon from "@icons/ChevronLeftIcon.svelte";
  import ChevronRightIcon from "@icons/ChevronRightIcon.svelte";
  import { getPageButtons } from "./get-visible-buttons";

  export let pages: number;
  export let current: number;

  let buttons: number[] = [];

  const dispatch = createEventDispatcher();
  $: buttons = getPageButtons(pages, current + 1);
</script>

<div
  class="isolate inline-flex -space-x-px rounded-md shadow-sm"
  aria-label="Pagination"
>
  <button
    on:click={() => current !== 0 && dispatch("on_paginate", current - 1)}
    class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
  >
    <span class="sr-only">Previous</span>
    <ChevronLeftIcon className="h-5 w-5" />
  </button>

  {#each buttons as value, index (index)}
    {#if value === current + 1}
      <button
        disabled
        aria-current="page"
        class="bg-secondary-900 focus-visible:outline-secondary-600 relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {value}
      </button>
    {:else if value === -1}
      <span
        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
      >
        ...
      </span>
    {:else}
      <button
        on:click={() => dispatch("on_paginate", value - 1)}
        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        {value}
      </button>
    {/if}
  {/each}

  <button
    on:click={() =>
      current !== pages - 1 && dispatch("on_paginate", current + 1)}
    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
  >
    <span class="sr-only">Next</span>
    <ChevronRightIcon className="h-5 w-5" />
  </button>
</div>
