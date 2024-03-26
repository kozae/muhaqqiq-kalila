<script lang="ts">
  import { signOut } from "aws-amplify/auth";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  export let user: any | undefined = undefined;

  let active: boolean = false;
  let menuItems: { name: string; href: string; action?: () => void }[] = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    {
      name: "Sign out",
      href: "#",
      action: async () => {
        await signOut({ global: true });
        window.location.href = "/";
      },
    },
  ];

  onMount(() => {
    if (user?.roles && user.roles.includes("admin")) {
      menuItems.push({ name: "Administration", href: "/administration" });
    }
  });

  function toggleMenu() {
    active = !active;
  }
</script>

<div class="relative mr-3">
  <button
    on:click={toggleMenu}
    class="bg-secondary-800 focus:ring-offset-secondary-800 flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
  >
    <span class="sr-only">Open user menu</span>
    <img class="h-10 w-10 rounded-full" src={user?.picture} alt="" />
  </button>
  {#if active}
    <div
      transition:slide={{ delay: 0, duration: 300, axis: "y" }}
      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      {#each menuItems as item (item.name)}
        <a
          href={item.href}
          on:click={item.action}
          class="block px-4 py-2 text-sm text-gray-700"
        >
          {item.name}
        </a>
      {/each}
    </div>
  {/if}
</div>
