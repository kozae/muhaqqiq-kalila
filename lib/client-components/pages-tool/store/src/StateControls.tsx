import { BigButton } from "common-components";
import { CloudArrowUpIcon, ReceiptRefundIcon } from "@heroicons/react/24/solid";
import { usePageDataStore } from "./DataProvider";
import { useInterfaceControls } from "./InterfaceControlsProvider";
import { StoreWorkerEvent } from "pages-tool-store-worker";
export interface IStateControlsProps {
  siglum: string;
  page: number;
}

export function StateControls({ siglum, page }: IStateControlsProps) {
  const [hasChanges, reset, messageStoreWorker] = usePageDataStore()(
    (state) => [state.hasChanges, state.reset, state.messageStoreWorker]
  );
  const canSave = useInterfaceControls()((state) => state.canSave);

  const onDiscard = () => {
    messageStoreWorker(StoreWorkerEvent.DISCARD_ALL, {});
    reset();
  };

  return (
    <div className="flex h-full w-full items-center justify-between">
      <h2 className="text-primary-900 text-md p-1 text-center font-bold leading-7 sm:text-xl">
        {siglum}
        {` (p.${page})`}
      </h2>

      {hasChanges && (
        <>
          {canSave && (
            <BigButton className="animate-fade-in text-primary-900 ">
              <CloudArrowUpIcon
                className="-ml-0.5 h-5 w-5 "
                aria-hidden="true"
              />
              Save
            </BigButton>
          )}
          <BigButton
            onClick={onDiscard}
            className="animate-fade-in text-red-700 "
          >
            <ReceiptRefundIcon
              className="-ml-0.5 h-5 w-5 "
              aria-hidden="true"
            />
            Discard
          </BigButton>
        </>
      )}
    </div>
  );
}
