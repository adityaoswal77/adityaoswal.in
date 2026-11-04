import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neon Fintech — Product Design Case Study",
  description:
    "Case study: Product design for Neon Fintech, a mobile banking app. Write-up in progress.",
  alternates: { canonical: "https://adityaoswal.in/work/neon-fintech" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
