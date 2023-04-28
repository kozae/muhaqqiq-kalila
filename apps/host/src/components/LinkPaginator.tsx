import ChevronUpIcon from "@heroicons/react/20/solid/ChevronUpIcon";
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon";
import { getPageButtons } from "paginator";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function LinkPaginator({
  pages,
  current,
  baseHref,
  hrefSuffix,
  ids,
}: {
  pages: number;
  baseHref: string;
  hrefSuffix: string;
  ids: string[];
  current?: number;
}) {
  const buttons = getPageButtons(pages, current ? current + 1 : 1);
  return (
    <div
      className="isolate mt-2  inline-flex flex-col -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      {current !== undefined && current > 0 && (
        <ActivePrevLink to={`${baseHref}${ids[current - 1]}/${hrefSuffix}`}>
          <>
            <span className="sr-only">Previous</span>
            <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
          </>
        </ActivePrevLink>
      )}
      {current === 0 && (
        <DisabledPrevLink>
          <span className="sr-only">Previous</span>
          <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
        </DisabledPrevLink>
      )}
      {buttons.map((value, index) => {
        if (current !== undefined && value === current + 1)
          return (
            <CurrentLink key={value} aria-current="page">
              {value}
            </CurrentLink>
          );
        if (value === -1) {
          return (
            <span
              key={`ellip-${index}`}
              className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            >
              ...
            </span>
          );
        }
        return (
          <PageLink
            to={`${baseHref}${ids[value - 1]}/${hrefSuffix}`}
            key={value}
          >
            {value}
          </PageLink>
        );
      })}
      {current !== undefined && current < pages - 1 && (
        <ActiveNextLink to={`${baseHref}${ids[current + 1]}/${hrefSuffix}`}>
          <span className="sr-only">Next</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </ActiveNextLink>
      )}
      {current === pages - 1 && (
        <DisabledNextLink>
          <span className="sr-only">Next</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </DisabledNextLink>
      )}
    </div>
  );
}

function ActiveNextLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="hover:bg-secondary-200 relative inline-flex items-center justify-center rounded-b-md px-2 py-2 text-gray-400 ring-1  ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
    >
      {children}
    </Link>
  );
}

function DisabledNextLink({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none relative inline-flex  items-center justify-center rounded-b-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0">
      {children}
    </div>
  );
}

function ActivePrevLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="hover:bg-secondary-200 relative inline-flex  items-center justify-center rounded-t-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
    >
      {children}
    </Link>
  );
}

function DisabledPrevLink({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none relative inline-flex  items-center justify-center rounded-t-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 ">
      {children}
    </div>
  );
}

function PageLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="hover:bg-secondary-200 relative inline-flex  items-center justify-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
    >
      {children}
    </Link>
  );
}

function CurrentLink({ children }: { children: ReactNode }) {
  return (
    <div className="bg-secondary-900 focus-visible:outline-secondary-600 relative z-10 inline-flex  items-center justify-center px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
      {children}
    </div>
  );
}
