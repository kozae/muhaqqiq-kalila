<script lang="ts">
  import CommandBarContainer from "@client/pages/common/CommandBarContainer.svelte";
  import Menu from "@client/reusable/Menu.svelte";
  import SmallButton from "@client/reusable/SmallButton.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import MagicIcon from "@icons/MagicIcon.svelte";
  import ChevronDownIcon from "@icons/ChevronDownIcon.svelte";
  import { createEventDispatcher } from "svelte";
  import RunDetectionJob from "./RunDetectionJob.svelte";
  import LineCount from "./LineCount.svelte";

  export let pageNumber: number = 0;
  export let presentElements: { display: string; id: string }[] | undefined =
    undefined;
  export let hasTextElementsRegions = false;
  export let hasLines = false;

  const dispatch = createEventDispatcher();
  let showRunDetectionlModal = false;
  let showLineCountModal = false;
  let selectedElement: string | undefined;
</script>

<CommandBarContainer>
  <Menu
    items={presentElements?.map((el) => el.display) ?? ["no regions defined"]}
    buttonText="Add Lines in"
    on:itemClick={(event) => {
      selectedElement = presentElements?.find(
        (el) => el.display === event.detail,
      )?.id;
      showLineCountModal = true;
    }}
  >
    <DocumentTextIcon
      slot="prefixIcon"
      className="text-primary-700 -ml-0.5 h-5 w-5"
    />
    <ChevronDownIcon
      slot="suffixIcon"
      className="-mr-1 h-5 w-5 text-gray-400"
    />
  </Menu>

  <LineCount
    bind:show={showLineCountModal}
    on:lineCount={(e) => {
      dispatch("addLines", {
        elementId: selectedElement,
        count: e.detail,
      });
      showLineCountModal = false;
    }}
  />

  {#if hasTextElementsRegions && hasLines}
    <SmallButton on:click={() => (showRunDetectionlModal = true)}>
      <MagicIcon className="text-primary-700 -ml-0.5 h-5 w-5" />
      Automated Detection
    </SmallButton>

    <RunDetectionJob
      bind:showScheduleJobModalModal={showRunDetectionlModal}
      on:loadLines={(e) => {
        dispatch("previewLines", e.detail);
        showRunDetectionlModal = false;
      }}
      {pageNumber}
    />
  {/if}
</CommandBarContainer>
