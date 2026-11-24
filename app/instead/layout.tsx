import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-previews/metadata";
import { Lato, Libre_Baskerville } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});
const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskerville",
  display: "swap",
});

const title = "Instead · Product Designer Exercise";
const description = "Reimagining how a Pro lands in Instead: walkthrough video, presentation, Figma file and a clickable prototype.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  ...linkPreview("/instead", { title, description }),
};

export default function InsteadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`instead-root ${lato.variable} ${baskerville.variable} min-h-screen bg-[#F7F6F0] font-[family-name:var(--font-lato)] text-[#24282C] antialiased`}
      style={{ colorScheme: "light" }}
    >
      <style>{`.instead-root p{margin-bottom:0}.instead-root p:not([class*="text-[#"]){color:inherit}.instead-root h2{font-family:inherit;letter-spacing:normal}@keyframes inst-fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}@keyframes inst-dot{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}@keyframes inst-bar{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}@keyframes inst-pulse{0%,100%{box-shadow:0 0 0 0 rgba(196,49,27,.4)}50%{box-shadow:0 0 0 6px rgba(196,49,27,0)}}.inst-fade{animation:inst-fade .35s ease-out both}.inst-dot{animation:inst-dot 1s infinite}.inst-bar{animation:inst-bar .9s ease-in-out infinite}.inst-pulse{animation:inst-pulse 1.4s infinite}@media (prefers-reduced-motion:reduce){.inst-fade,.inst-dot,.inst-bar,.inst-pulse{animation:none}}`}</style>
      {children}
    </div>
  );
}
