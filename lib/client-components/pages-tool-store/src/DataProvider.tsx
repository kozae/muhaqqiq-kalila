import { ReactNode, createContext, useContext } from "react";
import { Page } from "aws-backend";
import { StoreApi, UseBoundStore, create } from "zustand";

export interface State {
  page: Omit<
    Page,
    "__typename" | "text" | "images" | "createdAt" | "updatedAt"
  >;
}

const StoreContext = createContext<UseBoundStore<StoreApi<State>> | null>(null);

export function usePageDataStore() {
  return useContext(StoreContext) as UseBoundStore<StoreApi<State>>;
}

export function DataProivder({
  page,
  children,
}: {
  page: Page;
  children: ReactNode;
}) {
  const { text, images, ...data } = page;
  const store = create<State>()(() => ({ page: data }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
