<script lang="ts">
  import Text from "./Text/Text.svelte";
  import UnitPanel from "./Units/UnitPanel.svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import { source } from "@client/pages/store";

  const data = source.selectSegementationData;

  const queryClient = new QueryClient();
</script>

<div class="flex w-full h-[calc(100vh-90px)] justify-around items-center">
  <QueryClientProvider client={queryClient}>
    <UnitPanel />
  </QueryClientProvider>
  {#if $data}
    <Text data={$data} />
  {/if}
</div>
