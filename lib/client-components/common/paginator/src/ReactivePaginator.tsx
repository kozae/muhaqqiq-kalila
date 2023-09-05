import ChevronLeftIcon from "@heroicons/react/20/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import { getPageButtons } from "./get-visible-buttons";

export function ReactivePaginator({
  pages,
  current,
  onChange,
}: {
  pages: number;
  current: number;
  onChange: (page: number) => void | Promise<void>;
}) {
  const buttons = getPageButtons(pages, current + 1);
  return (
    <div
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <button
        onClick={() => current !== 0 && onChange(current - 1)}
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      {buttons.map((value, index) => {
        if (value === current + 1)
          return (
            <button
              disabled
              key={value}
              aria-current="page"
              className="bg-secondary-900 focus-visible:outline-secondary-600 relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {value}
            </button>
          );
        if (value === -1) {
          return (
            <span
              key={`ellip-${index}`}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            >
              ...
            </span>
          );
        }
        return (
          <button
            onClick={() => onChange(value - 1)}
            key={value}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            {value}
          </button>
        );
      })}
      <button
        onClick={() => current !== pages - 1 && onChange(current + 1)}
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
