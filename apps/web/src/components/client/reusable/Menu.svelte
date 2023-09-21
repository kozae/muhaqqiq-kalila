<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";

  export let items: string[] = [];
  export let buttonText: string = "";
  export let bg = "bg-white";
  export let hoverBg = "hover:bg-secondary-100";

  let showMenu = false;

  const id = `menu_${Math.floor(Math.random() * 100)}`;

  const dispatch = createEventDispatcher();

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function handleItemClick(item: string) {
    dispatch("itemClick", item);
    showMenu = false;
  }

  onMount(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(`.${id}`)) {
        showMenu = false;
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<div class="relative inline-block text-left {id}">
  <button
    on:click={toggleMenu}
    class="text-primary-900 inline-flex w-full justify-center gap-x-1.5 rounded-md {bg} px-3 py-2 text-sm font-semibold shadow-sm {hoverBg}"
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
