<script lang="ts">
  import { requestState, source } from "@client/pages/store";
  import CommandBar from "./CommandBar/CommandBar.svelte";
  import Editor from "./Editor/Editor.svelte";
  import AuxDisplay from "./AuxDisplay/AuxDisplay.svelte";
  import { getContext, setContext } from "svelte";
  import { filter, map } from "rxjs";
  requestState("selectTranscriptionPanelData");

  const worker = new Worker(
    new URL("pages-tool-transcription-panel-worker/worker.ts", import.meta.url),
    {
      type: "module",
    },
  );
  setContext("worker", worker);

  const id = getContext("id");
  const lineIds$ = source.selectTranscriptionPanelData.pipe(
    filter((data) => data.id === id),
    map((data) => data.ids),
  );
</script>

<CommandBar />
<div class="flex h-[calc(100vh-150px)] flex-col">
  <Editor />
  {#if $lineIds$}
    <AuxDisplay ids={$lineIds$} />
  {/if}
</div>
