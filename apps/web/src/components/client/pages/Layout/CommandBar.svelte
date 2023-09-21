<script lang="ts">
  import CommandBarContainer from "@client/pages/common/CommandBarContainer.svelte";
  import {
    textElementTypes,
    imageElementTypes,
  } from "@client/pages/common/element-types";
  import Menu from "@client/reusable/Menu.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import PhotoIcon from "@icons/PhotoIcon.svelte";
  import ChevronDownIcon from "@icons/ChevronDownIcon.svelte";
  import { requestAction } from "../store";
</script>

<CommandBarContainer>
  <Menu
    items={textElementTypes}
    buttonText="Add Text Element"
    on:itemClick={(event) => requestAction("addLayoutElement", event.detail)}
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
    on:itemClick={(event) => requestAction("addLayoutElement", event.detail)}
  >
    <PhotoIcon slot="prefixIcon" className="text-primary-700 -ml-0.5 h-5 w-5" />
    <ChevronDownIcon
      slot="suffixIcon"
      className="-mr-1 h-5 w-5 text-gray-400"
    />
  </Menu>
</CommandBarContainer>
