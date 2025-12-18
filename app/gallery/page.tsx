import { GallerySection } from "@/components/pages/gallery/gallery-section";
import { GallerySectionCycling } from "@/components/pages/gallery/gallery-section-cycling";
import { TheConnection } from "@/components/pages/index/the-connection";
import { Separator } from "@/components/ui/separator";

const GRATIS_IMAGES = [
  { src: "/images/gratis-welcom.webp", alt: "Gratis - Welcome" },
  { src: "/images/gratis-entry-start.webp", alt: "Gratis - Entry Start" },
  { src: "/images/gratis-entry.webp", alt: "Gratis - Entry" },
  { src: "/images/gratis-entries.webp", alt: "Gratis - Entries" },
];

const AURANOTE_IMAGES = [
  { src: "/images/auranote-dash.webp", alt: "Auranote - Dashboard" },
  { src: "/images/auranote-entry.webp", alt: "Auranote - Entry" },
  { src: "/images/auranote-sidebar.webp", alt: "Auranote - Sidebar" },
  { src: "/images/auranote-admin.webp", alt: "Auranote - Admin" },
  { src: "/images/auranote-homepage.webp", alt: "Auranote - Homepage" },
];

const PANTREO_IMAGES = [
  { src: "/images/pantreo-start.webp", alt: "Pantreo - Start" },
  { src: "/images/pantreo-recipe.webp", alt: "Pantreo - Recipe" },
];

const PS_STAGE_IMAGES = [
  { src: "/images/ps-stage-lead.webp", alt: "Project stage - Lead" },
  { src: "/images/ps-stage-planning.webp", alt: "Project stage - Planning" },
  { src: "/images/ps-stage-delivery.webp", alt: "Project stage - Delivery" },
  { src: "/images/ps-stage-done.webp", alt: "Project stage - Done" },
];

export default function GalleryPage() {
  return (
    <main>
      <GallerySection
        isFirst
        href="/projects/praxis-labs"
        imageAlt="Hypr Mono"
        imageSrc="/images/hypr-mono.webp"
        name="Hypr Mono"
      />
      <Separator />
      <GallerySectionCycling
        href="/projects/auranote"
        images={AURANOTE_IMAGES}
        name="AuraNote"
      />
      <Separator />
      <GallerySectionCycling
        href="/projects/praxis-labs"
        images={GRATIS_IMAGES}
        name="Gratis"
      />
      <Separator />
      <GallerySectionCycling images={PANTREO_IMAGES} name="Pantreo" />
      <Separator />
      <GallerySectionCycling
        href="/projects/craftwork-os"
        images={PS_STAGE_IMAGES}
        name="Craftwork OS"
      />
      <Separator />
      <TheConnection />
    </main>
  );
}
