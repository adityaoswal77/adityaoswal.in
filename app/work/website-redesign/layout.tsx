import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Redesign — UX & Design Engineering Case Study",
  description:
    "Case study: Full website redesign combining UX research, visual design, and design engineering. Built with Next.js, Tailwind CSS, and GSAP animations.",
  alternates: { canonical: "https://adityaoswal.in/work/website-redesign" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
