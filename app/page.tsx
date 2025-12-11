import { FullStackUnicorn } from "@/components/pages/index/full-stack-unicorn";
import { TheAlchemist } from "@/components/pages/index/the-alchemist";
import { TheConnection } from "@/components/pages/index/the-connection";
import { TheMaker } from "@/components/pages/index/the-maker";
import { TheMinimalistSavant } from "@/components/pages/index/the-minimalist-savant";
import { ThePolymath } from "@/components/pages/index/the-polymath";
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
      <Separator className="hidden md:block" />
      <TheMaker />
      <Separator />
      <ThePolymath />
      <Separator />
      <TheConnection />
    </main>
  );
}
