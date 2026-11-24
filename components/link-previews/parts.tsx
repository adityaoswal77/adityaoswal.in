"use client";

import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Entry, Fit, SourceFile, System } from "@/lib/link-previews/types";
import { FRAME_W } from "@/lib/link-previews/definition";
import { clearFitCache, fitTitle, loadFonts } from "@/lib/link-previews/fit";
import { titleBoxFor } from "@/lib/link-previews/templates";
import { imageUrl } from "@/lib/link-previews/image-url";
import type { Status } from "./state";

export function ScaledFrame({ children, className }: { children: ReactNode; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setScale(el.getBoundingClientRect().width / FRAME_W);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={boxRef} className={`lp-scaled ${className ?? ""}`}>
      <div
        className="lp-scaled-layer"
        style={{ transform: `scale(${scale ?? 1})`, visibility: scale === null ? "hidden" : "visible", ["--frame-scale" as string]: scale ?? 1 } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

export function useFit(entry: Entry, system: System): Fit | null {
  const box = titleBoxFor(entry, system);
  const width = box?.width;
  const height = box?.height;
  const [fit, setFit] = useState<Fit | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onDone = () => {
      clearFitCache();
      setTick((t) => t + 1);
    };
    document.fonts.addEventListener("loadingdone", onDone);
    return () => document.fonts.removeEventListener("loadingdone", onDone);
  }, []);

  useEffect(() => {
    if (width === undefined || height === undefined) {
      setFit(null);
      return;
    }
    let alive = true;
    loadFonts(system).then(() => {
      if (alive) setFit(fitTitle(entry.title, { width, height }, system));
    });
    return () => {
      alive = false;
    };
  }, [entry.title, width, height, system, tick]);

  return fit;
}

const sizes = new Map<string, { width: number; height: number }>();

export function useNaturalSize(src: string | null): { width: number; height: number } | null {
  const [size, setSize] = useState<{ width: number; height: number } | null>(() => (src ? (sizes.get(src) ?? null) : null));
  useEffect(() => {
    if (!src) {
      setSize(null);
      return;
    }
    const known = sizes.get(src);
    if (known) {
      setSize(known);
      return;
    }
    let alive = true;
    const img = new Image();
    img.onload = () => {
      const next = { width: img.naturalWidth, height: img.naturalHeight };
      sizes.set(src, next);
      if (alive) setSize(next);
    };
    img.src = imageUrl(src);
    return () => {
      alive = false;
    };
  }, [src]);
  return size;
}

export function Chevron() {
  return (
    <svg className="lp-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STATUS_LABEL: Record<Status, string> = { missing: "Missing", draft: "Draft", saved: "Saved", stale: "Stale" };

export function Dot({ status }: { status: Status }) {
  if (status === "saved") return null;
  return <span className={`lp-dot lp-dot-${status}`} role="img" aria-label={STATUS_LABEL[status]} title={STATUS_LABEL[status]} />;
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  const place = useCallback(() => {
    const thumb = thumbRef.current;
    const checked = ref.current?.querySelector<HTMLElement>('[aria-checked="true"]');
    if (!thumb || !checked) return;
    thumb.style.transform = `translateX(${checked.offsetLeft}px)`;
    thumb.style.width = `${checked.offsetWidth}px`;
    if (!placed.current) {
      placed.current = true;
      requestAnimationFrame(() => thumb.classList.add("lp-thumb-ready"));
    }
  }, []);

  useLayoutEffect(() => {
    place();
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(place);
    observer.observe(el);
    return () => observer.disconnect();
  }, [place, value, options.length]);

  const onKey = (event: React.KeyboardEvent, index: number) => {
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + options.length) % options.length;
    onChange(options[next].value);
    requestAnimationFrame(() => ref.current?.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus());
  };

  return (
    <div ref={ref} className="lp-segmented" role="radiogroup" aria-label={label}>
      <span ref={thumbRef} className="lp-segmented-thumb" aria-hidden="true" />
      {options.map((option, index) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            className="lp-segmented-option"
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKey(event, index)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function readValue(el: HTMLElement): string {
  let out = "";
  const nodes = Array.from(el.childNodes);
  nodes.forEach((node, index) => {
    if (node.nodeType === Node.TEXT_NODE) out += node.nodeValue ?? "";
    else if (node.nodeName === "BR") {
      if (index !== nodes.length - 1) out += "\n";
    } else out += node.textContent ?? "";
  });
  return out.replace(/ /g, " ");
}

function writeValue(el: HTMLElement, value: string) {
  el.replaceChildren();
  if (value) el.appendChild(document.createTextNode(value));
  if (value.endsWith("\n") || !value) el.appendChild(document.createElement("br"));
}

function syncSentinel(el: HTMLElement) {
  const value = readValue(el);
  const last = el.lastChild;
  const hasBr = last?.nodeName === "BR";
  if (value.endsWith("\n") && !hasBr) el.appendChild(document.createElement("br"));
  else if (!value.endsWith("\n") && value && hasBr) last?.remove();
}

function insertAtCaret(el: HTMLElement, text: string) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !el.contains(selection.anchorNode)) {
    el.appendChild(document.createTextNode(text));
    syncSentinel(el);
    return;
  }
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const node = document.createTextNode(text);
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  syncSentinel(el);
}

function caretToEnd(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export function EditableTitle({ value, style, onChange }: { value: string; style: CSSProperties; onChange: (value: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (readValue(el) !== value || !el.firstChild) {
      const focused = document.activeElement === el;
      writeValue(el, value);
      if (focused) caretToEnd(el);
    }
  }, [value]);

  const emit = () => {
    const el = ref.current;
    if (el) onChange(readValue(el));
  };

  return (
    <div
      ref={ref}
      className="lp-title-edit"
      role="textbox"
      aria-label="Title"
      aria-multiline="true"
      tabIndex={0}
      spellCheck={false}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      data-og-title=""
      style={{ ...style, position: "relative", zIndex: 2, cursor: "text" }}
      onInput={() => {
        const el = ref.current;
        if (el) syncSentinel(el);
        emit();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
        event.preventDefault();
        const el = ref.current;
        if (!el) return;
        insertAtCaret(el, "\n");
        emit();
      }}
      onPaste={(event) => {
        event.preventDefault();
        const el = ref.current;
        if (!el) return;
        const text = event.clipboardData.getData("text/plain").replace(/\r\n?/g, "\n");
        insertAtCaret(el, text);
        emit();
      }}
      onDrop={(event) => event.preventDefault()}
    />
  );
}

export function ImagePicker({
  current,
  sheet,
  sources,
  onChoose,
  onChooseSheet,
  onUpload,
  note,
  busy,
  openSignal,
}: {
  current: string | null;
  sheet: { sheet: string[]; columns: number } | null;
  sources: SourceFile[];
  onChoose: (src: string) => void;
  onChooseSheet: () => void;
  onUpload: (file: File) => void;
  note: string | null;
  busy: boolean;
  openSignal: number;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const lastSignal = useRef(openSignal);

  useEffect(() => {
    if (openSignal !== lastSignal.current) {
      lastSignal.current = openSignal;
      setOpen(true);
    }
  }, [openSignal]);

  useEffect(() => {
    if (!open) return;
    const selected = wrapRef.current?.querySelector<HTMLElement>('[role="option"][aria-selected="true"]') ?? wrapRef.current?.querySelector<HTMLElement>('[role="option"]');
    selected?.focus();
    const onDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  const name = current ? (sources.find((s) => s.src === current)?.label ?? current.split("/").pop() ?? current) : sheet ? `Sheet of ${sheet.sheet.length}` : "None";
  const thumb = current ?? sheet?.sheet[0] ?? null;

  const options: { key: string; label: string; src: string; selected: boolean; onPick: () => void }[] = [];
  if (sheet) {
    options.push({ key: "sheet", label: `Sheet of ${sheet.sheet.length}`, src: sheet.sheet[0], selected: !current, onPick: onChooseSheet });
  }
  for (const source of sources) {
    options.push({ key: source.src, label: source.label, src: source.src, selected: current === source.src, onPick: () => onChoose(source.src) });
  }
  if (current && !sources.some((s) => s.src === current)) {
    options.push({ key: current, label: current.split("/").pop() ?? current, src: current, selected: true, onPick: () => onChoose(current) });
  }

  return (
    <div ref={wrapRef} className="lp-picker" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        event.stopPropagation();
        setOpen(false);
        buttonRef.current?.focus();
      }
    }}>
      <button
        ref={buttonRef}
        type="button"
        className="lp-picker-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Image source: ${name}`}
        onClick={() => setOpen((v) => !v)}
      >
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element -- dev tool thumbnails are plain images
          <img className="lp-picker-thumb" src={imageUrl(thumb)} alt="" width={24} height={24} />
        ) : (
          <span className="lp-picker-thumb lp-picker-thumb-empty" />
        )}
        <span className="lp-picker-name">{name}</span>
        <Chevron />
      </button>
      {open && (
        <div className="lp-popover">
          <div className="lp-popover-grid" role="listbox" aria-label="Image source">
            {options.map((option) => (
              <button
                key={option.key}
                type="button"
                role="option"
                aria-selected={option.selected}
                className="lp-option"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                  option.onPick();
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- dev tool thumbnails are plain images */}
                <img src={imageUrl(option.src)} alt="" loading="lazy" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          <div className="lp-popover-footer">
            <button type="button" className="lp-button lp-button-quiet" disabled={busy} onClick={() => fileRef.current?.click()}>
              {busy ? "Uploading…" : "Upload"}
            </button>
            <span className={note ? "lp-popover-note" : undefined}>{note ?? "PNG, JPEG or WebP, up to 10 MB"}</span>
            <input
              ref={fileRef}
              type="file"
              className="lp-hidden"
              accept="image/png,image/jpeg,image/webp"
              aria-label="Upload an image"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) onUpload(file);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
