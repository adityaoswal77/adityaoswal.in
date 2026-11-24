"use client";

import "./tool.css";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { Entry, SheetImage, SourceFile, System } from "@/lib/link-previews/types";
import { isSheet, isSingle } from "@/lib/link-previews/types";
import { definitionHash, drawnSystem, layoutOf, saveMethod } from "@/lib/link-previews/definition";
import { TEMPLATE_USES, templateOrDefault, type TemplateName } from "@/lib/link-previews/template-names";
import { capturePng, fitFor, imageSize, pngFromSource } from "@/lib/link-previews/capture";
import { imageUrl } from "@/lib/link-previews/image-url";
import { buildPages, draftKey, initState, makeReducer, missingPages, statusOf, type Files, type PageItem, type Props, type Snap, type View } from "./state";
import type { Ctx } from "./ctx";
import { AllView, PageView, Sidebar, TemplateView } from "./views";

const FONT_SHEET = "https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap";
const HEADERS = { "Content-Type": "application/json", "x-link-previews": "1" };

async function post(url: string, body: BodyInit, contentType = "application/json"): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  const res = await fetch(url, { method: "POST", headers: { ...HEADERS, "Content-Type": contentType }, body, cache: "no-store" });
  let data: Record<string, unknown> = {};
  try {
    data = await res.json();
  } catch {}
  return { ok: res.ok, data };
}

function readDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function upsert(snap: Snap, entry: Entry): Snap {
  const found = snap.entries.some((e) => e.id === entry.id);
  return { ...snap, entries: found ? snap.entries.map((e) => (e.id === entry.id ? entry : e)) : [...snap.entries, entry] };
}

function sitemapPaths(xml: string): string[] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  return Array.from(doc.getElementsByTagName("loc"))
    .map((loc) => {
      try {
        const pathname = decodeURIComponent(new URL((loc.textContent ?? "").trim()).pathname);
        return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
      } catch {
        return "";
      }
    })
    .filter(Boolean);
}

async function loadSitemap(): Promise<string[]> {
  try {
    const res = await fetch("/sitemap.xml", { cache: "no-store" });
    if (!res.ok) return [];
    const xml = await res.text();
    const doc = new DOMParser().parseFromString(xml, "application/xml");
    if (doc.getElementsByTagName("sitemapindex").length) {
      const children = Array.from(doc.getElementsByTagName("loc")).map((loc) => {
        try {
          return new URL((loc.textContent ?? "").trim()).pathname;
        } catch {
          return "";
        }
      });
      const all: string[] = [];
      for (const child of children.filter(Boolean)) {
        const r = await fetch(child, { cache: "no-store" });
        if (r.ok) all.push(...sitemapPaths(await r.text()));
      }
      return Array.from(new Set(all));
    }
    return Array.from(new Set(sitemapPaths(xml)));
  } catch {
    return [];
  }
}

export function Tool(props: Props) {
  const { manifest } = props;
  const [sitemap, setSitemap] = useState<string[]>([]);
  const [files, setFiles] = useState<Files>(props.files);
  const [sources, setSources] = useState<SourceFile[]>(props.sources);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string | undefined>>({});
  const [batch, setBatch] = useState<{ index: number; total: number } | null>(null);
  const [batchNote, setBatchNote] = useState<string | null>(null);
  const loaded = useRef({ template: templateOrDefault(manifest.system.template), hadColor: !!manifest.system.color });
  const pageIds = useRef<Set<string>>(new Set());
  const canvasRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(makeReducer(() => pageIds.current), undefined, () => initState(manifest, loaded.current.template));

  const loadedSheets = useMemo(() => {
    const out: Record<string, SheetImage> = {};
    for (const entry of manifest.entries) if (isSheet(entry.image)) out[entry.id] = entry.image;
    return out;
  }, [manifest.entries]);

  useEffect(() => {
    void loadSitemap().then(setSitemap);
  }, []);

  const missing = useMemo(() => missingPages(state.entries, sitemap), [state.entries, sitemap]);
  const pages = useMemo(() => buildPages(state.entries, missing), [state.entries, missing]);
  pageIds.current = useMemo(() => new Set(pages.map((p) => p.entry.id)), [pages]);

  const system: System = useMemo(() => ({ ...manifest.system, template: state.template, color: state.color }), [manifest.system, state.template, state.color]);
  const hashSystem = useMemo(() => drawnSystem(manifest.system, state.template, state.color), [manifest.system, state.template, state.color]);

  const status = useCallback(
    (item: PageItem) => statusOf(item, state, !!files[item.entry.id]?.image, (entry) => definitionHash(entry, hashSystem)),
    [state, files, hashSystem],
  );

  const view: View = useMemo(
    () => (state.view.kind === "page" && !pages.some((p) => p.entry.id === (state.view as { id: string }).id) ? { kind: "all" } : state.view),
    [state.view, pages],
  );
  const selected = view.kind === "page" ? pages.find((p) => p.entry.id === view.id) : undefined;

  const select = useCallback((next: View) => dispatch({ type: "view", view: next }), []);

  const edit: Ctx["edit"] = useCallback(
    (item, key, merge, mutate) =>
      dispatch({
        type: "change",
        key,
        merge,
        now: Date.now(),
        view: { kind: "page", id: item.entry.id },
        fn: (snap) => upsert(snap, mutate(snap.entries.find((e) => e.id === item.entry.id) ?? item.entry)),
      }),
    [],
  );

  const setTemplate = useCallback((name: string) => {
    const template = templateOrDefault(name) as TemplateName;
    dispatch({ type: "change", key: "template", merge: false, now: Date.now(), view: { kind: "template" }, fn: (snap) => ({ ...snap, template }) });
  }, []);

  const setColor = useCallback((color: string) => {
    dispatch({ type: "change", key: "color", merge: true, now: Date.now(), view: { kind: "template" }, fn: (snap) => ({ ...snap, color: color.toLowerCase() }) });
  }, []);

  const upload = useCallback(async (file: File): Promise<SourceFile> => {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) throw new Error("Upload a PNG, JPEG or WebP image.");
    if (file.size > 10 * 1024 * 1024) throw new Error("Images can be up to 10 MB.");
    const { ok, data } = await post("/api/link-previews/upload", JSON.stringify({ name: file.name, data: await readDataUrl(file) }));
    if (!ok) throw new Error(String(data.error ?? "The image could not be uploaded. Try again."));
    const source = data.source as SourceFile;
    setSources((current) => (current.some((s) => s.src === source.src) ? current : [...current, source].sort((a, b) => a.label.localeCompare(b.label))));
    return source;
  }, []);

  const setVideo = useCallback(
    async (item: PageItem, file: File | null): Promise<string | null> => {
      const id = item.entry.id;
      try {
        if (!file) {
          const { ok, data } = await post("/api/link-previews/video", JSON.stringify({ id, remove: true }));
          if (!ok) return String(data.error ?? "The video could not be removed. Try again.");
          dispatch({ type: "video", id, video: undefined });
          setFiles((f) => ({ ...f, [id]: { image: f[id]?.image ?? null, video: null } }));
          return data.kept ? `Video removed. The file is still at ${String(data.kept)}.` : "Video removed.";
        }
        const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
        const brand = String.fromCharCode(...head.slice(4, 8));
        if (brand !== "ftyp") return "That isn’t an MP4 video. Export it as MP4 (H.264) and try again.";
        if (file.size > 8 * 1024 * 1024) return `Videos can be up to 8.4 MB. This one is ${(file.size / 1_000_000).toFixed(1)} MB.`;
        const dims = await new Promise<{ width: number; height: number } | string>((resolve) => {
          const video = document.createElement("video");
          video.muted = true;
          video.preload = "metadata";
          video.onloadedmetadata = () => {
            const result = video.videoWidth && video.videoHeight ? { width: video.videoWidth, height: video.videoHeight } : "This video has no picture.";
            URL.revokeObjectURL(video.src);
            resolve(result);
          };
          video.onerror = () => resolve("This browser can’t read that video.");
          video.src = URL.createObjectURL(file);
        });
        if (typeof dims === "string") return dims;
        const res = await fetch(`/api/link-previews/video?id=${encodeURIComponent(id)}&width=${dims.width}&height=${dims.height}`, {
          method: "POST",
          headers: { "x-link-previews": "1", "Content-Type": "video/mp4" },
          body: file,
          cache: "no-store",
        });
        const data = (await res.json().catch(() => ({}))) as { video?: Entry["video"]; bytes?: number; error?: string };
        if (!res.ok || !data.video) return data.error ?? "The video could not be saved. Try again.";
        dispatch({ type: "video", id, video: data.video });
        setFiles((f) => ({ ...f, [id]: { image: f[id]?.image ?? null, video: data.bytes ?? null } }));
        return null;
      } catch {
        return file ? "The video could not be saved. Try again." : "The video could not be removed. Try again.";
      }
    },
    [],
  );

  const savePage = useCallback(
    async (item: PageItem): Promise<string | null> => {
      const entry = item.entry;
      const id = entry.id;
      setSaving((s) => ({ ...s, [id]: true }));
      setNotes((n) => ({ ...n, [id]: undefined }));
      try {
        const layout = layoutOf(entry);
        let png: string;
        if (layout === "image-only" && isSingle(entry.image)) {
          const url = imageUrl(entry.image.src);
          const info = await imageSize(url);
          const method = saveMethod({ width: info.width, height: info.height, zoom: entry.image.zoom, sheet: false, layout, png: info.png });
          png = method === "capture" ? await capturePng(entry, system) : await pngFromSource(url, method === "source-redraw");
        } else {
          const fit = await fitFor(entry, system);
          if (fit?.overflow) throw new Error("The title doesn’t fit, even at 40px. Shorten it or break it differently, then save.");
          png = await capturePng(entry, system);
        }
        const body: Record<string, unknown> = { entry, png, template: state.template };
        if (TEMPLATE_USES[state.template].color || loaded.current.hadColor) body.color = state.color;
        const { ok, data } = await post("/api/link-previews/save", JSON.stringify(body));
        if (!ok) throw new Error(String(data.error ?? "The image could not be saved. Your draft is still here; try again."));
        const saved = data.entry as Entry;
        dispatch({ type: "saved", entry: saved, sentKey: draftKey(entry) });
        setFiles((f) => ({ ...f, [id]: { image: Number(data.bytes) || f[id]?.image || 1, video: f[id]?.video ?? null } }));
        loaded.current.hadColor = loaded.current.hadColor || !!body.color;
        return null;
      } catch (error) {
        const message = error instanceof Error ? error.message : "The image could not be saved. Your draft is still here; try again.";
        setNotes((n) => ({ ...n, [id]: message }));
        return message;
      } finally {
        setSaving((s) => ({ ...s, [id]: false }));
      }
    },
    [state.template, state.color, system],
  );

  const needSaving = useMemo(() => pages.filter((item) => status(item) !== "saved"), [pages, status]);

  const saveAll = useCallback(async () => {
    const queue = needSaving;
    let failed = 0;
    let first: string | null = null;
    setBatchNote(null);
    for (let i = 0; i < queue.length; i++) {
      setBatch({ index: i + 1, total: queue.length });
      const error = await savePage(queue[i]);
      if (error) {
        failed += 1;
        first = first ?? error;
      }
    }
    setBatch(null);
    if (failed) setBatchNote(`${failed} of ${queue.length} couldn’t be saved: ${first}`);
  }, [needSaving, savePage]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || !(event.metaKey || event.ctrlKey)) return;
      const target = event.target as HTMLElement | null;
      if (target) {
        if (target.tagName === "TEXTAREA") return;
        if (target.tagName === "INPUT") {
          const type = (target as HTMLInputElement).type;
          if (["text", "search", "url", "tel", "email", "password", "number"].includes(type)) return;
        }
      }
      const key = event.key.toLowerCase();
      if (key === "z") {
        event.preventDefault();
        event.stopPropagation();
        dispatch({ type: event.shiftKey ? "redo" : "undo" });
      } else if (key === "y" && event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        event.stopPropagation();
        dispatch({ type: "redo" });
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);

  useEffect(() => {
    canvasRef.current?.scrollTo({ top: 0 });
  }, [view]);

  const ctx: Ctx = {
    system,
    state,
    dispatch,
    pages,
    statusOf: status,
    files,
    sources,
    loadedSheets,
    registryFile: props.registryFile,
    edit,
    setTemplate,
    setColor,
    select,
    upload,
    setVideo,
    notes,
    saving,
  };

  const heading = view.kind === "all" ? "All" : view.kind === "template" ? "Template" : (selected?.entry.path ?? "All");
  const pageStatus = selected ? status(selected) : null;
  const pageSaving = selected ? !!saving[selected.entry.id] : false;
  const pageNote = selected ? notes[selected.entry.id] : undefined;

  return (
    <div className="lp-root">
      <link rel="stylesheet" href={FONT_SHEET} crossOrigin="anonymous" />
      <Sidebar ctx={ctx} />
      <div className="lp-canvas" ref={canvasRef}>
        <header className="lp-header">
          <h1 className="lp-title">{heading}</h1>
          <div className="lp-header-end">
            {(view.kind === "page" ? pageNote : batchNote) && (
              <span className="lp-header-note" role="status">
                {view.kind === "page" ? pageNote : batchNote}
              </span>
            )}
            {view.kind === "page" && selected && pageStatus !== "saved" && (
              <button type="button" className="lp-button lp-button-primary" disabled={pageSaving} onClick={() => void savePage(selected)}>
                {pageSaving ? "Saving…" : "Save"}
              </button>
            )}
            {view.kind !== "page" && needSaving.length > 0 && (
              <button type="button" className="lp-button lp-button-primary" disabled={!!batch} onClick={() => void saveAll()}>
                {batch ? `Saving ${batch.index} of ${batch.total}…` : "Save all"}
              </button>
            )}
          </div>
        </header>
        <div className="lp-content">
          {view.kind === "all" && <AllView ctx={ctx} />}
          {view.kind === "template" && <TemplateView ctx={ctx} />}
          {view.kind === "page" && selected && <PageView key={selected.entry.id} ctx={ctx} item={selected} />}
        </div>
      </div>
    </div>
  );
}
