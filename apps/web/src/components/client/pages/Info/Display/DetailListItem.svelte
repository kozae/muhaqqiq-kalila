<script>
  export let bgClass = "bg-white";
  export let title = "";
  export let value = "";
</script>

<div class="{bgClass} px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
  <dt class="text-sm font-medium leading-6 text-gray-900">{title}</dt>
  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
    {value}
  </dd>
</div>
