import { HEADER_HEIGHT } from "@/components/layout/header";
import { Keyboard } from "@/components/svgs/keyboard";

export function TheAlchemist() {
  return (
    <section
      className="grid-auto-rows-[minmax(auto,1fr)] grid grid-cols-12 gap-x-8 px-6 md:px-8 lg:px-12"
      style={{ height: `calc(100svh - ${HEADER_HEIGHT}px)` }}
    >
      {/* Subtitle: top-right two columns of the left main column */}
      <p className="text-muted-foreground col-span-12 row-start-1 justify-self-end py-6 text-right text-xl leading-tight tracking-wider lowercase md:col-span-3 md:col-start-5 md:py-8">
        Expertly Blurring the Lines Between Artistry and Engineering
      </p>

      {/* Title: centered vertically within left 7 columns, with inner left offset */}
      <h1 className="col-span-12 row-start-2 mr-8 self-center text-[clamp(3rem,14.5vw,17rem)] leading-[0.7] font-bold tracking-tighter md:col-span-6 md:col-start-1">
        The <br />
        Alchemist
      </h1>

      {/* Right whitespace / image column spanning both rows */}
      <div className="row-span-2 hidden overflow-hidden border-l md:col-span-5 md:col-start-8 md:block">
        <Keyboard />
      </div>
    </section>
  );
}
