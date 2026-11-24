import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Website Redesign — UX & Design Engineering Case Study";
const description =
  "Case study: Full website redesign combining UX research, visual design, and design engineering. Built with Next.js, Tailwind CSS, and GSAP animations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/work/website-redesign" },
  ...linkPreview("/work/website-redesign", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
