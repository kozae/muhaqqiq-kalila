<script lang="ts">
  import ExclamationTriangleIcon from "@icons/ExclamationTriangleIcon.svelte";
</script>

<div class="border-secondary-400 border-l-4 bg-yellow-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <ExclamationTriangleIcon className="text-secondary-400 h-5 w-5" />
    </div>
    <div class="text-secondary-900 ml-3 text-sm">
      <slot />
    </div>
  </div>
</div>
