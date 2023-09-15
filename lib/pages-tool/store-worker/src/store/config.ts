import { configureStore } from "@reduxjs/toolkit";
import { infoSlice } from "./info";
import { textSlice } from "./text";
import { hubSlice } from "./hub";

export const store = configureStore({
  reducer: {
    [infoSlice.name]: infoSlice.reducer,
    [textSlice.name]: textSlice.reducer,
    [hubSlice.name]: hubSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ThunkApi = { state: RootState; dispatch: AppDispatch };
