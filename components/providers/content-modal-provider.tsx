"use client";

import { createContext, useContext, useState } from "react";

type CardBounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type ContentModalContextType = {
  cardBounds: CardBounds | null;
  setCardBounds: (bounds: CardBounds | null) => void;
  slideDirection: number;
  setSlideDirection: (direction: number) => void;
  contentType: "blog" | "projects" | null;
  setContentType: (type: "blog" | "projects" | null) => void;
};

const ContentModalContext = createContext<ContentModalContextType | null>(null);

export function ContentModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cardBounds, setCardBounds] = useState<CardBounds | null>(null);
  const [slideDirection, setSlideDirection] = useState<number>(0);
  const [contentType, setContentType] = useState<
    "blog" | "projects" | null
  >(null);

  return (
    <ContentModalContext.Provider
      value={{
        cardBounds,
        setCardBounds,
        slideDirection,
        setSlideDirection,
        contentType,
        setContentType,
      }}
    >
      {children}
    </ContentModalContext.Provider>
  );
}

export function useContentModal() {
  const context = useContext(ContentModalContext);

  if (!context) {
    throw new Error(
      "useContentModal must be used within a ContentModalProvider"
    );
  }

  return context;
}
