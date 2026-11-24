import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Resources & References";
const description = "Bookmarks across design, engineering, tools, reading, inspiration and AI, plus communities worth joining.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/links" },
  ...linkPreview("/links", { title, description }),
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
