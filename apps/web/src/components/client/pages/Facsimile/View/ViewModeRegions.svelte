<script lang="ts">
  import regions$ from "../data/region-data";
  import { requestAggregation } from "@client/pages/store";
  import { Layer } from "svelte-konva";
  import AllRegions from "./AllRegions.svelte";
  import EventedRegions from "./EventedRegions.svelte";
  import { hoveredRegion$ } from "@client/pages/facsimile-events";
  import ComplementaryPolygon from "./ComplementaryPolygon.svelte";
  requestAggregation("layout");
</script>

{#if $regions$}
  <Layer config={{ listening: false }}>
    {#if !$hoveredRegion$}
      <AllRegions regions={$regions$} />
    {/if}
    <ComplementaryPolygon />
  </Layer>
  <Layer>
    <EventedRegions regions={$regions$} />
  </Layer>
{/if}
