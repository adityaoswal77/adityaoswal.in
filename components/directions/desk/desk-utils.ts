import type { CSSProperties } from "react";
import { PROJECTS } from "@/lib/data";

export type DeskProject = (typeof PROJECTS)[number];

export const DESK_ONLY =
  "hidden [@media_(min-width:768px)_and_(hover:hover)_and_(pointer:fine)]:block";
export const STACK_ONLY =
  "[@media_(min-width:768px)_and_(hover:hover)_and_(pointer:fine)]:hidden";

export const HAND =
  "[font-family:'Segoe_Print','Bradley_Hand','Marker_Felt','Comic_Sans_MS',cursive] dark:font-mono";

export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black";

export const LINKEDIN_URL = "https://www.linkedin.com/in/oswaladitya/";
export const RESUME_URL = "/r";

export function getCategories(project: DeskProject): string[] {
  const category = project.category as string | string[];
  return Array.isArray(category) ? category : [category];
}

export function getAllCategories(): string[] {
  return Array.from(new Set(PROJECTS.flatMap(getCategories)));
}

export function isVideoMockup(project: DeskProject) {
  return /\.(mov|mp4|webm)$/i.test(project.mockup);
}

export function isPhoneMockup(project: DeskProject) {
  return "mockupFit" in project && project.mockupFit === "phone";
}

export function projectVars(project: DeskProject): CSSProperties {
  const a = project.accent;
  return {
    "--pastel": project.pastel,
    "--accent": a,
    "--sh": `0 16px 30px -14px ${a}66, 0 2px 0 ${a}22`,
    "--shl": `0 38px 60px -16px ${a}88, 0 2px 0 ${a}33`,
    "--shd": `0 0 0 1px ${a}40, 0 0 34px -8px ${a}59`,
    "--shdl": `0 0 0 1px ${a}80, 0 0 64px -4px ${a}99`,
  } as CSSProperties;
}
