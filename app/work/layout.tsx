import type { Metadata } from "next";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Work & Case Studies | UX Designer & Product Designer",
  description:
    "Selected work by Aditya Oswal — UX Designer and Product Designer. Case studies in healthcare UX, fintech design, design systems, and interactive web experiences.",
  alternates: { canonical: "https://adityaoswal.in/work" },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}
