<script lang="ts">
  import PanelContainer from "@client/pages/common/PanelContainer.svelte";
  import tags from "@client/pages/common/tags";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";

  import { requestAction, requestState, source } from "@client/pages/store";
  import { map } from "rxjs";
  import * as zod from "zod";

  type PageInfo = {
    commentary?: string | null;
    foliation?: string | null;
    pagination?: number | null;
    tags?: Record<string, boolean> | null;
    version: number;
  };
  export let mode: "view" | "edit";
  let initialValues: PageInfo;

  requestState("selectPageInfo");

  const editableValues$ = source.selectPageInfo.pipe(
    map((info) => {
      if (!info) return undefined;
      const { commentary, foliation, pagination, tags, version } = info;
      return {
        commentary: (commentary || []).join("\n"),
        foliation: foliation || "",
        pagination: pagination || 0,
        tags,
        version,
      };
    }),
  );

  $: initialValues = $editableValues$!;

  const schema = zod.object({
    commentary: zod.string().optional(),
    foliation: zod
      .string()
      .regex(/^(\d{1,3}[rv])?$/)
      .optional(),
    pagination: zod.number().optional(),
    tags: zod.record(zod.boolean()).optional(),
  });

  let form: any = undefined;
  let errors: any = undefined;

  $: {
    const { form: createdForm, errors: currentErrors } = initialValues
      ? createForm<PageInfo>({
          initialValues: initialValues,
          extend: validator({ schema }),
          onSubmit: (values) => {
            const tags = Object.keys(values.tags || {}).filter(
              (tag) => values.tags?.[tag],
            );
            const foliation =
              values.foliation && values.foliation.length > 0
                ? values.foliation
                : null;
            requestAction("updatePageInfo", { ...values, foliation, tags });
            mode = "view";
          },
        })
      : { form: undefined, errors: undefined };
    form = createdForm;
    errors = currentErrors;
  }
</script>

<PanelContainer panelHasCommandBar={false} classes="p-2">
  {#if initialValues && form}
    {#key initialValues.version}
      <form use:form>
        <div class="space-y-4">
          <!-- foliation -->
          <div class="sm:col-span-4">
            <label
              for="foliation"
              class={$errors.foliation !== null
                ? "block text-sm font-medium leading-6 text-red-400"
                : "block text-sm font-medium leading-6 text-gray-900"}
            >
              Foliation {$errors.foliation !== null ? "(invalid value)" : ""}
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="foliation"
                id="foliation"
                class={$errors.foliation !== null
                  ? "focus:ring-red-400 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  : "focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"}
              />
            </div>
          </div>
          <!-- pagination -->
          <div class="sm:col-span-4">
            <label
              for="pagination"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Pagination
            </label>
            <div class="mt-2">
              <input
                min="0"
                max="999"
                step="1"
                type="number"
                name="pagination"
                id="pagination"
                class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <!-- tags -->
          <div class="sm:col-span-4">
            <p class="block text-sm font-medium leading-6 text-gray-900">
              Tags
            </p>
            <div class="mt-2 grid grid-cols-3 gap-4">
              {#each tags as tag (tag)}
                <div class="relative flex items-start">
                  <div class="flex h-6 items-center">
                    <input
                      id={tag}
                      name={`tags.${tag}`}
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                    />
                  </div>
                  <div class="ml-3 text-sm leading-6">
                    <label for={tag} class="font-medium text-gray-900"
                      >{tag}</label
                    >
                  </div>
                </div>
              {/each}
            </div>
          </div>
          <!--  image -->
          <!-- <div class="col-span-full">
        <label
          for="imageUrl"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Image
        </label>
        <div
          class="mt-2 flex justify-around rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        >
          <div class="p-1 text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
            <div class="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                for="imageUrl"
                class="text-primary-600 focus-within:ring-primary-600 hover:text-primary-500 relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
              >
                <span>Upload a file</span>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="file"
                  class="sr-only"
                />
              </label>
            </div>
          </div>
          <div class="p-1 text-center">
            <ViewColumnsIcon className="mx-auto h-12 w-12 text-gray-300" />
            <div class="mt-4 flex text-sm leading-6 text-gray-600">
              <button
                class="text-primary-600 focus-within:ring-primary-600 hover:text-primary-500 relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
              >
                Generate a placeholder
              </button>
            </div>
          </div>
        </div>
      </div> -->
          <!-- <Warning>
        <p>
          Replacing the image will remove any region definitions for layout and
          lines. Transcription will be retained.
        </p>
      </Warning> -->
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
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
            on:click={() => (mode = "view")}
          >
            Cancel
          </button>
          <button
            disabled={$errors.foliation !== null}
            type="submit"
            class="{$errors.foliation !== null
              ? 'bg-gray-300'
              : 'bg-primary-600 hover:bg-primary-500'} focus-visible:outline-primary-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    {/key}
  {/if}
</PanelContainer>
