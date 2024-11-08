<script lang="ts">
  import { useQuery } from "@sveltestack/svelte-query";
  import {
    listCachedVersions,
    getSegmentContentIds,
    getSegmentContents,
    getSigla,
    getSiglaOrder,
    loadCachedFile,
    runCrossAnalysis,
  } from "./query";
  import { flatten } from "lodash";
  import Loading from "@client/reusable/Loading.svelte";
  import type { Analysis } from "./model";
  import Content from "./Content.svelte";
  import { analysisDocFromUrl$, setQueryParams } from "./analysis-doc-from-url";
  import { analysis, runAnalysisSubject$ } from "./store";

  export let id: string;

  const dataQuery = useQuery(
    ["cross-analysis", id],
    async () => {
      const { segments = [], info } = await getSegmentContentIds(id);

      const sigla = await getSigla(segments.map((id) => id.mediumId!));

      const content = await getSegmentContents(segments.map(({ id }) => id!));

      const passageTokens: Record<string, string[]> = {};

      for (const [segId, item] of Object.entries(content)) {
        const mediumId =
          segments.find(({ id }) => id === segId)?.mediumId ?? "";
        const siglum = sigla[mediumId];
        if (siglum) {
          if (siglum === "IH") {
            continue;
          }
          passageTokens[siglum] = flatten(item.tokens) as string[];
        }
      }
      const orderedSigla = await getSiglaOrder(info.frame ?? "");

      return { passages: passageTokens, info, sigla: orderedSigla, id };
    },
    {
      enabled: !!id,
    },
  );

  const cachedDocQuery = useQuery(
    ["cached-doc", id, null, null],
    async (): Promise<Analysis | null> => {
      return null;
    },
    {
      enabled: false,
    },
  );

  const analysisRunQuery = useQuery(
    ["analysis-run", id, null, null],
    async (): Promise<{ analysis: Analysis; version: string } | null> => {
      return null;
    },
    {
      enabled: false,
    },
  );

  $: {
    const params = $analysisDocFromUrl$;
    const version = params.version;
    const timestamp = params.timestamp;
    cachedDocQuery.setOptions(
      ["cached-doc", id, version, timestamp],
      async () => {
        const cached = await loadCachedFile(
          id,
          params.version ?? "",
          params.timestamp ?? "",
        );
        return cached as Analysis;
      },
      {
        enabled: !!id && !!version && !!timestamp,
      },
    );
  }

  $: {
    const settings = $runAnalysisSubject$;

    if (settings) {
      const data = $dataQuery.data;
      if (data) {
        const passages: Record<string, string> = {};
        for (const [siglum, tokens] of Object.entries(data.passages)) {
          passages[siglum] = tokens.join(" ");
        }
        const { version, stamp, ...rest } = settings;
        analysisRunQuery.setOptions(
          ["analysis-run", id, stamp.toString(), version],
          async () => {
            const analysis = await runCrossAnalysis(
              { key: id, passages, ...rest },
              version,
            );
            return { analysis: analysis as Analysis, version };
          },
          {
            cacheTime: Infinity,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
          },
        );
      }
    }
  }

  $: {
    analysis.set($cachedDocQuery.data);
  }

  $: {
    const data = $analysisRunQuery.data;
    if (data) {
      analysis.set(data.analysis);
      setQueryParams(
        {
          version: data.version,
          timestamp: data.analysis.timestamp ?? "",
        },
        false,
      );
    }
    runAnalysisSubject$.next(undefined);
  }
</script>

{#if $dataQuery.isLoading || $cachedDocQuery.isLoading || $analysisRunQuery.isLoading}
  <div class="w-full flex items-center justify-center grow">
    <Loading dimensions="w-24 h-24" />
  </div>
{:else if $dataQuery.error || $cachedDocQuery.error || $analysisRunQuery.error}
  <span>An error has occurred: {$dataQuery.error}</span>
{:else}
  <Content data={$dataQuery.data} />
{/if}
