<script lang="ts">
  import Text from "./Text/Text.svelte";
  import UnitPanel from "./Units/UnitPanel.svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import { source } from "@client/pages/store";
  import { getContext } from "svelte";
  import { filter } from "rxjs";
  import Loading from "@client/reusable/Loading.svelte";

  const id: string = getContext("id");
  const data = source.selectSegementationData.pipe(filter((d) => d.id === id));

  const queryClient = new QueryClient();
</script>

<div class="flex w-full h-[calc(100vh-90px)] justify-around items-center">
  <QueryClientProvider client={queryClient}>
    <UnitPanel />
  </QueryClientProvider>
  {#if $data}
    <Text data={$data} />
  {:else}
    <div class="w-6/12">
      <Loading />
    </div>
  {/if}
</div>
