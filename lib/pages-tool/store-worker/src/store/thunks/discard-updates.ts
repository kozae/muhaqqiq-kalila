import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FetchedState, ThunkApi } from "..";

export const discardUpdates = createAsyncThunk<FetchedState, {}, ThunkApi>(
    "discardUpdates",
    async ({ }, { getState }) => {
        const state = getState();
        return state.fetched!;
    }
);

