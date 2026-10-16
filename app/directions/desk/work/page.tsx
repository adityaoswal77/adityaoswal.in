import type { Metadata } from "next";
import { Pinboard } from "@/components/directions/desk/Pinboard";

export const metadata: Metadata = {
  title: "Work",
};

export default function DeskWorkPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#FF5C39] selection:text-[#2A2438] dark:selection:bg-violet-500 dark:selection:text-white">
      <Pinboard />
    </main>
  );
}
