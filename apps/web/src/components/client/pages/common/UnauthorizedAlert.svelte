<script lang="ts">
  import { postChangeMediumEditor } from "../store/queries";

  export let user: string;
  export let mediumId: string;
  export let siglum: string;
  export let pageId: string;
  export let editor: string;

  async function onBecomeEditor() {
    await postChangeMediumEditor(mediumId, user);
    window.location.href = `/pages/${mediumId}/${pageId}/info`;
  }
</script>

<div class="flex flex-col grow items-center justify-center w-full h-full">
  <div class="rounded-md bg-yellow-50 p-4 max-w-1/2">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg
          class="h-5 w-5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-xl font-bold text-yellow-800">
          You are not the editor assigned to {siglum}
        </h3>
        <div class="mt-2 text-lg text-yellow-700">
          <p>
            If you are sure that you should be working now on this manuscript,
            click the button below to give yourself the editor role.
          </p>
          <p>
            DO NOT do this if you are not absolutly sure that you will not be
            interrupting the current assigned editor's ({editor}) work.
          </p>
          <br />
          <hr />
          <div class="mt-4 w-full">
            <div class="-mx-2 -my-1.5 flex w-full justify-around">
              <button
                type="button"
                on:click={onBecomeEditor}
                class="rounded-md bg-yellow-50 px-2 py-1.5 font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                >Become editor of {siglum}</button
              >
              <a
                href="/"
                class="ml-3 rounded-md bg-yellow-50 px-2 py-1.5 font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                >Go to homepage</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
