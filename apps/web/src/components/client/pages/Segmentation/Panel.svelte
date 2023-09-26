<script lang="ts">
  import Text from "./Text/Text.svelte";
  import Units from "./Units/Units.svelte";
  import { dndzone } from "svelte-dnd-action";

  const flipDurationMs = 200;
  const items: any[] = [];

  function handle(e: any) {
    console.log(e.detail);
  }
</script>

<div
  class="flex w-full h-[calc(100vh-90px)]"
  use:dndzone={{ items, flipDurationMs }}
  on:consider={handle}
  on:finalize={handle}
>
  <Text />
  <Units />
</div>
