import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";
import { ThemeController } from "@/components/ThemeController";
import { ScrollProgress } from "@/components/ScrollProgress";

const title = "Playground | Aditya Oswal";
const description = "Design experiments and interactive components";

export const metadata: Metadata = {
  title,
  description,
  ...linkPreview("/playground", { title, description }),
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      {children}
      <ThemeController />
    </>
  );
}

