"use client";

import React from "react";

const MOBILE_BREAKPOINT = 768; // md breakpoint

type ViewportContextType = {
  viewportWidth: number;
  viewportHeight: number;
  isMobile: boolean;
};

const ViewportContext = React.createContext<ViewportContextType>({
  viewportWidth: 0,
  viewportHeight: 0,
  isMobile: false,
});

export function ViewportProvider({ children }: React.PropsWithChildren) {
  const [viewportWidth, setWidth] = React.useState(0);
  const [viewportHeight, setHeight] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWidth(width);
      setHeight(window.innerHeight);
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ViewportContext.Provider
      value={{ viewportWidth, viewportHeight, isMobile }}
    >
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport(): ViewportContextType {
  return React.useContext(ViewportContext);
}
