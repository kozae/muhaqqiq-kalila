<script lang="ts">
  import getPolygonBoundingBox from "@client/pages/math-helpers/polygon-bounding-box";
  import imageData$ from "../data/image-data";
  import highlighted$ from "../data/highlighted-region";
  import { Rect, Group } from "svelte-konva";
  import { map } from "rxjs";

  const fill = "rgba(0,0,0, 0.5)";

  const size$ = imageData$.pipe(
    map((data) => data && { width: data.width, height: data.height }),
  );

  const points$ = highlighted$.pipe(
    map((highlighted) => {
      if (!highlighted || !highlighted.region || highlighted.region.length < 8)
        return undefined;
      const [minX, minY, maxX, maxY] = getPolygonBoundingBox(
        highlighted.region.slice(0, -1) as number[],
      );

      return {
        minX,
        minY,
        maxX,
        maxY,
      };
    }),
  );
</script>

{#if $size$ && $points$}
  <Group>
    <Rect
      config={{
        x: 0,
        y: 0,
        width: $size$.width,
        height: $points$.minY,
        fill: fill,
      }}
    />
    <Rect
      config={{
        x: 0,
        y: $points$.maxY,
        width: $size$.width,
        height: $size$.height - $points$.maxY,
        fill: fill,
      }}
    />
    <Rect
      config={{
        x: 0,
        y: $points$.minY,
        width: $points$.minX,
        height: $points$.maxY - $points$.minY,
        fill: fill,
      }}
    />
    <Rect
      config={{
        x: $points$.maxX,
        y: $points$.minY,
        width: $size$.width - $points$.maxX,
        height: $points$.maxY - $points$.minY,
        fill: fill,
      }}
    />
  </Group>
{/if}
