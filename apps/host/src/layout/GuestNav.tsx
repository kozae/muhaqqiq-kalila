import { Link } from "react-router-dom";
import BaseNav from "./BaseNav";

export default function GuestNav() {
  return (
    <BaseNav>
      <div className="flex h-full align-middle">
        <Link to="/sign-in" className="text-primary-500 p-4 font-bold">
          Sign in <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </BaseNav>
  );
}
