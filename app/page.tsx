import { Logo } from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Heading } from "@/components/ui/typography/heading";

export default function Home() {
  return (
    <div className="container mx-auto space-y-12 p-8">
      <div className="flex gap-4">
        <Logo size="md" variant="wordmark" />
        <Logo size="md" variant="mark" />
        <Logo size="md" variant="chip" />
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
      <Heading
        as="h1"
        eyebrow="Eyebrow Text"
        subtitle="This is a subtitle that provides additional context for the main heading"
        title="Heading 1 - The Quick Brown Fox"
      />
      <Heading
        as="h2"
        eyebrow="Section Label"
        subtitle="A descriptive subtitle for heading level 2"
        title="Heading 2 - Jumps Over the Lazy Dog"
      />
      <Heading
        as="h3"
        eyebrow="Category"
        subtitle="Supporting text for heading 3"
        title="Heading 3 - Typography Showcase"
      />
      <Heading
        as="h4"
        eyebrow="Topic"
        subtitle="Additional details for this section"
        title="Heading 4 - Teko Font Family"
      />
      <Heading
        as="h5"
        eyebrow="Detail"
        subtitle="Supporting information for the smallest heading"
        title="Heading 5 - Variable Font Weights"
      />
    </div>
  );
}
