"use client";

import { useRef } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScroll } from "motion/react";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
};

// Mock data - replace with real data later
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Vibe Coding as a Senior Dev",
    excerpt:
      "Hyperdirmic is a macOS utility that watches your Downloads folder for new files and instantly moves them into clean subfolders.",
    date: "2024-01-15",
    readTime: "5 min",
    image: "/placeholder-blog-1.jpg",
  },
  {
    id: "2",
    title: "Productivity Super Stack",
    excerpt:
      "Welcome to the Productivity Super Stack. This is all about the core tools that keep me focused, fast, and efficient.",
    date: "2024-01-10",
    readTime: "8 min",
    image: "/placeholder-blog-2.jpg",
  },
  {
    id: "3",
    title: "Design Systems at Scale",
    excerpt:
      "Building consistent UI across multiple products requires more than just a component library. Here's how to think about it.",
    date: "2024-01-05",
    readTime: "6 min",
    image: "/placeholder-blog-3.jpg",
  },
  {
    id: "4",
    title: "The Art of Refactoring",
    excerpt:
      "When code becomes unmanageable, it's time to refactor. Here's a systematic approach to cleaning up legacy codebases.",
    date: "2024-01-01",
    readTime: "7 min",
    image: "/placeholder-blog-4.jpg",
  },
  {
    id: "5",
    title: "Motion Design Principles",
    excerpt:
      "Good animation isn't just decoration. Learn the principles that make UI motion feel natural and purposeful.",
    date: "2023-12-28",
    readTime: "6 min",
    image: "/placeholder-blog-5.jpg",
  },
  {
    id: "6",
    title: "Building for Accessibility",
    excerpt:
      "Accessibility isn't an afterthought. Here's how to bake it into your design and development process from day one.",
    date: "2023-12-20",
    readTime: "9 min",
    image: "/placeholder-blog-6.jpg",
  },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <div className="group flex cursor-pointer flex-col p-8 transition-colors hover:bg-muted/50">
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
        <h3 className="font-teko text-xl leading-tight font-semibold group-hover:text-primary transition-colors">
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

export function TheThinker() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  function scrollLeft() {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.offsetWidth / 3;
    scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
  }

  function scrollRight() {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.offsetWidth / 3;
    scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
  }

  return (
    <section ref={sectionRef} className="border-border relative border-y">
      <div className="flex flex-col">
        <div className="flex">
          {/* Left column - Vertical heading (sticky) */}
          <div className="bg-background border-border sticky left-0 z-10 flex w-32 shrink-0 items-center justify-center border-r pt-4 pb-2 leading-none">
            <div className="relative">
              <span
                className="font-teko text-muted-foreground text-9xl leading-none font-bold uppercase"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Thinker
              </span>
              <span
                className="font-teko text-background absolute bottom-4 left-4 text-xl font-black tracking-widest uppercase"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                The
              </span>
            </div>
          </div>

          {/* Blog posts - horizontal scroll with snap */}
          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory divide-x overflow-x-auto"
          >
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                className="w-[calc((100vw-8rem)/3)] shrink-0 snap-start"
              >
                <BlogCard index={index} post={post} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer with nav controls */}
        <div className="border-border flex items-center justify-between border-t px-6 py-3">
          <span className="text-muted-foreground text-sm">
            {blogPosts.length} articles
          </span>
          <div className="flex gap-2">
            <button
              className="border-border hover:bg-muted flex h-8 w-8 items-center justify-center rounded border transition-colors"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </button>
            <button
              className="border-border hover:bg-muted flex h-8 w-8 items-center justify-center rounded border transition-colors"
              onClick={scrollRight}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
