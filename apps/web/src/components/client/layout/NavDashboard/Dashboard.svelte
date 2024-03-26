<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import MainContainer from "./MainContainer.svelte";
  import PagesNav from "./PagesNav";
  import CollationsNav from "./CollationsNav.svelte";
</script>

<MainContainer>
  <PagesNav slot="Pages" />
  <CollationsNav slot="Collations" />
  <Loading classes="p-4" slot="Media" todo />
  <Loading classes="p-4" slot="Books" todo />
</MainContainer>
