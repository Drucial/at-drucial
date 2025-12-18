import { FileTextIcon, FlaskConicalIcon, ImagesIcon } from "lucide-react";

import type { NavLinkProps } from "./nav-link";

export const NAV_LINKS: NavLinkProps[] = [
  {
    Icon: ImagesIcon,
    label: "Gallery",
    href: "/gallery",
  },
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
