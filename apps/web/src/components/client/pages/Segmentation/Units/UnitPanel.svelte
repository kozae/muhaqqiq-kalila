<script lang="ts">
  import type { IChapter } from "../chapters";
  import { useQuery } from "@sveltestack/svelte-query";
  import { listUnits, unitFilter } from "./queries";
  import { requestAction, requestState, source } from "@client/pages/store";
  import { combineLatest, filter, map, startWith, tap } from "rxjs";
  import Loading from "@client/reusable/Loading.svelte";
  import InfoAlert from "@client/reusable/InfoAlert.svelte";
  import UnitList from "./UnitList/UnitList.svelte";
  import { getContext, setContext } from "svelte";
  import { segmentWatcher } from "../segment-watcher";
  import type { UnitEntity } from "pages-tool-store-worker";
  import CommandBar from "./CommandBar/CommandBar.svelte";

  let currentChapter: IChapter | undefined = undefined;
  const mediumId: string = getContext("mediumId");
  const selector = source.selectUnits;

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

  $: {
    if ($query.data) {
      requestAction("loadChapter", {
        chapter: currentChapter!.abbr,
        units: $query.data,
      });
    }
    requestState("selectUnits");
  }

  const page = selector.pipe(map(({ currentPage }) => currentPage));

  const data = combineLatest([
    selector.pipe(filter((e) => e.chapter === currentChapter?.abbr)),
    unitFilter.pipe(startWith("")),
    segmentWatcher,
  ]).pipe(
    map(([{ units }, filter, segments]) => {
      const attachSegment = (u: UnitEntity) => {
        const segment = segments[u.id];
        if (segment) {
          return { ...u, segment };
        }
        return u;
      };
      if (filter && filter.length > 0) {
        return units
          .filter((u) =>
            u.title.toLowerCase().includes(filter.toLocaleLowerCase()),
          )
          .map(attachSegment);
      } else {
        return units.map(attachSegment);
      }
    }),
  );
</script>

<div
  class="animate-fade-in w-5/12 h-full scale-90 rounded bg-secondary-50 opacity-0 flex flex-col"
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

  {#if !$query.isLoading && $data}
    <UnitList items={$data ?? []} page={$page} />
  {/if}
</div>
