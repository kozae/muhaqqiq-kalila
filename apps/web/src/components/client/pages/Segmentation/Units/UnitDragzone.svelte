<script lang="ts">
  import { flip } from "svelte/animate";
  import {
    dndzone,
    TRIGGERS,
    SHADOW_ITEM_MARKER_PROPERTY_NAME,
  } from "svelte-dnd-action";
  import type { UnitEntity } from "pages-tool-store-worker";
  export let items: UnitEntity[] = [];
  const flipDurationMs = 300;
</script>

<div>I love Svelte :)</div>

<style>
</style>
