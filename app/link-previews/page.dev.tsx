import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tool } from "@/components/link-previews/Tool";
import type { Files } from "@/components/link-previews/state";
import { entryImageSources } from "@/lib/link-previews/definition";
import type { SourceFile } from "@/lib/link-previews/types";
import { OG_DIR, REGISTRY_FILE, SOURCE_DIRS, fileSize, listSources, readManifest } from "@/lib/link-previews/server";

export const metadata: Metadata = {
  title: { absolute: "Link Previews" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LinkPreviewsPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const manifest = await readManifest();
  const files: Files = {};
  for (const entry of manifest.entries) {
    files[entry.id] = {
      image: await fileSize(`${OG_DIR}/${entry.id}.png`),
      video: entry.video ? await fileSize(entry.video.src) : null,
    };
  }
  const sources = await listSources();
  const known = new Set(sources.map((s) => s.src));
  const extra: SourceFile[] = [];
  for (const entry of manifest.entries) {
    for (const src of entryImageSources(entry.image)) {
      if (known.has(src) || SOURCE_DIRS.some((dir) => src.startsWith(`${dir}/`))) continue;
      known.add(src);
      const parts = src.split("/");
      extra.push({ src, label: parts[parts.length - 1], folder: parts.slice(0, -1).join("/") });
    }
  }
  return <Tool manifest={manifest} files={files} sources={[...sources, ...extra]} registryFile={REGISTRY_FILE} />;
}
