<script lang="ts">
  import { derived, requestState } from "../store";
  import Panel from "./Panel.svelte";
  import { setContext } from "svelte";
  export let pageId: string;
  export let mediumId: string;
  setContext("id", pageId);
  setContext("mediumId", mediumId);

  const { ready } = derived;

  $: if ($ready === pageId) {
    requestState("selectSegementationData");
  }
</script>

<Panel />
