import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Neon Fintech — Product Design Case Study";
const description =
  "Case study: Product design for Neon Fintech, a mobile banking app. Write-up in progress.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/work/neon-fintech" },
  robots: { index: false, follow: true },
  ...linkPreview("/work/neon-fintech", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
