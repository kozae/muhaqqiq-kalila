<script lang="ts">
  import { Group } from "svelte-konva";
  import AppPolygon from "./AppPolygon.svelte";
  import type { ILayoutElement } from "pages-tool-store-worker";

  export let regions: ILayoutElement[];
</script>

<Group>
  {#each regions as item (item.id)}
    <AppPolygon
      region={item.region}
      color={item.color ?? ""}
      text={`${(item.order ?? 0) + 1}`}
    />
  {/each}
</Group>
