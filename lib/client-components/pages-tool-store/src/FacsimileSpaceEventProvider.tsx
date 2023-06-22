import { ReactNode, createContext, useContext } from "react";
import { StoreApi, UseBoundStore, create } from "zustand";
export interface FacsimileEventState {
  highlightedRegion?: string;
  zoomedRegion?: string;
  regionSelectedForEditing?: string;
  facsimileSpaceMode: "view" | "edit" | "create";
  regionUnderEdit?: number[];
}

export interface FacsimleEventAction {
  toggleHighlightedRegion: (
    v: FacsimileEventState["highlightedRegion"]
  ) => void;
  toggleZoomedRegion: (v: FacsimileEventState["zoomedRegion"]) => void;
  toggleRegionSelectedForEditing: (
    v: FacsimileEventState["regionSelectedForEditing"]
  ) => void;
  setFacsimileSpaceMode: (v: "view" | "edit" | "create") => void;
  setRegionUnderEdit: (v: FacsimileEventState["regionUnderEdit"]) => void;
}

const FacsimileEventsContext = createContext<StoreApi<
  FacsimileEventState & FacsimleEventAction
> | null>(null);

export function useFacsimileEventStore() {
  return useContext(FacsimileEventsContext) as UseBoundStore<
    StoreApi<FacsimileEventState & FacsimleEventAction>
  >;
}

export function FacsimileSpaceEventProvider({
  children,
}: {
  children: ReactNode;
}) {
  const store = create<FacsimileEventState & FacsimleEventAction>()((set) => ({
    toggleHighlightedRegion: (region) => set({ highlightedRegion: region }),
    toggleZoomedRegion: (region) => set({ zoomedRegion: region }),
    toggleRegionSelectedForEditing: (region) =>
      set({ regionSelectedForEditing: region }),
    setFacsimileSpaceMode: (mode) => set({ facsimileSpaceMode: mode }),
    facsimileSpaceMode: "view",
    setRegionUnderEdit: (value) => set({ regionUnderEdit: value }),
  }));

  return (
    <FacsimileEventsContext.Provider value={store}>
      {children}
    </FacsimileEventsContext.Provider>
  );
}
