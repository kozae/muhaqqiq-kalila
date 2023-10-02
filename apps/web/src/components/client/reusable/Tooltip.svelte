<script lang="ts">
  import InformationCircleIcon from "@icons/InformationCircleIcon.svelte";
  export let message: string = "";
  export let top = "10";
  export let translate = "-translate-x-2/4 ";
  export let cursor = "cursor-help";
  export let icon = true;
</script>

<div class="group relative flex {cursor}">
  <slot />
  <span
    class="bg-primary-900 border-primary-400 absolute top-{top} z-10 flex min-w-max {translate} scale-0 items-center rounded border-l-4 p-2 text-xs text-white transition-all group-hover:scale-100"
  >
    {#if icon}
      <div class="flex-shrink-0">
        <InformationCircleIcon className="text-primary-400 mr-1 h-5 w-5" />
      </div>
    {/if}

    {message}
  </span>
</div>
