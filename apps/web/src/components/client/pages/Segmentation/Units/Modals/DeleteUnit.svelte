<script lang="ts">
  import Modal from "@client/reusable/ModalWritableToggle.svelte";
  import Loading from "@client/reusable/Loading.svelte";
  import BigButton from "@client/reusable/BigButton.svelte";
  import TrashIcon from "@icons/TrashIcon.svelte";
  import { showDeleteModal, selectedUnit } from "../modal-states";
  import { requestDelete } from "./requests";
  import type { DeleteUnitInput } from "kalila-graphql";
  import { useQueryClient } from "@sveltestack/svelte-query";

  const queryClient = useQueryClient();
  let requested = false;
  let fail = false;
  let success = false;
  $: {
    if ($showDeleteModal === false) {
      selectedUnit.set(null);
      requested = false;
      fail = false;
      success = false;
    }
  }
  let deleteInput: DeleteUnitInput | null = null;
  $: {
    const unit = $selectedUnit;
    if (unit) {
      deleteInput = {
        id: unit.id,
        parentId: unit.parentId,
        order: unit.order,
      };
    }
  }

  async function handleAtemptDelete() {
    if (requested && !deleteInput) return;
    requested = true;
    try {
      await requestDelete(deleteInput!);
      success = true;
      queryClient.invalidateQueries("units");
    } catch (error) {
      fail = true;
    }
  }
</script>

<Modal width="w-[400px]" showModal={showDeleteModal}>
  <h1 class="text-lg text-primary-500 font-bold" slot="header">
    Attempt Unit Deletion
  </h1>
  <div class="flex flex-col items-center p-1 text-primary-500">
    <h2>A unit can be deleted only if it is not assigned in any medium.</h2>
    <p>
      Selected: <strong>
        [{$selectedUnit?.frame}.{$selectedUnit?.displayOrder}]
        {$selectedUnit?.title}</strong
      >
    </p>
    <div class="flex justify-between w-full items-center">
      {#if !fail && !success}
        {#if requested}
          <Loading dimensions="w-6 h-6" color="primary-500" />
        {:else}
          <BigButton on:click={handleAtemptDelete} className="text-red-700">
            <TrashIcon />
            Attempt
          </BigButton>
        {/if}
      {:else}
        {#if fail}
          <p class="text-lg font-bold text-red-500">Failed!</p>
        {/if}
        {#if success}
          <p class="text-lg font-bold text-green-800">Done!</p>
        {/if}
      {/if}

      <BigButton
        on:click={() => showDeleteModal.set(false)}
        className="text-secondary-900">Close</BigButton
      >
    </div>
  </div>
</Modal>
