import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interesting Places — A curated atlas of the world",
  description:
    "Side project: Interesting Places is a curated discovery platform for the world's most fascinating locations — designed and built by Aditya Oswal.",
  alternates: { canonical: "https://adityaoswal.in/playground/interestingplaces" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
