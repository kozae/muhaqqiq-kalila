<script lang="ts">
  import PanelContainer from "@client/pages/common/PanelContainer.svelte";
  import { createForm } from "felte";
  import { requestAction } from "@client/pages/store";

  type PageInfo = {
    commentary?: string | null;
    foliation?: string | null;
    pagination?: number | null;
    tags?: string | null;
  };
  export let initialValues: PageInfo;
  export let mode: "view" | "edit";
  console.log(initialValues);
  // TODO - add validation
  const { form } = createForm<PageInfo>({
    initialValues: initialValues,
    onSubmit: (values) => {
      requestAction("updatePageInfo", values);
      mode = "view";
    },
  });
</script>

<PanelContainer panelHasCommandBar={false} classes="p-2">
  <form use:form>
    <div class="space-y-4">
      <!-- foliation -->
      <div class="sm:col-span-4">
        <label
          for="foliation"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Foliation
        </label>
        <div class="mt-2">
          <input
            type="text"
            name="foliation"
            id="foliation"
            class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
            type="number"
            name="pagination"
            id="pagination"
            class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!-- tags -->
      <div class="sm:col-span-4">
        <label
          for="tags"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Tags
        </label>
        <div class="mt-2">
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Separate tags with a comma"
            class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
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
        type="submit"
        class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Save
      </button>
    </div>
  </form>
</PanelContainer>
