<script lang="ts">
  import { type Writable } from "svelte/store";

  export let rotation: Writable<number>;

  const rotations = Array.from({ length: 4 }, (_, index) => index * 90);

  const handleAdd = () => {
    rotation.update((value) => {
      let newRotation = value + 30;
      if (newRotation > 359) newRotation = 359;
      return newRotation;
    });
  };

  const handleSubtract = () => {
    rotation.update((value) => {
      let newRotation = value - 30;
      if (newRotation < 0) newRotation = 0;
      return newRotation;
    });
  };
</script>

<div class="isolate inline-flex rounded-md shadow-sm">
  <!-- Subtract Button -->
  <button
    type="button"
    class="relative -ml-px inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    on:click={handleSubtract}
  >
    -30°
  </button>

  <!-- Rotation Buttons -->
  {#each rotations as rot (rot)}
    <button
      type="button"
      class="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      on:click={() => rotation.set(rot)}
      aria-pressed={$rotation === rot}
    >
      {rot}°
    </button>
  {/each}

  <!-- Add Button -->
  <button
    type="button"
    class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    on:click={handleAdd}
  >
    +30°
  </button>
</div>
