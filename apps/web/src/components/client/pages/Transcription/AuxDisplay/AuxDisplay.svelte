<script lang="ts">
  import { hoveredRegion$ } from "@client/pages/facsimile-events";
  import XCircleIcon from "@icons/XCircleIcon.svelte";
  import lodash from "lodash";

  export let error: any[] = [];
</script>

{#if error.length !== 0}
  <div class="h-[20%] w-full overflow-y-scroll rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon className="h-5 w-5 text-red-400" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          {#if error.length === 1}
            There is a possible error in the transcription
          {:else}
            There are possible {error.length} errors in the transcription
          {/if}
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <ul role="list" class="list-disc space-y-1 pl-5">
            {#each lodash.orderBy( error, ["line", "from", "to"], ) as item, index (item.line + item.from + item.to + index)}
              <li>
                <p>
                  <strong class="font-extrabold">
                    [Line: {item.line} | Words: {item.from}~{item.to}]&nbsp;
                  </strong>
                  {item.message}.
                </p>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
{/if}
