<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import MainContainer from "./MainContainer.svelte";
  import PagesNav from "./PagesNav";
</script>

<MainContainer>
  <PagesNav slot="Pages" />
  <Loading classes="p-4" slot="Collations" todo />
  <Loading classes="p-4" slot="Media" todo />
  <Loading classes="p-4" slot="Books" todo />
</MainContainer>
