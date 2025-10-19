import { Logo } from "@/components/ui/logo";

const HEADER_HEIGHT = 128;

export function Header() {
  return (
    <header
      className="flex items-center justify-between border-b"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="px-8">
        <Logo size="md" variant="wordmark" />
      </div>
      <Nav />
    </header>
  );
}
