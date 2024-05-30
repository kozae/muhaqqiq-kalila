<script lang="ts">
  import Panel from "./Panel.svelte";
  import { setContext, onMount, onDestroy } from "svelte";
  import { QueryClientProvider } from "@sveltestack/svelte-query";
  import { queryClient } from "./queries";

  export let id: string;

  let dimensions: { width: number; height: number } | null = null;

  setContext("id", id);

  onMount(() => {
    const wrapper = document.getElementById("collation-wrapper");
    if (wrapper) {
      const { width, height } = wrapper.getBoundingClientRect();
      dimensions = { width, height };
    }
  });

  // Function to update dimensions
  function updateDimensions() {
    const wrapper = document.getElementById("collation-wrapper");
    if (wrapper) {
      const { width, height } = wrapper.getBoundingClientRect();
      dimensions = null;
      dimensions = { width, height };
    }
  }

  // Listen to window resize events
  function handleResize() {
    console.log("resizing");
    updateDimensions();
  }

  onMount(() => {
    // Initial dimensions set
    updateDimensions();
    // Add event listener
    window.addEventListener("resize", handleResize);
  });

  onDestroy(() => {
    // Clean up event listener
    window.removeEventListener("resize", handleResize);
  });
</script>

<QueryClientProvider client={queryClient}>
  <div
    id="collation-wrapper"
    class="max-w-screen-2xl w-full overflow-auto flex flex-col justify-start items-start rounded-sm h-[calc(100vh-4rem)]"
  >
    {#if dimensions}
      {#key dimensions.width}
        {#key dimensions.height}
          <Panel {dimensions} />
        {/key}
      {/key}
    {/if}
  </div>
</QueryClientProvider>
