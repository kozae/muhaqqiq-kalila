<script lang="ts">
  import { requestAction, requestState, source } from "@client/pages/store";
  import CommandBar from "./CommandBar.svelte";
  import SortableElements from "@client/pages/common/SortableElements.svelte";

  let mode: "view" | "edit" = "view";
  requestState("selectLinePanelData");
  const data = source.selectLinePanelData;
</script>

{#if mode === "view"}
  {#if $data}
    <CommandBar
      presentElements={$data
        .filter((el) => el.position !== "line")
        .map((el) => `${(el.order ?? 0) + 1}.  ${el.position}`)}
    />
    <SortableElements
      items={$data}
      draggables={["line"]}
      on:orderChanged={(e) => requestAction("updateLines", e.detail)}
    />
  {/if}
{/if}
