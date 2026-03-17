import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Mode vs Ghost Mode — Alivecor Kardia",
  description:
    "Case study: Designing Guest Mode for Alivecor Kardia EKG app. Improved guest recording experience, achieving 96.8% task success rate and +3.8% increase in Android users.",
  alternates: { canonical: "https://adityaoswal.in/work/guest-user" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
