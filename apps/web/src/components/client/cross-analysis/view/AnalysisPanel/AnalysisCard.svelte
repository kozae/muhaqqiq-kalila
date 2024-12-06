<script lang="ts">
  import SmallButton from "@client/reusable/SmallButton.svelte";
  import Menu from "@client/reusable/Menu.svelte";

  import { setQueryParams } from "../analysis-doc-from-url";
  import { createEventDispatcher } from "svelte";

  export let version: string;
  export let title: string;
  export let cached: string[];

  let message: string;

  function getCachedMessage(currCached: string[]): string {
    const length = currCached.length;
    return length === 0
      ? "Has no cached analysis."
      : length === 1
        ? "Has 1 cached analysis."
        : "Has " + length + " cached analyses.";
  }

  $: message = getCachedMessage(cached);

  function formatTime(timestamp: string): string {
    const year = parseInt(timestamp.slice(0, 4));
    const month = parseInt(timestamp.slice(4, 6)) - 1; // Months are 0-based in JavaScript Date
    const day = parseInt(timestamp.slice(6, 8));
    const hours = parseInt(timestamp.slice(8, 10));
    const minutes = parseInt(timestamp.slice(10, 12));
    const seconds = parseInt(timestamp.slice(12, 14));

    const date = new Date(year, month, day, hours, minutes, seconds);
    return date.toLocaleString();
  }

  function handleClick(timestamp: string) {
    setQueryParams({ version, timestamp });
  }

  const dialog = createEventDispatcher();
</script>

<div class="flex rounded-md shadow-sm m-4 overflow-visible">
  <div
    class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md bg-primary-600 text-xl font-medium text-white"
  >
    {version}
  </div>
  <div
    class="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white"
  >
    <div class="flex flex-col">
      <div class="flex-1 truncate px-4 py-2">
        <span class="font-medium text-gray-900 text-lg">{title}</span>
        <p class="text-gray-500 text-lg">{message}</p>
      </div>
      <div class="flex m-1 justify-between">
        {#if cached.length > 0}
          <Menu
            items={cached}
            displayFunction={formatTime}
            buttonText="Load..."
            bg="bg-secondary-900 text-white m-1"
            hoverBg="hover:bg-secondary-800"
            origin="origin-bottom-right"
            on:itemClick={(event) => {
              handleClick(event.detail);
            }}
          />
        {/if}
        <SmallButton
          bgcolor="bg-secondary-900 text-white m-1 hover:bg-secondary-800"
          on:click={() => {
            dialog("open-settings", version);
          }}>Run...</SmallButton
        >
      </div>
    </div>
  </div>
</div>
