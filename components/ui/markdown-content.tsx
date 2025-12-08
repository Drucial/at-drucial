"use client";

import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";

import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-teko mt-8 mb-6 text-5xl leading-tight font-bold first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-teko mt-8 mb-4 text-4xl leading-tight font-semibold first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-teko mt-6 mb-3 text-3xl leading-tight font-semibold first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-teko mt-4 mb-2 text-2xl leading-tight font-medium first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-border text-muted-foreground my-4 border-l-4 pl-4 italic">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm">
          {children}
        </code>
      );
    }

    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="bg-muted my-4 overflow-x-auto rounded-lg p-4">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      className="text-primary hover:underline"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="border-border my-8" />,
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
};

export function MarkdownContent({
  content,
  className = "",
}: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={components}
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
