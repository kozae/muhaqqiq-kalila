<script lang="ts">
  import { ready$, requestState } from "@client/pages/store";
  import imageData from "./data/image-data";
  import Loading from "@client/reusable/Loading.svelte";
  import AppStage from "./AppStage.svelte";
  import ImageLayer from "./ImageLayer.svelte";
  import ViewModeRegions from "./View/ViewModeRegions.svelte";

  export let id: string;
  $: $ready$ === id && requestState("imageDataUrl");

  let mode: "view" | "edit" | "create" = "view";
</script>

{#if $imageData}
  <AppStage height={$imageData.height} width={$imageData.width}>
    <ImageLayer />
    <ViewModeRegions />
  </AppStage>
{:else}
  <Loading />
{/if}
