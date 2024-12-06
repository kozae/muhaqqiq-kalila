import { Fragment, useCallback, useState, type FormEvent } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import tags from "@client/pages/common/tags";
import { postPageTagsUpdate } from "./requests";

export interface EditTagsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onTagsUpdated: (tags: string[]) => void;
  selectedIds: string[];
  siglum: string;
  mediumId: string;
  startPage: number;
  endPage?: number;
}

export default function EditTagsModal({
  open,
  setOpen,
  selectedIds,
  siglum,
  startPage,
  endPage,
  mediumId,
  onTagsUpdated,
}: EditTagsModalProps) {
  const message =
    selectedIds.length === 1
      ? `Overwrite tags of ${siglum}, page ${startPage}`
      : `Overwrite tags of ${siglum}, pages ${startPage} to ${endPage}`;

  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = new Set(prev);
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }
      return newTags;
    });
  };

  const handleSave = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // TODO Remove medium id from the implementation
      await postPageTagsUpdate({
        mediumId,
        pageIds: selectedIds,
        tags: Array.from(selectedTags),
      });

      onTagsUpdated(Array.from(selectedTags));

      setSelectedTags(new Set());

      setOpen(false);
    },
    [selectedTags, setOpen],
  );

  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="bg-primary-100 mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <PencilSquareIcon
                      className="text-primary-500 h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Edit Tags
                    </DialogTitle>
                    <div className="mt-2">
                      <p>{message}</p>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSave}>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    {tags.map((tag) => (
                      <div key={tag} className="relative flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            id={tag}
                            name={`tags.${tag}`}
                            type="checkbox"
                            className="text-primary-600 focus:ring-primary-600 h-4 w-4 rounded border-gray-300"
                            checked={selectedTags.has(tag)}
                            onChange={() => handleTagChange(tag)}
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor={tag}
                            className="font-medium text-gray-900"
                          >
                            {tag}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-500 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
