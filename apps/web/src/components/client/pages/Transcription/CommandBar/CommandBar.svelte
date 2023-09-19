<script lang="ts">
  import CommandBarContainer from "@client/pages/common/CommandBarContainer.svelte";
  import EditionSymbolsDropdownMenu from "./EditionSymbolsDropdownMenu.svelte";
  import Switch from "@client/reusable/Switch.svelte";
  import Moveable from "svelte-moveable";
  import RegionPreview from "@client/pages/common/RegionPreview.svelte";
  import { source } from "@client/pages/store";
  import { filter, first, map, mergeMap, tap, withLatestFrom } from "rxjs";
  import { getContext } from "svelte";
  import { hoveredRegion$ } from "@client/pages/facsimile-events";
  import { regionUrl, requestRegion } from "@client/pages/facsimile-worker";
  import type { ILayoutElement } from "pages-tool-store-worker";
  import EyeIcon from "@icons/EyeIcon.svelte";
  import EyeSlashIcon from "@icons/EyeSlashIcon.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import DocumentIcon from "@icons/DocumentIcon.svelte";
  import SmallCardGroup from "@client/reusable/SmallCardGroup.svelte";

  let isEnabled = false;
  let selectedOption = "Body";

  let previewTraget: HTMLElement | null = null;
  const throttleDrag = 1;
  const edgeDraggable = false;
  const startDragRotate = 0;
  const throttleDragRotate = 0;
  const id: string = getContext("id");
  const el$ = hoveredRegion$.pipe(
    filter((v) => !!v),
    withLatestFrom(
      source.selectTranscriptionPanelData.pipe(
        filter((data) => data.id === id),
        map((data) => data.lines),
      ),
    ),
    map(([id, lines]) => lines[id!]),
    tap((v) => requestRegion(v! as ILayoutElement, id)),
  );

  const url = el$.pipe(
    filter((v) => !!v),
    map((v) => v!.id),
    mergeMap((elId) =>
      regionUrl.pipe(
        first((v) => v.pageId === id && v.id === elId),
        map((v) => v.region),
      ),
    ),
  );
</script>

<CommandBarContainer>
  <EditionSymbolsDropdownMenu />
  <Switch labelLeft="Previews" bind:isEnabled>
    <EyeSlashIcon slot="disabled" className="h-4 w-4 text-gray-500" />
    <EyeIcon slot="enabled" className="h-4 w-4 text-primary-600" />
  </Switch>
  <!-- <SmallCardGroup /> -->
</CommandBarContainer>

{#if isEnabled}
  <div
    bind:this={previewTraget}
    class="fixed top-0 left-0 z-50 h-fit w-fit"
    style="border: none;"
  >
    <RegionPreview
      element={$el$}
      image={$url}
      on:close={() => (isEnabled = false)}
    />
  </div>
  <Moveable
    target={previewTraget}
    origin={false}
    edge={false}
    draggable={true}
    {throttleDrag}
    {edgeDraggable}
    {startDragRotate}
    {throttleDragRotate}
    on:drag={({ detail: e }) => {
      e.target.style.transform = e.transform;
    }}
  ></Moveable>
{/if}
