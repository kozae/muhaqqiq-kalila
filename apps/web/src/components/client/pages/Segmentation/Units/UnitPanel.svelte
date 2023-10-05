<script lang="ts">
  import type { IChapter } from "../chapters";
  import { useQuery } from "@sveltestack/svelte-query";
  import { listUnits, unitFilter } from "./queries";
  import { requestAction, requestState, source } from "@client/pages/store";
  import { combineLatest, filter, map, startWith } from "rxjs";
  import Loading from "@client/reusable/Loading.svelte";
  import InfoAlert from "@client/reusable/InfoAlert.svelte";
  import UnitList from "./UnitList/UnitList.svelte";
  import { getContext } from "svelte";
  import { segmentWatcher } from "../segment-watcher";
  import { selectedUnit } from "./modal-states";
  import type { UnitEntity } from "pages-tool-store-worker";
  import CommandBar from "./CommandBar/CommandBar.svelte";
  import DeleteModal from "./Modals/DeleteUnit.svelte";
  import CreateUnit from "./Modals/CreateUnit.svelte";
  import UpdateUnit from "./Modals/UpdateUnit.svelte";

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
  const bookId = selector.pipe(map(({ bookId }) => bookId));
  const parentId = selector.pipe(map(({ parentId }) => parentId));

  const data = combineLatest([
    selector.pipe(filter((e) => e.chapter === currentChapter?.abbr)),
    unitFilter.pipe(startWith("")),
    segmentWatcher,
  ]).pipe(
    map(([{ units, currentPage }, filter, segments]) => {
      const attachSegment = (u: UnitEntity) => {
        const segment = segments[u.id];
        if (segment) {
          return { ...u, segment };
        }
        if (!segment && u.segment && u.segment.page === currentPage) {
          return { ...u, segment: undefined };
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
    <UnitList items={$data} page={$page} />
  {/if}
  <DeleteModal />
  {#if $parentId && $bookId}
    {#key $parentId}
      <CreateUnit bookId={$bookId} parentId={$parentId} />
      {#if $selectedUnit}
        {#key $selectedUnit.id}
          <UpdateUnit parentId={$parentId} selectedUnitData={$selectedUnit} />
        {/key}
      {/if}
    {/key}
  {/if}
</div>
