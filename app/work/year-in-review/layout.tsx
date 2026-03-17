import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Year in Review — Design & Growth Case Study",
  description:
    "Case study: Year in Review — reflecting on design growth, key projects, and learnings as a UX Designer and Design Engineer.",
  alternates: { canonical: "https://adityaoswal.in/work/year-in-review" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
