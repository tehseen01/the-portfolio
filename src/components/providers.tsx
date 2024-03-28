"use client";

import { ReactNode } from "react";
import SmoothScroll from "./smooth-scroll";
import { ContextProvider } from "@/utils/context";
import { Cursor } from "./cursor";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SmoothScroll>
        <ContextProvider>
          <Cursor />
          {children}
        </ContextProvider>
      </SmoothScroll>
    </>
  );
};
