<script lang="ts">
  import Menu from "@client/reusable/Menu.svelte";
  import ArrowClockwiseIcon from "@icons/ArrowClockwiseIcon.svelte";
  import { collationData } from "./state-controls";
  import { onDestroy } from "svelte";
  import { type GraphQLQuery } from "@aws-amplify/api";
  import {
    type UpdateCollationSegmentsMutation,
    type UpdateCollationUnitsMutation,
    updateCollationSegments,
    updateCollationUnits,
  } from "kalila-graphql";
  import { generateClient } from "aws-amplify/api";
  let items: string[] = [];

  const sub = collationData.subscribe((data) => {
    items = data ? [data.chapter, ...data.media] : [];
  });

  async function requestUpdate(item: string) {
    const client = generateClient();
    if (items.length === 0) {
      return;
    }
    try {
      if (item === items[0]) {
        await client.graphql<GraphQLQuery<UpdateCollationUnitsMutation>>({
          query: updateCollationUnits,
          variables: { units: item },
          authMode: "userPool",
        });
      } else {
        await client.graphql<GraphQLQuery<UpdateCollationSegmentsMutation>>({
          query: updateCollationSegments,
          variables: { segments: [item, items[0]] },
          authMode: "userPool",
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  onDestroy(() => {
    sub.unsubscribe();
  });
</script>

<Menu
  {items}
  iconButton
  on:itemClick={(e) => {
    requestUpdate(e.detail);
  }}
>
  <ArrowClockwiseIcon slot="icon" />
</Menu>
