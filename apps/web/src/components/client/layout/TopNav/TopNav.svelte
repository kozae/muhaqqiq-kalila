<script lang="ts">
  import {
    fetchUserAttributes,
    fetchAuthSession,
    type AuthSession,
    type FetchUserAttributesOutput,
  } from "aws-amplify/auth";
  import UserControls from "./UserControls.svelte";
  import Loading from "../../reusable/Loading.svelte";

  function transform([{ tokens }, attributes]: [
    AuthSession,
    FetchUserAttributesOutput,
  ]) {
    return {
      roles: tokens ? tokens.accessToken.payload["cognito:groups"] : [],
      ...attributes,
    };
  }

  const userPromise = Promise.all([
    fetchAuthSession({ forceRefresh: true }),
    fetchUserAttributes(),
  ]);
</script>

{#await userPromise}
  <Loading classes="mr-3" />
{:then user}
  {#if user !== undefined && user !== null}
    <UserControls user={transform(user)} />
  {:else}
    <a href="/sign-in" class="text-primary-500 p-4 font-bold">
      Sign in <span aria-hidden="true">&rarr;</span>
    </a>
  {/if}
{:catch}
  <a href="/sign-in" class="text-primary-500 p-4 font-bold">
    Sign in <span aria-hidden="true">&rarr;</span>
  </a>
{/await}
