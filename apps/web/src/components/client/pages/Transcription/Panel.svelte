<script lang="ts">
  import { requestState } from "@client/pages/store";
  import CommandBar from "./CommandBar/CommandBar.svelte";
  import Editor from "./Editor/Editor.svelte";
  import AuxDisplay from "./AuxDisplay/AuxDisplay.svelte";
  import { setContext } from "svelte";
  requestState("selectTranscriptionPanelData");

  const worker = new Worker(
    new URL("pages-tool-transcription-panel-worker/worker.ts", import.meta.url),
    {
      type: "module",
    },
  );
  setContext("worker", worker);
</script>

<CommandBar />
<div class="flex h-[calc(100vh-150px)] flex-col bg-red-50">
  <Editor />
  <AuxDisplay />
</div>
