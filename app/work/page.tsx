import { SpecimenWork } from '@/components/specimens/SpecimenWork';

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#FF5C39] selection:text-[#2A2438] dark:selection:bg-indigo-500 dark:selection:text-white">
      <SpecimenWork />
    </main>
  );
}
