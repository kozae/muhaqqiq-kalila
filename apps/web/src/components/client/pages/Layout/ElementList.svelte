<script lang="ts">
  import PanelContainer from "@client/pages/common/PanelContainer.svelte";
  import { source } from "../store";
  import LayoutElement from "./LayoutElement.svelte";

  const data = source.selectLayoutPanelData;
  // https://svelte.dev/repl/4949485c5a8f46e7bdbeb73ed565a9c7?version=3.59.2
</script>

<PanelContainer>
  {#if $data}
    {#each $data as el (el.id)}
      <LayoutElement {el} canDelete={el.position?.includes("image")} />
    {/each}
  {/if}
</PanelContainer>
