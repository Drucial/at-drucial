import { Fragment } from "react";

import { FullStackUnicorn } from "@/components/pages/index/full-stack-unicorn";
import { TheAlchemist } from "@/components/pages/index/the-alchemist";
import { UiUxDesignerEngineer } from "@/components/pages/index/ui-ux-designer-engineer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <Fragment>
      <TheAlchemist />
      <Separator />
      <UiUxDesignerEngineer />
      <Separator />
      <FullStackUnicorn />
      <Separator />
    </Fragment>
  );
}
