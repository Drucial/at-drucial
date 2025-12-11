"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { SMALL_HEADER_HEIGHT } from "@/components/layout/header";
import { useContentModal } from "@/components/providers/content-modal-provider";
import { useViewport } from "@/components/providers/viewport-provider";
import { ContentCard } from "@/components/ui/content-card";
import { NavButton } from "@/components/ui/nav-button";
import type { ContentItem } from "@/data/content-types";
import { projectToContentItem } from "@/data/content-types";
import { projects } from "@/data/projects";

const contentItems = projects.map(projectToContentItem);

export function TheMaker() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isMobile } = useViewport();
  const { setCardBounds, setContentType } = useContentModal();

  function handleCardClick(item: ContentItem, bounds: DOMRect) {
    setCardBounds({
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
    });
    setContentType("projects");
    router.push(`/projects/${item.slug}`);
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Mobile entrance - from section entering viewport to reaching header
  const { scrollYProgress: mobileProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", `start ${SMALL_HEADER_HEIGHT}px`],
  });

  // Section grows by adding vertical padding
  const paddingY = useTransform(scrollYProgress, [0, 0.3], [0, 200]);

  // Header grows from 0 to full width (desktop)
  const headerWidth = useTransform(
    scrollYProgress,
    [0.25, 0.45],
    [0, 128] // 0 to 8rem (w-32)
  );

  // Mobile heading slides down from top
  const mobileHeaderY = useTransform(mobileProgress, [0, 1], ["-100%", "0%"]);

  // Stagger first 4 project cards opacity, rest are always visible
  const cardOpacity0 = useTransform(
    isMobile ? mobileProgress : scrollYProgress,
    isMobile ? [0.4, 0.8] : [0.35, 0.45],
    [0, 1]
  );
  const cardOpacity1 = useTransform(
    isMobile ? mobileProgress : scrollYProgress,
    isMobile ? [0.5, 0.9] : [0.38, 0.48],
    [0, 1]
  );
  const cardOpacity2 = useTransform(
    isMobile ? mobileProgress : scrollYProgress,
    isMobile ? [0.6, 1.0] : [0.41, 0.51],
    [0, 1]
  );
  const cardOpacity3 = useTransform(
    isMobile ? mobileProgress : scrollYProgress,
    isMobile ? [0.7, 1.0] : [0.44, 0.54],
    [0, 1]
  );
  const cardOpacities = [
    cardOpacity0,
    cardOpacity1,
    cardOpacity2,
    cardOpacity3,
  ];

  function scrollLeft() {
    if (!scrollContainerRef.current) return;
    // Get viewport width to determine if mobile
    const isMobile = window.innerWidth < 768; // md breakpoint
    const cardWidth = isMobile
      ? scrollContainerRef.current.offsetWidth
      : scrollContainerRef.current.offsetWidth / 3;
    scrollContainerRef.current.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    if (!scrollContainerRef.current) return;
    // Get viewport width to determine if mobile
    const isMobile = window.innerWidth < 768; // md breakpoint
    const cardWidth = isMobile
      ? scrollContainerRef.current.offsetWidth
      : scrollContainerRef.current.offsetWidth / 3;
    scrollContainerRef.current.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex flex-col justify-center border-x"
      style={{
        paddingTop: !isMobile ? paddingY : undefined,
        paddingBottom: !isMobile ? paddingY : undefined,
        height: isMobile ? `calc(100vh - ${SMALL_HEADER_HEIGHT}px)` : undefined,
      }}
    >
      <div className="border-border flex h-full flex-1 flex-col overflow-hidden border-t md:h-auto md:border-y">
        {/* Mobile heading - horizontal at top */}
        <motion.div
          className="border-border flex items-center justify-center border-b p-6 md:hidden"
          style={{ y: mobileHeaderY }}
        >
          <div className="relative">
            <span className="font-teko text-foreground text-8xl leading-none font-bold uppercase">
              Maker
            </span>
            <span className="font-teko text-foreground absolute -top-2.5 left-1.5 text-lg font-black tracking-widest uppercase">
              The
            </span>
          </div>
        </motion.div>

        <div className="flex flex-1 md:flex-none">
          {/* Left column - Vertical heading (sticky) - Desktop only */}
          <motion.div
            className="bg-background border-border sticky left-0 z-10 hidden shrink-0 items-center justify-center overflow-hidden border-r pt-4 pb-2 leading-none md:flex"
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
                Maker
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

          {/* Projects - horizontal scroll with snap */}
          <div
            ref={scrollContainerRef}
            className="flex min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto md:divide-x"
          >
            {contentItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="w-full shrink-0 snap-start md:w-[calc((100vw-8rem)/3)]"
                style={
                  index < 4
                    ? {
                        opacity: cardOpacities[index],
                      }
                    : undefined
                }
              >
                <ContentCard
                  index={index}
                  item={item}
                  onClick={(bounds) => handleCardClick(item, bounds)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer with nav controls */}
        <div className="border-border flex h-16 shrink-0 items-center justify-between border-t md:h-12">
          <span className="text-muted-foreground pl-4 font-mono text-sm">
            {contentItems.length} projects
          </span>
          <div className="border-border flex h-full divide-x border-l">
            <NavButton label="Previous" onClick={scrollLeft}>
              <ChevronLeft className="h-5 w-5 md:h-4 md:w-4" />
            </NavButton>
            <NavButton label="Next" onClick={scrollRight}>
              <ChevronRight className="h-5 w-5 md:h-4 md:w-4" />
            </NavButton>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
