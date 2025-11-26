"use client";

import { ReactLenis } from "lenis/react";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{ syncTouch: true }}
    >
      {children}
    </ReactLenis>
  );
}
