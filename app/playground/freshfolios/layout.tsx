import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freshfolios — Portfolio platform for designers",
  description:
    "Side project: Freshfolios is a curated platform for designers to build and share their portfolios — designed and built by Aditya Oswal.",
  alternates: { canonical: "https://adityaoswal.in/playground/freshfolios" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
