import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/lib/data";

export type Project = (typeof PROJECTS)[number];

export const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
export const HIDE_ON_HOVER_DEVICES = "[@media(hover:hover)_and_(pointer:fine)]:hidden";
export const SHOW_ON_HOVER_DEVICES = "hidden [@media(hover:hover)_and_(pointer:fine)]:block";

export const isVideo = (p: Project) => /\.(mov|mp4|webm)$/i.test(p.mockup);
export const isPhone = (p: Project) => "mockupFit" in p && p.mockupFit === "phone";

export const indexLabel = (p: Project) => String(PROJECTS.findIndex((x) => x.id === p.id) + 1).padStart(2, "0");

export const projectVars = (p: Project) =>
  ({
    "--accent": p.accent,
    "--pastel": p.pastel,
    "--tint": `${p.accent}26`,
    "--sh-l": `${p.accent}59`,
    "--sh-d": `${p.accent}55`,
  }) as CSSProperties;

export function useHoverCapable() {
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY);
    const update = () => setCapable(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return capable;
}
