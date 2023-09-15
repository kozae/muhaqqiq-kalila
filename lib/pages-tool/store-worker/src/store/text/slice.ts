import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { TextElement } from "kalila-graphql";
import type { IColoredRegion } from "../util";

export type TextEntity = Omit<TextElement, "lines"> & IColoredRegion;

export const textAdapter = createEntityAdapter<TextEntity>();

const initialState = textAdapter.getInitialState();

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    loadTexts: textAdapter.setAll,
  },
});
