<script lang="ts">
  import PencilSquareIcon from "@icons/PencilSquareIcon.svelte";
  import type { UnitEntity } from "pages-tool-store-worker";

  export let unit: UnitEntity;
</script>

<div
  class="w-5/12 pointer-events-auto rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 m-3 flex flex-col justify-center items-center h-fit"
>
  <div class="p-1 relative border-b-2 w-full flex justify-center">
    <a class="absolute left-1" href="/cross-analysis/{unit.id}">
      <PencilSquareIcon />
    </a>

    <p class=" text-primary-500 font-semibold px-1 rounded">
      {unit.frame}.{unit.order}
    </p>
  </div>
  <p
    class="font-semibold text-sm text-primary-500 p-3 align-middle text-center"
  >
    {unit.title}
  </p>
</div>
