<script lang="ts">
  import type { UnitEntity } from "pages-tool-store-worker";
  import { setContext } from "svelte";
  import Divider from "./Divider.svelte";

  import UnitUnassigned from "./UnitUnassigned.svelte";
  export let items: any[] = [];
  export let filter = "";
</script>

<div class="flex flex-wrap justify-around grow overflow-y-auto">
  {#if filter && filter.length > 0}
    {#each items.filter( (item) => item.title.includes(filter), ) as unit (unit.id)}
      {#if unit.divider}
        <Divider {unit} />
      {:else}
        <UnitUnassigned {unit} />
      {/if}
    {/each}
  {:else}
    {#each items as unit (unit.id)}
      {#if unit.divider}
        <Divider {unit} />
      {:else}
        <UnitUnassigned {unit} />
      {/if}
    {/each}
  {/if}
</div>
