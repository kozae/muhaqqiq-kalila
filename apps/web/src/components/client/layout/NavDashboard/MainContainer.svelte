<script lang="ts">
  import { writable } from "svelte/store";
  import Tabs from "./Tabs.svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import { Auth } from "aws-amplify";
  import LinkIcon from "@icons/LinkIcon.svelte";

  let current = writable("Pages");
  let tabNames = ["Collations", "Pages", "Media", "Books"];
  const queryClient = new QueryClient();
  const sessionPromise = Auth.currentSession();
</script>

{#await sessionPromise}
  <div></div>
{:then session}
  {#if session && session.isValid()}
    <div class="w-1/2 mt-4">
      <div class="bg-secondary-50 mx-auto w-full max-w-xl rounded-2xl p-2">
        <div class="text-secondary-900 flex justify-center align-baseline">
          <LinkIcon className="h-10 w-5 px-0 pt-3 pb-2 text-secondary-900" />
          <h1 class="py-2 text-center text-lg">&nbsp; Navigation Dashboard</h1>
        </div>
        <QueryClientProvider client={queryClient}>
          <Tabs {tabNames} {current} />
          {#if $current === "Collations"}
            <slot name="Collations" />
          {:else if $current === "Pages"}
            <slot name="Pages" />
          {:else if $current === "Media"}
            <slot name="Media" />
          {:else if $current === "Books"}
            <slot name="Books" />
          {/if}
        </QueryClientProvider>
      </div>
    </div>
  {/if}
{:catch error}
  <div></div>
{/await}
