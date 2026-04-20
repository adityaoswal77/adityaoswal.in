"use client";

import { useEffect, useState } from "react";
import GlobeLoader from "@/components/GlobeLoader";

export function PageLoadProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");

  useEffect(() => {
    const MIN_MS = 2500;
    const start = Date.now();

    const startFade = () => {
      const remaining = Math.max(0, MIN_MS - (Date.now() - start));
      setTimeout(() => {
        setPhase("fading");
        setTimeout(() => setPhase("done"), 550);
      }, remaining);
    };

    if (document.readyState === "complete") {
      startFade();
      return;
    }

    window.addEventListener("load", startFade, { once: true });
    return () => window.removeEventListener("load", startFade);
  }, []);

  return (
    <>
      {/* Overlay — fades out */}
      {phase !== "done" && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "hsl(var(--background, 0 0% 7%))",
            transition: "opacity 500ms ease",
            opacity: phase === "fading" ? 0 : 1,
            pointerEvents: phase === "fading" ? "none" : "all",
          }}
        >
          <GlobeLoader />
        </div>
      )}

      {/* Page content — fades in after overlay */}
      <div
        style={{
          opacity: phase === "done" ? 1 : 0,
          transition: phase === "done" ? "opacity 400ms ease" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
