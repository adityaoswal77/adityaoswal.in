import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "A running log of updates, fixes, and improvements to adityaoswal.in.",
  alternates: { canonical: "https://adityaoswal.in/changelog" },
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
