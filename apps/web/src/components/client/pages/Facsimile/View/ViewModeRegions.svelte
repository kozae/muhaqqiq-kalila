<script lang="ts">
  import storeRegions from "../data/region-data";
  import previewRegions from "../data/preview-data";
  import { Layer } from "svelte-konva";
  import AllRegions from "./AllRegions.svelte";
  import EventedRegions from "./EventedRegions.svelte";
  import { hoveredRegion$ } from "@client/pages/facsimile-events";
  import ComplementaryPolygon from "./ComplementaryPolygon.svelte";
  import { requestState } from "@client/pages/store";
  import { mode } from "../mode-store";

  requestState("selectLayout");
</script>

{#if $storeRegions}
  <Layer config={{ listening: false }}>
    {#if !$hoveredRegion$ && $mode !== "edit"}
      {#key $mode}
        <AllRegions
          regions={$mode === "review" && $previewRegions
            ? $previewRegions
            : $storeRegions}
        />
      {/key}
    {/if}
    {#if $mode === "view" || $mode === "review"}
      {#key $mode}
        <ComplementaryPolygon />
      {/key}
    {/if}
  </Layer>
  {#if $mode === "view" || $mode === "review"}
    {#key $mode}
      <Layer>
        <EventedRegions
          regions={$mode === "review" && $previewRegions
            ? $previewRegions
            : $storeRegions}
        />
      </Layer>
    {/key}
  {/if}
{/if}
