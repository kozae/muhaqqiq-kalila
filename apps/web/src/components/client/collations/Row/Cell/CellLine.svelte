<script lang="ts">
  import {
    matchPattern,
    updateStream,
  } from "@client/collations/state-controls";
  import { getContext } from "svelte";

  export let tokens: (string | null)[];
  export let lineNumber: number;
  export let pageNumber: number;
  export let unitOrder: number;
  export let column: number;

  let hasHighlight = false;
  let groupedTokens: (string | null)[][] = [];
  let matchedTokens = new Set<string>();

  $: {
    const { pattern: regex, units, columns } = $matchPattern;
    if (units.has(unitOrder) && columns.has(column)) {
      hasHighlight = regex.test(tokens.join(" "));
      if (hasHighlight) {
        groupedTokens = [];
        let currentGroup: (string | null)[] = [];
        tokens.forEach((token) => {
          if (token && regex.test(token)) {
            if (currentGroup.length > 0) {
              groupedTokens.push(currentGroup);
              currentGroup = [];
            }
            groupedTokens.push([token]);
            matchedTokens.add(token);
          } else {
            currentGroup.push(token);
          }
        });
        if (currentGroup.length > 0) {
          groupedTokens.push(currentGroup);
        }
        updateStream.next({
          pageNumber,
          lineNumber,
          unitId: getContext("unitId") as string,
          original: tokens.join(" "),
          mediumId: getContext("mediumId") as string,
          segmentId: getContext("segmentId") as string,
        });
      } else {
        groupedTokens = [tokens];
      }
    } else {
      groupedTokens = [tokens];
      hasHighlight = false;
    }
  }
</script>

{#if hasHighlight}
  {#each groupedTokens as group}
    {#each group as token}
      {#if matchedTokens.has(token ?? "")}
        <span class="bg-primary-100 rounded">{token}</span> &nbsp;
      {:else}
        <span>{token}</span> &nbsp;
      {/if}
    {/each}
  {/each}
{:else}
  <span id={`line-${pageNumber}-${lineNumber}`}>{tokens.join(" ") + " "}</span>
{/if}
