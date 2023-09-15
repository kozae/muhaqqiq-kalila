import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PageState } from "../info";
import type { TextEntity } from "../text";

export interface HubState {
  fetched: {
    info: PageState;
    text: Array<TextEntity>;
  };
  hasChanges: boolean;
}

const initialState: HubState = {
  fetched: {
    info: {},
    text: [],
  },
  hasChanges: false,
};

export const hubSlice = createSlice({
  name: "hub",
  initialState,
  reducers: {
    loadHubState: (state, action: PayloadAction<HubState>) => {
      state.fetched = action.payload.fetched;
      state.hasChanges = action.payload.hasChanges;
    },
    stateChanged: (state) => {
      state.hasChanges = true;
    },
    stateReset: (state) => {
      state.hasChanges = false;
    },
  },
});
