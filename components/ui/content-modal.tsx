"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useContentModal } from "@/components/providers/content-modal-provider";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { NavButton } from "@/components/ui/nav-button";
import type { ContentItem, ContentType } from "@/data/content-types";

type ContentModalProps = {
  item: ContentItem | undefined;
  items: ContentItem[];
  contentType: ContentType;
  basePath: string;
};

export function ContentModal({
  item,
  items,
  contentType,
  basePath,
}: ContentModalProps) {
  const router = useRouter();
  const { cardBounds, slideDirection, setSlideDirection } = useContentModal();
  const [isClosing, setIsClosing] = useState(false);

  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem =
    currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!item) {
    return null;
  }

  function handleClose() {
    setSlideDirection(0); // Reset for close animation
    setIsClosing(true);
  }

  function handleExitComplete() {
    document.body.style.overflow = "";
    router.back();
  }

  function handlePrev() {
    if (prevItem) {
      setSlideDirection(-1); // Slide from left
      router.replace(`${basePath}/${prevItem.slug}`);
    }
  }

  function handleNext() {
    if (nextItem) {
      setSlideDirection(1); // Slide from right
      router.replace(`${basePath}/${nextItem.slug}`);
    }
  }

  // Default bounds if card bounds not available (direct URL access)
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const initialBounds = cardBounds || {
    top: windowHeight / 2 - 200,
    left: windowWidth / 2 - 200,
    width: 400,
    height: 400,
  };

  // If slideDirection is non-zero, we're navigating between items - skip container animation
  const isNavigating = slideDirection !== 0;

  const itemLabel = contentType === "blog" ? "post" : "project";

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isClosing && (
        <motion.div
          className="bg-background border-border fixed z-50 flex flex-col overflow-hidden border"
          animate={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          exit={{
            top: initialBounds.top,
            left: initialBounds.left,
            width: initialBounds.width,
            height: initialBounds.height,
            opacity: 0,
            transition: {
              delay: 0.15,
              duration: 0.6,
              ease: [0.32, 0.72, 0, 1],
              opacity: {
                delay: 0.6,
                duration: 0.15,
              },
            },
          }}
          initial={
            isNavigating
              ? {
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }
              : {
                  top: initialBounds.top,
                  left: initialBounds.left,
                  width: initialBounds.width,
                  height: initialBounds.height,
                }
          }
          transition={{
            duration: 0.7,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {/* Header with close button */}
          <motion.header
            animate={{ y: 0, opacity: 1 }}
            className="border-border flex h-16 shrink-0 items-center justify-between border-b pl-6"
            exit={{
              y: -64,
              opacity: 0,
              transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
            }}
            initial={
              isNavigating ? { y: 0, opacity: 1 } : { y: -64, opacity: 0 }
            }
            transition={{
              delay: isNavigating ? 0 : 0.3,
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground font-mono text-sm">
                {item.meta.primary}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground font-mono text-sm">
                {item.meta.secondary}
              </span>
            </div>
            <div className="border-border flex h-full border-l">
              <NavButton label="Close" onClick={handleClose}>
                <X className="h-4 w-4" />
              </NavButton>
            </div>
          </motion.header>

          {/* Scrollable content */}
          <motion.div
            className="relative flex-1 overflow-hidden"
            exit={{
              opacity: 0,
              transition: { duration: 0.15, ease: [0.32, 0.72, 0, 1] },
            }}
          >
            <motion.div
              key={item.slug}
              data-lenis-prevent
              animate={{ x: 0, opacity: 1 }}
              className="absolute inset-0 overflow-y-auto"
              initial={{
                x: isNavigating ? slideDirection * 50 + "%" : 0,
                opacity: isNavigating ? 0 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.4 },
              }}
            >
              <div className="mx-auto max-w-4xl px-6 py-12">
                {/* Hero icon */}
                <div className="bg-muted flex aspect-[2/1] w-full items-center justify-center">
                  {item.icon && (
                    <item.icon className="text-muted-foreground h-24 w-24 stroke-1" />
                  )}
                </div>

                {/* Title */}
                <h1 className="font-teko mt-8 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
                  {item.title}
                </h1>

                {/* Subtitle (e.g., role for projects) */}
                {item.subtitle && (
                  <p className="text-muted-foreground mt-2 font-mono text-sm">
                    {item.subtitle}
                  </p>
                )}

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted text-muted-foreground rounded px-2 py-1 font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* URL */}
                {item.url && (
                  <a
                    className="text-primary mt-4 inline-flex items-center gap-1 font-mono text-sm hover:underline"
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.url.replace(/^https?:\/\//, "")}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )}

                {/* Content */}
                <div className="mt-8">
                  <MarkdownContent content={item.content} />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sticky footer with navigation */}
          <motion.footer
            animate={{ y: 0, opacity: 1 }}
            className="border-border flex h-14 shrink-0 items-center justify-between border-t"
            exit={{
              y: 56,
              opacity: 0,
              transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
            }}
            initial={
              isNavigating ? { y: 0, opacity: 1 } : { y: 56, opacity: 0 }
            }
            transition={{
              delay: isNavigating ? 0 : 0.3,
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <div className="border-border flex h-full divide-x border-r">
              <NavButton
                disabled={!prevItem}
                label={`Previous ${itemLabel}`}
                onClick={handlePrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </NavButton>
              <NavButton
                disabled={!nextItem}
                label={`Next ${itemLabel}`}
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
              </NavButton>
            </div>

            <div className="text-muted-foreground px-6 font-mono text-sm">
              {currentIndex + 1} / {items.length}
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
