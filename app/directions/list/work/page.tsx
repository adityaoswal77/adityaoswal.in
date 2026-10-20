import { WorkExplorer } from "@/components/directions/list/WorkExplorer";

export default function ListWorkPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--background)] text-[var(--foreground)] selection:bg-[#B2EB76] selection:text-[#090F05] dark:selection:bg-white dark:selection:text-black">
      <div className="mx-auto max-w-[90rem] px-6 pb-28 pt-32 md:pt-40">
        <h1 className="text-[clamp(5rem,22vw,16rem)] font-normal leading-[0.85] tracking-[-0.03em] text-[#090F05] dark:text-white">
          Work
        </h1>
        <p className="mb-12 mt-6 max-w-xl text-xl text-[#090F05] md:mb-16 md:text-2xl dark:text-white">
          Healthcare products, a design system and side projects.
        </p>
        <WorkExplorer />
      </div>
    </main>
  );
}
