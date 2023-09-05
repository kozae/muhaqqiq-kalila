import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface IButtonToggleProps {
  labelOn?: string;
  labelOff?: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}

export function ButtonToggle({
  labelOn,
  labelOff,
  enabled,
  onChange,
}: IButtonToggleProps) {
  return (
    <div className="flex items-center">
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? "bg-primary-600" : "bg-gray-500"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">{labelOn}</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        >
          {enabled ? (
            <EyeIcon className="bg-primary-600 text-white" />
          ) : (
            <EyeSlashIcon className="bg-gray-500 text-white" />
          )}
        </span>
      </Switch>
      <p
        className={` ${
          enabled ? "text-primary-600" : "text-gray-500"
        } p-1 text-sm`}
      >
        {enabled ? labelOn : labelOff}
      </p>
    </div>
  );
}
