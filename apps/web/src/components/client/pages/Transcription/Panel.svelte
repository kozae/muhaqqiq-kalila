<script lang="ts">
  import { derived, discardFinished, requestState } from "@client/pages/store";
  import CommandBar from "./CommandBar/CommandBar.svelte";
  import Editor from "./Editor/Editor.svelte";
  import AuxDisplay from "./AuxDisplay/AuxDisplay.svelte";
  import { getContext, onDestroy, onMount, setContext } from "svelte";
  import { Subscription, first } from "rxjs";

  const id = getContext("id");

  const worker = new Worker(
    new URL("pages-tool-transcription-panel-worker/worker.ts", import.meta.url),
    {
      type: "module",
    },
  );
  setContext("worker", worker);
  let sub: Subscription[] = [];
  onMount(() => {
    sub = [
      derived.ready.pipe(first((v) => v === id)).subscribe(() => {
        requestState("selectTranscriptionPanelData");
        requestState("selectLineIds");
      }),
      discardFinished.subscribe(() => {
        requestState("selectTranscriptionPanelData");
        requestState("selectLineIds");
      }),
    ];
  });
  onDestroy(() => {
    sub.forEach((s) => s.unsubscribe());
  });
  export let segmentsChangable = true;
  export let withMarginalia = true;

  console.log("panel loaded");
</script>

<CommandBar {segmentsChangable} {withMarginalia} />
<div class="flex h-[calc(100vh-150px)] flex-col">
  <Editor />
  <AuxDisplay />
</div>
