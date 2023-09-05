import { StateCreator } from "zustand";
import { PageSlice, State } from "./state.model";
import { Page } from "kalila-graphql";

export function createPageSlice(
  page: Page,
  imageDataUrl: string
): StateCreator<State, any, any, PageSlice> {
  return (set) => ({
    page,
    imageDataUrl,
    resetPage: () => set({ page, imageDataUrl }),
  });
}
