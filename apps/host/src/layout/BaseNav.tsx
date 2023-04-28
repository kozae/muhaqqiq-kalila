import { Link } from "react-router-dom";
import { ReactNode } from "react";

export default function BaseNav({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-16 items-center justify-between rounded">
      <div className="flex">
        <div className="flex flex-shrink-0 items-center">
          <div className="h-content w-content block  lg:hidden">
            <Link to="/">
              <img className="h-[35px] w-auto" src="/logo_512.png" alt="" />
            </Link>
          </div>
          <div className="h-content  w-content hidden  lg:block">
            <Link to="/">
              <img className="h-[35px] w-auto" src="/logo_512.png" alt="" />
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
