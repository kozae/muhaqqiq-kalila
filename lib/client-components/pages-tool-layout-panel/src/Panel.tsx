import CommandBar from "@components/CommandBar";
import EditElement from "@components/EditElement";
import ElementList from "@components/ElementList";
import { useFacsimileEventStore, usePageDataStore } from "pages-tool-store";
export function Panel() {
  const eventHub = useFacsimileEventStore();
  const [mode, elementId] = eventHub((state) => [
    state.facsimileSpaceMode,
    state.regionSelectedForEditing,
  ]);
  const store = usePageDataStore();
  const element = store((state) => {
    const im = state.images.findIndex((im) => im?.id === elementId);
    const te = state.text.findIndex((te) => te?.id === elementId);
    const element =
      im !== -1 ? state.images[im] : te !== -1 ? state.text[te] : undefined;
    return element;
  });

  return mode === "view" ? (
    <div>
      <CommandBar />
      <ElementList />
    </div>
  ) : (
    <EditElement element={element} />
  );
}
