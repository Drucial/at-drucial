"use client";

import { useRef } from "react";

import type { BlogPost } from "@/data/blog-posts";

export type BlogCardProps = {
  post: BlogPost;
  index: number;
  onClick: (bounds: DOMRect) => void;
};

export function BlogCard({ post, index, onClick }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    if (cardRef.current) {
      const bounds = cardRef.current.getBoundingClientRect();
      onClick(bounds);
    }
  }

  return (
    <div
      ref={cardRef}
      className="group hover:bg-muted/50 flex h-full cursor-pointer flex-col p-8 transition-colors"
      onClick={handleClick}
    >
      {/* Image placeholder - 3:2 aspect ratio */}
      <div className="bg-muted aspect-[3/2] w-full overflow-hidden">
        {/* Replace with actual image */}
        <div className="flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <span className="text-muted-foreground text-sm">
            Image {index + 1}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-teko group-hover:text-primary text-xl leading-tight font-semibold transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
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
