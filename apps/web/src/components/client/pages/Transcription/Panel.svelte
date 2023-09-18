<script lang="ts">
  import { requestState } from "@client/pages/store";
  import CommandBar from "./CommandBar.svelte";
  import Editor from "./Editor.svelte";
  requestState("selectTranscriptionPanelData");
</script>

<CommandBar />

<Editor />
