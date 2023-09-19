<script lang="ts">
  export let symbols: any[];
</script>

<div class="py-1">
  {#each symbols as { symbol, label }, index (index)}
    <div class="group flex items-center px-4 py-2 text-sm">
      <span
        class="mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      >
        {symbol}
      </span>
      {label}
    </div>
  {/each}
</div>
