import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Instead · Product Designer Exercise",
  robots: { index: false, follow: false },
};

export default function InsteadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`instead-root ${lato.variable} ${baskerville.variable} min-h-screen bg-[#F7F6F0] font-[family-name:var(--font-lato)] text-[#24282C] antialiased`}
      style={{ colorScheme: "light" }}
    >
      <style>{`.instead-root p{margin-bottom:0}.instead-root p:not([class*="text-[#"]){color:inherit}.instead-root h2{font-family:inherit;letter-spacing:normal}`}</style>
      {children}
    </div>
  );
}
