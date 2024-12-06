<script lang="ts">
  import Modal from "@client/reusable/ModalWritableToggle.svelte";
  import Loading from "@client/reusable/Loading.svelte";
  import BigButton from "@client/reusable/BigButton.svelte";
  import PlusIcon from "@icons/PlusIcon.svelte";
  import { showCreateModal } from "../modal-states";
  import * as zod from "zod";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import type { CreateUnitInput } from "kalila-graphql";
  import { requestCreate } from "./requests";
  import { v4 } from "uuid";

  export let bookId: string;
  export let parentId: string;

  const queryClient = useQueryClient();
  let requested = false;

  const schema = zod.object({
    commentary: zod.string().optional().nullable(),
    divider: zod.boolean().optional().nullable(),
    frame: zod.string().optional().nullable(),
    order: zod.number(),
    title: zod.string(),
  });
  const { form, data } = createForm<Partial<CreateUnitInput>>({
    initialValues: {
      commentary: "",
      divider: false,
      frame: "",
      order: 1,
      title: "",
    },
    extend: validator({ schema }),
    onSubmit: async (values) => {
      requested = true;
      const input = {
        ...values,
        bookId,
        parentId,
        id: v4(),
        version: Date.now(),
      } as CreateUnitInput;
      await requestCreate(input);
      queryClient.invalidateQueries("units");
      showCreateModal.set(false);
      data.set({
        commentary: "",
        divider: false,
        frame: "",
        order: 1,
        title: "",
      });
    },
  });
  $: {
    if ($showCreateModal === false) {
      requested = false;
    }
  }
</script>

<Modal width="w-[400px]" showModal={showCreateModal}>
  <h1 class="text-lg text-primary-500 font-bold" slot="header">Create Unit</h1>
  <form use:form>
    <div class="space-y-4">
      <!-- title -->
      <div class="sm:col-span-4">
        <label
          for="title"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Title
        </label>
        <div class="mt-2">
          <input
            type="text"
            name="title"
            id="title"
            class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!-- order -->
      <div class="sm:col-span-4">
        <label
          for="order"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Order
        </label>
        <div class="mt-2">
          <input
            type="number"
            name="order"
            id="order"
            min="1"
            max="999"
            step="1"
            class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!-- frame -->
      <div class="sm:col-span-4">
        <label
          for="frame"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Frame
        </label>
        <div class="mt-2">
          <input
            type="text"
            name="frame"
            id="frame"
            class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!-- divider -->
      <div class="sm:col-span-4 flex items-center">
        <label
          for="divider"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Divider
        </label>
        <div class="ml-2">
          <input
            type="checkbox"
            name="divider"
            id="divider"
            class="focus:ring-primary-600 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!-- commentary -->
      <div class="sm:col-span-4">
        <label
          for="commentary"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Commentary
        </label>
        <div class="mt-2">
          <textarea
            name="commentary"
            id="commentary"
            class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            rows={4}
          ></textarea>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center p-1 text-primary-500">
      <div class="flex justify-between w-full items-center">
        {#if requested}
          <Loading dimensions="w-6 h-6" color="primary-500" />
        {:else}
          <BigButton submit>
            <PlusIcon />
            Create
          </BigButton>
        {/if}

        <BigButton
          on:click={() => showCreateModal.set(false)}
          className="text-secondary-900">Close</BigButton
        >
      </div>
    </div>
  </form>
</Modal>
