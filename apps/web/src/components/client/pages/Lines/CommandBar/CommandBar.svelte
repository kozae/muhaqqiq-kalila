<script lang="ts">
  import CommandBarContainer from "@client/pages/common/CommandBarContainer.svelte";
  import Menu from "@client/reusable/Menu.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import MagicIcon from "@icons/MagicIcon.svelte";
  import ChevronDownIcon from "@icons/ChevronDownIcon.svelte";
  import { createEventDispatcher } from "svelte";
  import ScheduleDetectionJob from "./ScheduleDetectionJob.svelte";
  import JobResults from "./JobResults.svelte";

  export let pageNumber: number = 0;
  export let presentElements: { display: string; id: string }[] | undefined =
    undefined;
  export let hasTextElementsRegions = false;
  const automatedDetectionOptions: string[] = [
    "Schedule a job ...",
    "Load job results...",
  ];
  const dispatch = createEventDispatcher();
  let showScheduleJobModalModal = false;
  let showJobResultsModal = false;
</script>

<CommandBarContainer>
  <Menu
    items={presentElements?.map((el) => el.display) ?? ["no regions defined"]}
    buttonText="Add Line in"
    on:itemClick={(event) =>
      dispatch(
        "addLine",
        presentElements?.find((el) => el.display === event.detail)?.id,
      )}
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

  {#if hasTextElementsRegions}
    <Menu
      items={automatedDetectionOptions}
      buttonText="Automated Detection"
      on:itemClick={(event) => {
        if (event.detail === "Schedule a job ...") {
          showScheduleJobModalModal = true;
        } else {
          showJobResultsModal = true;
        }
      }}
    >
      <MagicIcon
        slot="prefixIcon"
        className="text-primary-700 -ml-0.5 h-5 w-5"
      />
      <ChevronDownIcon
        slot="suffixIcon"
        className="-mr-1 h-5 w-5 text-gray-400"
      />
    </Menu>
    <ScheduleDetectionJob bind:showScheduleJobModalModal {pageNumber} />
    <JobResults
      bind:showJobResultsModal
      on:loadLines={(e) => dispatch("previewLines", e.detail)}
    />
  {/if}
</CommandBarContainer>
