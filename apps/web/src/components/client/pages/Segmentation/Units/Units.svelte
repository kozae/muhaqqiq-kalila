<script lang="ts">
  import type { IChapter } from "../chapters";
  import ChapterSelector from "./ChapterSelector.svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { listUnits } from "./queries";
  import { requestAction, requestState, source } from "@client/pages/store";
  import { filter } from "rxjs";
  import Loading from "@client/reusable/Loading.svelte";
  import InfoAlert from "@client/reusable/InfoAlert.svelte";

  let currentChapter: IChapter | undefined = undefined;

  const query = useQuery(
    //@ts-ignore
    ["units", currentChapter?.id],
    async () => {
      const res = await listUnits(currentChapter!.id);
      return res;
    },
    { enabled: !!currentChapter },
  );

  $: query.setOptions(
    ["units", currentChapter?.id],
    async () => {
      const res = await listUnits(currentChapter!.id);
      return res;
    },
    { enabled: !!currentChapter },
  );

  $: {
    if ($query.data) {
      console.log("loading");
      requestAction("loadChapter", {
        chapter: currentChapter!.abbr,
        units: $query.data,
      });
    }
    requestState("selectUnits");
  }
  const data = source.selectUnits.pipe(
    filter((e) => e.chapter === currentChapter?.abbr),
  );
  $: items = $data.units;
</script>

<div
  class="animate-fade-in w-5/12 h-full scale-90 rounded bg-secondary-50 opacity-0 flex flex-col"
>
  <div class="flex w-full justify-center font-bold h-fit">
    <ChapterSelector
      text={currentChapter
        ? `${currentChapter.abbr} - ${currentChapter.name}`
        : "Select Chapter"}
      on:selected={(e) => (currentChapter = e.detail)}
    />
  </div>

  {#if currentChapter && ($query.isLoading || !$query.data)}
    <Loading />
  {/if}

  {#if !currentChapter}
    <InfoAlert message="No chapter selected" />
  {/if}

  {#if !$query.isLoading && $query.data && $query.data.items.length === 0}
    <InfoAlert message="No units defined in this chapter" />
  {/if}

  {#if !$query.isLoading && $data}
    <div class="flex flex-col grow overflow-y-auto">
      {#each $data.units as unit}
        <div>{unit.title}</div>
      {/each}
    </div>
  {/if}
</div>
