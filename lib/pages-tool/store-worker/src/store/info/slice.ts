import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Page } from "kalila-graphql";

export type PageState = Partial<
  Omit<Page, "__typename" | "text" | "images" | "segments"> & {
    imageDataUrl?: string;
  }
>;
const initialState: PageState = {};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    loadInfo: (state, action: PayloadAction<PageState>) => {
      state = action.payload;
    },
  },
});
