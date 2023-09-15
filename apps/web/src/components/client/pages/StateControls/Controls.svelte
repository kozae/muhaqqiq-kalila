<script lang="ts">
  import Loading from "@client/reusable/Loading.svelte";
  import { requestAction, source } from "@client/pages/store";
  import ReceiptRefundIcon from "@icons/ReceiptRefundIcon.svelte";
  import BigButton from "@client/reusable/BigButton.svelte";
  import CloudArrowUpIcon from "@icons/CloudArrowUpIcon.svelte";
  import { map } from "rxjs";

  const canSave = true;
  const title$ = source.selectBasicInfo.pipe(
    map((info) => info?.title ?? undefined),
  );
  const hasChanges$ = source.selectBasicInfo.pipe(
    map((info) => info?.hasChanges ?? false),
  );
  const handleDiscard = () => {
    source.selectBasicInfo.next(undefined);
    requestAction("discardUpdates", {});
  };
</script>

<div class="flex h-full w-full items-center justify-between">
  {#if $title$}
    <h2
      class="text-primary-900 text-md p-1 text-center font-bold leading-7 sm:text-2xl"
    >
      {$title$}
    </h2>
    <div class="grow flex justify-around">
      {#if $hasChanges$}
        {#if canSave}
          <BigButton className="animate-fade-in text-primary-900 ">
            <CloudArrowUpIcon className="-ml-0.5 h-5 w-5 " />
            Save
          </BigButton>
        {/if}

        <BigButton
          className="animate-fade-in text-red-700 "
          on:click={handleDiscard}
        >
          <ReceiptRefundIcon className="-ml-0.5 h-5 w-5 " />
          Discard
        </BigButton>
      {/if}
    </div>
  {:else}
    <Loading />
  {/if}
</div>
