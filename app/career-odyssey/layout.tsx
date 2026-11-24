import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";

const title = "Career Odyssey";
const description = "A timeline of my journey into design and engineering, year by year.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://adityaoswal.in/career-odyssey" },
  ...linkPreview("/career-odyssey", { title, description }),
};

export default function CareerOdysseyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
