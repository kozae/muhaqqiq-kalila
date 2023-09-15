<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import { ready$ } from "@client/pages/store";

  export let pageId: string;

  let loaded = false;
  $: loaded = $ready$ === pageId;
</script>

{#if loaded}
  <slot />
{:else}
  <Loading />
{/if}
