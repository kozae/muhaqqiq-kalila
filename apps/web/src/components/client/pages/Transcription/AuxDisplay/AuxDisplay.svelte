<script lang="ts">
  import { hoveredRegion$ } from "@client/pages/facsimile-events";
  import { source } from "@client/pages/store";
  import XCircleIcon from "@icons/XCircleIcon.svelte";
  import lodash from "lodash";
  import { TranscriptionWorkerEvent } from "pages-tool-transcription-panel-worker";
  import { combineLatest, filter, map } from "rxjs";
  import { getContext, onMount, onDestroy } from "svelte";
  import { selectedTextClass } from "../selected-text-class";
  let error: any[] = [];

  const id = getContext("id");
  const worker: Worker = getContext("worker");
  let ids: string[] = [];
  let render = Date.now();
  const lineIds$ = combineLatest([
    source.selectTranscriptionPanelData,
    selectedTextClass,
  ]).pipe(
    filter(([data, _]) => data.id === id),
    map(([data, selected]) =>
      selected === "Body" ? data.body.ids : data.glosses[selected].ids,
    ),
  );

  $: {
    ids = $lineIds$ ? $lineIds$ : [];
    render = Date.now();
  }
  $: hoveredRegion$.next(ids[0]);

  const onMessage = (e: any) => {
    if (e.data.type === TranscriptionWorkerEvent.ERROR) {
      error = e.data.payload as {
        type: string;
        string_error: string;
        line: number;
      }[];
    }

    if (e.data.type === TranscriptionWorkerEvent.NO_ERROR) {
      error = [];
    }
    if (e.data.type === TranscriptionWorkerEvent.LINE_CHANGE) {
      const order = e.data.payload as number;
      hoveredRegion$.next(ids[order - 1]);
    }
  };

  onMount(() => {
    worker.onmessage = onMessage;
  });

  onDestroy(() => {
    worker.onmessage = null;
  });
</script>

{#key render}
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
              {#each lodash.orderBy( error, ["line", "from", "to"], ) as item, index (`${item.line}_${item.from}_${item.to}_${index}`)}
                <li>
                  <p>
                    <strong class="font-extrabold">
                      [Line: {item.line}{item.string_error !== " "
                        ? ` | Value: ${item.string_error}`
                        : ""} &nbsp; ]
                    </strong>
                    {item.type === 0
                      ? "Wrong symbol use"
                      : item.type === 1
                        ? "Wrong character and symbol use"
                        : "Unwanted characters or spaces"}.
                  </p>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/key}
