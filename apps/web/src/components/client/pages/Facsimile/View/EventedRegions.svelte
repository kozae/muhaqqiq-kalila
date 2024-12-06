<script lang="ts">
  import { hoveredRegion$ } from "@client/pages/facsimile-events";
  import type { ILayoutElement } from "pages-tool-store-worker";
  import { Group, Line } from "svelte-konva";

  export let regions: ILayoutElement[];
</script>

<Group>
  {#each regions as el (el.id)}
    <Line
      config={{
        fill: "transparent",
        points: el.region.slice(0, -1),
        closed: true,
      }}
      on:mouseenter={() => {
        hoveredRegion$.next(el.id);
      }}
      on:mouseleave={() => {
        hoveredRegion$.next(undefined);
      }}
    />
  {/each}
</Group>
