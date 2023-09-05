import { ReactNode } from "react";

export function BigButton({
  children,
  className,
  onClick = () => {},
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={
        "inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-lg font-semibold  hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200" +
          ` ${className}` ?? ""
      }
    >
      {children}
    </button>
  );
}
