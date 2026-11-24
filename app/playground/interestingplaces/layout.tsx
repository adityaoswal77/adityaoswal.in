import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Interesting Places — A curated atlas of the world";
const description =
  "Side project: Interesting Places is a curated discovery platform for the world's most fascinating locations — designed and built by Aditya Oswal.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/playground/interestingplaces" },
  ...linkPreview("/playground/interestingplaces", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
