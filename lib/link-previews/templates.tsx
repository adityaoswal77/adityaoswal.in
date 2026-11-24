/*
 * Share image templates. Each template draws one 1200x630 frame; the tool previews it and the capture
 * serializes it at 2x, so every saved image comes from this file.
 *
 * To add a template:
 *  1. Add its name and `uses` to ./template-names.ts (the save endpoint validates against it).
 *  2. Write a component here from the shared parts below (FrameRoot, TextColumn, Panel, TitleSlot).
 *  3. Add one entry to TEMPLATES with `titleBox` and `imageBox`.
 *  Don't change an existing template: every saved image was drawn by one of them.
 *
 * Rules every template keeps:
 *  - Inline styles only, each element carrying its own `reset`, because the capture serializes this DOM.
 *  - Images are a plain <img> (the capture needs the real source URL), never next/image.
 *  - Draw the title through TitleSlot and the label through TextColumn; titles are fitted by ./fit.ts.
 *  - Type only when the page has no image or its layout is Type only: no placeholder art.
 *  - Handle sheets and both themes; keep the text's bottom inset at `system.textBottom`.
 */
import type { CSSProperties, ReactNode } from "react";
import type { Box, Entry, Fit, InkColors, System } from "./types";
import { isSheet } from "./types";
import { DEFAULT_TEMPLATE, TEMPLATE_USES, type TemplateName, templateOrDefault } from "./template-names";
import { FRAME_H, FRAME_W, layoutOf } from "./definition";
import { imageUrl } from "./image-url";

export type TitleSlotProps = { text: string; style: CSSProperties; fit: Fit | null };

export type FrameProps = {
  entry: Entry;
  system: System;
  fit: Fit | null;
  renderTitle?: (props: TitleSlotProps) => ReactNode;
};

export const reset: CSSProperties = {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  border: 0,
  minWidth: 0,
  letterSpacing: "normal",
  textTransform: "none",
  textAlign: "left",
  fontStyle: "normal",
};

const GENERIC = new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "emoji", "math", "fangsong"]);

export function familyNames(family: string): string[] {
  return family
    .split(",")
    .map((name) => name.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

export function familyCss(family: string): string {
  return familyNames(family)
    .map((name) => (GENERIC.has(name.toLowerCase()) ? name : `"${name}"`))
    .join(", ");
}

function labelHeight(system: System): number {
  return Math.round(system.labelSize * system.labelLineHeight);
}

export function titleBoxHeight(system: System): number {
  return FRAME_H - system.margin - system.textBottom - labelHeight(system) - system.labelGap;
}

function withImage(entry: Entry, template: TemplateName): boolean {
  return layoutOf(entry) === "type-and-image" && TEMPLATE_USES[template].image;
}

function colorsOf(system: System, entry: Entry): InkColors {
  return system.colors[entry.theme === "dark" ? "dark" : "light"];
}

type Rgb = [number, number, number];

function parseHex(hex: string): Rgb {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function toHex(rgb: Rgb): string {
  return `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

function luminance([r, g, b]: Rgb): number {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function posterColors(system: System): { background: string; ink: string; label: string } {
  const background = system.color && /^#[0-9a-f]{6}$/i.test(system.color) ? system.color.toLowerCase() : "#000000";
  const bg = parseHex(background);
  const lightInk = system.colors.dark.ink;
  const darkInk = system.colors.light.ink;
  const lightRatio = contrast(parseHex(lightInk), bg);
  const darkRatio = contrast(parseHex(darkInk), bg);
  const useLight = lightRatio >= darkRatio;
  const ink = useLight ? lightInk : darkInk;
  const share = useLight ? 0.72 : 0.6;
  const inkRgb = parseHex(ink);
  const mixed: Rgb = [0, 1, 2].map((i) => inkRgb[i] * share + bg[i] * (1 - share)) as Rgb;
  const label = contrast(mixed.map(Math.round) as Rgb, bg) >= 4.5 ? toHex(mixed) : ink;
  return { background, ink, label };
}

function FrameRoot({ system, background, children }: { system: System; background: string; children: ReactNode }) {
  return (
    <div
      data-og-frame=""
      style={{
        ...reset,
        position: "relative",
        display: "flex",
        width: FRAME_W,
        height: FRAME_H,
        overflow: "hidden",
        background,
        fontFamily: familyCss(system.font.family),
        fontOpticalSizing: "auto",
      }}
    >
      {children}
    </div>
  );
}

function TitleSlot({
  entry,
  system,
  fit,
  width,
  color,
  renderTitle,
}: {
  entry: Entry;
  system: System;
  fit: Fit | null;
  width: number;
  color: string;
  renderTitle?: FrameProps["renderTitle"];
}) {
  const style: CSSProperties = {
    ...reset,
    display: "block",
    width,
    fontFamily: familyCss(system.font.family),
    fontOpticalSizing: "auto",
    fontWeight: system.font.titleWeight,
    fontSize: fit ? fit.size : system.titleSize.max,
    lineHeight: system.lineHeight,
    color,
    whiteSpace: "pre-wrap",
    overflowWrap: "normal",
    wordBreak: "normal",
    visibility: fit ? "visible" : "hidden",
  };
  if (renderTitle) return <>{renderTitle({ text: entry.title, style, fit })}</>;
  return (
    <div data-og-title="" style={style}>
      {entry.title}
    </div>
  );
}

function TextColumn({
  entry,
  system,
  fit,
  width,
  padding,
  titleWidth,
  ink,
  label,
  renderTitle,
}: {
  entry: Entry;
  system: System;
  fit: Fit | null;
  width: number;
  padding: string;
  titleWidth: number;
  ink: string;
  label: string;
  renderTitle?: FrameProps["renderTitle"];
}) {
  return (
    <div
      style={{
        ...reset,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flex: "none",
        width,
        height: FRAME_H,
        padding,
      }}
    >
      <div
        style={{
          ...reset,
          flex: "none",
          fontFamily: familyCss(system.font.family),
          fontWeight: system.font.labelWeight,
          fontSize: system.labelSize,
          lineHeight: system.labelLineHeight,
          color: label,
          whiteSpace: "nowrap",
        }}
      >
        {system.domain}
      </div>
      <div style={{ ...reset, flexGrow: 1 }} />
      <TitleSlot entry={entry} system={system} fit={fit} width={titleWidth} color={ink} renderTitle={renderTitle} />
    </div>
  );
}

function Panel({ entry, system, box, style }: { entry: Entry; system: System; box: Box; style?: CSSProperties }) {
  const image = entry.image;
  let content: ReactNode = null;
  if (image && isSheet(image)) {
    const cols = Math.max(1, image.columns);
    const rows = Math.ceil(image.sheet.length / cols);
    const cw = Math.floor(box.width / cols);
    const ch = Math.floor(box.height / rows);
    content = image.sheet.map((src, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const width = col === cols - 1 ? box.width - cw * (cols - 1) : cw;
      const height = row === rows - 1 ? box.height - ch * (rows - 1) : ch;
      return (
        // eslint-disable-next-line @next/next/no-img-element -- the capture needs a plain <img> with the real source URL
        <img
          key={`${src}-${i}`}
          src={imageUrl(src)}
          alt=""
          draggable={false}
          style={{
            ...reset,
            position: "absolute",
            left: col * cw,
            top: row * ch,
            display: "block",
            maxWidth: "none",
            maxHeight: "none",
            width,
            height,
            objectFit: "cover",
          }}
        />
      );
    });
  } else if (image) {
    const origin = `${image.focus.x * 100}% ${image.focus.y * 100}%`;
    content = (
      // eslint-disable-next-line @next/next/no-img-element -- the capture needs a plain <img> with the real source URL
      <img
        src={imageUrl(image.src)}
        alt=""
        draggable={false}
        style={{
          ...reset,
          display: "block",
          maxWidth: "none",
          maxHeight: "none",
          width: box.width,
          height: box.height,
          objectFit: "cover",
          objectPosition: origin,
          transformOrigin: origin,
          transform: image.zoom && image.zoom > 1 ? `scale(${image.zoom})` : "none",
        }}
      />
    );
  }
  return (
    <div
      data-og-panel=""
      style={{
        ...reset,
        position: "relative",
        flex: "none",
        width: box.width,
        height: box.height,
        overflow: "hidden",
        background: system.colors.panel,
        ...style,
      }}
    >
      {content}
    </div>
  );
}

function ImageOnlyFrame({ entry, system }: FrameProps) {
  return (
    <FrameRoot system={system} background={system.colors.panel}>
      <Panel entry={entry} system={system} box={{ x: 0, y: 0, width: FRAME_W, height: FRAME_H }} style={{ position: "absolute", left: 0, top: 0 }} />
    </FrameRoot>
  );
}

function plateGeometry(entry: Entry, system: System, template: TemplateName) {
  const image = withImage(entry, template);
  const panelWidth = system.panelWidth;
  const insetCard = template === "inset";
  const cardHeight = FRAME_H - 2 * system.margin;
  const cardWidth = Math.round((cardHeight * panelWidth) / FRAME_H);
  const columnWidth = image ? (insetCard ? FRAME_W - system.margin - cardWidth : FRAME_W - panelWidth) : FRAME_W;
  const right = image ? system.panelGap : system.margin;
  return {
    image,
    columnWidth,
    padding: `${system.margin}px ${right}px ${system.textBottom}px ${system.margin}px`,
    titleWidth: columnWidth - system.margin - right,
    card: { x: FRAME_W - system.margin - cardWidth, y: system.margin, width: cardWidth, height: cardHeight },
  };
}

function Plate(props: FrameProps) {
  const { entry, system, fit, renderTitle } = props;
  const colors = colorsOf(system, entry);
  const g = plateGeometry(entry, system, "plate");
  return (
    <FrameRoot system={system} background={colors.background}>
      <TextColumn entry={entry} system={system} fit={fit} width={g.columnWidth} padding={g.padding} titleWidth={g.titleWidth} ink={colors.ink} label={colors.label} renderTitle={renderTitle} />
      {g.image && <Panel entry={entry} system={system} box={{ x: g.columnWidth, y: 0, width: system.panelWidth, height: FRAME_H }} />}
    </FrameRoot>
  );
}

function Poster(props: FrameProps) {
  const { entry, system, fit, renderTitle } = props;
  const colors = posterColors(system);
  const titleWidth = FRAME_W - 2 * system.margin;
  return (
    <FrameRoot system={system} background={colors.background}>
      <TextColumn entry={entry} system={system} fit={fit} width={FRAME_W} padding={`${system.margin}px ${system.margin}px ${system.textBottom}px ${system.margin}px`} titleWidth={titleWidth} ink={colors.ink} label={colors.label} renderTitle={renderTitle} />
    </FrameRoot>
  );
}

function Inset(props: FrameProps) {
  const { entry, system, fit, renderTitle } = props;
  const colors = colorsOf(system, entry);
  const g = plateGeometry(entry, system, "inset");
  return (
    <FrameRoot system={system} background={colors.background}>
      <TextColumn entry={entry} system={system} fit={fit} width={g.columnWidth} padding={g.padding} titleWidth={g.titleWidth} ink={colors.ink} label={colors.label} renderTitle={renderTitle} />
      {g.image && (
        <Panel
          entry={entry}
          system={system}
          box={{ x: g.card.x, y: g.card.y, width: g.card.width, height: g.card.height }}
          style={{ position: "absolute", left: g.card.x, top: g.card.y, borderRadius: 24 }}
        />
      )}
    </FrameRoot>
  );
}

export type Template = {
  label: string;
  uses: { theme: boolean; image: boolean; color: boolean };
  titleBox: (entry: Entry, system: System) => { width: number; height: number };
  imageBox: (entry: Entry, system: System) => Box | null;
  Frame: (props: FrameProps) => ReactNode;
};

export const TEMPLATES: Record<TemplateName, Template> = {
  plate: {
    label: "Plate",
    uses: TEMPLATE_USES.plate,
    titleBox: (entry, system) => ({ width: plateGeometry(entry, system, "plate").titleWidth, height: titleBoxHeight(system) }),
    imageBox: (entry, system) => {
      const g = plateGeometry(entry, system, "plate");
      return g.image ? { x: g.columnWidth, y: 0, width: system.panelWidth, height: FRAME_H } : null;
    },
    Frame: Plate,
  },
  poster: {
    label: "Poster",
    uses: TEMPLATE_USES.poster,
    titleBox: (_entry, system) => ({ width: FRAME_W - 2 * system.margin, height: titleBoxHeight(system) }),
    imageBox: () => null,
    Frame: Poster,
  },
  inset: {
    label: "Inset",
    uses: TEMPLATE_USES.inset,
    titleBox: (entry, system) => ({ width: plateGeometry(entry, system, "inset").titleWidth, height: titleBoxHeight(system) }),
    imageBox: (entry, system) => {
      const g = plateGeometry(entry, system, "inset");
      return g.image ? { ...g.card } : null;
    },
    Frame: Inset,
  },
};

export function templateFor(name: string | undefined): Template {
  return TEMPLATES[templateOrDefault(name ?? DEFAULT_TEMPLATE)];
}

export function titleBoxFor(entry: Entry, system: System): { width: number; height: number } | null {
  if (layoutOf(entry) === "image-only") return null;
  return templateFor(system.template).titleBox(entry, system);
}

export function imageBoxFor(entry: Entry, system: System): Box | null {
  if (layoutOf(entry) === "image-only") {
    return entry.image && !isSheet(entry.image) ? { x: 0, y: 0, width: FRAME_W, height: FRAME_H } : null;
  }
  return templateFor(system.template).imageBox(entry, system);
}

export function Frame(props: FrameProps) {
  if (layoutOf(props.entry) === "image-only") return <ImageOnlyFrame {...props} />;
  const { Frame: Draw } = templateFor(props.system.template);
  return <Draw {...props} />;
}
