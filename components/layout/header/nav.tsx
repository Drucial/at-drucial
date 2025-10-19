"use client";

import { NavLink } from "./nav-link";
import { NAV_LINKS } from "./nav-links";

export function Nav() {
  return (
    <nav className="flex h-full items-center divide-x border-l">
      {NAV_LINKS.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}
