<script lang="ts">
  import { derived, discard, requestState } from "@client/pages/store";
  import CommandBar from "./CommandBar/CommandBar.svelte";
  import Editor from "./Editor/Editor.svelte";
  import AuxDisplay from "./AuxDisplay/AuxDisplay.svelte";
  import { getContext, onDestroy, onMount, setContext } from "svelte";
  import { Subscription, filter, first } from "rxjs";

  const id = getContext("id");

  const worker = new Worker(
    new URL("pages-tool-transcription-panel-worker/worker.ts", import.meta.url),
    {
      type: "module",
    },
  );
  setContext("worker", worker);
  let sub: Subscription[] = [];
  let render = Date.now();
  onMount(() => {
    sub = [
      derived.ready.pipe(first((v) => v === id)).subscribe(() => {
        render = Date.now();
        requestState("selectTranscriptionPanelData");
      }),
      discard.subscribe(() => {
        render = Date.now();
        requestState("selectTranscriptionPanelData");
      }),
    ];
  });
  onDestroy(() => {
    sub.forEach((s) => s.unsubscribe());
  });
</script>

{#key render}
  <CommandBar />
  <div class="flex h-[calc(100vh-150px)] flex-col">
    <Editor />
    <AuxDisplay />
  </div>
{/key}
