import { FullStackUnicorn } from "@/components/pages/index/full-stack-unicorn";
import { TheAlchemist } from "@/components/pages/index/the-alchemist";
import { TheMinimalistSavant } from "@/components/pages/index/the-minimalist-savant";
import { TheRenaissanceTechnologist } from "@/components/pages/index/the-renaissance-technologist";
import { TheThinker } from "@/components/pages/index/the-thinker";
import { UiUxDesignerEngineer } from "@/components/pages/index/ui-ux-designer-engineer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main>
      <TheAlchemist />
      <Separator />
      <UiUxDesignerEngineer />
      <Separator />
      <FullStackUnicorn />
      <TheMinimalistSavant />
      <TheThinker />
      <TheRenaissanceTechnologist />
    </main>
  );
}
