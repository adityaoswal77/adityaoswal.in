import { SpecimenWork } from "@/components/specimens/SpecimenWork";

export default function SpecimensWorkPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#B2EB76] selection:text-[#090F05] dark:selection:bg-indigo-500 dark:selection:text-white">
      <SpecimenWork />
    </main>
  );
}
