import { ImagesState, State, TextState } from "./state.model";

export function reorderElements(state: State, removed: number) {
  const text = state.text.slice().map((el) => ({
    ...el,
    order: el!.order > removed ? el!.order - 1 : el!.order,
  })) as TextState;
  const images = state.images.slice().map((el) => ({
    ...el,
    order: el!.order > removed ? el!.order - 1 : el!.order,
  })) as ImagesState;
  return { text, images };
}

export function update<T>(original: T, updated: Partial<T>): T {
  let result: T = { ...original };
  for (let key in updated) {
    if (updated[key] !== undefined && updated[key] !== null) {
      result[key] = updated[key] as any;
    }
  }
  return result;
}
