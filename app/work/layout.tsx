import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";
import { ScrollProgress } from "@/components/ScrollProgress";

const title = "Work & Case Studies | UX Designer & Product Designer";
const description =
  "Selected work by Aditya Oswal — UX Designer and Product Designer. Case studies in healthcare UX, fintech design, design systems, and interactive web experiences.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/work" },
  ...linkPreview("/work", { title, description }),
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
