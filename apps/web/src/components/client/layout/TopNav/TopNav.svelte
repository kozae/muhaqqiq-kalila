<script type="ts">
  import { Auth } from "aws-amplify";
  import UserControls from "./UserControls.svelte";
  import Loading from "../../reusable/Loading.svelte";

  const sessionPromise = Auth.currentUserInfo();
</script>

{#await sessionPromise}
  <Loading classes="mr-3" />
{:then session}
  {#if session !== undefined && session !== null}
    <UserControls session={session.attributes} />
  {:else}
    <a href="/sign-in" class="text-primary-500 p-4 font-bold">
      Sign in <span aria-hidden="true">&rarr;</span>
    </a>
  {/if}
{:catch}
  <p>error</p>
{/await}
