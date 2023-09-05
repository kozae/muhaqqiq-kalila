import { StateCreator } from "zustand";
import { ImageEntity, ImagesSlice, ImagesState, State } from "./state.model";
import { highlightColors } from "../helpers/highlight-colors";
import { v4 as uuidv4 } from "uuid";
import { replaceStoredImages } from "./worker.util";
import { reorderElements, update } from "./state.util";

export function createImageSlice(
  images: ImagesState
): StateCreator<State, any, any, ImagesSlice> {
  return (set) => ({
    images,
    addImageElement: (position: string) => {
      set((state) => {
        const order = state.text.length + state.images.length;
        const version = Date.now();
        const images: ImagesState = [
          ...state.images,
          {
            id: uuidv4(),
            position,
            order,
            pageId: state.page.id,
            color: highlightColors[order % 13],
            __typename: "Image",
            version,
          },
        ];

        replaceStoredImages(state, images, version);

        return { images, hasChanges: true };
      });
    },
    updateImageElement: (id: string, changes: Partial<ImageEntity>) => {
      set((state) => {
        const version = Date.now();
        const el = state.images.find((el) => el!.id === id)!;
        const updated = update(el, { ...changes, version });
        const images = [
          ...state.images.slice().filter((el) => el!.id !== id),
          updated,
        ];

        replaceStoredImages(state, images, version);
        return { images, hasChanges: true };
      });
    },
    removeImageElement: (id: string) => {
      set((state) => {
        const el = state.images.find((el) => el!.id === id)!;
        const version = Date.now();
        const { text, images: reorderedImgaes } = reorderElements(
          state,
          el.order
        );
        const images = reorderedImgaes.slice().filter((el) => el!.id !== id);
        state.replaceAllTextElements(text);
        replaceStoredImages(state, images, version);

        return { images, hasChanges: true };
      });
    },
    replaceAllImageElements: (images: ImagesState) => {
      set((state) => {
        const version = Date.now();
        replaceStoredImages(state, images, version);
        return { images, hasChanges: true };
      });
    },
    resetImages: () => set({ images }),
  });
}
