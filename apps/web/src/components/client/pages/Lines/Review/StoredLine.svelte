<script lang="ts">
  import type { LineEntity, TextEntity } from "pages-tool-store-worker";

  export let el: LineEntity | TextEntity;
  const twCLass: string =
    "flex items-center h-12 justify-center w-full rounded p-1 mt-1 mb-1";

  const borderColor = `rgba(240,239,60, 0.6)`;
  const backgroundColor = `rgba(240,239,60, 0.3)`;
  const style = `border: solid 3px ${borderColor}; background-color: ${backgroundColor}`;
</script>

<div class={twCLass} {style}>
  <h1 class="text-xl">
    {(el?.order ?? 0) + 1}
  </h1>
</div>
