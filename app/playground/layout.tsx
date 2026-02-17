import type { Metadata } from "next";
import { ThemeController } from "@/components/ThemeController";

export const metadata: Metadata = {
  title: "Playground | Aditya Oswal",
  description: "Design experiments and interactive components",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ThemeController />
    </>
  );
}

