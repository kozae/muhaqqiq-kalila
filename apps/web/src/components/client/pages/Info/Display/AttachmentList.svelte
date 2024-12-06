<script>
  import AttachmentItem from "./AttachmentItem.svelte";
  export let title = "";
  export let files = [];
  export let bgClass = "bg-white";
</script>

<div class="{bgClass} px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
  <dt class="text-sm font-medium leading-6 text-gray-900">{title}</dt>
  <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
    <ul
      role="list"
      class="divide-y divide-gray-100 rounded-md border border-gray-200"
    >
      {#each files as file (file.name)}
        <AttachmentItem {file} />
      {/each}
    </ul>
  </dd>
</div>
