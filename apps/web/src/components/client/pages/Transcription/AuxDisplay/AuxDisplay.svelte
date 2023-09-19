<script lang="ts">
  import XCircleIcon from "@icons/XCircleIcon.svelte";
  import lodash from "lodash";
  import { TranscriptionWorkerEvent } from "pages-tool-transcription-panel-worker";
  import { getContext, onDestroy, onMount } from "svelte";

  const worker: Worker = getContext("worker");
  let error: any[] = [];
  let canSave = true; // TODO make as an event, inform store worker

  const onMessage = (e: any) => {
    if (e.data.type === TranscriptionWorkerEvent.ERROR) {
      error = e.data.payload;
      canSave = false;
    }
    if (e.data.type === TranscriptionWorkerEvent.NO_ERROR) {
      error = [];
      canSave = true;
    }
    if (e.data.type === TranscriptionWorkerEvent.LINE_CHANGE) {
      const order = e.data.payload as number;
      console.log(order);
    }
  };

  onMount(() => {
    worker.onmessage = onMessage;
  });

  onDestroy(() => {
    worker.onmessage = null;
  });
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
            There is an error in the transcription
          {:else}
            There are {error.length} errors in the transcription
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
