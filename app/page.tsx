import { Fragment } from "react";

import { DesignerEngineer } from "@/components/pages/index/designer-engineer";
import { TheAlchemist } from "@/components/pages/index/the-alchemist";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <Fragment>
      <TheAlchemist />
      <Separator />
      <DesignerEngineer />
    </Fragment>
  );
}
