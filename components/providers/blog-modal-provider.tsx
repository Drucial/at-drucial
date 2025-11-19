"use client";

import { createContext, useContext, useState } from "react";

type CardBounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type BlogModalContextType = {
  cardBounds: CardBounds | null;
  setCardBounds: (bounds: CardBounds | null) => void;
  slideDirection: number;
  setSlideDirection: (direction: number) => void;
};

const BlogModalContext = createContext<BlogModalContextType | null>(null);

export function BlogModalProvider({ children }: { children: React.ReactNode }) {
  const [cardBounds, setCardBounds] = useState<CardBounds | null>(null);
  const [slideDirection, setSlideDirection] = useState<number>(0);

  return (
    <BlogModalContext.Provider
      value={{ cardBounds, setCardBounds, slideDirection, setSlideDirection }}
    >
      {children}
    </BlogModalContext.Provider>
  );
}

export function useBlogModal() {
  const context = useContext(BlogModalContext);

  if (!context) {
    throw new Error("useBlogModal must be used within a BlogModalProvider");
  }

  return context;
}
