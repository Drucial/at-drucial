"use client";

import type { KeyboardEvent } from "react";
import { useRef } from "react";

import { ArrowRight } from "lucide-react";

import type { ContentItem } from "@/data/content-types";

export type ContentCardProps = {
  item: ContentItem;
  index: number;
  onClick: (bounds: DOMRect) => void;
};

export function ContentCard({ item, onClick }: ContentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    if (cardRef.current) {
      const bounds = cardRef.current.getBoundingClientRect();
      onClick(bounds);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }

  return (
    <div
      ref={cardRef}
      className="group hover:bg-muted/50 focus-visible:ring-ring flex h-full cursor-pointer flex-col p-8 transition-colors focus-visible:ring-2 focus-visible:outline-none"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Icon hero - flexible height on mobile, 3:2 on desktop */}
      <div className="bg-muted w-full flex-1 overflow-hidden md:aspect-[3/2] md:flex-none">
        <div className="flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {item.icon && (
            <item.icon className="text-muted-foreground h-12 w-12 stroke-1 md:h-16 md:w-16" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-4 md:flex-none">
        <h3 className="font-teko group-hover:text-primary text-xl leading-tight font-semibold transition-colors">
          {item.title}
        </h3>
        <p className="text-muted-foreground mt-2 line-clamp-5 text-sm md:line-clamp-2">
          {item.excerpt}
        </p>
        <div className="text-muted-foreground mt-auto flex items-center justify-between gap-2 pt-4 text-xs">
          <div className="flex gap-2">
            <span>{item.meta.primary}</span>
            <span>·</span>
            <span>{item.meta.secondary}</span>
          </div>
          <span className="text-primary flex items-center gap-1 md:hidden">
            View
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
