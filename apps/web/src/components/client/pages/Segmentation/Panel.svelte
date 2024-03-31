<script lang="ts">
  import UnitPanel from "./Units/UnitPanel.svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import { source } from "@client/pages/store";
  import { getContext } from "svelte";
  import { filter } from "rxjs";
  import Loading from "@client/reusable/Loading.svelte";
  import TranscriptionPanel from "../Transcription/Panel.svelte";

  const queryClient = new QueryClient();
</script>

<div class="flex w-full h-[calc(100vh-90px)] justify-around items-center">
  <QueryClientProvider client={queryClient}>
    <UnitPanel />
  </QueryClientProvider>
  <div class="animate-fade-in w-1/2 scale-90 rounded bg-white opacity-0">
    <TranscriptionPanel segmentsChangable={false} withMarginalia={false} />
  </div>
</div>
