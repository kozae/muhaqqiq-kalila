import { ReactNode } from "react";
import LinkIcon from "@heroicons/react/20/solid/LinkIcon";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Link({
  children,
  bgColor,
  initials,
}: {
  bgColor: string;
  children: ReactNode;
  initials?: ReactNode;
}) {
  return (
    <li className="col-span-1 flex rounded-md shadow-sm">
      <div
        className={classNames(
          bgColor,
          "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
        )}
      >
        {initials ? (
          initials
        ) : (
          <LinkIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </div>
      <div className="hover:bg-primary-50 flex flex-1 items-center justify-between  rounded-r-md border-t border-r border-b border-gray-200 bg-white">
        <div className="flex-1  px-4 py-2 text-sm">{children}</div>
      </div>
    </li>
  );
}
