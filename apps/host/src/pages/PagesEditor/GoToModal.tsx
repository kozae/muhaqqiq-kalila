import { BaseModal, IBaseModalProps } from "modal";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export interface IGotoModalProps
  extends Omit<IBaseModalProps, "children" | "title" | "icon"> {
  lastPage: number;
  baseHref: string;
  ids: string[];
}

export default function GoToModal({
  open,
  setOpen,
  lastPage,
  ids,
  baseHref,
}: IGotoModalProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <BaseModal
      setOpen={setOpen}
      open={open}
      title={`Enter a number between 1 and ${lastPage}`}
    >
      <form
        className="mt-5 sm:mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          const pageIndex = parseInt(inputRef.current?.value ?? "");
          const pageId = !isNaN(pageIndex) && ids[pageIndex - 1];
          if (pageId) {
            navigate(`${baseHref}${pageId}`);
            setOpen && setOpen(false);
          }
        }}
      >
        <div>
          <label htmlFor="page" className="sr-only">
            page
          </label>
          <input
            ref={inputRef}
            type="number"
            min="1"
            max={lastPage}
            step="1"
            name="page"
            id="page"
            className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="page"
          />
        </div>
        <button
          className="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 mt-5 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          type="submit"
        >
          Go
        </button>
      </form>
    </BaseModal>
  );
}
