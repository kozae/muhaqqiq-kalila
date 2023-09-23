<script lang="ts">
  import Modal from "@client/reusable/Modal.svelte";
  import BigButton from "@client/reusable/BigButton.svelte";
  import { from } from "rxjs";
  import { createEventDispatcher, getContext } from "svelte";
  import { getJobData, formatDatetime, fetchAndParseS3Json } from "./queries";

  export let showJobResultsModal = false;
  let selected: any = undefined;
  let data: any = undefined;

  const id: string = getContext("id");
  const files = from(getJobData(id));
  $: {
    if (selected) {
      data = from(fetchAndParseS3Json(selected?.key ?? ""));
    }
  }

  const dispatch = createEventDispatcher();
</script>

{#if showJobResultsModal}
  <Modal bind:showModal={showJobResultsModal}>
    <h1 class="font-bold text-primary-500">Finished Line Detection Jobs</h1>
    <hr />
    {#if $files}
      <div
        class="max-h-[300px] overflow-auto flex flex-col p-2 w-[450px] items-center"
      >
        {#each $files as file (file.key)}
          <label class="p-1">
            <input
              type="radio"
              bind:group={selected}
              value={file}
              class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <span class="pl-1">{formatDatetime(file.lastModified ?? "")}</span>
          </label>
        {/each}
        {#if $data}
          <p class="mt-2">
            Job performed with threshold <strong
              >{$data.parameters.threshold}</strong
            >
            and detected <strong>{$data.lines.length}</strong> lines
          </p>
          <BigButton
            on:click={() => {
              dispatch("loadLines", $data.lines);
              showJobResultsModal = false;
            }}>Load & Review</BigButton
          >
        {/if}
      </div>
    {/if}
  </Modal>
{/if}
