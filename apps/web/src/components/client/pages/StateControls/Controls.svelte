<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import { discard, requestAction, source } from "@client/pages/store";
  import ReceiptRefundIcon from "@icons/ReceiptRefundIcon.svelte";
  import BigButton from "@client/reusable/BigButton.svelte";
  import CloudArrowUpIcon from "@icons/CloudArrowUpIcon.svelte";
  import { distinctUntilChanged, map, filter } from "rxjs";
  import { resetRegionFacsimileCache } from "../facsimile-worker";

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
    discard.next();
    resetRegionFacsimileCache();
    setTimeout(() => {
      requestAction("discardUpdates", undefined);
    }, 1000);
  };
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
        <BigButton className="text-primary-900 ">
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
