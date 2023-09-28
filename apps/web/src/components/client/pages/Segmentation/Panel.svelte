<script lang="ts">
  import Text from "./Text/Text.svelte";
  import Units from "./Units/Units.svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";

  const queryClient = new QueryClient();
</script>

<div class="flex w-full h-[calc(100vh-90px)] justify-around items-center">
  <QueryClientProvider client={queryClient}>
    <Units />
  </QueryClientProvider>
  <Text />
</div>
