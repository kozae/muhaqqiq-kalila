import { PlusIcon } from "@heroicons/react/20/solid";

export default function CommandBar() {
  return (
    <div className="flex justify-between border-b border-gray-300 p-1">
      <button
        type="button"
        className="bg-whitepx-2.5 hover:bg-secondary-50 focus-visible:outline-secondary-50 inline-flex items-center gap-x-1.5 rounded-md py-1.5 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Add Line in ...
      </button>
    </div>
  );
}
