"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { useBlogModal } from "@/components/providers/blog-modal-provider";
import { BlogCard } from "@/components/ui/blog-card";
import { NavButton } from "@/components/ui/nav-button";
import type { BlogPost } from "@/data/blog-posts";
import { blogPosts } from "@/data/blog-posts";

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
  const paddingY = useTransform(scrollYProgress, [0, 0.3], [0, 200]);

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
    scrollContainerRef.current.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.offsetWidth / 3;
    scrollContainerRef.current.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  }

  return (
    <motion.section
      ref={sectionRef}
      className="border-border relative flex flex-col justify-center border-b"
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
                style={
                  index < 4
                    ? {
                        opacity: cardOpacities[index],
                      }
                    : undefined
                }
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
