<script lang="ts">
  import PanelContainer from "@client/pages/common/PanelContainer.svelte";
  import Codemirror from "./CodeMirror.svelte";

  let doc = `some doc`;
</script>

<PanelContainer>
  <div class="editor-container">
    <Codemirror {doc} />
  </div>
</PanelContainer>

<style>
  .editor-container {
    flex-grow: 1;
    min-height: 80%;
  }
</style>
