import {
  CVEducation,
  CVExperience,
  CVHero,
  CVProjects,
  CVSkills,
} from "@/components/pages/cv";
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
    </main>
  );
}
