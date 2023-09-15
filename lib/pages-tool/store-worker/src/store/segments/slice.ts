import { createSlice } from "@reduxjs/toolkit";
import type { Page } from "kalila-graphql";

export type PageState = Partial<
  Omit<Page, "__typename" | "text" | "images" | "segments"> & {
    imageDataUrl?: string;
  }
>;
const initialState: PageState = {};

export const InfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {},
});
