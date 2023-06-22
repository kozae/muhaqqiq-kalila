import { FacsimileCropper } from "./util";
import { memo, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { useDebouncedValue } from "util";

const RegionPreview = memo(function Component({
  region$,
  cropper,
  rotation$,
}: {
  region$: BehaviorSubject<(number | null)[] | undefined | null>;
  cropper: FacsimileCropper;
  rotation$: BehaviorSubject<number>;
}) {
  const region = useDebouncedValue(region$, 500);
  const rotation = useDebouncedValue(rotation$, 500);
  if (region) {
    const p = new Uint32Array(region as number[]);
    const image = cropper.get_region(
      p,
      rotation,
      new Uint32Array([251, 251, 230]),
      3
    );

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
