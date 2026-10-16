import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Redesign — UX & Design Engineering Case Study",
  description:
    "Case study: Redesigning a software company's marketing website. Write-up in progress.",
  alternates: { canonical: "https://adityaoswal.in/work/website-redesign" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
