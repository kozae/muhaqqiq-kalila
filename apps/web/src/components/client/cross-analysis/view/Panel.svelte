<script lang="ts">
  import { useQuery } from "@sveltestack/svelte-query";
  import {
    getCrossAnalysis,
    getSegmentContentIds,
    getSegmentContents,
    getSigla,
    getSiglaOrder,
  } from "./query";
  import { flatten } from "lodash";
  import Loading from "@client/reusable/Loading.svelte";
  import type { Analysis } from "./model";
  import Content from "./Content.svelte";

  export let id: string;

  const query = useQuery(
    ["cross-analysis", id],
    async () => {
      const { segments = [], info } = await getSegmentContentIds(id);

      const sigla = await getSigla(segments.map((id) => id.mediumId!));

      const content = await getSegmentContents(segments.map(({ id }) => id!));

      const passages: Record<string, string> = {};

      for (const [segId, item] of Object.entries(content)) {
        const mediumId =
          segments.find(({ id }) => id === segId)?.mediumId ?? "";
        const siglum = sigla[mediumId];
        if (siglum) {
          if (siglum === "IH") {
            continue;
          }
          passages[siglum] = flatten(item.tokens).join(" ");
        }
      }

      const analysis = (await getCrossAnalysis({
        key: id,
        passages,
      })) as Analysis;

      const orderedSigla = await getSiglaOrder(info.frame ?? "");

      return { analysis, passages, info, sigla: orderedSigla };
    },
    {
      enabled: !!id,
    },
  );
</script>

{#if $query.isLoading}
  <div class="w-full flex items-center justify-center grow">
    <Loading dimensions="w-24 h-24" />
  </div>
{:else if $query.error}
  <span>An error has occurred: {$query.error}</span>
{:else}
  <Content data={$query.data} />
{/if}
