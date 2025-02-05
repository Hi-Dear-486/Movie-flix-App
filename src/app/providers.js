"use client";

import Store from "@/store/store";
import { Provider } from "react-redux";

export function Providers({ children }) {
  return <Provider store={Store}>{children}</Provider>;
}
