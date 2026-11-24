import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Website for a Short-Term Rental Academy";
const description =
  "Concept case study: a two-path landing page and a three-step booking flow for a short-term rental education business, designed and built as a working front end.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/rental-academy-website" },
  ...linkPreview("/work/rental-academy-website", { title, description }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
