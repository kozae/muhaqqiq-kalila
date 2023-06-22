import { orderBy } from "lodash";
import { useFacsimileEventStore, usePageDataStore } from "pages-tool-store";
import {
  PhotoIcon,
  DocumentTextIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/20/solid";

export default function ElementList() {
  const eventHub = useFacsimileEventStore();
  const [
    highlightedRegion,
    zoomedRegion,
    toggleZoomedRegion,
    toggleHighlightedRegion,
    editRegion,
    setMode,
  ] = eventHub(
    ({
      highlightedRegion,
      zoomedRegion,
      toggleZoomedRegion,
      toggleHighlightedRegion,
      toggleRegionSelectedForEditing,
      setFacsimileSpaceMode,
    }) => [
      highlightedRegion,
      zoomedRegion,
      toggleZoomedRegion,
      toggleHighlightedRegion,
      toggleRegionSelectedForEditing,
      setFacsimileSpaceMode,
    ]
  );

  const store = usePageDataStore();

  const elements = store(({ text, images }) =>
    orderBy([...text, ...images], "order")
  );

  return (
    <div className="flex flex-col">
      {elements.map((el, index) => (
        <div
          key={el?.id ?? index}
          className={
            highlightedRegion === el?.id
              ? "m-1 flex scale-105 items-center justify-between rounded p-4"
              : "m-1 flex items-center justify-between rounded p-4"
          }
          style={{
            border: `solid 3px rgba(${el?.color ?? "240,239,60"}, 0.6)`,
            backgroundColor:
              `rgba(${el?.color ?? "240,239,60"}, 0.3)` ?? "#F0EF3C",
          }}
          onMouseEnter={() => toggleHighlightedRegion(el?.id)}
          onMouseLeave={() => toggleHighlightedRegion(undefined)}
        >
          <div className="flex items-center">
            {el?.position?.startsWith("image") ? (
              <PhotoIcon
                className="text-primary-500 mr-2 h-8 w-8 rounded"
                aria-hidden="true"
              />
            ) : (
              <DocumentTextIcon
                className="text-primary-500 t mr-2 h-8 w-8 rounded "
                aria-hidden="true"
              />
            )}

            <h1 className="text-xl">
              {el?.order! + 1}. &nbsp; {el?.position}
            </h1>
          </div>
          <div className="flex items-center">
            <ArrowsUpDownIcon
              className="text-primary-500 mr-2 h-8 w-8 rounded hover:cursor-grab active:active:cursor-grabbing"
              aria-hidden="true"
            />
            <button>
              <EyeIcon
                className="text-primary-500 hover:text-secondary-700 mr-2 h-8 w-8 rounded"
                aria-hidden="true"
                onClick={() => toggleZoomedRegion(el?.id)}
              />
            </button>
            <button
              onClick={() => {
                editRegion(el?.id);
                setMode("edit");
              }}
            >
              <PencilSquareIcon
                className="text-primary-500 hover:text-secondary-700 mr-2 h-8 w-8 rounded"
                aria-hidden="true"
              />
            </button>
            <button>
              <TrashIcon
                className="hover:text-secondary-700 mr-2 h-4 w-4 rounded text-red-500"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
