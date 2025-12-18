import { GallerySection } from "@/components/pages/gallery/gallery-section";
import { GallerySectionCycling } from "@/components/pages/gallery/gallery-section-cycling";
import { Separator } from "@/components/ui/separator";

const CYCLING_IMAGES = [
  { src: "/images/ps-stage-lead.png", alt: "Project stage - Lead" },
  { src: "/images/ps-stage-planning.png", alt: "Project stage - Planning" },
  { src: "/images/ps-stage-delivery.png", alt: "Project stage - Delivery" },
  { src: "/images/ps-stage-done.png", alt: "Project stage - Done" },
];

export default function GalleryPage() {
  return (
    <main>
      <GallerySection
        isFirst
        imageAlt="Hypr Mono"
        imageSrc="/images/hypr-mono.png"
      />
      <Separator />
      <GallerySection imageAlt="Gratis" imageSrc="/images/gratis.png" />
      <Separator />
      <GallerySection imageAlt="Pantreo" imageSrc="/images/pantreo.png" />
      <Separator />
      <GallerySectionCycling images={CYCLING_IMAGES} />
    </main>
  );
}
