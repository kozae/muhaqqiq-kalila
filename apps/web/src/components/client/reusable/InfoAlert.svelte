<script lang="ts">
  import InformationCircleIcon from "@icons/InformationCircleIcon.svelte";

  export let message: string = "";
</script>

<div class="border-primary-500 bg-primary-50 my-1 w-full border-l-4 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <InformationCircleIcon className="text-primary-500 h-5 w-5" />
    </div>
    <div class="ml-3">
      <p class="text-primary-500 text-sm">{message}</p>
    </div>
  </div>
</div>
