import InformationCircleIcon from "@heroicons/react/20/solid/InformationCircleIcon";
import { ReactNode } from "react";

export default function InfoAlert({ message }: { message: ReactNode }) {
  return (
    <div className="border-primary-500 bg-primary-50 my-1 w-full border-l-4 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="text-primary-500 h-5 w-5"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-primary-500 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
