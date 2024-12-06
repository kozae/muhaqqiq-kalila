<script lang="ts">
  import Display from "./Display.svelte";
  import Edit from "./Edit.svelte";

  let mode: "view" | "edit" = "view";
</script>

{#if mode === "view"}
  <Display bind:mode />
{:else}
  {#key mode}
    <Edit bind:mode />
  {/key}
{/if}
