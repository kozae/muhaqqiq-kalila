<script lang="ts">
  let selectedOption = "32 GB";
</script>

<fieldset class="mt-2 w-fit">
  <legend class="sr-only">Choose an option</legend>
  <div class="flex">
    <label
      class="flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none"
    >
      <input
        type="radio"
        name="memory-option"
        value="32 GB"
        class="sr-only"
        aria-labelledby="memory-option-3-label"
        bind:group={selectedOption}
      />
      <span id="memory-option-3-label">32 GB</span>
    </label>
    <!--
          In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
          Active: "ring-2 ring-indigo-600 ring-offset-2"
          Checked: "bg-indigo-600 text-white hover:bg-indigo-500", Not Checked: "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50"
        -->
    <label
      class="flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none {(selectedOption =
        '64 GB' && 'bg-indigo-600 text-white hover:bg-indigo-500')}"
    >
      <input
        type="radio"
        name="memory-option"
        value="64 GB"
        class="sr-only"
        aria-labelledby="memory-option-4-label"
        bind:group={selectedOption}
      />
      <span id="memory-option-4-label">64 GB</span>
    </label>
  </div>
</fieldset>
