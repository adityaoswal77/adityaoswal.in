import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "AI Workspace for Tax Professionals";
const description =
  "Concept case study: a chat-first home screen for an AI workspace that tax professionals use to manage many clients and run workflows.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/ai-tax-workspace" },
  ...linkPreview("/work/ai-tax-workspace", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
