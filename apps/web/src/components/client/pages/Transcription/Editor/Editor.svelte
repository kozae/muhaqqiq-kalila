<script lang="ts">
  import Codemirror from "./CodeMirror.svelte";
  import { source } from "@client/pages/store";
  import { filter, map } from "rxjs";
  import { getContext } from "svelte";

  const id = getContext("id");

  const data = source.selectTranscriptionPanelData.pipe(
    filter((data) => data.id === id),
    map((data) => data.bodyLines.join("\n")),
  );

  const colorCssVars = source.selectTranscriptionPanelData.pipe(
    filter((data) => data.id === id),
    map((data) =>
      data.colors
        .map((color, index) => `--color-${index + 1}: rgba(${color}, 0.2);`)
        .join(""),
    ),
  );
</script>

{#if $data}
  <div class="editor-container" style={$colorCssVars}>
    <Codemirror doc={$data} />
  </div>
{/if}

<style>
  .editor-container {
    flex-grow: 1;
    min-height: 80%;
    max-height: 100%;
    overflow: auto;
  }
</style>
