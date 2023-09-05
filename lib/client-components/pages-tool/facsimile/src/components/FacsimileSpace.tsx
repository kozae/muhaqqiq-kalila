import ViewModeRegions from "./ViewMode/ViewModeRegions";
import StateProvider, {
  ISizingParameters,
  ISpaceParameters,
} from "@state/StateProvider";
import AppStage from "./AppStage";
import ImageLayer from "./ImageLayer";
import EditablePolygon from "./EditMode/EditablePolygon";
import { useFacsimileEventStore, usePageDataStore } from "pages-tool-store";

export type IFacsimileSpaceProps = ISpaceParameters & ISizingParameters;

const initialPoints: number[] = [100, 100, 250, 100, 250, 250, 100, 250];
export default function FacsimileSpace({
  tool,
  ...sizing
}: IFacsimileSpaceProps) {
  const eventHub = useFacsimileEventStore();
  const [mode, elementId] = eventHub((state) => [
    state.facsimileSpaceMode,
    state.regionSelectedForEditing,
  ]);
  const store = usePageDataStore();
  const element = store((state) => {
    const im = state.images.findIndex((im) => im?.id === elementId);
    const te = state.text.findIndex((te) => te?.id === elementId);
    const li = state.lines.findIndex((li) => li?.id === elementId);
    const element =
      im !== -1
        ? state.images[im]
        : te !== -1
        ? state.text[te]
        : li != -1
        ? state.lines[li]
        : undefined;
    return element;
  });

  return (
    <StateProvider {...sizing} tool={tool}>
      <AppStage>
        <ImageLayer />
        {mode === "view" && <ViewModeRegions />}
        {mode === "edit" && element && (
          <EditablePolygon
            init={
              (element.region?.slice(0, -1) as number[] | undefined | null) ??
              initialPoints
            }
          />
        )}
        {mode === "create" && <EditablePolygon init={initialPoints} />}
      </AppStage>
    </StateProvider>
  );
}
