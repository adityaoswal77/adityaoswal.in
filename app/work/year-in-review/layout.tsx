import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Year in Review — Design & Growth Case Study";
const description =
  "Case study: Year in Review — reflecting on design growth, key projects, and learnings as a UX Designer and Design Engineer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/work/year-in-review" },
  ...linkPreview("/work/year-in-review", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
