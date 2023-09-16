<script lang="ts">
  import { requestState } from "@client/pages/store";
  import CommandBar from "./CommandBar.svelte";
  import ElementList from "./ElementList.svelte";

  let mode: "view" | "edit" = "view";
  requestState("selectLayoutPanelData");
</script>

{#if mode === "view"}
  <CommandBar />
  <ElementList />
{/if}
