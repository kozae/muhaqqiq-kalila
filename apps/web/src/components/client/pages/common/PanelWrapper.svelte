<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import { derived } from "@client/pages/store";
  import { setContext } from "svelte";

  export let pageId: string;
  export let mediumId: string;
  setContext("id", pageId);
  setContext("mediumId", mediumId);
  const { ready } = derived;
  let loaded = false;
  $: loaded = $ready === pageId;
</script>

{#if loaded}
  <slot />
{:else}
  <Loading />
{/if}
