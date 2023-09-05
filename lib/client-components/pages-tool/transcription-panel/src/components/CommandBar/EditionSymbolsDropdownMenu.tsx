import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function EditionSymbolsDropdownMenu() {
  const suffixes: ISymbolProps[] = [
    {
      symbol: "†",
      label: "Corrupt",
    },
    {
      symbol: "*",
      label: "Emended",
    },
    {
      symbol: "!",
      label: "Error",
    },
    {
      symbol: "?",
      label: "Unintelligible",
    },
  ];

  const suppletion: ISymbolProps[] = [
    {
      symbol: "}",
      label: "Supplied range begin",
    },
    {
      symbol: "{",
      label: "Supplied range end",
    },
  ];

  const crossOut: ISymbolProps[] = [
    {
      symbol: "]]",
      label: "Cross-out range begin",
    },
    {
      symbol: "[[",
      label: "Cross-out range end",
    },
  ];

  const added: ISymbolProps[] = [
    {
      symbol: ">",
      label: "Added range begin",
    },
    {
      symbol: "<",
      label: "Added range end",
    },
  ];

  const superfluous: ISymbolProps[] = [
    {
      symbol: "]",
      label: "Superfluous range begin",
    },
    {
      symbol: "[",
      label: "Superfluous range end",
    },
  ];

  const standalones: ISymbolProps[] = [
    {
      symbol: "...",
      label: "Damage",
    },
    {
      symbol: "***",
      label: "Lacuna",
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="text-primary-600 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold hover:bg-gray-50">
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Insert symbol
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <SymbolGroup symbols={suffixes} />
          <SymbolGroup symbols={added} />
          <SymbolGroup symbols={superfluous} />
          <SymbolGroup symbols={suppletion} />
          <SymbolGroup symbols={crossOut} />
          <SymbolGroup symbols={standalones} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

interface ISymbolProps {
  symbol: string;
  label: string;
}

interface ISymbolGroupProps {
  symbols: ISymbolProps[];
}

function SymbolGroup({ symbols }: ISymbolGroupProps) {
  return (
    <div className="py-1">
      {symbols.map(({ symbol, label }, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "group flex items-center px-4 py-2 text-sm"
              )}
            >
              <span
                className="mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              >
                {symbol}
              </span>
              {label}
            </a>
          )}
        </Menu.Item>
      ))}
    </div>
  );
}
