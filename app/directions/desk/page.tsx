import type { Metadata } from "next";
import { DeskCanvas } from "@/components/directions/desk/DeskCanvas";
import { DeskStack } from "@/components/directions/desk/DeskStack";
import { WorkList } from "@/components/directions/desk/WorkList";

export const metadata: Metadata = {
  title: "Desk",
};

export default function DeskPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#B2EB76] selection:text-[#090F05] dark:selection:bg-violet-500 dark:selection:text-white">
      <DeskCanvas />
      <DeskStack />
      <WorkList />
    </main>
  );
}
