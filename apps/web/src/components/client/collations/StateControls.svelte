<script lang="ts">
  import { createForm } from "felte";
  import { z } from "zod";
  import { validator } from "@felte/validator-zod";
  import { get, derived } from "svelte/store";
  import { matchPattern, updateStream, type Update } from "./state-controls";
  import { onMount } from "svelte";
  import { getLemmas, postUpdates, queryClient } from "./queries";
  import type { PageUpdateTargetInput } from "kalila-graphql";
  import Loading from "@client/reusable/Loading.svelte";

  const schema = z.object({
    units: z
      .string()
      .regex(
        /^(\d+|\d+-\d+|\d+(,\d+)*)$/,
        "Units must be a single number, a number range like 1-10, or numbers separated with commas like 3,7,8",
      ),
    columns: z
      .string()
      .regex(
        /^([a-zA-Z]|[a-zA-Z]-[a-zA-Z]|[a-zA-Z](,[a-zA-Z])*)$/,
        "Columns must be a single letter, a letter range like a-f, or letters separated with commas like a,d,g",
      ),
    match: z.string(),
    replace: z
      .string()
      .regex(
        /^[\u0600-\u06FF]+$/,
        "Replace must be a single word with characters in the Arabic Unicode block",
      ),
  });

  let updatesTracker: Record<string, Record<string, Update>> = {};
  let updates: Update[] = [];
  let applyClicked = false;

  const { form, data, reset, isValid } = createForm({
    initialValues: {
      units: "",
      columns: "",
      match: "",
      replace: "",
    },
    extend: validator({ schema }),
  });

  const searchDisabled = derived(data, ($data) => {
    return !$data.units || !$data.columns || !$data.match;
  });

  const applyDisabled = derived([data, isValid], ([$data, $isValid]) => {
    return (
      !$data.units ||
      !$data.columns ||
      !$data.match ||
      !$data.replace ||
      !$isValid
    );
  });

  function handleClear() {
    reset();
    updatesTracker = {};
    updates = [];
    matchPattern.next({
      pattern: /^(?!.*).$/,
      units: new Set(),
      columns: new Set(),
    });
  }

  function getUnitSet(units: string): Set<number> {
    const unitSet = new Set<number>();
    units.split(",").forEach((part) => {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        for (let i = start; i <= end; i++) {
          unitSet.add(i);
        }
      } else {
        unitSet.add(Number(part));
      }
    });
    return unitSet;
  }

  const letters = "abcdefghiklmnopqrstuvwxyz";

  function getCoulmnSet(columns: string): Set<number> {
    const columnSet = new Set<number>();
    columns.split(",").forEach((part) => {
      if (part.includes("-")) {
        const [start, end] = part
          .split("-")
          .map((letter) => letters.indexOf(letter));
        for (let i = start; i <= end; i++) {
          columnSet.add(i);
        }
      } else {
        columnSet.add(letters.indexOf(part));
      }
    });
    return columnSet;
  }

  function handleSearch() {
    const formData = get(data);
    updatesTracker = {};
    updates = [];
    matchPattern.next({
      pattern: new RegExp(formData.match),
      units: getUnitSet(formData.units),
      columns: getCoulmnSet(formData.columns),
    });
  }

  async function handleApply() {
    applyClicked = true;
    const { replace, match } = get(data);

    const request: PageUpdateTargetInput[] = [];
    const unitIds = new Set<string>();

    for (const update of updates) {
      const { unitId, ...updateData } = update;
      unitIds.add(unitId);
      const replacement = update.original.replace(new RegExp(match), replace);
      const lemmas = await getLemmas({ sentence: replacement });
      request.push({
        ...updateData,
        replacement,
        lemmas: JSON.stringify(lemmas),
      });
    }

    await postUpdates(request);
    handleClear();
    applyClicked = false;

    for (const unitId of unitIds) {
      await queryClient.refetchQueries([unitId], {
        exact: true,
      });
    }
  }

  onMount(() => {
    const subscription = updateStream.subscribe({
      next: (value) => {
        if (!(value.mediumId in updatesTracker)) {
          updatesTracker[value.mediumId] = {};
        }
        updatesTracker[value.mediumId][value.segmentId] = value;
        updates = Object.values(updatesTracker).flatMap((medium) =>
          Object.values(medium),
        );
      },
    });
    return () => subscription.unsubscribe();
  });
</script>

<form use:form class="flex flex-row items-center justify-center p-1 w-full">
  <div class="flex items-center px-1">
    <label class="block text-sm font-medium text-primary-500 mr-1" for="units"
      >Units:</label
    >
    <input
      class="block w-full rounded-md border-0 py-1.5 text-primary-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
      type="text"
      id="units"
      name="units"
    />
  </div>
  <div class="flex items-center px-1">
    <label class="block text-sm font-medium text-primary-500 mr-1" for="columns"
      >Columns:</label
    >
    <input
      class="block w-full rounded-md border-0 py-1.5 text-primary-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
      type="text"
      id="columns"
      name="columns"
    />
  </div>
  <div class="flex items-center px-1">
    <label class="block text-sm font-medium text-primary-500 mr-1" for="match"
      >Match:</label
    >
    <input
      class="block w-full rounded-md border-0 py-1.5 text-primary-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
      type="text"
      id="match"
      name="match"
    />
  </div>
  <div class="flex items-center px-1">
    <label class="block text-sm font-medium text-primary-500 mr-1" for="replace"
      >Replace:
    </label>
    <input
      class="block w-full rounded-md border-0 py-1.5 text-primary-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
      type="text"
      id="replace"
      name="replace"
    />
  </div>
  <button
    type="button"
    class={$searchDisabled
      ? "rounded-md bg-gray-200 px-2.5 py-1.5 text-sm font-semibold text-gray-600 shadow-sm cursor-not-allowed mr-2"
      : "rounded-md bg-secondary-50 px-2.5 py-1.5 text-sm font-semibold text-secondary-900 shadow-sm hover:bg-secondary-100 mr-2"}
    disabled={$searchDisabled}
    on:click={handleSearch}>Search</button
  >
  <button
    type="button"
    class="rounded-md bg-secondary-50 px-2.5 py-1.5 text-sm font-semibold text-secondary-900 shadow-sm hover:bg-secondary-100 mr-2"
    on:click={handleClear}>Clear</button
  >
  <button
    type="button"
    class={$applyDisabled || applyClicked || updates.length === 0
      ? "rounded-md bg-gray-200 px-2.5 py-1.5 text-sm font-semibold text-gray-600 shadow-sm cursor-not-allowed mr-2"
      : "rounded-md bg-primary-50 px-2.5 py-1.5 text-sm font-semibold text-primary-900 shadow-sm hover:bg-primary-100 mr-2"}
    disabled={$applyDisabled || applyClicked || updates.length === 0}
    on:click={handleApply}
  >
    {#if applyClicked}
      <Loading dimensions="w-4 h-4" />
    {:else}
      <span>Apply ({updates.length})</span>
    {/if}
  </button>
</form>
