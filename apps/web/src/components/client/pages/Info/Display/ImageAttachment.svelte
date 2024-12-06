<script>
  import PaperClipIcon from "@icons/PaperClipIcon.svelte";
  import { calculateSizeFromDataURL } from "frontend-util";
  export let title;
  export let file;

  let fileSizeInMB = calculateSizeFromDataURL(file.dataUrl);
</script>

<div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
  <dt class="text-sm font-medium leading-6 text-gray-900">{title}</dt>
  <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
    <div
      class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
    >
      <div class="flex w-0 flex-1 items-center">
        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
        <div class="ml-4 flex min-w-0 flex-1 gap-2">
          <span class="truncate font-medium">{file.name}</span>
          <span class="flex-shrink-0 text-gray-400">
            {fileSizeInMB}mb
          </span>
        </div>
      </div>
      <div class="ml-4 flex-shrink-0">
        <a
          href={file.dataUrl}
          download={file.name}
          class="text-primary-900 hover:text-primary-500 font-medium"
        >
          Download
        </a>
      </div>
    </div>
  </dd>
</div>
