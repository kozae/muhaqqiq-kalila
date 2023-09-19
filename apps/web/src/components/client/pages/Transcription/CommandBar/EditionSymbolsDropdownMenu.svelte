<script lang="ts">
  import ChevronDownIcon from "@icons/ChevronDownIcon.svelte";
  import PlusIcon from "@icons/PlusIcon.svelte";
  import SymbolGroup from "./SymbolGroup.svelte";
  import { slide } from "svelte/transition";

  interface ISymbol {
    symbol: string;
    label: string;
  }
  const suffixes: ISymbol[] = [
    {
      symbol: "†",
      label: "Corrupt",
    },
    {
      symbol: "*",
      label: "Emended",
    },
    {
      symbol: "!",
      label: "Error",
    },
    {
      symbol: "?",
      label: "Unintelligible",
    },
  ];

  const suppletion: ISymbol[] = [
    {
      symbol: "}",
      label: "Supplied range begin",
    },
    {
      symbol: "{",
      label: "Supplied range end",
    },
  ];

  const crossOut: ISymbol[] = [
    {
      symbol: "]]",
      label: "Cross-out range begin",
    },
    {
      symbol: "[[",
      label: "Cross-out range end",
    },
  ];

  const added: ISymbol[] = [
    {
      symbol: ">",
      label: "Added range begin",
    },
    {
      symbol: "<",
      label: "Added range end",
    },
  ];

  const superfluous: ISymbol[] = [
    {
      symbol: "]",
      label: "Superfluous range begin",
    },
    {
      symbol: "[",
      label: "Superfluous range end",
    },
  ];

  const standalones: ISymbol[] = [
    {
      symbol: "...",
      label: "Damage",
    },
    {
      symbol: "***",
      label: "Lacuna",
    },
  ];

  let open = false;
</script>

<div class="relative inline-block text-left">
  <div>
    <button
      class="text-primary-600 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold hover:bg-gray-50"
      on:click={() => (open = !open)}
    >
      <PlusIcon className="-ml-0.5 h-5 w-5" />
      Insert symbol
      <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" />
    </button>
  </div>

  {#if open}
    <div
      transition:slide={{ delay: 0, duration: 300, axis: "y" }}
      class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <SymbolGroup symbols={suffixes} />
      <SymbolGroup symbols={added} />
      <SymbolGroup symbols={superfluous} />
      <SymbolGroup symbols={suppletion} />
      <SymbolGroup symbols={crossOut} />
      <SymbolGroup symbols={standalones} />
    </div>
  {/if}
</div>
