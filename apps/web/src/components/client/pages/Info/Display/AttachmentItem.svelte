<script>
  import PaperClipIcon from "@icons/PaperClipIcon.svelte";
  export let name = "";
</script>

<li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
  <div class="flex w-0 flex-1 items-center">
    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
    <div class="ml-4 flex min-w-0 flex-1 gap-2">
      <span class="truncate font-medium">{name}</span>
    </div>
  </div>
  <div class="ml-4 flex-shrink-0">
    <a href="/" class="text-primary-600 hover:primary-indigo-500 font-medium">
      Download
    </a>
  </div>
</li>
