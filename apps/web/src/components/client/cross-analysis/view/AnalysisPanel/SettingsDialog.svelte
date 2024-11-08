<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import BigButton from "@client/reusable/BigButton.svelte";
  import { createForm } from "felte";
  import * as zod from "zod";
  import { validator } from "@felte/validator-zod";

  export let version: string;

  const dispatch = createEventDispatcher();

  const schema = zod.object({
    fragmentationInstructions: zod.string(),
    refinementInstructions: zod.string(),
    threshold: zod
      .number()
      .min(0.5)
      .max(0.9)
      .default(version === "v1" ? 0.9 : 0.75),
  });

  const { form, data } = createForm({
    initialValues: {
      fragmentationInstructions: "",
      refinementInstructions: "",
      threshold: version === "v1" ? 0.9 : 0.75,
    },
    extend: validator({ schema }),
    onSubmit: (values) => {
      const preprocessedValues = Object.fromEntries(
        Object.entries(values).filter(([_, value]) => value !== ""),
      );

      const stamp = Math.floor(Math.random() * 999) + 1;

      dispatch("submit", { version, stamp, ...preprocessedValues });
    },
  });
</script>

<div
  class="w-full flex flex-col items-center justify-start mt-2 flex-grow overflow-visible"
>
  <h1 class="text-2xl font-bold">Analysis {version}</h1>
  <form use:form class="w-4/12 space-y-4">
    <!-- Fragmentation Instructions -->
    <div class="sm:col-span-4">
      <label
        for="fragmentationInstructions"
        class="block text-sm font-medium leading-6 text-gray-900"
      >
        Fragmentation Instructions (Optional)
      </label>
      <div class="mt-2">
        <textarea
          name="fragmentationInstructions"
          id="fragmentationInstructions"
          class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          rows={4}
        ></textarea>
      </div>
    </div>
    <!-- Refinement Instructions -->
    {#if version !== "v2"}
      <div class="sm:col-span-4">
        <label
          for="refinementInstructions"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Refinement Instructions (Optional)
        </label>
        <div class="mt-2">
          <textarea
            name="refinementInstructions"
            id="refinementInstructions"
            class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            rows={4}
          ></textarea>
        </div>
      </div>
    {/if}
    <!-- Distance Threshold -->
    <div class="sm:col-span-4">
      <label
        for="threshold"
        class="block text-sm font-medium leading-6 text-gray-900"
      >
        Distance Threshold
      </label>
      <div class="mt-2">
        <input
          type="number"
          name="threshold"
          id="threshold"
          min="0.5"
          max="0.9"
          step="0.01"
          value="0.75"
          class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    <div class="flex flex-row justify-around">
      <BigButton
        className="bg-secondary-900 text-white m-1 hover:bg-secondary-800"
        submit>Run</BigButton
      >
      <BigButton on:click={() => dispatch("close")}>Cancel</BigButton>
    </div>
  </form>
</div>
