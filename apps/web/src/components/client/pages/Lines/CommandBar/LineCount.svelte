<script lang="ts">
  import Modal from "@client/reusable/Modal.svelte";
  import { createForm } from "felte";
  import { createEventDispatcher } from "svelte";

  interface ScheduleJobForm {
    lineCount: number;
  }

  export let show = false;
  const dispatch = createEventDispatcher();

  const { form } = createForm<ScheduleJobForm>({
    initialValues: {
      lineCount: 1,
    },
    onSubmit: async (values) => {
      dispatch("lineCount", values.lineCount);
      show = false;
    },
  });
</script>

{#if show}
  <Modal bind:showModal={show}>
    <form use:form class="space-y-4">
      <div class="sm:col-span-4">
        <label
          for="lineCount"
          class="block text-sm font-medium leading-6 text-gray-900"
          >How many lines to add?</label
        >
        <div class="mt-2">
          <input
            type="number"
            min="1"
            step="1"
            name="lineCount"
            id="lineCount"
            class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="mt-6 flex items-center justify-around gap-x-6">
        <button
          type="button"
          class="text-sm font-semibold text-gray-900"
          on:click={() => (show = false)}>Cancel</button
        >
        <button
          type="submit"
          class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >Add</button
        >
      </div>
    </form>
  </Modal>
{/if}
