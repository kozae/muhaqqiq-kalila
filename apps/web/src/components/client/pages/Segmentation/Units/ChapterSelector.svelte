<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { CHAPTERS } from "../chapters";
  import Menu from "@client/reusable/Menu.svelte";
  import ChevronDownIcon from "@icons/ChevronDownIcon.svelte";
  export let text = "Select chapter";
  const items = CHAPTERS.map(({ abbr, name }) => `${abbr} - ${name}`);
  const dispatch = createEventDispatcher();
  const handleItemClick = (e: any) => {
    const abbr = e.detail.split(" - ")[0].trim();
    const chapter = CHAPTERS.find((c) => c.abbr === abbr);
    dispatch("selected", chapter);
  };
</script>

<Menu
  buttonText={text}
  {items}
  height="h-[300px]"
  width="w-[300px]"
  buttonSize="text-lg"
  on:itemClick={handleItemClick}
>
  <ChevronDownIcon slot="suffixIcon" className="w-5 h-5" />
</Menu>
