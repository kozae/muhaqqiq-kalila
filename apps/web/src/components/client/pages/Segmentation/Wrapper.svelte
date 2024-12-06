<script lang="ts">
  import { discardRequested } from "../store";
  import Panel from "./Panel.svelte";
  import { onDestroy, setContext } from "svelte";
  export let pageId: string;
  export let mediumId: string;
  setContext("id", pageId);
  setContext("mediumId", mediumId);
  let key = Date.now();

  const sub = discardRequested.subscribe(() => {
    key = Date.now();
  });

  onDestroy(() => {
    sub.unsubscribe();
  });
</script>

{#key key}
  <Panel />
{/key}
