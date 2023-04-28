import { Link } from "react-router-dom";
import { ReactNode } from "react";
import BaseNav from "./BaseNav";

export default function LinksNav({ children }: { children?: ReactNode }) {
  return (
    <BaseNav>
      <div className="hidden md:ml-6 md:flex md:space-x-8">
        {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
        <Link
          to="/"
          className="border-primary-500 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900"
        >
          Dashboard
        </Link>
      </div>
      <div className="flex items-center">{children}</div>
    </BaseNav>
  );
}
