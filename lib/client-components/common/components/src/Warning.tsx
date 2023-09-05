import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";

export function Warning({ children }: { children: ReactNode }) {
  return (
    <div className="border-secondary-400 border-l-4 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="text-secondary-400 h-5 w-5"
            aria-hidden="true"
          />
        </div>
        <div className="text-secondary-900 ml-3 text-sm">{children}</div>
      </div>
    </div>
  );
}
