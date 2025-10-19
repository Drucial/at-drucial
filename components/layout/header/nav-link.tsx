import Link from "next/link";

import type { LucideIcon } from "lucide-react";

export type NavLinkProps = {
  Icon: LucideIcon;
  label: string;
  href: string;
};
export function NavLink({ Icon, label, href }: NavLinkProps) {
  return (
    <Link href={href}>
      <Icon className="size-4" />
      <span className="sr-only">{label}</span>
    </Link>
  );
}
