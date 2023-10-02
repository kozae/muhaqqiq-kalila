<script lang="ts">
  import type { UnitEntity } from "pages-tool-store-worker";
  import { setContext } from "svelte";
  import Divider from "./Divider.svelte";
  import UnitAssignedInPage from "./UnitAssignedInPage.svelte";
  import UnitAssignedInMedium from "./UnitAssignedInMedium.svelte";
  import UnitUnassigned from "./UnitUnassigned.svelte";
  export let items: UnitEntity[] = [];
  export let page: number = 0;
  setContext("page", page);
</script>

<div class="flex flex-wrap justify-around grow overflow-y-auto">
  {#each items as unit (unit.id)}
    {#if unit.divider}
      <Divider {unit} />
    {:else if unit.segment && unit.segment.page === page}
      <UnitAssignedInPage {unit} />
    {:else if unit.segment && unit.segment.page !== page}
      <UnitAssignedInMedium {unit} />
    {:else}
      <UnitUnassigned {unit} />
    {/if}
  {/each}
</div>
