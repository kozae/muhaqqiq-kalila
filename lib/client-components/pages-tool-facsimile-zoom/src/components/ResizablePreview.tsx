import { colorStringToUint32Array, decideTextColor } from "@helpers/index";
import { FacsimileCropper } from "@muhaqiq/facsimile";
import { useFacsimileEventStore, usePageDataStore } from "pages-tool-store";
import { useCallback, useState } from "react";
import { Rnd } from "react-rnd";
import {
  PhotoIcon,
  DocumentTextIcon,
  XMarkIcon,
  CloudArrowDownIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/20/solid";

export interface IResizablePreviewProps {
  cropper: FacsimileCropper;
}
const MIN_WIDTH = 25;
const MAX_WIDTH = 85;
// TODO refector into a sepaerate package, the component has to be indepaendant from the store
export default function ResizablePreview({ cropper }: IResizablePreviewProps) {
  const eventHub = useFacsimileEventStore();
  const [regionId, toggleSelectedRegion] = eventHub((state) => [
    state.zoomedRegion,
    state.toggleZoomedRegion,
  ]);
  const store = usePageDataStore();
  const [width, setWidth] = useState(30);
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

  const getRegion = useCallback(
    (region: number[], color: Uint32Array) => {
      if (cropper) {
        const p = new Uint32Array(region.slice(0, 8));
        const r = region[8];
        return cropper.get_region(p, r, color, 3);
      }
    },
    [cropper]
  );

  const handleDownload = (element: any) => {
    if (element && document) {
      const link = document.createElement("a");
      link.href = getRegion(
        element.region as number[],
        colorStringToUint32Array("251,251,230")
      ) as string;
      link.download = `${element.order! + 1}_${element.position}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return element ? (
    <Rnd
      className="justify- animate__animated animate__fadeIn bg-secondary-50  fixed z-50 flex flex-col items-center rounded  shadow-lg"
      enableResizing={false}
      default={{
        x: 200,
        y: 200,
        width: "30%",
        height: "fit-content",
      }}
      size={{
        height: "fit-content",
        width: `${width}%`,
      }}
    >
      <div className="text-primary-600 flex w-full flex-wrap items-center justify-between p-2">
        <div className="flex items-center">
          {element?.position?.startsWith("image") ? (
            <PhotoIcon className="mr-2 h-8 w-8 rounded" aria-hidden="true" />
          ) : (
            <DocumentTextIcon
              className=" t mr-2 h-8 w-8 rounded "
              aria-hidden="true"
            />
          )}
          <h1 className="text-lg capitalize">
            {element.order! + 1}.&nbsp;{element.position}&nbsp;
          </h1>
          <button
            onClick={() => handleDownload(element)}
            type="button"
            className="bg-secondary-50 hover:bg-secondary-100 focus-visible:outline-secondary-100 text-primary-600 rounded-full p-1 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <CloudArrowDownIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setWidth(MIN_WIDTH)}
            disabled={width <= MIN_WIDTH}
            type="button"
            className={
              width <= MIN_WIDTH
                ? "relative inline-flex items-center rounded-l-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300"
                : "relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            }
          >
            Min
          </button>
          <button
            disabled={width <= MIN_WIDTH}
            onClick={() =>
              setWidth((curr) => {
                if (curr - 5 >= MIN_WIDTH) {
                  return curr - 5;
                }
                return curr;
              })
            }
            type="button"
            className={
              width <= MIN_WIDTH
                ? "relative -ml-px inline-flex items-center bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300"
                : "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            }
          >
            <MagnifyingGlassMinusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            disabled={width >= MAX_WIDTH}
            onClick={() =>
              setWidth((curr) => {
                if (curr + 5 <= MAX_WIDTH) {
                  return curr + 5;
                }
                return curr;
              })
            }
            type="button"
            className={
              width >= MAX_WIDTH
                ? "relative -ml-px inline-flex items-center bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300"
                : "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            }
          >
            <MagnifyingGlassPlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            disabled={width >= MAX_WIDTH}
            type="button"
            onClick={() => setWidth(MAX_WIDTH)}
            className={
              width >= MAX_WIDTH
                ? "relative -ml-px inline-flex items-center rounded-r-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-300"
                : "relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            }
          >
            Max
          </button>
        </span>
        <button
          onClick={() => toggleSelectedRegion(undefined)}
          type="button"
          className="bg-secondary-50 hover:bg-secondary-100 focus-visible:outline-secondary-100 text-primary-600 rounded-full p-1 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {element.region && (
        <img
          className="rounded"
          style={{ pointerEvents: "none" }}
          width="100%"
          height="auto"
          src={getRegion(
            element.region as number[],
            colorStringToUint32Array("251,251,230")
          )}
          alt="failed"
        />
      )}
    </Rnd>
  ) : (
    <></>
  );
}
