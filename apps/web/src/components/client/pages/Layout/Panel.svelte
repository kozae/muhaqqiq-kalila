<script lang="ts">
  import { requestAction, requestState, source } from "@client/pages/store";
  import CommandBar from "./CommandBar.svelte";
  import SortableElements from "@client/pages/common/SortableElements.svelte";
  import EditRegion from "../common/EditRegion.svelte";
  import { hoveredRegion$, regionUnderEdit$ } from "../facsimile-events";
  import { map, mergeMap, of } from "rxjs";
  import { removeFromCache, requestRegion } from "../facsimile-worker";
  import { getContext } from "svelte";

  let mode: "view" | "edit" = "view";
  requestState("selectLayoutPanelData");
  const data = source.selectLayoutPanelData;
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
</script>

{#if mode === "view"}
  <CommandBar />
  {#if $data}
    {#key $data.version}
      <SortableElements
        items={$data.elements}
        canDelete={$data.canDelete}
        on:orderChanged={(e) => requestAction("updateLayoutElements", e.detail)}
        on:deleteElement={(e) => requestAction("deleteLayoutElement", e.detail)}
        on:editRegion={(e) => onEdit(e.detail)}
        on:changeType={(e) =>
          requestAction("changeLayoutElementPosition", e.detail)}
      />
    {/key}
  {/if}
{:else}
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
{/if}
