<script lang="ts">
  import InformationCircleIcon from "@icons/InformationCircleIcon.svelte";
  export let message: string = "";
</script>

<div class="group relative flex cursor-help">
  <slot />
  <span
    class="bg-primary-900 border-primary-400 absolute top-10 z-10 flex min-w-max -translate-x-2/4 scale-0 items-center rounded border-l-4 p-2 text-xs text-white transition-all group-hover:scale-100"
  >
    <div class="flex-shrink-0">
      <InformationCircleIcon className="text-primary-400 mr-1 h-5 w-5" />
    </div>
    {message}
  </span>
</div>
