import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  DocumentTextIcon,
  PhotoIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { CommandBarContainer } from "pages-tool-shared-ui";
import { usePageDataStore } from "pages-tool-store";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CommandBar() {
  const textElementTypes: string[] = ["main body", "main text in margin"];
  const imageElementTypes: string[] = ["image in main body", "image in margin"];
  const [addTextElement, addImageElement] = usePageDataStore()((state) => {
    return [state.addTextElement, state.addImageElement];
  });

  const renderMenuButton = (IconComponent: any, title: string) => (
    <Menu.Button className="text-primary-900 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50">
      <IconComponent
        className="text-primary-700 -ml-0.5 h-5 w-5"
        aria-hidden="true"
      />
      {title}
      <ChevronDownIcon
        className="-mr-1 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </Menu.Button>
  );

  const renderMenuItems = (items: string[], action: (item: string) => void) => (
    <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="py-1">
        {items.map((item) => (
          <Menu.Item key={item}>
            {({ active }) => (
              <button
                onClick={() => action(item)}
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "group flex w-full items-center px-4 py-2 text-sm"
                )}
              >
                {item}
              </button>
            )}
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
  );

  return (
    <CommandBarContainer>
      <Menu as="div" className="relative mr-4 inline-block text-left">
        {renderMenuButton(DocumentTextIcon, "Add Text Element")}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {renderMenuItems(textElementTypes, addTextElement)}
        </Transition>
      </Menu>

      <Menu as="div" className="relative inline-block text-left">
        {renderMenuButton(PhotoIcon, "Add Image Element")}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {renderMenuItems(imageElementTypes, addImageElement)}
        </Transition>
      </Menu>
    </CommandBarContainer>
  );
}
