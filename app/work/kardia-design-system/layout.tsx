import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — Alivecor",
  description:
    "Case study: Building and scaling a cross-platform design system at Alivecor. Creating a unified component library for healthcare UX across iOS, Android, and web.",
  alternates: { canonical: "https://adityaoswal.in/work/kardia-design-system" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
