import { ReactNode } from "react";

export interface ICommandBarContainerProps {
  children: ReactNode;
  classes?: string;
}

export function CommandBarContainer({
  children,
  classes,
}: ICommandBarContainerProps) {
  return (
    <div
      className={`flex h-[50px] items-center justify-between border-b border-gray-300 p-1${
        " " + classes
      }`}
    >
      {children}
    </div>
  );
}
