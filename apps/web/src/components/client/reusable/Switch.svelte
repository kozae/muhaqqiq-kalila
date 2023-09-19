<script lang="ts">
  export let isEnabled = false;
  export let labelLeft: string = "";
  export let labelRight: string = "";
</script>

<div class="flex items-center justify-between">
  <span
    class="text-sm font-medium leading-6 text-gray-900 mr-2"
    id="availability-label">{labelLeft}</span
  >
  <!-- Enabled: "bg-primary-600", Not Enabled: "bg-gray-200" -->
  <button
    type="button"
    class={isEnabled
      ? "bg-primary-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
      : "bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"}
    role="switch"
    aria-checked={isEnabled}
    on:click={() => (isEnabled = !isEnabled)}
  >
    <span class="sr-only">Use setting</span>
    <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
    <span
      class={isEnabled
        ? "translate-x-5 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        : "translate-x-0 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"}
    >
      <!-- Enabled: "opacity-0 duration-100 ease-out", Not Enabled: "opacity-100 duration-200 ease-in" -->
      <span
        class={isEnabled
          ? "opacity-0 duration-100 ease-out absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          : "opacity-100 duration-200 ease-in absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"}
        aria-hidden="true"
      >
        <slot name="disabled" />
      </span>
      <!-- Enabled: "opacity-100 duration-200 ease-in", Not Enabled: "opacity-0 duration-100 ease-out" -->
      <span
        class={isEnabled
          ? "opacity-100 duration-200 ease-in absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          : "opacity-0 duration-100 ease-out absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"}
        aria-hidden="true"
      >
        <slot name="enabled" />
      </span>
    </span>
  </button>
  <span
    class="text-sm font-medium leading-6 text-gray-900 ml-2"
    id="availability-label">{labelRight}</span
  >
</div>
