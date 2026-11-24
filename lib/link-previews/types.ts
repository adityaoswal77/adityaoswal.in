export type Theme = "light" | "dark";
export type Layout = "type-only" | "type-and-image" | "image-only";
export type Focus = { x: number; y: number };
export type SingleImage = { src: string; focus: Focus; zoom?: number };
export type SheetImage = { sheet: string[]; columns: number };
export type EntryImage = SingleImage | SheetImage | null;
export type Video = { src: string; type: "video/mp4"; width: number; height: number; version?: string };

export type Entry = {
  id: string;
  path: string;
  title: string;
  alt?: string;
  group: string;
  theme: Theme;
  layout?: Layout;
  image: EntryImage;
  version: string | null;
  savedHash: string | null;
  video?: Video;
};

export type InkColors = { background: string; ink: string; label: string };

export type System = {
  template: string;
  color?: string;
  domain: string;
  font: { family: string; titleWeight: number; labelWeight: number };
  colors: { light: InkColors; dark: InkColors; panel: string };
  margin: number;
  textBottom: number;
  panelGap: number;
  panelWidth: number;
  labelSize: number;
  labelLineHeight: number;
  labelGap: number;
  lineHeight: number;
  titleSize: { min: number; max: number };
  maxLines: number;
};

export type Manifest = { system: System; entries: Entry[] };
export type SourceFile = { src: string; label: string; folder: string };
export type Box = { x: number; y: number; width: number; height: number };
export type Fit = { size: number; lines: number; overflow: boolean };

export function isSheet(image: EntryImage): image is SheetImage {
  return !!image && "sheet" in image;
}
export function isSingle(image: EntryImage): image is SingleImage {
  return !!image && "src" in image;
}
