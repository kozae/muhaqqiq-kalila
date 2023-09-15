<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import { derived } from "@client/pages/store";

  export let pageId: string;
  const { ready } = derived;
  let loaded = false;
  $: loaded = $ready === pageId;
</script>

{#if loaded}
  <slot />
{:else}
  <Loading />
{/if}
