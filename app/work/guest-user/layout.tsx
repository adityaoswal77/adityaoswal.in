import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Guest Mode vs Ghost Mode — Alivecor Kardia";
const description =
  "Case study: Designing Guest Mode for Alivecor Kardia EKG app. Improved guest recording experience, achieving 96.8% task success rate and +3.8% increase in Android users.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/work/guest-user" },
  ...linkPreview("/work/guest-user", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
