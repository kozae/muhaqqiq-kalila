<script lang="ts">
  import CommandBarContainer from "@client/pages/common/CommandBarContainer.svelte";
  import Menu from "@client/reusable/Menu.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import PhotoIcon from "@icons/PhotoIcon.svelte";
  import ChevronDownIcon from "@icons/ChevronDownIcon.svelte";

  const textElementTypes: string[] = [
    "main body",
    "main text in margin",
    "gloss",
    "legend",
    "side title",
    "correction in margin",
    "poem",
    "stamp",
  ];
  const imageElementTypes: string[] = ["image in main body", "image in margin"];
</script>

<CommandBarContainer>
  <Menu
    items={textElementTypes}
    buttonText="Add Text Element"
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
    items={imageElementTypes}
    buttonText="Add Image Element"
    on:itemClick={(event) => console.log("adding image element", event.detail)}
  >
    <PhotoIcon slot="prefixIcon" className="text-primary-700 -ml-0.5 h-5 w-5" />
    <ChevronDownIcon
      slot="suffixIcon"
      className="-mr-1 h-5 w-5 text-gray-400"
    />
  </Menu>
</CommandBarContainer>
