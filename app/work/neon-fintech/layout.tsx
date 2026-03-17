import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neon Fintech — Product Design Case Study",
  description:
    "Case study: Product design for Neon Fintech. Designing intuitive financial experiences with a focus on clarity, trust, and user-centered interaction design.",
  alternates: { canonical: "https://adityaoswal.in/work/neon-fintech" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
