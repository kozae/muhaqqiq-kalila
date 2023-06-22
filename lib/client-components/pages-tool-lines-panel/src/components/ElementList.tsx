import { groupBy, orderBy } from "lodash";
import {
  IColoredRegion,
  useFacsimileEventStore,
  usePageDataStore,
} from "pages-tool-store";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/20/solid";
import { TextElement } from "aws-backend";

export default function ElementList() {
  const eventHub = useFacsimileEventStore();
  const [highlightedRegion, toggleHighlightedRegion, toggleZoomedRegion] =
    eventHub(
      ({ highlightedRegion, toggleHighlightedRegion, toggleZoomedRegion }) => [
        highlightedRegion,
        toggleHighlightedRegion,
        toggleZoomedRegion,
      ]
    );

  const store = usePageDataStore();

  const groupedLines = store(({ lines }) =>
    groupBy(orderBy(lines, "order"), "elementID")
  );
  const elements = store(({ text }) =>
    text.reduce(
      (
        acc: Record<
          string,
          (Omit<TextElement, "lines"> & IColoredRegion) | null
        >,
        el
      ) => {
        if (el) {
          acc[el.id] = el;
        }

        return acc;
      },
      {}
    )
  );

  return (
    <div className="flex flex-col">
      {Object.keys(groupedLines).map((elementID) => (
        <div key={elementID} className="flex flex-col">
          <h1 className="text-primary-500 p-2 text-xl">
            {elements[elementID]?.order! + 1}. &nbsp;
            {elements[elementID]?.position}
          </h1>
          <div className="flex flex-row flex-wrap">
            {groupedLines[elementID].map((el, index) => (
              <div
                key={el?.id ?? index}
                className={
                  highlightedRegion === el?.id
                    ? "m-1 flex w-[30%] scale-110 items-center justify-between rounded p-2"
                    : "m-1 flex w-[30%] items-center justify-between rounded p-2"
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
                  <h1 className="text-xl">{el?.order! + 1}</h1>
                </div>
                <div className="flex items-center">
                  <ArrowsPointingOutIcon
                    className="text-primary-500 mr-2 h-5 w-5 rounded hover:cursor-grab active:active:cursor-grabbing"
                    aria-hidden="true"
                  />
                  <button>
                    <EyeIcon
                      className="text-primary-500 hover:text-secondary-700 mr-2 h-5 w-5 rounded"
                      aria-hidden="true"
                      onClick={() => toggleZoomedRegion(el?.id)}
                    />
                  </button>
                  <button>
                    <PencilSquareIcon
                      className="text-primary-500 hover:text-secondary-700 mr-2 h-5 w-5 rounded"
                      aria-hidden="true"
                    />
                  </button>
                  <button>
                    <TrashIcon
                      className="hover:text-secondary-700 mr-2 h-3 w-3 rounded text-red-500"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// react-prismazoom
