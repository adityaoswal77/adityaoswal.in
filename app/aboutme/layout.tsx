import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | UX Designer & Product Designer",
  description:
    "Learn about Aditya Oswal — a UX Designer, Product Designer, and Design Engineer based in Bangalore, India. Crafting healthcare experiences, design systems, and interactive interfaces.",
  alternates: { canonical: "https://adityaoswal.in/aboutme" },
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
