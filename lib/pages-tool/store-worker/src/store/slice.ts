import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initial-state";

import * as reducers from "./reducers";
import * as extraReducers from "./extra-reducers";

export const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    ...reducers,
  },
  extraReducers: (builder) => {
    Object.values(extraReducers).forEach((reducer) => reducer(builder));
  },
});
