import { PhotoIcon, DocumentTextIcon } from "@heroicons/react/20/solid";

export default function CommandBar() {
  return (
    <div className="flex justify-between border-b border-gray-300 p-1">
      <button
        type="button"
        className="bg-whitepx-2.5 hover:bg-secondary-50 focus-visible:outline-secondary-50 inline-flex items-center gap-x-1.5 rounded-md py-1.5 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <DocumentTextIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Add Text Element
      </button>
      <button
        type="button"
        className="hover:bg-secondary-50 focus-visible:outline-secondary-50 inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-black  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <PhotoIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Add Image Element
      </button>
    </div>
  );
}
