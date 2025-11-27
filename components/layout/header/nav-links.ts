import { FileTextIcon, FlaskConicalIcon } from "lucide-react";

import type { NavLinkProps } from "./nav-link";

export const NAV_LINKS: NavLinkProps[] = [
  {
    Icon: FileTextIcon,
    label: "Resume",
    href: "/cv",
  },
  {
    Icon: FlaskConicalIcon,
    label: "Praxis Labs",
    href: "https://praxis-labs.io",
    external: true,
  },
];
