"use client";

import type { KeyboardEvent } from "react";
import { useRef } from "react";

import type { BlogPost } from "@/data/blog-posts";

export type BlogCardProps = {
  post: BlogPost;
  index: number;
  onClick: (bounds: DOMRect) => void;
};

export function BlogCard({ post, onClick }: BlogCardProps) {
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
          {post.icon && (
            <post.icon className="text-muted-foreground h-12 w-12 stroke-1 md:h-16 md:w-16" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-4 md:flex-none">
        <h3 className="font-teko group-hover:text-primary text-xl leading-tight font-semibold transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mt-2 line-clamp-5 text-sm md:line-clamp-2">
          {post.excerpt}
        </p>
        <div className="text-muted-foreground mt-auto flex gap-2 pt-4 text-xs">
          <span>{post.readTime}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
      </div>
    </div>
  );
}
