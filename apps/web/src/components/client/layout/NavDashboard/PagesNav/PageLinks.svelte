<script lang="ts">
  import { type GraphQLQuery } from "@aws-amplify/api";
  import { type GetMediumQuery, type Page } from "kalila-graphql";
  import { useQuery } from "@sveltestack/svelte-query";
  import InfoAlert from "@client/reusable/InfoAlert.svelte";
  import LiveFilter from "@client/reusable/LiveFilter.svelte";
  import { slide } from "svelte/transition";
  import ReactivePaginator from "@client/reusable/ReactivePaginator.svelte";
  import TableCellsIcon from "@icons/TableCellsIcon.svelte";
  import DocumentTextIcon from "@icons/DocumentTextIcon.svelte";
  import RectangleGroupIcon from "@icons/RectangleGroupIcon.svelte";
  import SquaresPlusIcon from "@icons/SquaresPlusIcon.svelte";
  import Loading from "@client/reusable/Loading.svelte";
  import { generateClient } from "aws-amplify/api";

  const getMedium = /* GraphQL */ `
    query GetMedium($id: ID!) {
      getMedium(id: $id) {
        siglum
        pages(limit: 500) {
          items {
            id
            number
          }
        }
      }
    }
  `;
  export let mediumId: string = "";

  const queryResult = useQuery(`getMediumPages_${mediumId}`, async () => {
    const client = generateClient();
    const response = await client.graphql<GraphQLQuery<GetMediumQuery>>({
      query: getMedium,
      variables: { id: mediumId },
      authMode: "userPool",
    });
    return response.data?.getMedium;
  });
  let filter: string = "";
  let filtered: Page[] = ($queryResult.data?.pages?.items.filter((item) => {
    const parsedValue = parseInt(filter);
    const pageNumber = item?.number ?? 0;
    return (
      item !== null &&
      (isNaN(parsedValue) ? pageNumber >= 0 : pageNumber >= parsedValue)
    );
  }) ?? []) as Page[];
  let page = 0;
  let visibleLinks: Page[] = [];
  let pages: number = 0;
  let baseHref = `/pages/${mediumId}/`;

  $: {
    filtered = ($queryResult.data?.pages?.items.filter((item) => {
      const parsedValue = parseInt(filter);
      const pageNumber = item?.number ?? 0;
      return (
        item !== null &&
        (isNaN(parsedValue) ? pageNumber >= 0 : pageNumber >= parsedValue)
      );
    }) ?? []) as Page[];
    page = 0;
  }

  $: visibleLinks = filtered?.slice(page * 5, page * 5 + 5) ?? [];

  $: pages = Math.ceil(filtered.length / 5) ?? 0;
</script>

{#if $queryResult.data}
  <div
    transition:slide={{ delay: 0, duration: 300, axis: "y" }}
    class="w-full flex flex-col items-center justify-center"
  >
    <br />
    <LiveFilter
      bind:filter
      label={`filter-${$queryResult.data.siglum ?? ""}`}
      placeholder={`filter ${$queryResult.data.siglum ?? ""} pages`}
    />

    {#if visibleLinks && visibleLinks.length === 0}
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
        <ul
          role="list"
          class="sm:grid-cols-auto mt-3 grid grid-cols-1 gap-5 sm:gap-6"
        >
          <li class="col-span-1 flex rounded-md shadow-sm">
            <div
              class="bg-secondary-900 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
            >
              <TableCellsIcon className="h-5 w-5" />
            </div>
            <div
              class="hover:bg-primary-50 flex flex-1 items-center justify-between rounded-r-md border-t border-r border-b border-gray-200 bg-white"
            >
              <div class="flex-1 px-4 py-2 text-sm">
                <a href={`/pages/${mediumId}`}>Medium Page Summary</a>
              </div>
            </div>
          </li>
          {#each visibleLinks as pageDoc (pageDoc.id)}
            <li class="col-span-1 flex rounded-md shadow-sm justify-center">
              <a
                href={baseHref + pageDoc.id}
                class="bg-secondary-900 flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-lg font-medium text-white"
              >
                {pageDoc.number}
              </a>
              <span class="inline-flex rounded-md shadow-sm">
                <a
                  href={`${baseHref}${pageDoc.id}/layout`}
                  class="relative inline-flex items-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  <RectangleGroupIcon
                    className="-ml-0.5 h-5 w-5 text-gray-400"
                  />
                  layout
                </a>
                <a
                  href={`${baseHref}${pageDoc.id}/transcription`}
                  class="relative inline-flex items-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  <DocumentTextIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
                  transcription
                </a>
                <a
                  href={`${baseHref}${pageDoc.id}/segmentation`}
                  class="relative inline-flex items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                  <SquaresPlusIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
                  segmentation
                </a>
              </span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
{:else}
  <Loading />
{/if}
