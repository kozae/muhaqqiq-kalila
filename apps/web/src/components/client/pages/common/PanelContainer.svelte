<script>
  export let classes = "";
  export let panelHasCommandBar = true;

  let height =
    panelHasCommandBar !== false
      ? "h-[calc(100vh-150px)]"
      : "h-[calc(100vh-90px)]";
</script>

<div class="flex {height} flex-col overflow-y-scroll {classes}">
  <slot />
</div>
