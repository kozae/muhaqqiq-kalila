import { memo, useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { useDebouncedValue } from "frontend-util";
import { FacsimileWorkerEvent } from "pages-tool-facsimile-worker";
import { useFacsimileWorker } from "pages-tool-store";

const RegionPreview = memo(function Component({
  region$,
  rotation,
}: {
  region$: BehaviorSubject<(number | null)[] | undefined | null>;

  rotation: number;
}) {
  const region = useDebouncedValue(region$, 100, (prev, curr) => {
    if (prev?.length !== curr?.length) {
      return false;
    }
    for (let i = 0; i < prev!.length; i++) {
      if (prev![i] !== curr![i]) {
        return false;
      }
    }
    return true;
  });
  const facsimileWorker = useFacsimileWorker();
  const [image, setImage] = useState<string | null>(null);
  if (region) {
    const p = new Uint32Array(region as number[]);
    facsimileWorker.postMessage({
      type: FacsimileWorkerEvent.PREVIEW,
      payload: {
        p,
        r: rotation ?? 0,
        frameColor: colorStringToUint32Array("251,251,230"),
        padding: 5,
      },
    });
  }

  useEffect(() => {
    if (window.Worker) {
      facsimileWorker.onmessage = (e: MessageEvent<any>) => {
        if (e.data.type === "preview" && e.data.payload) {
          setImage(e.data.payload);
        }
      };
    }

    return () => {
      facsimileWorker.onmessage = () => {};
    };
  }, [facsimileWorker]);

  if (image) {
    return (
      <img
        className="rounded"
        style={{ pointerEvents: "none" }}
        max-width="100%"
        max-height="50%"
        width="auto"
        height="auto"
        src={image}
        alt="failed"
      />
    );
  }

  return <h1>No Preview</h1>;
});

export default RegionPreview;

function colorStringToUint32Array(input: string): Uint32Array {
  let stringNumbers = input.split(",");
  let numArray = stringNumbers.map((numStr) => Number(numStr.trim()));

  // Validate input
  if (
    !numArray.every(
      (num) => Number.isInteger(num) && num >= 0 && num <= 4294967295
    )
  ) {
    throw new Error("Input string does not contain valid Uint32 numbers.");
  }

  return new Uint32Array(numArray);
}
