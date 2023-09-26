<script lang="ts">
  import Panel from "./Panel.svelte";
  import { setContext } from "svelte";
  export let pageId: string;
  export let mediumId: string;
  setContext("id", pageId);
  setContext("mediumId", mediumId);
</script>

<Panel />
