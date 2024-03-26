<script lang="ts">
  // App.svelte
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import Panel from "./Panel.svelte";
  import { setContext } from "svelte";

  const queryClient = new QueryClient();
  export let id: string;
  export let page: number;

  setContext("id", id);
  setContext("page", page);
</script>

<div
  class="max-w-screen-2xl w-full overflow-auto flex flex-col justify-start items-start rounded-sm h-[calc(100vh-4rem)]"
>
  <QueryClientProvider client={queryClient}>
    <Panel />
  </QueryClientProvider>
</div>
