"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useBlogModal } from "@/components/providers/blog-modal-provider";
import { blogPosts } from "@/data/blog-posts";

export default function BlogModal() {
  const params = useParams();
  const router = useRouter();
  const { cardBounds } = useBlogModal();
  const [isClosing, setIsClosing] = useState(false);

  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!post) {
    return null;
  }

  function handleClose() {
    setIsClosing(true);
  }

  function handleExitComplete() {
    router.back();
  }

  function handlePrev() {
    if (prevPost) {
      router.replace(`/blog/${prevPost.slug}`);
    }
  }

  function handleNext() {
    if (nextPost) {
      router.replace(`/blog/${nextPost.slug}`);
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
        initial={{
          top: initialBounds.top,
          left: initialBounds.left,
          width: initialBounds.width,
          height: initialBounds.height,
        }}
        transition={{
          duration: 0.7,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        {/* Header with close button */}
        <motion.header
          animate={{ y: 0, opacity: 1 }}
          className="border-border flex h-16 shrink-0 items-center justify-between border-b px-6"
          exit={{ y: -64, opacity: 0, transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] } }}
          initial={{ y: -64, opacity: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.3,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground font-mono text-sm">
              {post.date}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground font-mono text-sm">
              {post.readTime}
            </span>
          </div>
          <button
            className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded transition-colors"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </motion.header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-6 py-12">
            {/* Hero image */}
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="bg-muted aspect-[2/1] w-full"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{
                delay: 0.4,
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {/* Replace with actual image */}
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Hero Image
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="font-teko mt-8 text-5xl font-bold md:text-6xl lg:text-7xl"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                delay: 0.5,
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {post.title}
            </motion.h1>

            {/* Tags */}
            <motion.div
              animate={{ opacity: 1 }}
              className="mt-4 flex flex-wrap gap-2"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              initial={{ opacity: 0 }}
              transition={{
                delay: 0.55,
                duration: 0.3,
              }}
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded px-2 py-1 font-mono text-xs"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Content */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-neutral dark:prose-invert mt-8 max-w-none"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              initial={{ opacity: 0, y: 20 }}
              transition={{
                delay: 0.6,
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {/* Render markdown content - for now just whitespace-pre-wrap */}
              <div className="whitespace-pre-wrap">{post.content.trim()}</div>
            </motion.div>
          </div>
        </div>

        {/* Sticky footer with navigation */}
        <motion.footer
          animate={{ y: 0, opacity: 1 }}
          className="border-border flex h-14 shrink-0 items-center justify-between border-t"
          exit={{ y: 56, opacity: 0, transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] } }}
          initial={{ y: 56, opacity: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.3,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          <div className="border-border flex h-full divide-x border-r">
            <button
              className="hover:bg-muted flex aspect-square h-full items-center justify-center transition-colors disabled:opacity-30"
              disabled={!prevPost}
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous post</span>
            </button>
            <button
              className="hover:bg-muted flex aspect-square h-full items-center justify-center transition-colors disabled:opacity-30"
              disabled={!nextPost}
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next post</span>
            </button>
          </div>

          <div className="text-muted-foreground px-6 font-mono text-sm">
            {currentIndex + 1} / {blogPosts.length}
          </div>
        </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
