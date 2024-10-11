"use client";
import { createSlice } from "@reduxjs/toolkit";

const Homeslice = createSlice({
  name: "counter",
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = Homeslice.actions;
export default Homeslice.reducer;
