import { RadicalIcon, ZapIcon } from "lucide-react";

import type { NavLinkProps } from "./nav-link";

export const NAV_LINKS: NavLinkProps[] = [
  {
    Icon: RadicalIcon,
    label: "Articles",
    href: "/",
  },
  {
    Icon: ZapIcon,
    label: "Projects",
    href: "/about",
  },
];
