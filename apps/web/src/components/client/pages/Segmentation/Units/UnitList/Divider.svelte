<script lang="ts">
  import IconButton from "@client/reusable/IconButton.svelte";
  import PencilSquareIcon from "@icons/PencilSquareIcon.svelte";
  import TrashIcon from "@icons/TrashIcon.svelte";
  import type { UnitEntity } from "pages-tool-store-worker";

  export let unit: UnitEntity;
</script>

<div
  class="w-11/12 pointer-events-auto overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 m-3 flex flex-col justify-center items-center h-fit"
>
  <div class="p-1 relative border-b-2 w-full flex justify-center">
    <p class="absolute left-1 bg-secondary-900 text-white rounded px-1">
      divider
    </p>
    <p class=" text-primary-500 font-semibold px-1 rounded">
      {unit.frame}.{unit.displayOrder}
    </p>
  </div>
  <p
    class="font-semibold text-sm text-primary-500 p-3 align-middle text-center"
  >
    {unit.title}
  </p>
  <div class="p-1 border-t-2 w-full flex justify-evenly">
    <IconButton>
      <PencilSquareIcon />
    </IconButton>

    <IconButton color="red-700" class="hover:bg-red-700">
      <TrashIcon />
    </IconButton>
  </div>
</div>
