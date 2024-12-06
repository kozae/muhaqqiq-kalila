<script lang="ts">
  export let classes: string = "";
</script>

<div
  class={`flex h-[50px] items-center justify-evenly border-b border-gray-300 p-1${
    " " + classes
  }`}
>
  <slot />
</div>
