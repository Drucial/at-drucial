import { HomeIcon } from "lucide-react";

import type { NavLinkProps } from "./nav-link";
import { NavLink } from "./nav-link";

export function Nav() {
  return (
    <nav className="flex h-full items-center gap-4">
      {NAV_LINKS.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}

const NAV_LINKS: NavLinkProps[] = [
  {
    Icon: HomeIcon,
    label: "Home",
    href: "/",
  },
  {
    Icon: HomeIcon,
    label: "About",
    href: "/about",
  },
];
