<script lang="ts">
  export let info: any = null;
</script>

<div class="flex w-full bg-secondary-200 justify-center">
  <div class="font-bold p-2 sticky left-0 text-primary-500">
    ({info?.frame}.{info?.order}) {info?.title}
  </div>
</div>
