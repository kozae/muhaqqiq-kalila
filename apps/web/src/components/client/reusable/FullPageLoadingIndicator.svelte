<script lang="ts">
  import Loading from "./Loading.svelte";
  import { showFullPageLoading } from "./show-loading";
</script>

{#if $showFullPageLoading}
  <div
    class="fixed top-0 left-0 w-[100vw] h-[100vh] inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
  >
    <Loading dimensions="h-32 w-32" color="primary-500" />
  </div>
{/if}
