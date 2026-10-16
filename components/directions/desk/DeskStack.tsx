import { PROJECTS } from "@/lib/data";
import { STACK_ONLY } from "./desk-utils";
import { DeskIntro } from "./DeskIntro";
import { Polaroid } from "./Polaroid";
import { StickyNote } from "./StickyNote";
import { FlowerSticker, HelloSticker, SmileySticker, StarSticker } from "./Stickers";

const TILTS = ["-rotate-[1.5deg]", "rotate-[1.5deg]", "-rotate-1", "rotate-[2deg]"];

export function DeskStack() {
  return (
    <section
      aria-label="Desk"
      className={`${STACK_ONLY} relative overflow-x-clip px-6 pb-16 pt-28 [background-image:radial-gradient(#E9E2F2_1.4px,transparent_1.4px)] [background-size:24px_24px] dark:[background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] dark:[background-size:32px_32px]`}
    >
      <div className="relative mx-auto max-w-sm">
        <FlowerSticker className="pointer-events-none absolute -right-2 -top-4 w-14 rotate-[-10deg]" />
        <DeskIntro />
        <div className="mt-8 -rotate-2">
          <StickyNote />
        </div>

        <ul className="relative mt-14 space-y-14">
          {PROJECTS.map((project, i) => (
            <li key={project.id} className={TILTS[i % TILTS.length]}>
              <Polaroid project={project} variant="stack" />
            </li>
          ))}
          <StarSticker className="pointer-events-none absolute -left-6 top-1/3 w-12 rotate-12" />
          <SmileySticker className="pointer-events-none absolute -right-5 top-2/3 w-14 rotate-6" />
        </ul>
        <HelloSticker className="pointer-events-none mx-auto mt-10 w-28 -rotate-6" />
      </div>
    </section>
  );
}
