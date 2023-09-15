import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FetchedState, ThunkApi } from "..";
import { discardStoredUpdates } from "../../db";

export const discardUpdates = createAsyncThunk<FetchedState, any, ThunkApi>(
  "discardUpdates",
  async (_, { getState }) => {
    const state = getState();
    await discardStoredUpdates(state.info!.id);
    return state.fetched!;
  },
);
