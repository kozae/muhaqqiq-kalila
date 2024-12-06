<script lang="ts">
  import UserControls from "@client/layout/TopNav/UserControls.svelte";
  import {
    fetchUserAttributes,
    fetchAuthSession,
    type AuthSession,
    type FetchUserAttributesOutput,
  } from "aws-amplify/auth";
  import Loading from "./Loading.svelte";
  import { awsConfig } from "kalila-config";
  import { Amplify } from "aws-amplify";

  Amplify.configure(awsConfig);

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

  function redirectToSignIn(currentUrl: string) {
    window.location.href = `/sign-in?redirect=${currentUrl}`;
  }
</script>

{#await userPromise}
  <Loading classes="mr-3" />
{:then user}
  {#if user !== undefined && user !== null}
    <UserControls menuDirection="right" user={transform(user)} />
  {:else}
    {redirectToSignIn(window.location.href)}
  {/if}
{:catch error}
  {redirectToSignIn(window.location.href)}
{/await}
