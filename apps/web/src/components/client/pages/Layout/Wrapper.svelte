<script lang="ts">
  import PanelWrapper from "@client/pages/common/PanelWrapper.svelte";
  import Panel from "./Panel.svelte";
  export let pageId: string;
</script>

<PanelWrapper {pageId}>
  <Panel />
</PanelWrapper>
