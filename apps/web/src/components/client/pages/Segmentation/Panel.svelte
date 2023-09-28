<script lang="ts">
  import Text from "./Text/Text.svelte";
  import Units from "./Units/Units.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";

  const flipDurationMs = 200;
  const items: any[] = [];

  function handle(e: any) {
    console.log(e.detail);
  }
  const queryClient = new QueryClient();
</script>

<div
  class="flex w-full h-[calc(100vh-90px)] justify-around items-center"
  use:dndzone={{ items, flipDurationMs }}
  on:consider={handle}
  on:finalize={handle}
>
  <QueryClientProvider client={queryClient}>
    <Units />
  </QueryClientProvider>
  <Text />
</div>
