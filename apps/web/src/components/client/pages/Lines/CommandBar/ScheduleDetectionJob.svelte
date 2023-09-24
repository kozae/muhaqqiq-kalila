<script lang="ts">
  import Modal from "@client/reusable/Modal.svelte";
  import Loading from "@client/reusable/Loading.svelte";
  import { createForm } from "felte";
  import type { LineDetectionJobInput } from "kalila-graphql";
  import { getContext } from "svelte";
  import { v4 as uuid4 } from "uuid";
  import { postJob } from "./mutations";

  interface ScheduleJobForm {
    fromPage: number;
    toPage: number;
    threshold: number;
    startMode: "immediately" | "queued";
  }

  export let showScheduleJobModalModal = false;
  export let pageNumber: number = 0;

  const mediumId: string = getContext("mediumId");
  let requested = false;
  let requestSuccess = false;
  const { form } = createForm<ScheduleJobForm>({
    initialValues: {
      fromPage: pageNumber,
      toPage: pageNumber,
      threshold: 150,
      startMode: "queued",
    },
    onSubmit: async (values) => {
      requested = true;
      const request: LineDetectionJobInput = {
        id: uuid4(),
        manuscriptId: mediumId,
        pages: Array.from(
          { length: values.toPage - values.fromPage + 1 },
          (_, i) => i + values.fromPage,
        ),
        parameters: JSON.stringify({
          threshold: values.threshold,
          text_direction: "horizontal-rl",
        }),
        state: values.startMode === "immediately" ? 0 : 2,
      };
      try {
        await postJob(request);
      } catch (e) {
        console.error(e);
      }
      requestSuccess = true;
    },
  });
</script>

{#if showScheduleJobModalModal}
  <Modal bind:showModal={showScheduleJobModalModal}>
    <h1 class="font-bold text-primary-500">Line Detection Job</h1>
    <hr />
    {#if !requested}
      <form use:form class="space-y-4">
        <div class="sm:col-span-4">
          <label
            for="fromPage"
            class="block text-sm font-medium leading-6 text-gray-900"
            >From Page</label
          >
          <div class="mt-2">
            <input
              type="number"
              min="1"
              step="1"
              name="fromPage"
              id="fromPage"
              class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="sm:col-span-4">
          <label
            for="toPage"
            class="block text-sm font-medium leading-6 text-gray-900"
            >To Page</label
          >
          <div class="mt-2">
            <input
              type="number"
              min="1"
              step="1"
              name="toPage"
              id="toPage"
              class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
        <div class="sm:col-span-4">
          <label
            for="startMode"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Start Mode</label
          >
          <div class="mt-2">
            <select
              name="startMode"
              id="startMode"
              class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            >
              <option value="immediately">Immediately</option>
              <option value="queued">Queued</option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
            on:click={() => (showScheduleJobModalModal = false)}>Cancel</button
          >
          <button
            type="submit"
            class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >Schedule</button
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
