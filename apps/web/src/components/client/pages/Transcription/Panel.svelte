<script lang="ts">
  import { requestState, source } from "@client/pages/store";
  import CommandBar from "./CommandBar/CommandBar.svelte";
  import Editor from "./Editor/Editor.svelte";
  import AuxDisplay from "./AuxDisplay/AuxDisplay.svelte";
  import { getContext, onDestroy, onMount, setContext } from "svelte";
  import { ReplaySubject, filter, map } from "rxjs";
  import { TranscriptionWorkerEvent } from "pages-tool-transcription-panel-worker";
  import { hoveredRegion$ } from "../facsimile-events";
  requestState("selectTranscriptionPanelData");

  const worker = new Worker(
    new URL("pages-tool-transcription-panel-worker/worker.ts", import.meta.url),
    {
      type: "module",
    },
  );
  setContext("worker", worker);

  const id = getContext("id");
  let ids: string[] = [];
  const lineIds$ = source.selectTranscriptionPanelData.pipe(
    filter((data) => data.id === id),
    map((data) => data.ids),
  );

  $: ids = $lineIds$ ? $lineIds$ : [];
  $: hoveredRegion$.next(ids[0]);

  const error = new ReplaySubject<any[]>(1);
  const onMessage = (e: any) => {
    if (e.data.type === TranscriptionWorkerEvent.ERROR) {
      error.next(e.data.payload);
    }
    if (e.data.type === TranscriptionWorkerEvent.NO_ERROR) {
      error.next([]);
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

<CommandBar />
<div class="flex h-[calc(100vh-150px)] flex-col">
  <Editor />
  {#if $error}
    <AuxDisplay error={$error} />
  {/if}
</div>
