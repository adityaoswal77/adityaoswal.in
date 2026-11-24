import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Changelog";
const description = "A running log of updates, fixes, and improvements to adityaoswal.in.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/changelog" },
  ...linkPreview("/changelog", { title, description }),
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
