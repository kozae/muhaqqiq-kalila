<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import AnalysisCard from "./AnalysisPanel/AnalysisCard.svelte";
  import { listCachedVersions } from "./query";
  import { useQuery } from "@sveltestack/svelte-query";
  import SettingsDialog from "./AnalysisPanel/SettingsDialog.svelte";
  import { runAnalysisSubject$ } from "./store";

  export let id: string;

  const cachedDocQuery = useQuery(
    ["cached-docs", id],
    async () => {
      const cached = await listCachedVersions(id);
      return cached;
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      enabled: !!id,
    },
  );
  let settingsDialog: string | undefined = undefined;

  function handleSubmit(settings: {
    version: string;
    fragmentationInstructions: string;
    refinementInstructions: string;
    threshold: number;
    stamp: number;
  }) {
    settingsDialog = undefined;
    runAnalysisSubject$.next(settings);
  }
</script>

{#if $cachedDocQuery.isLoading}
  <div class="w-full flex items-center justify-center grow">
    <Loading dimensions="w-24 h-24" />
  </div>
{:else if $cachedDocQuery.error}
  <span>An error has occurred: {$cachedDocQuery.error}</span>
{:else if settingsDialog}
  <SettingsDialog
    version={settingsDialog}
    on:close={() => {
      settingsDialog = undefined;
    }}
    on:submit={(event) => handleSubmit(event.detail)}
  />
{:else}
  <div
    class="w-full flex flex-col items-center justify-start mt-2 flex-grow overflow-visible"
  >
    <h1 class="text-2xl font-bold">Select Analysis Type</h1>
    <div class="mt-3 flex flex-wrap justify-around">
      <AnalysisCard
        version="v1"
        title="Flexible (Speed: 60s Average)"
        cached={$cachedDocQuery.data["v1"]}
        on:open-settings={(event) => {
          settingsDialog = event.detail;
        }}
      />
      <AnalysisCard
        version="v2"
        title="Highly Sensitive (Speed: 30s Average)"
        cached={$cachedDocQuery.data["v2"]}
        on:open-settings={(event) => {
          settingsDialog = event.detail;
        }}
      />
      <AnalysisCard
        version="v3"
        title="Moderately Sensitive (Speed: 120s Average)"
        cached={$cachedDocQuery.data["v3"]}
        on:open-settings={(event) => {
          settingsDialog = event.detail;
        }}
      />
    </div>
  </div>
{/if}
