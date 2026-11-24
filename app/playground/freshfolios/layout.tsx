import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Freshfolios — Portfolio platform for designers";
const description =
  "Side project: Freshfolios is a curated platform for designers to build and share their portfolios — designed and built by Aditya Oswal.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/playground/freshfolios" },
  ...linkPreview("/playground/freshfolios", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
