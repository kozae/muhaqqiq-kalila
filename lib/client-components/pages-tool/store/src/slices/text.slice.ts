import { StateCreator } from "zustand";
import {
  ImagesState,
  State,
  TextEntity,
  TextSlice,
  TextState,
} from "./state.model";
import { highlightColors } from "../helpers/highlight-colors";
import { v4 as uuidv4 } from "uuid";
import { StoreWorkerEvent } from "pages-tool-store-worker";
import { replaceStoredImages, replaceStoredText } from "./worker.util";
import { reorderElements, update } from "./state.util";

export function createTextSlice(
  text: TextState
): StateCreator<State, any, any, TextSlice> {
  return (set) => ({
    text,
    addTextElement: (position) => {
      set((state) => {
        const order = state.text.length + state.images.length;
        const text: TextState = [
          ...state.text,
          {
            id: uuidv4(),
            position,
            order,
            pageId: state.page.id,
            color: highlightColors[order % 13],
            __typename: "TextElement",
            version: Date.now(),
          },
        ];

        state.messageStoreWorker(StoreWorkerEvent.TEXT_STATE_UPDATE, {
          id: state.page.id,
          version: Date.now(),
          data: text,
        });

        return { text, hasChanges: true };
      });
    },
    updateTextElement: (id: string, changes: Partial<TextEntity>) => {
      set((state) => {
        const version = Date.now();
        const el = state.text.find((el) => el!.id === id)!;
        const updated = update(el, { ...changes, version });
        const text = [
          ...state.text.slice().filter((el) => el!.id !== id),
          updated,
        ];

        replaceStoredText(state, text, version);
        return { text, hasChanges: true };
      });
    },
    reorderLayoutElements: (updates: Record<string, number>) => {
      set((state) => {
        const version = Date.now();
        const text = state.text.slice().map((el) => ({
          ...el,
          order: updates[el!.id],
          version,
        })) as TextState;
        const images = state.images.slice().map((el) => ({
          ...el,
          order: updates[el!.id],
          version,
        })) as ImagesState;

        replaceStoredText(state, text, version);
        replaceStoredImages(state, images, version);
        return { text, images, hasChanges: true };
      });
    },
    removeTextElement: (id: string) => {
      set((state) => {
        const el = state.text.find((el) => el!.id === id)!;
        const version = Date.now();
        const { text: reorderedText, images } = reorderElements(
          state,
          el.order
        );
        const text = reorderedText.slice().filter((el) => el!.id !== id);
        state.replaceAllImageElements(images);
        replaceStoredText(state, text, version);

        return { text, hasChanges: true };
      });
    },
    replaceAllTextElements: (text: TextState) => {
      set((state) => {
        const version = Date.now();
        replaceStoredText(state, text, version);
        return { text, hasChanges: true };
      });
    },
    resetText: () => set({ text }),
  });
}
