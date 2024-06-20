<script lang="ts">
  import Modal from "@client/reusable/Modal.svelte";
  import Loading from "@client/reusable/Loading.svelte";
  import { createForm } from "felte";
  import { createEventDispatcher, getContext } from "svelte";
  import { v4 as uuid4 } from "uuid";
  import { postJob } from "./mutations";

  interface ScheduleJobForm {
    threshold: number;
  }

  export let showScheduleJobModalModal = false;
  export let pageNumber: number = 0;
  const dispatch = createEventDispatcher();
  const pageId: string = getContext("id");

  const mediumId: string = getContext("mediumId");
  let requested = false;
  let requestSuccess = false;
  const { form } = createForm<ScheduleJobForm>({
    initialValues: {
      threshold: 150,
    },
    onSubmit: async (values) => {
      requested = true;
      const id = uuid4();
      const job = {
        id,
        manuscriptId: mediumId,
        pages: [pageNumber],
        parameters: {
          threshold: values.threshold,
          text_direction: "horizontal-rl",
        },
      };
      try {
        const res = await postJob({ jobs: [job] });
        console.log(res);
        dispatch("loadLines", res[id][pageId]);
      } catch (e) {
        console.error(e);
      }
      requestSuccess = true;
    },
  });
</script>

{#if showScheduleJobModalModal}
  <Modal bind:showModal={showScheduleJobModalModal}>
    <h1 class="font-bold text-primary-500">Automated Line Detection</h1>
    <hr />
    {#if !requested}
      <form use:form class="space-y-4">
        <div class="sm:col-span-4">
          <label
            for="threshold"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Binarization Threshold</label
          >
          <div class="mt-2">
            <input
              type="number"
              min="1"
              step="1"
              name="threshold"
              id="threshold"
              class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="mt-6 flex items-center justify-around gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold text-gray-900"
            on:click={() => (showScheduleJobModalModal = false)}>Cancel</button
          >
          <button
            type="submit"
            class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >Run</button
          >
        </div>
      </form>
    {/if}
    {#if requested && !requestSuccess}
      <Loading />
    {/if}
    {#if requestSuccess}
      <div class="flex flex-col items-center justify-center">
        <h1 class="font-bold text-primary-500">Success!</h1>
        <p class="text-gray-500">The job has been scheduled.</p>
        <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
          on:click={() => (showScheduleJobModalModal = false)}>Close</button
        >
      </div>
    {/if}
  </Modal>
{/if}
