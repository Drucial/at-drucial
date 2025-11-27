import {
  CVEducation,
  CVExperience,
  CVHero,
  CVProjects,
  CVSkills,
} from "@/components/pages/cv";
import { TheConnection } from "@/components/pages/index";
import { Separator } from "@/components/ui/separator";

export default function CVPage() {
  return (
    <main>
      <CVHero />
      <Separator />
      <CVExperience />
      <Separator />
      <CVProjects />
      <Separator />
      <CVSkills />
      <Separator />
      <CVEducation />
      <Separator />
      <TheConnection heading="Communication" />
    </main>
  );
}
