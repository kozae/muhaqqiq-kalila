<script lang="ts">
  import { derived, discardRequested, requestState } from "../store";
  import Panel from "./Panel.svelte";
  import { onDestroy, setContext } from "svelte";
  export let pageId: string;
  export let mediumId: string;
  setContext("id", pageId);
  setContext("mediumId", mediumId);
  let key = Date.now();
  const { ready } = derived;

  $: if ($ready === pageId) {
    requestState("selectSegementationData");
  }

  const sub = discardRequested.subscribe(() => {
    requestState("selectSegementationData");
    key = Date.now();
  });

  onDestroy(() => {
    sub.unsubscribe();
  });
</script>

{#key key}
  <Panel />
{/key}
