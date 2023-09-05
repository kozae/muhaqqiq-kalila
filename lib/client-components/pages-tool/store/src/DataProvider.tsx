import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Page } from "kalila-graphql";
import { StoreApi, UseBoundStore, create } from "zustand";
import { useInitialState } from "./helpers/use-initial-state";
import { StoreWorkerEvent } from "../../store-worker/index";
import {
  State,
  createImageSlice,
  createLineSlice,
  createPageSlice,
  createSegmentSlice,
  createTextSlice,
} from "./slices";

const StoreContext = createContext<UseBoundStore<StoreApi<State>> | null>(null);

export function usePageDataStore() {
  return useContext(StoreContext) as UseBoundStore<StoreApi<State>>;
}

export function DataProivder({
  page,
  children,
  imageDataUrl,
  worker,
  withStoredChanges,
  storedPage,
}: {
  page: Page;
  storedPage: Page;
  worker: Worker;
  imageDataUrl: string;
  withStoredChanges: boolean;
  children: ReactNode;
}) {
  const store = useMemo(() => {
    const initialState = useInitialState(page, imageDataUrl);
    const { page: initPage, text, lines, images, segments } = initialState;
    return create<State>()((...args) => ({
      ...createPageSlice(initPage, imageDataUrl)(...args),
      ...createTextSlice(text)(...args),
      ...createLineSlice(lines)(...args),
      ...createImageSlice(images)(...args),
      ...createSegmentSlice(segments)(...args),
      hasChanges: withStoredChanges,
      messageStoreWorker: (eventType: StoreWorkerEvent, value: any) =>
        worker.postMessage({ type: eventType, payload: value }),
      reset: () => args[0]({ ...initialState, hasChanges: false }),
    }));
  }, [page.id, imageDataUrl, withStoredChanges, worker]);

  const storedInitialState = useMemo(
    () => useInitialState(storedPage, imageDataUrl),
    [storedPage]
  );

  useEffect(() => {
    if (withStoredChanges) {
      console.log("loading stored state");
      store.setState(storedInitialState);
    }
  }, [withStoredChanges]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
