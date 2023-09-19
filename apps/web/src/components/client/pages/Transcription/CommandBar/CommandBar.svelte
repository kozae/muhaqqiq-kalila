<script lang="ts">
  import CommandBarContainer from "@client/pages/common/CommandBarContainer.svelte";
  import EditionSymbolsDropdownMenu from "./EditionSymbolsDropdownMenu.svelte";
  import Switch from "@client/reusable/Switch.svelte";
  let isEnabled = false;
</script>

<CommandBarContainer
  ><EditionSymbolsDropdownMenu />
  <Switch label="Previews" bind:isEnabled>
    <svg
      slot="disabled"
      class="h-3 w-3 text-gray-400"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg
      slot="enabled"
      class="h-3 w-3 text-primary-600"
      fill="currentColor"
      viewBox="0 0 12 12"
    >
      <path
        d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
      />
    </svg>
  </Switch>
</CommandBarContainer>
