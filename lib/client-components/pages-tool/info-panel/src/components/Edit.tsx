import { PanelContainer } from "pages-tool-shared-ui";
import { PhotoIcon, ViewColumnsIcon } from "@heroicons/react/24/solid";
import { Warning } from "common-components";

interface IEditProps {
  initialValues: PageInfo;
  onFinished: () => void;
}

type PageInfo = {
  number?: number;
  imageUrl?: string; // upload file field
  commentary?: Array<string> | null;
  foliation?: string | null;
  pagination?: number | null;
  tags?: Array<string | null> | null;
};
// TODO add anvaigation away guard
export default function Edit({ initialValues, onFinished }: IEditProps) {
  return (
    <PanelContainer panelHasCommandBar={false} classes="mt-2 p-2">
      <form onSubmit={onFinished}>
        <div className="space-y-4">
          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Page Number
            </label>
            <div className="mt-2">
              <input
                type="number"
                className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* foliation */}
          <div className="sm:col-span-4">
            <label
              htmlFor="foliation"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Foliation
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="foliation"
                id="foliation"
                className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* pagination */}
          <div className="sm:col-span-4">
            <label
              htmlFor="pagination"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pagination
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="pagination"
                id="pagination"
                className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* tags */}
          <div className="sm:col-span-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tags
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="Separate tags with a comma"
                className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/*  image */}
          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Image
            </label>
            <div className="mt-2 flex justify-around rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="p-1 text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="text-primary-600 focus-within:ring-primary-600 hover:text-primary-500 relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
              <div className="p-1 text-center">
                <ViewColumnsIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <button className="text-primary-600 focus-within:ring-primary-600 hover:text-primary-500 relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2">
                    Generate a placeholder
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Warning>
            <p>
              Replacing the image will remove any region definitions for layout
              and lines. Transcription will be retained.
            </p>
          </Warning>
          {/* commentary */}
          <div className="sm:col-span-4">
            <label
              htmlFor="commentary"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Commentary
            </label>
            <div className="mt-2">
              <textarea
                name="commentary"
                id="commentary"
                className="focus:ring-primary-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                rows={4}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={onFinished}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </PanelContainer>
  );
}
