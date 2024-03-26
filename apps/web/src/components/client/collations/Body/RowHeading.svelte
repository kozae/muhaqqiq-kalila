<script lang="ts">
  export let unit: any;
  export let columns: number;

  const width = `${350 * columns}px`;
</script>

<div
  style="width: {width}"
  class="flex justify-start bg-secondary-900 {unit.divider
    ? 'border-b-secondary-50 border-b-4'
    : ''} "
>
  <h1 class="p-2 text-xl text-white sticky left-0 top-0">
    {unit.frame}.{unit.order}
    {unit.title}
  </h1>
</div>
