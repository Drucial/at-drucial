"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { useBlogModal } from "@/components/providers/blog-modal-provider";
import type { BlogPost } from "@/data/blog-posts";
import { blogPosts } from "@/data/blog-posts";
import { useDirectionalHover } from "@/hooks/use-directional-hover";

type NavButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
};

function NavButton({ onClick, children, label }: NavButtonProps) {
  const { ref, bgX, bgY, handlers } = useDirectionalHover<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      className="relative flex aspect-square h-full items-center justify-center overflow-hidden"
      onClick={onClick}
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
    >
      <motion.div
        className="bg-muted absolute inset-0"
        style={{ translateX: bgX, translateY: bgY }}
      />
      <span className="relative">{children}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}

type BlogCardProps = {
  post: BlogPost;
  index: number;
  onClick: (bounds: DOMRect) => void;
};

function BlogCard({ post, index, onClick }: BlogCardProps) {
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
      className="group flex h-full cursor-pointer flex-col p-8 transition-colors hover:bg-muted/50"
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
  const router = useRouter();
  const { setCardBounds } = useBlogModal();

  function handleCardClick(post: BlogPost, bounds: DOMRect) {
    setCardBounds({
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
    });
    router.push(`/blog/${post.slug}`);
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Section grows by adding vertical padding
  const paddingY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 200]
  );

  // Header grows from 0 to full width
  const headerWidth = useTransform(
    scrollYProgress,
    [0.25, 0.45],
    [0, 128] // 0 to 8rem (w-32)
  );

  // Stagger first 4 blog cards opacity, rest are always visible
  const cardOpacity0 = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const cardOpacity1 = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);
  const cardOpacity2 = useTransform(scrollYProgress, [0.41, 0.51], [0, 1]);
  const cardOpacity3 = useTransform(scrollYProgress, [0.44, 0.54], [0, 1]);
  const cardOpacities = [
    cardOpacity0,
    cardOpacity1,
    cardOpacity2,
    cardOpacity3,
  ];

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
    <motion.section
      ref={sectionRef}
      className="border-border relative flex flex-col justify-center border-y"
      style={{ paddingTop: paddingY, paddingBottom: paddingY }}
    >
      <div className="border-border flex flex-col border-y">
        <div className="flex">
          {/* Left column - Vertical heading (sticky) */}
          <motion.div
            className="bg-background border-border sticky left-0 z-10 flex shrink-0 items-center justify-center overflow-hidden border-r pt-4 pb-2 leading-none"
            style={{ width: headerWidth }}
          >
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
          </motion.div>

          {/* Blog posts - horizontal scroll with snap */}
          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory divide-x overflow-x-auto"
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="w-[calc((100vw-8rem)/3)] shrink-0 snap-start"
                style={index < 4 ? {
                  opacity: cardOpacities[index],
                } : undefined}
              >
                <BlogCard
                  index={index}
                  post={post}
                  onClick={(bounds) => handleCardClick(post, bounds)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer with nav controls */}
        <div className="border-border flex h-12 items-center justify-between border-t">
          <span className="text-muted-foreground pl-4 font-mono text-sm">
            {blogPosts.length} articles
          </span>
          <div className="border-border flex h-full divide-x border-l">
            <NavButton label="Previous" onClick={scrollLeft}>
              <ChevronLeft className="h-4 w-4" />
            </NavButton>
            <NavButton label="Next" onClick={scrollRight}>
              <ChevronRight className="h-4 w-4" />
            </NavButton>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
