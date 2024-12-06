<script lang="ts">
  import SmallButton from "@client/reusable/SmallButton.svelte";
  import PencilSquareIcon from "@icons/PencilSquareIcon.svelte";
  import PanelContainer from "../common/PanelContainer.svelte";
  import { requestState, source } from "@client/pages/store";
  import DetailListItem from "./Display/DetailListItem.svelte";
  import Header from "./Display/Header.svelte";
  import ImageAttachment from "./Display/ImageAttachment.svelte";
  import Loading from "@client/reusable/Loading.svelte";

  export let mode: "view" | "edit" = "view";
  const onEdit = () => {
    mode = "edit";
  };
  requestState("selectSummary");
  const summary$ = source.selectSummary;
</script>

{#if $summary$}
  <PanelContainer panelHasCommandBar={false}>
    <div class="flex justify-between">
      <Header
        title="Page Information"
        description="Manually entered information"
      />
      <SmallButton className="text-primary-900" on:click={onEdit}>
        <PencilSquareIcon className="-ml-0.5 h-5 w-5" />
        Edit
      </SmallButton>
    </div>

    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <DetailListItem
          bgClass="bg-gray-50"
          title="Digital Number"
          value={$summary$.info.number.toString()}
        />
        <DetailListItem
          title="Foliation"
          value={$summary$.info.foliation ?? "[no data]"}
        />
        <DetailListItem
          bgClass="bg-gray-50"
          title="Pagination"
          value={$summary$.info.pagination
            ? `${$summary$.info.pagination}`
            : "[no data]"}
        />
        <DetailListItem
          title="Tags"
          value={$summary$.info.tags
            ? $summary$.info.tags.join(", ")
            : "[no data]"}
        />
        <DetailListItem
          bgClass="bg-gray-50"
          title="Commentary"
          value={$summary$.info.commentary
            ? $summary$.info.commentary.join(", ")
            : "[no data]"}
        />
        <ImageAttachment
          title="Image file"
          file={{ name: $summary$.info.image, dataUrl: $summary$.imageDataUrl }}
        />
      </dl>
    </div>
    <Header
      title="Editorial Summary"
      description="Automatically aggregated information"
    />
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <DetailListItem
          bgClass="bg-gray-50"
          title="Layout"
          value={`${$summary$.textElements} text element(s), ${$summary$.images} image(s)`}
        />
        <DetailListItem
          title="Lines"
          value={`${$summary$.lines} lines defined`}
        />
        <DetailListItem
          bgClass="bg-gray-50"
          title="Transcription"
          value={`${$summary$.transcripedLinesCount} lines transcribed, total ${$summary$.transcripedTokensCount} words`}
        />
        <DetailListItem
          title="Segmentation"
          value={$summary$.segments.length === 0
            ? "[no segments assigned]"
            : `${
                $summary$.segments.length
              } segment(s): ${$summary$.segments.join(", ")}`}
        />
      </dl>
    </div>
  </PanelContainer>
{:else}
  <Loading />
{/if}
