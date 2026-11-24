"use client";

import { useEffect, useRef, useState } from "react";
import type { Entry, Layout, SingleImage } from "@/lib/link-previews/types";
import { isSingle } from "@/lib/link-previews/types";
import { formatSize, layoutOf } from "@/lib/link-previews/definition";
import { Frame, TEMPLATES, imageBoxFor, templateFor } from "@/lib/link-previews/templates";
import { TEMPLATE_NAMES, type TemplateName } from "@/lib/link-previews/template-names";
import { breaks, type PageItem } from "./state";
import type { Ctx } from "./ctx";
import { Chevron, Dot, EditableTitle, ImagePicker, ScaledFrame, Segmented, useFit, useNaturalSize } from "./parts";

const TEN_MB = 10_000_000;

export function Sidebar({ ctx }: { ctx: Ctx }) {
  const { state, pages, statusOf } = ctx;
  const groups: { name: string; items: PageItem[] }[] = [];
  for (const item of pages) {
    const group = groups.find((g) => g.name === item.entry.group);
    if (group) group.items.push(item);
    else groups.push({ name: item.entry.group, items: [item] });
  }
  const row = (key: string, label: string, current: boolean, onClick: () => void, status?: ReturnType<typeof statusOf>) => (
    <button key={key} type="button" className="lp-row" aria-current={current ? "page" : undefined} onClick={onClick}>
      <span className="lp-row-label">{label}</span>
      {status && <Dot status={status} />}
    </button>
  );
  return (
    <div className="lp-sidebar">
      <nav aria-label="Link previews">
        {row("all", "All", state.view.kind === "all", () => ctx.select({ kind: "all" }))}
        {row("template", "Template", state.view.kind === "template", () => ctx.select({ kind: "template" }))}
        {groups.map((group) => (
          <div key={group.name}>
            {groups.length > 1 && <h2 className="lp-group">{group.name}</h2>}
            {group.items.map((item) =>
              row(item.entry.id, item.entry.path, state.view.kind === "page" && state.view.id === item.entry.id, () => ctx.select({ kind: "page", id: item.entry.id }), statusOf(item)),
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

function Card({ ctx, item }: { ctx: Ctx; item: PageItem }) {
  const fit = useFit(item.entry, ctx.system);
  const status = ctx.statusOf(item);
  return (
    <figure className="lp-card">
      <ScaledFrame className="lp-card-frame">
        <Frame entry={item.entry} system={ctx.system} fit={fit} />
      </ScaledFrame>
      <figcaption className="lp-caption">
        <span className="lp-caption-path">{item.entry.path}</span>
        {item.entry.video && <span>Video</span>}
        <Dot status={status} />
      </figcaption>
      <button type="button" className="lp-card-button" onClick={() => ctx.select({ kind: "page", id: item.entry.id })}>
        <span className="lp-hidden">Edit {item.entry.path}</span>
      </button>
    </figure>
  );
}

export function AllView({ ctx }: { ctx: Ctx }) {
  return (
    <div className="lp-grid">
      {ctx.pages.map((item) => (
        <Card key={item.entry.id} ctx={ctx} item={item} />
      ))}
    </div>
  );
}

function CropTarget({ entry, image, box, onMove }: { entry: Entry; image: SingleImage; box: { x: number; y: number; width: number; height: number }; onMove: (focus: { x: number; y: number }, key: string) => void }) {
  const natural = useNaturalSize(image.src);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ sx: number; sy: number; fx: number; fy: number; started: number } | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  const slack = () => {
    if (!natural) return { x: 0, y: 0 };
    const cover = Math.max(box.width / natural.width, box.height / natural.height) * (image.zoom ?? 1);
    return { x: natural.width * cover - box.width, y: natural.height * cover - box.height };
  };
  const round = (n: number) => Math.round(n * 1000) / 1000;
  const clamp = (n: number) => Math.min(1, Math.max(0, n));

  const move = (dx: number, dy: number, from: { x: number; y: number }, key: string) => {
    const s = slack();
    onMove({ x: s.x > 0.5 ? round(clamp(from.x - dx / s.x)) : from.x, y: s.y > 0.5 ? round(clamp(from.y - dy / s.y)) : from.y }, key);
  };

  return (
    <div
      ref={ref}
      className="lp-crop"
      role="group"
      aria-label="Image crop. Drag or use the arrow keys to move the image."
      tabIndex={0}
      data-entry={entry.id}
      style={{ left: box.x, top: box.y, width: box.width, height: box.height, cursor: grabbing ? "grabbing" : "grab" }}
      onPointerDown={(event) => {
        if (event.button !== 0 || !natural) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.focus();
        drag.current = { sx: event.clientX, sy: event.clientY, fx: image.focus.x, fy: image.focus.y, started: Date.now() };
        setGrabbing(true);
      }}
      onPointerMove={(event) => {
        const d = drag.current;
        const el = ref.current;
        if (!d || !el) return;
        const scale = el.getBoundingClientRect().width / box.width || 1;
        move((event.clientX - d.sx) / scale, (event.clientY - d.sy) / scale, { x: d.fx, y: d.fy }, `crop:${entry.id}:${d.started}`);
      }}
      onPointerUp={() => {
        drag.current = null;
        setGrabbing(false);
      }}
      onPointerCancel={() => {
        drag.current = null;
        setGrabbing(false);
      }}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 50 : 10;
        const dx = event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0;
        const dy = event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0;
        if (!dx && !dy) return;
        event.preventDefault();
        move(-dx, -dy, image.focus, `nudge:${entry.id}`);
      }}
    />
  );
}

const IS_VIDEO = /\.(mp4|m4v|mov|webm)$/i;

export function PageView({ ctx, item }: { ctx: Ctx; item: PageItem }) {
  const { system, sources } = ctx;
  const entry = item.entry;
  const layout = layoutOf(entry);
  const template = templateFor(system.template);
  const fit = useFit(entry, system);
  const [pending, setPending] = useState<Layout | null>(null);
  const [openSignal, setOpenSignal] = useState(0);
  const [uploadNote, setUploadNote] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoNote, setVideoNote] = useState<string | null>(null);
  const [videoBusy, setVideoBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const videoInput = useRef<HTMLInputElement>(null);

  const canVideo = !!ctx.state.saved[entry.id];
  const files = ctx.files[entry.id];
  const imageBox = imageBoxFor(entry, system);

  const edit = (key: string, mutate: (e: Entry) => Entry, merge: boolean | ((b: never, a: never) => boolean) = false) =>
    ctx.edit(item, key, merge as boolean, mutate);

  const layoutOptions: { value: Layout; label: string }[] = template.uses.image
    ? [
        { value: "type-only", label: "Text" },
        { value: "type-and-image", label: "Text & Image" },
        { value: "image-only", label: "Image" },
      ]
    : [
        { value: "type-only", label: "Text" },
        { value: "image-only", label: "Image" },
      ];
  const layoutValue: Layout = !template.uses.image && layout === "type-and-image" ? "type-only" : layout;

  const chooseLayout = (target: Layout) => {
    if (target === layoutValue) return;
    if (target === "type-only") {
      setPending(null);
      edit(`layout:${entry.id}`, (e) => ({ ...e, layout: "type-only" }));
      return;
    }
    const image = entry.image ?? ctx.loadedSheets[entry.id] ?? (sources[0] ? { src: sources[0].src, focus: { x: 0.5, y: 0.5 } } : null);
    if (!image) {
      setPending(target);
      setOpenSignal((n) => n + 1);
      return;
    }
    setPending(null);
    edit(`layout:${entry.id}`, (e) => ({ ...e, layout: target, image }));
  };

  const chooseSource = (src: string) => {
    if (!pending && layout !== "type-only" && isSingle(entry.image) && entry.image.src === src) return;
    const target = pending;
    setPending(null);
    edit(`source:${entry.id}`, (e) => {
      const current = layoutOf(e);
      const next: Layout = target ?? (current === "type-only" ? (template.uses.image ? "type-and-image" : "image-only") : current);
      return { ...e, image: { src, focus: { x: 0.5, y: 0.5 } }, layout: next };
    });
  };

  const chooseSheet = () => {
    const sheet = ctx.loadedSheets[entry.id];
    if (!sheet) return;
    const target = pending;
    setPending(null);
    edit(`source:${entry.id}`, (e) => {
      const current = layoutOf(e);
      const next: Layout = target ?? (current === "type-only" ? (template.uses.image ? "type-and-image" : "image-only") : current);
      return { ...e, image: sheet, layout: next };
    });
  };

  const upload = async (file: File) => {
    setUploading(true);
    setUploadNote(null);
    try {
      const source = await ctx.upload(file);
      chooseSource(source.src);
      setUploadNote(null);
    } catch (error) {
      setUploadNote(error instanceof Error ? error.message : "The image could not be uploaded. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const sendVideo = async (file: File | null) => {
    setVideoBusy(true);
    setVideoNote(file ? "Uploading the video…" : null);
    const result = await ctx.setVideo(item, file);
    setVideoNote(result);
    setVideoBusy(false);
  };

  const canShowImage = template.uses.image || layout === "image-only";
  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    if (file.type.startsWith("video/") || IS_VIDEO.test(file.name)) {
      if (!canVideo) setVideoNote("Save this page’s image before adding a video.");
      else void sendVideo(file);
      return;
    }
    if (/^image\/(png|jpeg|webp)$/.test(file.type) && canShowImage) {
      void upload(file);
      return;
    }
    setUploadNote(
      !canShowImage ? "Drop an MP4 video." : canVideo ? "Drop a PNG, JPEG or WebP image, or an MP4 video." : "Drop a PNG, JPEG or WebP image. A video can be added once this page’s image is saved.",
    );
  };

  const currentSource = isSingle(entry.image) ? entry.image.src : null;
  const sheet = ctx.loadedSheets[entry.id] ?? null;
  const showPicker = layout !== "type-only" || pending !== null;
  const showCrop = isSingle(entry.image) && imageBox && layout !== "type-only";
  const overflow = !!fit?.overflow && layout !== "image-only";
  const sizeSum = (files?.image ?? 0) + (files?.video ?? 0);

  return (
    <div className="lp-workspace">
      <div
        className="lp-frame-wrap"
        onDragOver={(event) => {
          event.preventDefault();
          if (canShowImage || canVideo) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <ScaledFrame className={dragging ? "lp-frame-drop" : undefined}>
          <Frame
            entry={entry}
            system={system}
            fit={fit}
            renderTitle={({ style }) => (
              <EditableTitle
                value={entry.title}
                style={style}
                onChange={(title) => edit(`title:${entry.id}`, (e) => ({ ...e, title }), (b, a) => {
                  const before = (b as { entries: Entry[] }).entries.find((x) => x.id === entry.id)?.title ?? entry.title;
                  const after = (a as { entries: Entry[] }).entries.find((x) => x.id === entry.id)?.title ?? title;
                  return breaks(before) === breaks(after);
                })}
              />
            )}
          />
          {showCrop && isSingle(entry.image) && (
            <CropTarget
              entry={entry}
              image={entry.image}
              box={imageBox}
              onMove={(focus, key) => edit(key, (e) => (isSingle(e.image) ? { ...e, image: { ...e.image, focus } } : e), true)}
            />
          )}
        </ScaledFrame>
      </div>

      <div className="lp-controls">
        {template.uses.theme && layout !== "image-only" && (
          <Segmented
            label="Theme"
            value={entry.theme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            onChange={(theme) => edit(`theme:${entry.id}`, (e) => ({ ...e, theme }))}
          />
        )}
        <Segmented label="Layout" value={layoutValue} options={layoutOptions} onChange={chooseLayout} />
        {showPicker && (
          <ImagePicker
            current={currentSource}
            sheet={sheet}
            sources={sources}
            onChoose={chooseSource}
            onChooseSheet={chooseSheet}
            onUpload={upload}
            note={uploadNote}
            busy={uploading}
            openSignal={openSignal}
          />
        )}
        {canVideo && (
          <>
            <button type="button" className="lp-button lp-button-quiet" disabled={videoBusy} onClick={() => videoInput.current?.click()}>
              {entry.video ? "Replace video" : "Add video"}
            </button>
            {entry.video && (
              <button type="button" className="lp-button lp-button-quiet" disabled={videoBusy} onClick={() => void sendVideo(null)}>
                Remove video
              </button>
            )}
            <input
              ref={videoInput}
              type="file"
              className="lp-hidden"
              accept="video/mp4"
              aria-label="Video file"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) void sendVideo(file);
              }}
            />
          </>
        )}
      </div>

      {(overflow || uploadNote || videoNote) && (
        <div className="lp-status">
          {overflow && (
            <span className="lp-alert" role="alert">
              <span className="lp-dot lp-dot-stale" />
              The title doesn’t fit, even at 40px. Shorten it or break it differently.
            </span>
          )}
          {(uploadNote || videoNote) && <span role="status">{uploadNote ?? videoNote}</span>}
        </div>
      )}

      {entry.video && (
        <div className="lp-video">
          <video
            className="lp-video-clip"
            src={`/${entry.video.src.replace(/^public\//, "")}${entry.video.version ? `?v=${entry.video.version}` : ""}`}
            aria-label="Video preview"
            muted
            loop
            autoPlay
            playsInline
          />
          <div className="lp-video-info">
            <span className="lp-video-size">
              {files?.video == null ? `File missing: ${entry.video.src}, ` : `${formatSize(files.video)}, `}
              {entry.video.width}×{entry.video.height}
            </span>
            <span>Plays in Messages. Other apps show the image.</span>
            {sizeSum > TEN_MB && (
              <span className="lp-alert" role="alert">
                <span className="lp-dot lp-dot-stale" />
                The saved image and this video come to {formatSize(sizeSum)}, over the 10 MB Messages loads for one link.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const PROMPT_HEAD = "I want a new share image template for this site.\n\nWhat I want: ";
const PROMPT_SLOT = "[Describe it: where the title and image go, the colors, the type, anything else.]";

function promptText(registryFile: string): string {
  const where = registryFile || "the file that defines the share image templates";
  return `${PROMPT_HEAD}${PROMPT_SLOT}\n\nRead the comment at the top of ${where} first. It explains how templates work and the rules to keep. Add mine there as a new template, and don't change the existing ones. It will appear in the Template gallery of the Link Previews tool.`;
}

function TemplateCard({ ctx, name, sample }: { ctx: Ctx; name: TemplateName; sample: Entry }) {
  const system = { ...ctx.system, template: name };
  const fit = useFit(sample, system);
  const template = TEMPLATES[name];
  const current = ctx.state.template === name;
  return (
    <figure className="lp-card">
      <ScaledFrame className={current ? "lp-card-frame lp-card-current" : "lp-card-frame"}>
        <Frame entry={sample} system={system} fit={fit} />
      </ScaledFrame>
      <figcaption className="lp-caption lp-caption-tall">
        <span className="lp-caption-path">{template.label}</span>
        {template.uses.color && (
          <label className="lp-color-pill">
            <span className="lp-color-dot" style={{ background: ctx.state.color }} />
            <span>{ctx.state.color.toUpperCase()}</span>
            <Chevron />
            <input type="color" aria-label={`${template.label} background color`} value={ctx.state.color} onChange={(event) => ctx.setColor(event.target.value)} />
          </label>
        )}
        {current && <span className="lp-current">Current</span>}
      </figcaption>
      <button type="button" className="lp-card-button" aria-pressed={current} onClick={() => ctx.setTemplate(name)}>
        <span className="lp-hidden">{current ? `${template.label}, the current template` : `Use ${template.label} for every page`}</span>
      </button>
    </figure>
  );
}

export function TemplateView({ ctx }: { ctx: Ctx }) {
  const [copied, setCopied] = useState(false);
  const sample: Entry =
    ctx.pages.find((p) => layoutOf(p.entry) === "type-and-image" && isSingle(p.entry.image))?.entry ??
    ctx.pages[0]?.entry ?? { id: "sample", path: "/", title: "Your page title", group: "Pages", theme: "light", image: null, version: null, savedHash: null };
  const prompt = promptText(ctx.registryFile);
  const slotAt = prompt.indexOf(PROMPT_SLOT);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const area = document.createElement("textarea");
      area.value = prompt;
      area.className = "lp-hidden";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
  };

  return (
    <div className="lp-gallery">
      {TEMPLATE_NAMES.map((name) => (
        <TemplateCard key={name} ctx={ctx} name={name} sample={sample} />
      ))}
      <figure className="lp-card">
        <div className="lp-make">
          <div className="lp-make-prompt">
            {prompt.slice(0, slotAt)}
            <mark className="lp-slot">{PROMPT_SLOT}</mark>
            {prompt.slice(slotAt + PROMPT_SLOT.length)}
          </div>
          <div>
            <button type="button" className="lp-button lp-button-quiet" onClick={() => void copy()}>
              {copied ? "Copied" : "Copy prompt"}
            </button>
          </div>
        </div>
        <figcaption className="lp-caption lp-caption-tall">
          <span className="lp-caption-path">Make your own</span>
        </figcaption>
      </figure>
    </div>
  );
}

