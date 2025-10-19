import { Logo } from "@/components/ui/logo";

import { Nav } from "./nav";

export const HEADER_HEIGHT = 128;

export function Header() {
  return (
    <header
      className="flex items-center justify-between border-b"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="flex-1 px-6">
        <Logo size="md" variant="wordmark" />
      </div>
      <Nav />
    </header>
  );
}
