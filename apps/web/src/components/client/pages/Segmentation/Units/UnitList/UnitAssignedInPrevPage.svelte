<script lang="ts">
  import IconButton from "@client/reusable/IconButton.svelte";
  import PencilSquareIcon from "@icons/PencilSquareIcon.svelte";
  import CircleSlashIcon from "@icons/CircleSlashIcon.svelte";
  import type { UnitEntity } from "pages-tool-store-worker";
  import { selectedUnit, showEditModal } from "../modal-states";
  import { insertSegment } from "../../../Transcription/segment-watcher";

  export let unit: UnitEntity;
  export let hasEnd: boolean = false;
  function handleEdit() {
    selectedUnit.set(unit);
    showEditModal.set(true);
  }
  function handleClose() {
    insertSegment.next({ operation: "close", unit });
  }
</script>

<div
  class="w-5/12 pointer-events-auto overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 m-3 flex flex-col justify-center items-center h-fit"
>
  <div class="p-1 relative border-b-2 w-full flex justify-center">
    <p class="absolute left-1 bg-secondary-900 text-white rounded px-1">
      {unit.segment?.page}:{(unit.segment?.line ?? 0) + 1}
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
    <IconButton on:click={handleEdit}>
      <PencilSquareIcon />
    </IconButton>
  </div>
</div>
