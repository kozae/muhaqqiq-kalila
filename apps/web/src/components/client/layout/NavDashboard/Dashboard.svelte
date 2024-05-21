<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import MainContainer from "./MainContainer.svelte";
  import PagesNav from "./PagesNav";
  import CollationsNav from "./CollationsNav.svelte";
  import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth";

  const userPromise = Promise.all([
    fetchAuthSession({ forceRefresh: true }),
    fetchUserAttributes(),
  ]);
</script>

{#await userPromise}
  <Loading classes="mr-3" />
{:then user}
  <MainContainer>
    <PagesNav slot="Pages" />
    <CollationsNav slot="Collations" />
    <Loading classes="p-4" slot="Media" todo />
    <Loading classes="p-4" slot="Books" todo />
  </MainContainer>
{:catch}
  <div class="hidden"></div>
{/await}
