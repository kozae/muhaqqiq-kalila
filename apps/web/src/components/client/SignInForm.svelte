<script lang="ts">
  import LockClosedIcon from "@icons/LockClosedIcon.svelte";
  import XCircleIcon from "@icons/XCircleIcon.svelte";
  import { Auth } from "aws-amplify";

  let username: string = "";
  let password: string = "";
  let error: boolean = false;

  async function signIn(u: string, p: string): Promise<void> {
    error = false;
    try {
      await Auth.signIn(u, p);
      window.location.href = "/";
    } catch (e) {
      error = true;
    }
  }

  function handleUsernameChange(event: Event): void {
    username = (event.target as HTMLInputElement).value;
  }

  function handlePasswordChange(event: Event): void {
    password = (event.target as HTMLInputElement).value;
  }

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    await signIn(username, password);
  }
</script>

<div
  class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
>
  <div class="w-full max-w-md space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="/logo.png" alt="Your Company" />
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
      <input type="hidden" name="remember" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="username" class="sr-only"> Username </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            bind:value={username}
            on:input={handleUsernameChange}
            required
            class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Username"
          />
        </div>
        <div>
          <label for="password" class="sr-only"> Password </label>
          <input
            id="password"
            name="password"
            type="password"
            bind:value={password}
            on:input={handlePasswordChange}
            autoComplete="current-password"
            required
            class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 group relative flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className="text-primary-200 group-hover:text-primary-400 h-5 w-5"
            />
          </span>
          Sign in
        </button>
      </div>
    </form>
    {#if error}
      <div
        class="animate__animated animate__fadeInDown rounded-md bg-red-50 p-4"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Wrong credentials!</h3>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
