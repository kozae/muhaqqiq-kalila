<script lang="ts">
  import { classes } from "frontend-util";
  import { type Writable } from "svelte/store";

  export let tabNames: string[] = [];

  export let current: Writable<string | undefined>;
</script>

<div class="sm:hidden">
  <label for={`${$current}tabs`} class="sr-only"> Select a tab</label>
  <select
    id={`${$current}tabs`}
    name="tabs"
    class="focus:border-secondary-900 focus:ring-secondary-900 block w-full rounded-md border-gray-300"
  >
    {#each tabNames as tab (tab)}
      <button
        on:click={() => ($current = tab)}
        class={classes(
          tab === $current
            ? "border-secondary-900 text-secondary-900"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
          "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium",
        )}
        aria-current={tab === $current ? "page" : undefined}
      >
        {tab}
      </button>
    {/each}
  </select>
</div>
<div class="hidden sm:block">
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex" aria-label="Tabs">
      {#each tabNames as tab (tab)}
        <button
          on:click={() => ($current = tab)}
          class={classes(
            tab === $current
              ? "border-secondary-900 text-secondary-900"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium",
          )}
          aria-current={tab === $current ? "page" : undefined}
        >
          {tab}
        </button>
      {/each}
    </nav>
  </div>
</div>
