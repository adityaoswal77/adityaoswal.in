import type { Metadata } from "next";
import { Prototype } from "@/components/instead/Prototype";

export const metadata: Metadata = {
  title: "Instead · Prototype",
  robots: { index: false, follow: false },
};

export default function PrototypePage() {
  return <Prototype />;
}
