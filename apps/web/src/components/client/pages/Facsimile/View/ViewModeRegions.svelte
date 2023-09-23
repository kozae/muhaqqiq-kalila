<script lang="ts">
  import storeRegions from "../data/region-data";
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
    {#if !$hoveredRegion$ || $mode !== "view"}
      <AllRegions regions={$storeRegions} />
    {/if}
    {#if $mode === "view"}
      <ComplementaryPolygon />
    {/if}
  </Layer>
  {#if $mode === "view"}
    <Layer>
      <EventedRegions regions={$storeRegions} />
    </Layer>
  {/if}
{/if}
