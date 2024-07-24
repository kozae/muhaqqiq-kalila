<script lang="ts">
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import UnitPanel from "./Units/UnitPanel.svelte";

  const queryClient = new QueryClient();
</script>

<div class="flex w-full h-[calc(100vh-90px)] justify-around items-center">
  <QueryClientProvider client={queryClient}>
    <UnitPanel />
  </QueryClientProvider>
</div>
