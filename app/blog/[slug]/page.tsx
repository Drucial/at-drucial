import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/ui/markdown-content";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen border-x">
      <article className="mx-auto max-w-4xl px-6 py-24">
        {/* Hero icon */}
        <div className="bg-muted flex aspect-[2/1] w-full items-center justify-center">
          {post.icon && (
            <post.icon className="text-muted-foreground h-24 w-24 stroke-1" />
          )}
        </div>

        {/* Title */}
        <h1 className="font-teko mt-8 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-muted-foreground font-mono text-sm">
            {post.date}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground font-mono text-sm">
            {post.readTime}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted text-muted-foreground rounded px-2 py-1 font-mono text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="mt-12">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </main>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
