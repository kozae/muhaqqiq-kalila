import Modal from "react-modal";

import ResizablePreview from "./ResizablePreview";
import { colorStringToUint32Array } from "@helpers/index";
import { last } from "lodash";
import { useEffect, useRef } from "react";
import { BehaviorSubject } from "rxjs";
import { FacsimileWorkerEvent } from "pages-tool-facsimile-worker";
import {
  useFacsimileEventStore,
  usePageDataStore,
  useFacsimileWorker,
} from "pages-tool-store";

Modal.setAppElement("#root"); // Set the root element for the modal for accessibility purposes

export default function ZoomModal() {
  const eventHub = useFacsimileEventStore();
  const [regionId, toggleSelectedRegion] = eventHub((state) => [
    state.zoomedRegion,
    state.toggleZoomedRegion,
  ]);
  const store = usePageDataStore();
  const element = store((state) => {
    const im = state.images.findIndex((im) => im?.id === regionId);
    const te = state.text.findIndex((te) => te?.id === regionId);
    const li = state.lines.findIndex((li) => li?.id === regionId);
    const element =
      im !== -1
        ? state.images[im]
        : te !== -1
        ? state.text[te]
        : li != -1
        ? state.lines[li]
        : undefined;
    return element;
  });
  const facsimileWorker = useFacsimileWorker();
  const imageUrl$ = useRef(new BehaviorSubject<string | undefined>(undefined));
  if (element && element.region) {
    const p = new Uint32Array(element.region.slice(0, -1) as number[]);
    imageUrl$.current.next(undefined);
    facsimileWorker.postMessage({
      type: FacsimileWorkerEvent.PREVIEW,
      payload: {
        p,
        r: last(element.region),
        frameColor: colorStringToUint32Array("251,251,230"),
        padding: 5,
      },
    });
  }

  useEffect(() => {
    if (window.Worker) {
      facsimileWorker.onmessage = (e: MessageEvent<any>) => {
        if (e.data.type === "preview" && e.data.payload) {
          imageUrl$.current.next(e.data.payload);
        }
      };
    }

    return () => {
      facsimileWorker.onmessage = () => {};
    };
  }, [facsimileWorker]);

  return (
    <ResizablePreview
      toggleSelectedRegion={toggleSelectedRegion}
      element={element}
      imageUrl$={imageUrl$.current}
    />
  );
}
