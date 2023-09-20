<script lang="ts">
  import { derived, requestState } from "@client/pages/store";
  import imageData from "./data/image-data";
  import Loading from "@client/reusable/Loading.svelte";
  import AppStage from "./AppStage.svelte";
  import ImageLayer from "./ImageLayer.svelte";
  import ViewModeRegions from "./View/ViewModeRegions.svelte";
  import { editRegionPoints$, regionUnderEdit$ } from "../facsimile-events";
  import { mode } from "./mode-store";
  import RegionSelector from "./RegionSelector.svelte";
  import imageData$ from "./data/image-data";
  import { map } from "rxjs";

  export let id: string;
  const ready = derived.ready;
  $: $ready === id && requestState("selectImageDataUrl");

  $: {
    if ($regionUnderEdit$) {
      mode.set("edit");
    } else {
      console.log("setting mode to view");
      mode.set("view");
    }
  }
  let scaleRatio = imageData$.pipe(map((data) => data?.scaleRatio));
</script>

{#if $imageData}
  <AppStage height={$imageData.height} width={$imageData.width}>
    <ImageLayer />
    <ViewModeRegions />

    {#if $mode === "edit" && $editRegionPoints$ && $scaleRatio}
      <RegionSelector init={$editRegionPoints$} scaleRatio={$scaleRatio} />
    {/if}
  </AppStage>
{:else}
  <Loading />
{/if}
