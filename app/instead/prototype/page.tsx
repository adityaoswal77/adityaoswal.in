import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";
import { Prototype } from "@/components/instead/Prototype";

const title = "Instead · Prototype";
const description = "A clickable prototype for the Instead product designer exercise.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  ...linkPreview("/instead/prototype", { title, description }),
};

export default function PrototypePage() {
  return <Prototype backHref="/instead" />;
}
