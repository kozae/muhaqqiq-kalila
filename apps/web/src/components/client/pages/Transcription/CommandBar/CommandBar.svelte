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
  import SmallButton from "@client/reusable/SmallButton.svelte";
  import { selectedTextClass } from "../selected-text-class";
  import { editorStats, actions } from "../event-hubs";
  import Menu from "@client/reusable/Menu.svelte";
  import { segmentsEnabledToggle } from "../segment-markers-toggle";

  export let segmentsChangable = true;
  export let withMarginalia = true;

  let previewEnabled = false;
  let segmentsEnabled = segmentsChangable ? false : true;

  $: segmentsEnabledToggle.update(() => segmentsEnabled);

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
    tap((v) => requestRegion(v! as ILayoutElement, id, 5)),
  );

  const url = el$.pipe(
    filter((v) => !!v),
    map((v) => v!.id),
    mergeMap((elId) =>
      regionUrl.pipe(
        first((v) => v.pageId === id && v.id === `padded_${elId}`),
        map((v) => v.region),
      ),
    ),
  );
  const hasMarginalia = source.selectTranscriptionPanelData.pipe(
    filter((data) => data.id === id),
    map((data) => data.hasGloss),
  );

  const glossKeys = source.selectTranscriptionPanelData.pipe(
    filter((data) => data.id === id),
    map((data) => Object.keys(data.glosses)),
  );
</script>

<CommandBarContainer>
  {#if withMarginalia && $hasMarginalia}
    <div>
      <SmallButton
        bgcolor={$selectedTextClass === "Body"
          ? "bg-primary-600 text-white"
          : "bg-white"}
        on:click={() => selectedTextClass.next("Body")}
        disabled={$selectedTextClass === "Body"}>Main</SmallButton
      >

      <Menu
        items={$glossKeys}
        buttonText={$selectedTextClass === "Body"
          ? "Marginalia"
          : $selectedTextClass}
        bg={$selectedTextClass !== "Body"
          ? "bg-primary-600 text-white"
          : "bg-white"}
        hoverBg={$selectedTextClass !== "Body" ? "" : "hover:bg-secondary-100"}
        on:itemClick={(event) => selectedTextClass.next(event.detail)}
      />
    </div>
  {/if}

  <div class="flex items-center">
    <EditionSymbolsDropdownMenu />
    <SmallButton
      on:click={() => actions.next({ type: "remove" })}
      disabled={!$editorStats?.selectedText}
      className={!$editorStats?.selectedText ? "opacity-50" : ""}
      >Remove symbols</SmallButton
    >
  </div>

  <Switch labelLeft="Previews" bind:isEnabled={previewEnabled}>
    <EyeSlashIcon slot="disabled" className="h-4 w-4 text-gray-500" />
    <EyeIcon slot="enabled" className="h-4 w-4 text-primary-600" />
  </Switch>

  {#if segmentsChangable}
    <Switch labelLeft="Segments" bind:isEnabled={segmentsEnabled}>
      <EyeSlashIcon slot="disabled" className="h-4 w-4 text-gray-500" />
      <EyeIcon slot="enabled" className="h-4 w-4 text-primary-600" />
    </Switch>
  {/if}
</CommandBarContainer>

{#if previewEnabled}
  <div
    bind:this={previewTraget}
    class="fixed top-0 left-0 z-50 h-fit w-fit"
    style="border: none;"
  >
    <RegionPreview
      element={$el$}
      image={$url}
      on:close={() => (previewEnabled = false)}
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
