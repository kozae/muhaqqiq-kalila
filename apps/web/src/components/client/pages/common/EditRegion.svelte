<script lang="ts">
  import type {
    ImageEntity,
    LineEntity,
    TextEntity,
  } from "pages-tool-store-worker";
  import PanelContainer from "./PanelContainer.svelte";

  import BigButton from "@client/reusable/BigButton.svelte";
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { regionUrl, requestRegion } from "../facsimile-worker";
  import { map, filter } from "rxjs";
  import { editRegionPoints$, initialPoints } from "../facsimile-events";

  export let element: TextEntity | ImageEntity | LineEntity | undefined;
  let currentRegion: number[] = [];
  const dispatch = createEventDispatcher();
  const pageId: string = getContext("id");
  const url = regionUrl.pipe(
    filter((v) => v.pageId === pageId && v.id.includes("preview")),
    map((v) => v.region),
  );

  editRegionPoints$.next((element?.region ?? initialPoints) as number[]);

  const sub = editRegionPoints$.subscribe((points) => {
    requestRegion(
      {
        id: "preview",
        region: points,
        color: "",
        order: 0,
      },
      pageId,
      3,
    );
    currentRegion = points;
  });

  onDestroy(() => {
    sub.unsubscribe();
  });
</script>

<PanelContainer panelHasCommandBar={false}>
  <h2 class="w-full text-center text-lg">
    Define region for element: [{(element?.order ?? 0) + 1}.
    {element?.position}]
  </h2>

  <div class="flex w-full justify-center">
    <BigButton
      className="bg-secondary-100 mt-2"
      on:click={() => dispatch("done", currentRegion)}
    >
      Done
    </BigButton>
  </div>

  <img
    class="rounded"
    style="max-width: 100%; height: auto; object-fit: contain;"
    src={$url}
    alt="failed"
  />
</PanelContainer>
