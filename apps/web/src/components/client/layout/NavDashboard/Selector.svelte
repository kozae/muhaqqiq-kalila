<script lang="ts">
  import InfoAlert from "@client/reusable/InfoAlert.svelte";
  import LiveFilter from "@client/reusable/LiveFilter.svelte";
  import ReactivePaginator from "@client/reusable/ReactivePaginator.svelte";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import Tabs from "./Tabs.svelte";
  import { writable } from "svelte/store";

  export let items: string[] = [];
  export let placeholder: string = "filter";
  export let label: string = `filter-${Math.floor(Math.random() * 1000)}`;
  const dispatch = createEventDispatcher();
  let filter: string = "";
  let page = 0;
  let filtered =
    items.filter((item) =>
      item?.toLocaleLowerCase().includes((filter ?? "").toLocaleLowerCase()),
    ) ?? [];
  let tabNames: string[] = [];
  let pages: number = 0;
  let current = writable<string | undefined>(undefined);

  $: dispatch("selected", $current);

  $: {
    filtered =
      items.filter((item) =>
        item?.toLocaleLowerCase().includes((filter ?? "").toLocaleLowerCase()),
      ) ?? [];
    page = 0;
    $current = undefined;
  }

  $: tabNames = filtered?.slice(page * 5, page * 5 + 5) ?? [];

  $: pages = Math.ceil(filtered.length / 5) ?? 0;
</script>

<div
  transition:slide={{ delay: 0, duration: 300, axis: "y" }}
  class="w-full flex flex-col items-center justify-center"
>
  <br />
  <LiveFilter bind:filter {label} {placeholder} />

  {#if tabNames && tabNames.length === 0}
    <InfoAlert message="no items available" />
  {:else}
    <br />

    <ReactivePaginator
      {pages}
      current={page}
      on:on_paginate={(e) => (page = e.detail)}
    />

    <br />
    <div class="w-full">
      <Tabs {tabNames} {current} />
    </div>
  {/if}
</div>
