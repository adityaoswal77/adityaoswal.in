import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Year in Review — Design & Growth Case Study",
  description:
    "Case study: Year in Review — a personalized year-end recap for KardiaCare Premium subscribers, turning ECG data into a shareable story.",
  alternates: { canonical: "https://adityaoswal.in/work/year-in-review" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
