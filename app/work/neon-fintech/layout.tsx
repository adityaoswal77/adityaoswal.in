import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Neon Fintech — Product Design Case Study";
const description =
  "Case study: Product design for Neon Fintech. Designing intuitive financial experiences with a focus on clarity, trust, and user-centered interaction design.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/work/neon-fintech" },
  ...linkPreview("/work/neon-fintech", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
