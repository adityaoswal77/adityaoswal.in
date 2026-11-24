import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Design System — Alivecor";
const description =
  "Case study: Building and scaling a cross-platform design system at Alivecor. Creating a unified component library for healthcare UX across iOS, Android, and web.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/work/kardia-design-system" },
  ...linkPreview("/work/kardia-design-system", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
