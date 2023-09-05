import { ReactNode, createContext, useContext } from "react";
import { StoreApi, UseBoundStore, create } from "zustand";

export interface IInterfaceControlsState {
  canSave: boolean;
  transcriptionPanelPreviewEnabled: boolean;
}

export interface IInterfaceControlsActions {
  toggleCanSave: (v: IInterfaceControlsState["canSave"]) => void;
  enableTranscriptionPanelPreview: () => void;
  disableTranscriptionPanelPreview: () => void;
}

const InterfaceControlsContext = createContext<{
  store: UseBoundStore<
    StoreApi<IInterfaceControlsState & IInterfaceControlsActions>
  >;
  facsimileWorker: Worker;
  transcriptionWorker: Worker;
} | null>(null);

export function useFacsimileWorker() {
  const { facsimileWorker } = useContext(InterfaceControlsContext) as {
    facsimileWorker: Worker;
    transcriptionWorker: Worker;
  };
  return facsimileWorker;
}

export function useTranscriptionWorker() {
  const { transcriptionWorker } = useContext(InterfaceControlsContext) as {
    facsimileWorker: Worker;
    transcriptionWorker: Worker;
  };
  return transcriptionWorker;
}

export function useInterfaceControls() {
  const { store } = useContext(InterfaceControlsContext) as {
    store: UseBoundStore<
      StoreApi<IInterfaceControlsState & IInterfaceControlsActions>
    >;
  };
  return store;
}

const store = create<IInterfaceControlsState & IInterfaceControlsActions>()(
  (set) => ({
    canSave: true,
    transcriptionPanelPreviewEnabled: false,
    toggleCanSave: (value) => set({ canSave: value }),
    enableTranscriptionPanelPreview: () =>
      set({ transcriptionPanelPreviewEnabled: true }),
    disableTranscriptionPanelPreview: () =>
      set({ transcriptionPanelPreviewEnabled: false }),
  })
);

export function InterfaceControlsProvider({
  children,
  facsimileWorker,
  transcriptionWorker,
}: {
  children: ReactNode;
  facsimileWorker: Worker;
  transcriptionWorker: Worker;
}) {
  return (
    <InterfaceControlsContext.Provider
      value={{ facsimileWorker, transcriptionWorker, store }}
    >
      {children}
    </InterfaceControlsContext.Provider>
  );
}
