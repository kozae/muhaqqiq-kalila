<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";

  export let items: string[] = [];
  export let buttonText: string = "";

  let showMenu = false;

  const dispatch = createEventDispatcher();

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function handleItemClick(item: string) {
    dispatch("itemClick", item);
    showMenu = false;
  }
</script>

<div class="relative inline-block text-left menu">
  <button
    on:click={toggleMenu}
    class="text-primary-900 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-secondary-100"
  >
    <slot name="prefixIcon" />
    {buttonText}
    <slot name="suffixIcon" />
  </button>
  {#if showMenu}
    <div
      transition:slide={{ delay: 0, duration: 300, axis: "y" }}
      class="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {#each items as item (item)}
        <button
          on:click={() => handleItemClick(item)}
          class="group flex w-full items-center px-4 py-2 text-sm hover:bg-secondary-100"
        >
          {item}
        </button>
      {/each}
    </div>
  {/if}
</div>
