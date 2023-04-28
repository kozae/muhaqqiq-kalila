import MagnifyingGlassIcon from "@heroicons/react/20/solid/MagnifyingGlassIcon";
import { useRef } from "react";
import { BehaviorSubject } from "rxjs";
import MediumPagesNavLinks from "./MediumPagesNavLinks";

export default function MediumPagesFilter({
  mediumId,
  siglum,
}: {
  mediumId: string;
  siglum: string;
}) {
  const filter$ = useRef(new BehaviorSubject<string>(""));

  return (
    <div className="animate__animated animate__fadeIn flex flex-col items-center">
      <div>
        <label htmlFor="filter" className="sr-only">
          Filter
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="number"
            min="1"
            step="1"
            name="filter"
            id="filter"
            onChange={(e) => filter$.current.next(e.target.value)}
            className="text-secondary-900 focus:ring-secondary-600 block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder={`find ${siglum} page`}
          />
        </div>
      </div>
      <br />

      <MediumPagesNavLinks filter$={filter$.current} mediumId={mediumId} />
    </div>
  );
}
