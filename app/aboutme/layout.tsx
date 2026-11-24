import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "About Me | UX Designer & Product Designer";
const description =
  "Learn about Aditya Oswal — a UX Designer, Product Designer, and Design Engineer based in Bangalore, India. Crafting healthcare experiences, design systems, and interactive interfaces.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/aboutme" },
  ...linkPreview("/aboutme", { title, description }),
};

export default function AboutMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
