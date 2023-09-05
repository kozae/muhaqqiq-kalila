import { orderBy } from "lodash";
import { useFacsimileEventStore, usePageDataStore } from "pages-tool-store";
import { PanelContainer } from "pages-tool-shared-ui";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutElement } from "./LayoutElement";

export default function ElementList() {
  const {
    highlightedRegion,
    zoomedRegion,
    toggleZoomedRegion,
    toggleHighlightedRegion,
    editRegion,
    setMode,
  } = useEventSelectors();

  const { elements, canDelete, remove, applyReorder } = useDataSelectors();

  return (
    <DndProvider backend={HTML5Backend}>
      <PanelContainer>
        {elements.map((el, index) => (
          <LayoutElement
            el={el}
            key={el?.id ?? index}
            highlightedRegion={highlightedRegion}
            toggleHighlightedRegion={toggleHighlightedRegion}
            canDelete={canDelete}
            remove={remove}
            toggleZoomedRegion={toggleZoomedRegion}
            editRegion={editRegion}
            setMode={setMode}
            index={index}
            moveElement={(oldOrder, newOrder) => {
              const updates = moveItem(elements, oldOrder, newOrder).reduce(
                (acc, item, index) => {
                  acc[item!.id] = index;
                  return acc;
                },
                {} as Record<string, number>
              );

              applyReorder(updates);
            }}
          />
        ))}
      </PanelContainer>
    </DndProvider>
  );
}

function useDataSelectors() {
  const store = usePageDataStore();
  return store((state) => {
    const canDelete: Record<string, boolean> = {};
    const remove: Record<string, () => void> = {};
    for (const element of state.text) {
      const elementLines = state.lines.filter(
        (l) => l?.elementId === element!.id
      );
      canDelete[element!.id] = elementLines.length === 0;
      remove[element!.id] = () => state.removeTextElement(element!.id);
    }

    for (const element of state.images) {
      canDelete[element!.id] = true;
      remove[element!.id] = () => state.removeImageElement(element!.id);
    }

    return {
      elements: orderBy([...state.text, ...state.images], "order"),
      canDelete,
      remove,
      applyReorder: state.reorderLayoutElements,
    };
  });
}

function useEventSelectors() {
  const eventHub = useFacsimileEventStore();
  return eventHub(
    ({
      highlightedRegion,
      zoomedRegion,
      toggleZoomedRegion,
      toggleHighlightedRegion,
      toggleRegionSelectedForEditing,
      setFacsimileSpaceMode,
    }) => ({
      highlightedRegion,
      zoomedRegion,
      toggleZoomedRegion,
      toggleHighlightedRegion,
      editRegion: toggleRegionSelectedForEditing,
      setMode: setFacsimileSpaceMode,
    })
  );
}

function moveItem<T>(arr: T[], oldIndex: number, newIndex: number): T[] {
  if (
    oldIndex < 0 ||
    oldIndex >= arr.length ||
    newIndex < 0 ||
    newIndex >= arr.length
  ) {
    throw new Error("Index out of bounds");
  }

  const newArr = [...arr]; // create a shallow copy of the array to not mutate the original
  const [item] = newArr.splice(oldIndex, 1); // remove the item from old index
  newArr.splice(newIndex, 0, item); // insert the item at the new index

  return newArr;
}
