import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";
import { Prototype } from "@/components/instead/Prototype";

const title = "AI Workspace Prototype";
const description = "A clickable prototype of a chat-first workspace for tax professionals. Concept work, not shipped.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  ...linkPreview("/work/ai-tax-workspace/prototype", { title, description }),
};

export default function PrototypePage() {
  return <Prototype backHref="/work/ai-tax-workspace" />;
}
