import type { PayloadAction } from "@reduxjs/toolkit";
import lodash from "lodash";
import type { ImageEntity, TextEntity } from "..";
import {
  imagesAdapter,
  linesAdapter,
  textAdapter,
  type WritableState,
} from "../initial-state";
import { highlightColors } from "../util";
import { v4 as uuidv4 } from "uuid";
import {
  selectAllImageElements,
  selectAllLines,
  selectAllTextElements,
  selectImageElementsById,
  selectLineById,
  selectTextElementsById,
} from "../base-selectors";

export const addLayoutElement = (
  state: WritableState,
  action: PayloadAction<string>,
) => {
  const order = state.text.ids.length + state.images.ids.length;
  const color = highlightColors[order % 13];
  if (action.payload.includes("image") || action.payload === "blank") {
    imagesAdapter.addOne(state.images, {
      id: uuidv4(),
      position: action.payload,
      order,
      pageId: state.info?.id!,
      color,
      __typename: "Image",
    });
    state.changed.images = true;
  } else {
    textAdapter.addOne(state.text, {
      id: uuidv4(),
      position: action.payload,
      order,
      pageId: state.info?.id!,
      color,
      __typename: "TextElement",
    });
    state.changed.text = true;
  }

  state.stateId = Date.now();
  state.lastAction = "addLayoutElement";
};
export const deleteLayoutElement = (
  state: WritableState,
  action: PayloadAction<string>,
) => {
  const originalText = selectAllTextElements(state.text);
  const originalImages = selectAllImageElements(state.images);
  const elements = lodash
    .orderBy(
      [...originalText, ...originalImages].filter(
        (el) => el.id !== action.payload,
      ),
      "order",
    )
    .map((el, i) => ({ ...el, order: i }));
  const text: TextEntity[] = [];
  const images: ImageEntity[] = [];

  for (const element of elements) {
    if (element.position?.includes("image") || element.position === "blank") {
      images.push(element as ImageEntity);
    } else {
      text.push(element as TextEntity);
    }
  }
  state.text = textAdapter.setAll(state.text, text);
  state.images = imagesAdapter.setAll(state.images, images);
  state.changed.images = true;
  state.changed.text = true;
  state.stateId = Date.now();
  state.lastAction = "deleteLayoutElement";
};

export const defineElementFacsimileRegion = (
  state: WritableState,
  action: PayloadAction<{ id: string; region: number[] }>,
) => {
  const { id, region } = action.payload;
  const update = { id, changes: { region } };
  const text = selectTextElementsById(state.text, id);
  if (text) {
    textAdapter.updateOne(state.text, update);
    state.changed.text = true;
  } else {
    const image = selectImageElementsById(state.images, id);
    if (image) {
      imagesAdapter.updateOne(state.images, update);
      state.changed.images = true;
    } else {
      const line = selectLineById(state.lines, id);
      if (line) {
        linesAdapter.updateOne(state.lines, update);
        state.changed.lines = true;
      }
    }
  }

  state.stateId = Date.now();
  state.lastAction = "defineElementFacsimileRegion";
};
