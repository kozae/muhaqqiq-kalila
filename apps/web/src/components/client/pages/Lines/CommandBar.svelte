<script lang="ts">
  import CommandBarContainer from "@client/pages/common/CommandBarContainer.svelte";
  import Menu from "@client/reusable/Menu.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import MagicIcon from "@icons/MagicIcon.svelte";
  import ChevronDownIcon from "@icons/ChevronDownIcon.svelte";

  export let presentElements: string[] | undefined = undefined;
  const automatedDetectionOptions: string[] = [
    "Schedule a job ...",
    "Load job results...",
  ];
</script>

<CommandBarContainer>
  <Menu
    items={presentElements ?? ["no regions defined"]}
    buttonText="Add Line in"
    on:itemClick={(event) => console.log("adding text element", event.detail)}
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

  <Menu
    items={automatedDetectionOptions}
    buttonText="Automated Detection"
    on:itemClick={(event) => console.log("adding image element", event.detail)}
  >
    <MagicIcon slot="prefixIcon" className="text-primary-700 -ml-0.5 h-5 w-5" />
    <ChevronDownIcon
      slot="suffixIcon"
      className="-mr-1 h-5 w-5 text-gray-400"
    />
  </Menu>
</CommandBarContainer>
