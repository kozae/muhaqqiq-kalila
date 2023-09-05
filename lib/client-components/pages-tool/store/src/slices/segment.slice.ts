import { StateCreator } from "zustand";
import { SegmentsSlice, SegmentsState, State } from "./state.model";
import { Segment } from "kalila-graphql";
import { StoreWorkerEvent } from "pages-tool-store-worker";
import { v4 as uuidv4 } from "uuid";

export function createSegmentSlice(
  segments: Array<Segment | null>
): StateCreator<State, any, any, SegmentsSlice> {
  return (set) => ({
    segments,
    addSegment: (unitId: string, start: [number, number, number]) =>
      set((state) => {
        const version = Date.now();
        const segments: SegmentsState = [
          ...state.segments,
          {
            id: uuidv4(),
            unitId,
            mediumId: state.page.mediumId,
            startPage: start[0],
            startLine: start[1],
            startToken: start[2],
            version,
            __typename: "Segment",
          },
        ];

        state.messageStoreWorker(StoreWorkerEvent.SEGMENT_STATE_UPDATE, {
          id: state.page.id,
          version,
          data: segments,
        });

        return { segments, hasChanges: true };
      }),
    updateSegment: (id, changes) =>
      set((state) => {
        const version = Date.now();
        const el = state.segments.find((el) => el!.id === id)!;
        const updated = { ...el, ...changes, version };
        const segments = [
          ...state.segments.slice().filter((el) => el!.id !== id),
          updated,
        ];

        state.messageStoreWorker(StoreWorkerEvent.SEGMENT_STATE_UPDATE, {
          id: state.page.id,
          version,
          data: segments,
        });
        return { segments, hasChanges: true };
      }),
    removeSegment: (id) =>
      set((state) => {
        const version = Date.now();
        const segments = state.segments.filter((l) => l!.id !== id);
        state.messageStoreWorker(StoreWorkerEvent.SEGMENT_STATE_UPDATE, {
          id: state.page.id,
          version,
          data: segments,
        });
        return { segments, hasChanges: true };
      }),
    replaceAllSegments: (segments) =>
      set((state) => {
        const version = Date.now();
        state.messageStoreWorker(StoreWorkerEvent.SEGMENT_STATE_UPDATE, {
          id: state.page.id,
          version,
          data: segments,
        });
        return { segments, hasChanges: true };
      }),
    resetSegments: () => set({ segments }),
  });
}
