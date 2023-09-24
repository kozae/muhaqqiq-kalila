<script lang="ts">
  import { Group } from "svelte-konva";
  import AppPolygon from "./AppPolygon.svelte";
  import type { ILayoutElement } from "pages-tool-store-worker";
  import { mode } from "../mode-store";
  import { regionUnderEdit$ } from "@client/pages/facsimile-events";

  export let regions: ILayoutElement[];
</script>

<Group>
  {#each regions as item (item.id)}
    {#if item.id !== $regionUnderEdit$}
      <AppPolygon
        region={item.region}
        color={$mode === "edit" ? "0,0,0" : item.color ?? ""}
        text={item.order >= 0 ? `${(item.order ?? 0) + 1}` : "?"}
      />
    {/if}
  {/each}
</Group>
