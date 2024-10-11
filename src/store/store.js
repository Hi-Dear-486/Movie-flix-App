"use client";
import { configureStore } from "@reduxjs/toolkit";
import Homeslice from "./Homeslice";
const Store = configureStore({
  reducer: {
    home: Homeslice,
  },
});

export default Store;
