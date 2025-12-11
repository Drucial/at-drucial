import type { LucideIcon } from "lucide-react";

import type { BlogPost } from "@/data/blog-posts";
import type { Project } from "@/data/projects";

// Shared content item type for cards and modals
export type ContentItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  icon?: LucideIcon;
  tags: string[];
  meta: {
    primary: string; // e.g., date or company
    secondary: string; // e.g., readTime or year
  };
  subtitle?: string; // e.g., role for projects
  url?: string;
  images?: string[];
};

export type ContentType = "blog" | "projects";

// Transform functions
export function blogPostToContentItem(post: BlogPost): ContentItem {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    icon: post.icon,
    tags: post.tags,
    meta: {
      primary: post.readTime,
      secondary: post.date,
    },
  };
}

export function projectToContentItem(project: Project): ContentItem {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    excerpt: project.excerpt,
    content: project.description,
    icon: project.icon,
    tags: project.tags,
    meta: {
      primary: project.company,
      secondary: project.year,
    },
    subtitle: project.role,
    url: project.url,
    images: project.images,
  };
}
