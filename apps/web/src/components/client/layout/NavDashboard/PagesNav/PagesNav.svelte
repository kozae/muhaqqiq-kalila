<script lang="ts">
  import SelectBook from "./SelectBook.svelte";
  import SelectMedium from "./SelectMedium.svelte";
  import PageLinks from "./PageLinks.svelte";
  import { slide } from "svelte/transition";
  let bookId: string | undefined = undefined;
  let mediumId: string | undefined = undefined;
</script>

<div
  transition:slide={{ delay: 0, duration: 300, axis: "y" }}
  class="bg-secondary-50 mx-auto w-full max-w-xl rounded-2xl p-2"
>
  <div class="flex flex-col items-center">
    <SelectBook bind:bookId />
    {#if bookId}
      {#key bookId}
        <SelectMedium bind:mediumId {bookId} />
      {/key}
      {#if mediumId}
        {#key mediumId}
          <PageLinks {mediumId} />
        {/key}
      {/if}
    {/if}
  </div>
</div>
