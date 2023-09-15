import type { PagesToolState } from "./state.model";

let state: PagesToolState = {
  imageDataUrl: "",
  text: new Map(),
  lines: new Map(),
  images: new Map(),
  segments: new Map(),
  hasChanges: false,
};

let fetchedState: PagesToolState = {
  imageDataUrl: "",
  text: new Map(),
  lines: new Map(),
  images: new Map(),
  segments: new Map(),
  hasChanges: false,
};

export default { state, fetchedState };
