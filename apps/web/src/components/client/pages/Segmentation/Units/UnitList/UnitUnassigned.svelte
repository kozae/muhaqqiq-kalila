<script lang="ts">
  import Menu from "@client/reusable/SelectIdMenu.svelte";
  import IconButton from "@client/reusable/IconButton.svelte";
  import ArrowRightInBox from "@icons/ArrowRightInBox.svelte";
  import PencilSquareIcon from "@icons/PencilSquareIcon.svelte";
  import TrashIcon from "@icons/TrashIcon.svelte";
  import type { UnitEntity, UnitSegmentInfo } from "pages-tool-store-worker";
  import { insertSegment } from "../../../Transcription/segment-watcher";
  import {
    selectedUnit,
    showDeleteModal,
    showEditModal,
  } from "../modal-states";
  import { segmentWatcher } from "../../../Transcription/segment-watcher";

  export let unit: UnitEntity;
  let segments: (UnitSegmentInfo & { key: string })[] = [];
  function handleDelete() {
    selectedUnit.set(unit);
    showDeleteModal.set(true);
  }

  function handleEdit() {
    selectedUnit.set(unit);
    showEditModal.set(true);
  }
  $: segments = $segmentWatcher
    ? Object.entries($segmentWatcher).map(([key, v]) => ({ key, ...v }))
    : [];

  function handleInsert(operation: string) {
    insertSegment.next({ operation, unit });
  }
</script>

<div
  class="w-5/12 pointer-events-auto rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 m-3 flex flex-col justify-center items-center h-fit"
>
  <div class="p-1 relative border-b-2 w-full flex justify-center">
    <Menu
      iconButton
      position="absolute left-1"
      items={[
        { id: "insert", display: "Insert in top of the page" },
        ...segments.map((s) => ({
          id: s.key,
          display: `Replace ${s.display}`,
        })),
      ]}
      on:itemClick={(e) => handleInsert(e.detail)}
    >
      <ArrowRightInBox slot="icon" />
    </Menu>

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

    <IconButton
      on:click={handleDelete}
      color="red-700"
      class="hover:bg-red-700"
    >
      <TrashIcon />
    </IconButton>
  </div>
</div>
