<script lang="ts">
  import Panel from "./Panel.svelte";
  import { QueryClientProvider, QueryClient } from "@sveltestack/svelte-query";

  export let id: string;

  export const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <Panel {id} />
</QueryClientProvider>
