import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationState } from "../../../data/model";

const initialState: LocationState = {
  latLocation: 0,
  longLocation: 0,
};

export const locationSlice = createSlice({
  name: "addressLocation",
  initialState,
  reducers: {
    setLocationAddress: (state, action: PayloadAction<LocationState>) => {
      state.latLocation = action.payload.latLocation;
      state.longLocation = action.payload.longLocation;
    },
  },
});

export const { setLocationAddress } = locationSlice.actions;

export const getLocation = (state: LocationState) => state.longLocation;

export default locationSlice.reducer;
