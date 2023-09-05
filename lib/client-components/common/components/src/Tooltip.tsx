import { ReactNode } from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

export function Tooltip({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative flex cursor-help">
      {children}
      <span className="bg-primary-900 border-primary-400 absolute top-10 z-10 flex min-w-max -translate-x-2/4 scale-0  items-center rounded border-l-4  p-2 text-xs text-white transition-all group-hover:scale-100">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="text-primary-400 mr-1 h-5 w-5"
            aria-hidden="true"
          />
        </div>
        {message}
      </span>
    </div>
  );
}
