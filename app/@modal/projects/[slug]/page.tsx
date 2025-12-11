"use client";

import { useParams } from "next/navigation";

import { ContentModal } from "@/components/ui/content-modal";
import { projectToContentItem } from "@/data/content-types";
import { projects } from "@/data/projects";

const contentItems = projects.map(projectToContentItem);

export default function ProjectModalPage() {
  const params = useParams();
  const slug = params.slug as string;
  const item = contentItems.find((i) => i.slug === slug);

  return (
    <ContentModal
      basePath="/projects"
      contentType="projects"
      item={item}
      items={contentItems}
    />
  );
}
