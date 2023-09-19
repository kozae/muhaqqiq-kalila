<script lang="ts">
  import { requestState, source } from "@client/pages/store";
  import CommandBar from "./CommandBar.svelte";
  import SortableElements from "@client/pages/common/SortableElements.svelte";
  import { map } from "rxjs";

  let mode: "view" | "edit" = "view";
  requestState("selectLayoutPanelData");
  const data = source.selectLayoutPanelData.pipe(map((data) => data?.elements));
</script>

{#if mode === "view"}
  <CommandBar />
  {#if $data}
    <SortableElements items={$data} />
  {/if}
{/if}
