import {
  useFacsimileEventStore,
  useInterfaceControls,
  usePageDataStore,
  useTranscriptionWorker,
} from "pages-tool-store";
import { useCallback, useEffect, useState } from "react";
import { TranscriptionWorkerEvent } from "pages-tool-transcription-panel-worker";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { groupBy, orderBy } from "lodash";

// TODO Refactor to AUXDisplay
export default function ErrorDisplay() {
  const worker = useTranscriptionWorker();
  const [error, setError] = useState<any[]>([]);
  const controls = useInterfaceControls();
  const [toggleCanSave, transcriptionPanelPreviewEnabled] = controls(
    ({ toggleCanSave, transcriptionPanelPreviewEnabled }) => [
      toggleCanSave,
      transcriptionPanelPreviewEnabled,
    ]
  );
  const eventHub = useFacsimileEventStore();
  const [toggleHighlightedRegion, toggleZoomedRegion] = eventHub(
    ({ toggleHighlightedRegion, toggleZoomedRegion }) => [
      toggleHighlightedRegion,
      toggleZoomedRegion,
    ]
  );

  const store = usePageDataStore();

  const bodyLines = store(({ lines, text }) => {
    const grouped = groupBy(orderBy(lines, "order"), "elementId");
    const bodyLines: Record<number, string | undefined> = {};

    for (const el of text) {
      if (el?.position?.startsWith("main") && grouped[el.id]) {
        for (const line of grouped[el.id]) {
          bodyLines[line!.order + 1] = line?.region ? line!.id : undefined;
        }
      }
    }

    return bodyLines;
  });

  const togglePreview = useCallback(
    (order: number) => {
      if (bodyLines[order] !== undefined) {
        if (transcriptionPanelPreviewEnabled) {
          toggleZoomedRegion(bodyLines[order]);
        }
        toggleHighlightedRegion(bodyLines[order]);
      } else {
        toggleHighlightedRegion(undefined);
        toggleZoomedRegion(undefined);
      }
    },
    [
      transcriptionPanelPreviewEnabled,
      bodyLines,
      toggleHighlightedRegion,
      toggleZoomedRegion,
    ]
  );

  const onMessage = useCallback(
    (e: any) => {
      if (e.data.type === TranscriptionWorkerEvent.ERROR) {
        setError(e.data.payload);
        toggleCanSave(false);
      }
      if (e.data.type === TranscriptionWorkerEvent.NO_ERROR) {
        setError([]);
        toggleCanSave(true);
      }
      if (e.data.type === TranscriptionWorkerEvent.LINE_CHANGE) {
        const order = e.data.payload as number;
        togglePreview(order);
      }
    },
    [toggleCanSave, togglePreview]
  );

  useEffect(() => {
    worker.onmessage = onMessage;

    return () => {
      worker.onmessage = () => {};
    };
  }, [onMessage]);

  useEffect(() => {
    return () => {
      toggleHighlightedRegion(undefined);
      toggleZoomedRegion(undefined);
    };
  }, []);

  return error.length !== 0 ? (
    <div className="h-[20%] w-full overflow-y-scroll rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {error.length === 1 && "There  is an error in the transcription"}
            {error.length > 1 &&
              `There are ${error.length} errors in the transcription`}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {orderBy(error, ["line", "from", "to"]).map((item, index) => (
                <li key={`${item.line}${item.from}${item.to}${index}`}>
                  <p>
                    <strong className="font-extrabold">
                      [Line: {item.line} | Words: {item.from}~{item.to}]&nbsp;
                    </strong>
                    {item.message}.
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
