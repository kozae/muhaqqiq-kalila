import { ReactNode } from "react";

export interface IPanelContainerProps {
  children: ReactNode;
  classes?: string;
  panelHasCommandBar?: boolean;
}

export function PanelContainer({
  children,
  classes,
  panelHasCommandBar,
}: IPanelContainerProps) {
  const height =
    panelHasCommandBar !== false
      ? "h-[calc(100vh-150px)]"
      : "h-[calc(100vh-90px)]";
  return (
    <div
      className={`flex ${height} flex-col overflow-y-scroll${" " + classes}`}
    >
      {children}
    </div>
  );
}
