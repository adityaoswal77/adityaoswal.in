import { SOURCES_DIR } from "./definition";

export function imageUrl(src: string): string {
  if (src.startsWith(`${SOURCES_DIR}/`)) {
    return `/api/link-previews/source?file=${encodeURIComponent(src.slice(SOURCES_DIR.length + 1))}`;
  }
  if (src.startsWith("public/")) return `/${src.slice("public/".length)}`;
  return `/${src}`;
}
