<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import {
    discardRequested,
    requestAction,
    source,
    requestState,
    save,
  } from "@client/pages/store";
  import ReceiptRefundIcon from "@icons/ReceiptRefundIcon.svelte";
  import BigButton from "@client/reusable/BigButton.svelte";
  import CloudArrowUpIcon from "@icons/CloudArrowUpIcon.svelte";
  import { distinctUntilChanged, map, filter } from "rxjs";
  import { resetRegionFacsimileCache } from "../facsimile-worker";
  import { onDestroy } from "svelte";
  import FullPageLoadingIndicator from "@client/reusable/FullPageLoadingIndicator.svelte";
  import { showFullPageLoading } from "@client/reusable/show-loading";

  let saveRequested = false;
  let saveSuccess = false;

  const title$ = source.selectBasicInfo.pipe(
    map((info) => info?.title ?? undefined),
  );
  const hasChanges$ = source.selectBasicInfo.pipe(
    filter((info) => !!info),
    map((info) => info?.hasChanges ?? false),
    distinctUntilChanged(),
  );
  const handleDiscard = () => {
    source.selectBasicInfo.next(undefined);
    discardRequested.next();
    resetRegionFacsimileCache();
    setTimeout(() => {
      requestAction("discardUpdates", {});
    }, 1000);
  };

  const handleSave = () => {
    saveRequested = true;
    saveSuccess = false;
    showFullPageLoading.set(true);
    requestState("selectUpdatePayload");
  };

  const sub = save.subscribe({
    next: (message) => {
      console.log(message);
      saveRequested = false;
      saveSuccess = true;
      showFullPageLoading.set(false);
      requestAction("saveUpdates", {});
    },

    error: (error) => {
      console.log(error);
      saveRequested = false;
      saveSuccess = false;
      showFullPageLoading.set(false);
    },
  });

  onDestroy(() => {
    sub.unsubscribe();
  });
</script>

<div class="flex h-full w-full items-center justify-between">
  {#if $title$}
    <h2
      class="text-primary-900 text-md p-1 text-center font-bold leading-7 sm:text-2xl"
    >
      {$title$}
    </h2>
    {#if $hasChanges$}
      <div class="grow flex justify-around">
        <BigButton className="text-primary-900" on:click={handleSave}>
          <CloudArrowUpIcon className="-ml-0.5 h-5 w-5 " />
          Save
        </BigButton>

        <BigButton className="text-red-700 " on:click={handleDiscard}>
          <ReceiptRefundIcon className="-ml-0.5 h-5 w-5 " />
          Discard
        </BigButton>
      </div>
    {/if}
  {:else}
    <Loading />
  {/if}
</div>

<FullPageLoadingIndicator />
