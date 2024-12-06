<script lang="ts">
  import { type IChapter, CHAPTERS } from "../chapters";
  import { useQuery } from "@sveltestack/svelte-query";
  import { listUnits, unitFilter } from "./queries";
  import Loading from "@client/reusable/Loading.svelte";
  import InfoAlert from "@client/reusable/InfoAlert.svelte";
  import UnitList from "./UnitList/UnitList.svelte";
  import { getContext } from "svelte";
  import CommandBar from "./CommandBar/CommandBar.svelte";
  import { chapterParam$ } from "./chapter-in-url";

  let currentChapter: IChapter | undefined = undefined;

  $: {
    const abbr = $chapterParam$;
    if (abbr) {
      currentChapter = CHAPTERS.find((c) => c.abbr === abbr);
    }
  }

  const mediumId: string = getContext("mediumId");

  const query = useQuery(
    //@ts-ignore
    ["units", currentChapter?.id],
    async () => {
      const res = await listUnits(currentChapter!.id, mediumId);
      return res;
    },
    { enabled: !!currentChapter },
  );

  $: query.setOptions(
    ["units", currentChapter?.id],
    async () => {
      const res = await listUnits(currentChapter!.id, mediumId);
      return res;
    },
    { enabled: !!currentChapter },
  );
</script>

<div
  class="animate-fade-in w-9/12 h-full scale-90 rounded bg-secondary-50 opacity-0 flex flex-col"
>
  <CommandBar bind:currentChapter />
  {#if currentChapter && ($query.isLoading || !$query.data)}
    <Loading />
  {/if}

  {#if !currentChapter}
    <InfoAlert message="No chapter selected" />
  {/if}

  {#if !$query.isLoading && $query.data && $query.data.items.length === 0}
    <InfoAlert message="No units defined in this chapter" />
  {/if}

  {#if !$query.isLoading && $query.data?.items}
    <UnitList items={$query.data.items} filter={$unitFilter} />
  {/if}
</div>
