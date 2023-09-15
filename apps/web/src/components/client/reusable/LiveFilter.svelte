<script lang="ts">
  import FunnelIcon from "@icons/FunnelIcon.svelte";
  export let filter: string = "";
  export let placeholder: string = "filter";
  export let label: string = `filter-${Math.floor(Math.random() * 1000)}`;
</script>

<label for={label} class="sr-only"> Filter </label>
<div class="relative rounded-md shadow-sm">
  <div
    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
  >
    <FunnelIcon className="h-5 w-5 text-gray-400" />
  </div>
  <input
    type="text"
    name="filter"
    id={label}
    bind:value={filter}
    class="text-secondary-900 focus:ring-secondary-600 block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
    {placeholder}
  />
</div>
