import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Website Redesign — UX & Design Engineering Case Study";
const description =
  "Case study: Redesigning a software company's marketing website. Write-up in progress.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/work/website-redesign" },
  robots: { index: false, follow: true },
  ...linkPreview("/work/website-redesign", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
