"use client";

import { ReactLenis } from "lenis/react";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        syncTouch: true,
        touchMultiplier: 1.25,
        prevent: (node) => {
          // Allow scrolling in elements with data-lenis-prevent attribute
          return node.hasAttribute?.("data-lenis-prevent");
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
