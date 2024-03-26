<script lang="ts">
  import { useQuery } from "@sveltestack/svelte-query";
  import { getContext } from "svelte";
  import TopRow from "./TopRow.svelte";
  import RowHeading from "./RowHeading.svelte";
  import Row from "./Row.svelte";
  import { collationData, idToSiglum } from "../state-controls";
  import Loading from "@client/reusable/Loading.svelte";

  export let chapter: string;
  export let media: string[];
  const id = getContext("id") as string;
  const page = getContext("page") as number;

  collationData.next({
    chapter,
    media,
  });

  const queryResult = useQuery(
    `ChpaterCollationContent_${id}_${page}`,
    async () => {
      const allUnits = await fetch(
        `/srv/data/collation_contents/${chapter}/units.json`,
        {
          cache: "no-store",
        },
      ).then((res) => res.json());
      const units = allUnits.slice(page * 10, (page + 1) * 10);
      const columns = [];
      for (const medium of media) {
        const all = await fetch(
          `/srv/data/collation_contents/${chapter}/${id}/${medium}.json`,
          {
            cache: "no-store",
          },
        ).then((res) => res.json());
        columns.push({
          ...all,
          segments: {
            ids: all.segments.ids.slice(page * 10, (page + 1) * 10),
            seq: all.segments.seq.slice(page * 10, (page + 1) * 10),
          },
        });
      }

      return {
        units,
        columns,
        sigla: columns.map((c) => c.siglum),
        numberOfColumns: columns.length,
      };
    },
  );

  function getRowData(index: number, columns: any[]) {
    const res = [];

    for (const column of columns) {
      const segment = column.segments.ids[index];
      if (segment) {
        res.push({
          id: segment,
          seq: column.segments.seq[index],
        });
      } else {
        res.push(null);
      }
    }

    return res;
  }
</script>

{#if $queryResult.data}
  <TopRow sigla={$queryResult.data.sigla} />
  {#each $queryResult.data.units as unit, index}
    <RowHeading {unit} columns={$queryResult.data.numberOfColumns} />
    {#if !unit.divider}
      <Row
        data={getRowData(index, $queryResult.data.columns)}
        numberOfColumns={$queryResult.data.numberOfColumns}
      />
    {/if}
  {/each}
{:else if $queryResult.isLoading}
  <div class="w-full flex items-center justify-center h-full">
    <Loading dimensions="w-24 h-24" />
  </div>
{/if}
