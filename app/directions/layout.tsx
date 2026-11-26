import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard directions",
  robots: { index: false, follow: false },
};

export default function DirectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dir-root">
      <style>{`:where(.dir-root) p{margin-bottom:0;color:inherit;font-size:inherit}:where(.dir-root) :is(h1,h2,h3){letter-spacing:normal;font-family:inherit}@keyframes dir-fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}@keyframes dir-dot{0%,80%,100%{opacity:.3}40%{opacity:1}}.dir-fade{animation:dir-fade .3s ease-out both}.dir-dot{animation:dir-dot 1s infinite}@media (prefers-reduced-motion:reduce){.dir-fade,.dir-dot{animation:none}}`}</style>
      {children}
    </div>
  );
}
