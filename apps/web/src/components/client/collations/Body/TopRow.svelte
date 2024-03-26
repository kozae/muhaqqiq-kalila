<script lang="ts">
  export let sigla: string[];
</script>

<div
  class="flex flex-row w-fit sticky top-0 left-0 z-30 border-b-secondary-900 border-b-2"
>
  {#each sigla as siglum, index}
    <div
      class="w-[350px] flex justify-center items-center {index % 2 === 0
        ? 'bg-white'
        : 'bg-secondary-50'}"
    >
      <h1 class="p-4 text-2xl font-bold text-primary-900">{siglum}</h1>
    </div>
  {/each}
</div>
