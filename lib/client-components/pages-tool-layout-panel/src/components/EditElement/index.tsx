import { ImageElement, TextElement } from "aws-backend";
import {
  IColoredRegion,
  useFacsimileEventStore,
  usePageDataStore,
} from "pages-tool-store";
import { useEffect, useRef } from "react";
import { BehaviorSubject } from "rxjs";
import RegionPreview from "./RegionPreview";
import { FacsimileCropper } from "./util";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function EditElement({
  element,
}: {
  element:
    | (ImageElement & IColoredRegion)
    | (Omit<TextElement, "lines"> & IColoredRegion)
    | null
    | undefined;
}) {
  const eventHub = useFacsimileEventStore();
  const points = eventHub((state) => state.regionUnderEdit);
  const region$ = useRef(
    new BehaviorSubject<(number | null)[] | undefined | null>(
      element?.region?.slice(0, -1)
    )
  );
  const rotation$ = useRef(
    new BehaviorSubject<number>(
      element?.region ? element?.region[element.region.length - 1] ?? 0 : 0
    )
  );
  const store = usePageDataStore();
  const image = store((state) => {
    return state.imageDataUrl;
  });
  const cropper = FacsimileCropper.new(base46(image));

  useEffect(() => {
    if (points) {
      region$.current.next([...points]);
    }
  }, [points]);

  return (
    <div>
      <RegionPreview
        region$={region$.current}
        cropper={cropper}
        rotation$={rotation$.current}
      />
      <div>
        <label htmlFor="filter" className="sr-only">
          Filter
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="number"
            min="1"
            step="1"
            name="filter"
            id="filter"
            onChange={(e) => rotation$.current.next(parseInt(e.target.value))}
            className="text-secondary-900 focus:ring-secondary-600 block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
}

export const base46 = (data: string) =>
  data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
