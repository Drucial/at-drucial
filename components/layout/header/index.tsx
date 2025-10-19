import { Logo } from "@/components/ui/logo";

import { Nav } from "./nav";

export const HEADER_HEIGHT = 128;

export function Header() {
  return (
    <header
      className="grid grid-cols-12 gap-x-8 border-b"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="col-span-6 flex items-center px-6 md:col-span-6 md:px-8">
        <Logo size="md" variant="wordmark" />
      </div>
      <div className="col-span-6 flex items-center justify-end md:col-span-6">
        <Nav />
      </div>
    </header>
  );
}
