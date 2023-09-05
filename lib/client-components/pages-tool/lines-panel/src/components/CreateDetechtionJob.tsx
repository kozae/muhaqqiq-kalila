import { useForm } from "react-hook-form";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export function CreateDetechtionJob({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  }) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <ScheduleForm
                  onSubmit={(data) => {
                    console.log({ data });
                    setOpen(false);
                  }}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function ScheduleForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      binarizationThreshold: 150,
      startMethod: "startNow",
      notificationMethod: "None",
      pages: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center space-y-6"
    >
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Schedule a line detection job
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="pages"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pages (leave empty for current page only)
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("pages")}
                placeholder="Enter range"
                className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="notificationMethod"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              When done, notify:
            </label>
            <div className="mt-2">
              <select
                {...register("notificationMethod")}
                className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>None</option>
                <option>Email</option>
                <option>Slack</option>
                <option>Both</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Strategy
            </label>
            <div className="mt-2 space-y-4">
              <div className="flex items-center gap-x-3">
                <input
                  type="radio"
                  {...register("startMethod")}
                  value="startNow"
                  className="text-primary-600 focus:ring-primary-600 h-4 w-4 border-gray-300"
                />
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Start now (finish in 10~15 Minutes)
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  type="radio"
                  {...register("startMethod")}
                  value="startLater"
                  className="text-primary-600 focus:ring-primary-600 h-4 w-4 border-gray-300"
                />
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Add to job queue (finish in 24-hors at most)
                </label>
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="binarizationThreshold"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Binarization Threshold (100 - 200)
            </label>
            <div className="mt-2">
              <input
                type="number"
                {...register("binarizationThreshold", { min: 100, max: 200 })}
                className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Schedule
        </button>
      </div>
    </form>
  );
}
