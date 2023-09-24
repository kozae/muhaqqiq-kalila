<script lang="ts">
  import { requestAction, requestState, source } from "@client/pages/store";
  import CommandBar from "./CommandBar/CommandBar.svelte";
  import SortableElements from "@client/pages/common/SortableElements.svelte";
  import { map, mergeMap, of } from "rxjs";
  import {
    hoveredRegion$,
    regionUnderEdit$,
    detectedRegions$,
  } from "../facsimile-events";
  import EditRegion from "../common/EditRegion.svelte";
  import { removeFromCache, requestRegion } from "../facsimile-worker";
  import { getContext } from "svelte";
  import { EtlDetectedRegions } from "./etl-detected-regions";
  import type { ILayoutElement } from "pages-tool-store-worker";
  import { mode as facsimileMode } from "@client/pages/Facsimile/mode-store";
  import Review from "./Review/Review.svelte";

  let mode: "view" | "edit" | "review-regions" = "view";
  requestState("selectLinePanelData");
  const data = source.selectLinePanelData;
  const regionUnderEdit = regionUnderEdit$.pipe(
    mergeMap((id) => {
      if (!id) return of(undefined);
      return data.pipe(map((data) => data?.elements.find((e) => e.id === id)));
    }),
  );
  let regionUnderEditId: string | undefined;
  const onEdit = (id: string) => {
    mode = "edit";
    regionUnderEditId = id;
    regionUnderEdit$.next(id);
  };
  const pageId = getContext("id");
  let detectedLines: ILayoutElement[] = [];

  function handleReviewDone(e: any) {
    requestAction("assignDetectedRegions", e.detail);
    mode = "view";
    facsimileMode.set("view");
    detectedRegions$.next([]);
  }
</script>

{#if mode === "view"}
  {#if $data}
    {#key $data.version}
      <CommandBar
        presentElements={$data.elements
          .filter((el) => el.position !== "line")
          .map((el) => ({
            display: `${(el.order ?? 0) + 1}.  ${el.position}`,
            id: el.id,
          }))}
        pageNumber={$data.pageNumber}
        hasTextElementsRegions={$data.hasTextElementsRegions}
        on:addLine={(e) => requestAction("addLine", e.detail)}
        on:previewLines={(e) => {
          mode = "review-regions";
          detectedLines = EtlDetectedRegions(e.detail);
          detectedRegions$.next(detectedLines);
          facsimileMode.set("review");
        }}
      />
      <SortableElements
        items={$data.elements}
        draggables={["line"]}
        canDelete={$data.canDelete}
        on:orderChanged={(e) => requestAction("updateLines", e.detail)}
        on:deleteElement={(e) => requestAction("removeLine", e.detail)}
        on:editRegion={(e) => onEdit(e.detail)}
      />
    {/key}
  {/if}
{:else if mode === "edit"}
  <EditRegion
    element={$regionUnderEdit}
    on:done={(e) => {
      mode = "view";
      requestAction("defineElementFacsimileRegion", {
        id: regionUnderEditId ?? "",
        region: e.detail,
      });
      removeFromCache(regionUnderEditId ?? "");
      //@ts-ignore
      requestRegion({ ...$regionUnderEdit, region: e.detail }, pageId);
      regionUnderEdit$.next(undefined);
      hoveredRegion$.next(undefined);
    }}
  />
{:else}
  <Review
    {detectedLines}
    elements={$data.elements}
    on:reviewDone={handleReviewDone}
  />
{/if}
