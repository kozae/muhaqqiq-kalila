<script lang="ts">
  import PanelContainer from "@client/pages/common/PanelContainer.svelte";
  import Codemirror from "./CodeMirror.svelte";
  import { source } from "@client/pages/store";
  import { map } from "rxjs";
  import { onMount } from "svelte";

  const data = source.selectTranscriptionPanelData.pipe(
    map((data) => data.bodyLines.join("\n")),
  );
</script>

<PanelContainer>
  {#if $data}
    <div class="editor-container">
      <Codemirror doc={$data} />
    </div>
  {/if}
</PanelContainer>

<style>
  .editor-container {
    flex-grow: 1;
    min-height: 80%;
  }
</style>
