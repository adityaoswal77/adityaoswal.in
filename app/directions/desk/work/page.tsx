import type { Metadata } from "next";
import { Pinboard } from "@/components/directions/desk/Pinboard";

export const metadata: Metadata = {
  title: "Work",
};

export default function DeskWorkPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#B2EB76] selection:text-[#090F05] dark:selection:bg-violet-500 dark:selection:text-white">
      <Pinboard />
    </main>
  );
}
