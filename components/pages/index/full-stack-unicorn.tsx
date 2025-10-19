import { HEADER_HEIGHT } from "@/components/layout/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionData = {
  value: string;
  title: string;
  content: string[];
};

export function FullStackUnicorn() {
  return (
    <section
      className="grid min-h-screen grid-cols-12 gap-x-8 px-6 md:px-8 lg:gap-x-12 lg:px-12"
      style={{ minHeight: `calc(100svh - ${HEADER_HEIGHT}px)` }}
    >
      {/* Left column - Accordion */}
      <div className="border-border col-span-12 flex items-center justify-center border-r py-12 md:col-span-6">
        <Accordion
          className="w-full max-w-[65ch]"
          defaultValue={["research"]}
          type="multiple"
        >
          {accordionData.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {item.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Right column - Title */}
      <div className="col-span-12 flex items-center justify-center py-12 md:col-span-6">
        <div className="font-teko text-border mt-12 flex flex-col items-center p-6 font-black uppercase tabular-nums md:p-8 lg:p-12">
          <span className="text-[15vw] leading-40 tracking-tighter">Full-</span>
          <span className="text-[12.5vw] leading-36 tracking-tighter">
            Stack
          </span>
          <span className="text-[9.5vw] leading-24 tracking-tighter">
            Unicorn
          </span>
        </div>
      </div>
    </section>
  );
}

const accordionData: AccordionData[] = [
  {
    value: "research",
    title: "RESEARCH",
    content: [
      "The backbone of any stellar product is research. Dive deep into user needs, category trends, and competitors. No stabbing in the dark here — real data guides the decisions.",
      "Using methods like user interviews and surveys reveals what users truly want. Research ensures solutions are sharp, targeted, and grounded in fact, not fiction.",
    ],
  },
  {
    value: "design",
    title: "DESIGN",
    content: [
      "Design is where magic meets logic. Turn insights into stunning, user-centric prototypes and interfaces. It's all about things looking good and working even better.",
      "Frequent testing and feedback loops perfect the UX and UI. A beautiful design that's intuitive and practical? That's the endgame.",
    ],
  },
  {
    value: "build",
    title: "BUILD",
    content: [
      "This is where visions come to life. Using top-notch full-stack development transforms designs into powerful, scalable products. Think of this as breathing life into ideas.",
      "Close collaboration ensures the final product stays true to its design and meets high technical standards. From code to launch, it's all about excellence and precision.",
    ],
  },
];
