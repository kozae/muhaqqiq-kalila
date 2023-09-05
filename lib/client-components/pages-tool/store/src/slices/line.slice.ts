import { StateCreator } from "zustand";
import { IColoredRegion, LinesSlice, State } from "./state.model";
import { Line } from "kalila-graphql";
import { v4 as uuidv4 } from "uuid";
import { StoreWorkerEvent } from "pages-tool-store-worker";

export function createLineSlice(
  lines: Array<
    (Line & IColoredRegion & { position?: string }) | null | undefined
  >
): StateCreator<State, any, any, LinesSlice> {
  return (set) => ({
    lines,
    addLineElement: (elementId) =>
      set((state) => {
        const version = Date.now();
        const order = state.lines.length;
        const lines = [
          ...state.lines,
          {
            id: uuidv4(),
            elementId,
            pageId: state.page.id,
            order,
            version,
            __typename: "Line" as const,
          },
        ];

        state.messageStoreWorker(StoreWorkerEvent.LINE_STATE_UPDATE, {
          id: state.page.id,
          version,
          data: lines,
        });

        return { lines, hasChanges: true };
      }),
    updateLine: (id, changes) =>
      set((state) => {
        const version = Date.now();
        const el = state.lines.find((el) => el!.id === id)!;
        const updated = { ...el, ...changes, version };
        const lines = [
          ...state.lines.slice().filter((el) => el!.id !== id),
          updated,
        ];

        state.messageStoreWorker(StoreWorkerEvent.LINE_STATE_UPDATE, {
          id: state.page.id,
          version,
          data: lines,
        });
        return { lines, hasChanges: true };
      }),
    removeLine: (id) =>
      set((state) => {
        const version = Date.now();
        const lines = state.lines.filter((l) => l!.id !== id);
        state.messageStoreWorker(StoreWorkerEvent.LINE_STATE_UPDATE, {
          id: state.page.id,
          version,
          data: lines,
        });
        return { lines, hasChanges: true };
      }),
    replaceAllLines: (lines) =>
      set((state) => {
        const version = Date.now();
        state.messageStoreWorker(StoreWorkerEvent.LINE_STATE_UPDATE, {
          id: state.page.id,
          version,
          data: lines,
        });
        return { lines, hasChanges: true };
      }),
    resetLines: () => set({ lines }),
  });
}
