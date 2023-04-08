import { ReactNode, useState } from "react";
import LinkIcon from "@heroicons/react/20/solid/LinkIcon";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  def,
  tabs,
  color,
  title,
}: {
  tabs: Record<string, ReactNode>;
  color: string;
  def?: string;
  title?: string;
}) {
  const [current, setCurrent] = useState<string | undefined>(def);
  const tabNames = new Set([...Object.keys(tabs)]);
  return (
    <div className="w-full">
      <div className={`bg-${color}-50 mx-auto w-full max-w-xl rounded-2xl p-2`}>
        {title && (
          <div
            className={`text-${color}-900 flex justify-center align-baseline`}
          >
            <LinkIcon className="h-10 w-5 px-0 pt-3 pb-2" />
            <h1 className="py-2 text-center text-lg">&nbsp; {title}</h1>
          </div>
        )}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="focus:border-secondary-900 focus:ring-secondary-900 block w-full rounded-md border-gray-300"
          >
            {Object.keys(tabs).map((tab) => (
              <option key={tab}>{tab}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {Object.keys(tabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCurrent(tab)}
                  className={classNames(
                    tab === current
                      ? "border-secondary-900 text-secondary-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
                  )}
                  aria-current={tab === current ? "page" : undefined}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          {current && tabNames.has(current) && tabs[current]}
        </div>
      </div>
    </div>
  );
}
