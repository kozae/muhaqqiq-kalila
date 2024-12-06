<script lang="ts">
  import Modal from "@client/reusable/Modal.svelte";
  import LinkIcon from "@icons/LinkIcon.svelte";

  export let mediumId: string | undefined = "";
  export let lastPage = 1;
  export let ids: string[] = [];

  let baseUrl = `/pages/${mediumId}/`;
  let showModal = false;

  const onSubmit = (event: any) => {
    event.preventDefault();
    const page = parseInt(event.target.page.value);
    if (!isNaN(page)) {
      const pageId = ids[page - 1];
      window.location.pathname = `${baseUrl}${pageId}`;
    }
  };
</script>

<button
  type="button"
  on:click={() => (showModal = true)}
  class="hover:bg-secondary-200 text-primary-500 focus-visible:outline-primary-600 mt-1 hidden items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:inline-flex sm:flex-col"
>
  <LinkIcon className="-ml-0.5 h-5 w-5" />
  Go to ...
</button>

{#if showModal}
  <Modal bind:showModal>
    <form class="mt-5 sm:mt-6 w-[150px]" on:submit={onSubmit}>
      <div>
        <label for="page" class="sr-only"> page </label>
        <input
          type="number"
          min="1"
          max={lastPage}
          step="1"
          name="page"
          id="page"
          class="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          placeholder="page"
        />
      </div>
      <button
        class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 mt-5 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        type="submit"
      >
        Go
      </button>
    </form>
  </Modal>
{/if}
