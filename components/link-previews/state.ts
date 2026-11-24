import type { Entry, Manifest, SourceFile, System, Video } from "@/lib/link-previews/types";
import { canonical, groupFromPath, idFromPath, layoutOf, titleFromPath } from "@/lib/link-previews/definition";
import type { TemplateName } from "@/lib/link-previews/template-names";

export type View = { kind: "all" } | { kind: "template" } | { kind: "page"; id: string };
export type Snap = { entries: Entry[]; template: TemplateName; color: string };
type Step = { key: string; time: number; before: Snap; after: Snap; view: View };

export type State = {
  entries: Entry[];
  saved: Record<string, Entry>;
  template: TemplateName;
  color: string;
  view: View;
  history: Step[];
  future: Step[];
};

export type Action =
  | { type: "view"; view: View }
  | { type: "change"; key: string; merge: boolean | ((before: Snap, after: Snap) => boolean); now: number; view: View; fn: (snap: Snap) => Snap }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "saved"; entry: Entry; sentKey: string }
  | { type: "video"; id: string; video: Video | undefined };

export type PageItem = { entry: Entry; missing: boolean };

export type Files = Record<string, { image: number | null; video: number | null }>;

export type Props = {
  manifest: Manifest;
  files: Files;
  sources: SourceFile[];
  registryFile: string;
};

export function draftKey(entry: Entry): string {
  return canonical({ ...entry, version: undefined, savedHash: undefined, video: undefined });
}

export function initState(manifest: Manifest, template: TemplateName): State {
  const saved: Record<string, Entry> = {};
  for (const entry of manifest.entries) saved[entry.id] = entry;
  return {
    entries: manifest.entries,
    saved,
    template,
    color: manifest.system.color ?? "#000000",
    view: { kind: "all" },
    history: [],
    future: [],
  };
}

function snapshot(state: State): Snap {
  return { entries: state.entries, template: state.template, color: state.color };
}

function viewExists(view: View, pageIds: Set<string>): boolean {
  return view.kind !== "page" || pageIds.has(view.id);
}

function mapEntries(snap: Snap, id: string, patch: Partial<Entry>): Snap {
  return { ...snap, entries: snap.entries.map((e) => (e.id === id ? { ...e, ...patch } : e)) };
}

function patchEverywhere(state: State, id: string, patch: Partial<Entry>): State {
  const fix = (step: Step): Step => ({ ...step, before: mapEntries(step.before, id, patch), after: mapEntries(step.after, id, patch) });
  const next = { ...state, ...mapEntries(snapshot(state), id, patch), history: state.history.map(fix), future: state.future.map(fix) };
  if (state.saved[id]) next.saved = { ...state.saved, [id]: { ...state.saved[id], ...patch } };
  return next;
}

export function breaks(text: string): number {
  return (text.match(/\n/g) ?? []).length;
}

export function makeReducer(pageIds: () => Set<string>) {
  return function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "view":
        return { ...state, view: action.view };
      case "change": {
        const before = snapshot(state);
        const after = action.fn(before);
        if (canonical(before) === canonical(after)) return state;
        const last = state.history[state.history.length - 1];
        const merge = typeof action.merge === "function" ? action.merge(before, after) : action.merge;
        let history: Step[];
        if (last && merge && last.key === action.key && action.now - last.time <= 1000) {
          history = [...state.history.slice(0, -1), { ...last, after, time: action.now }];
        } else {
          history = [...state.history, { key: action.key, time: action.now, before, after, view: action.view }];
        }
        return { ...state, ...after, history, future: [] };
      }
      case "undo": {
        const step = state.history[state.history.length - 1];
        if (!step) return state;
        const view = viewExists(step.view, pageIds()) ? step.view : ({ kind: "all" } as View);
        return { ...state, ...step.before, view, history: state.history.slice(0, -1), future: [...state.future, step] };
      }
      case "redo": {
        const step = state.future[state.future.length - 1];
        if (!step) return state;
        const view = viewExists(step.view, pageIds()) ? step.view : ({ kind: "all" } as View);
        return { ...state, ...step.after, view, future: state.future.slice(0, -1), history: [...state.history, step] };
      }
      case "saved": {
        const { entry, sentKey } = action;
        const current = state.entries.find((e) => e.id === entry.id);
        let next: State = { ...state, saved: { ...state.saved, [entry.id]: entry } };
        if (!current) return { ...next, entries: [...state.entries, entry] };
        if (draftKey(current) === sentKey) {
          next = { ...next, entries: state.entries.map((e) => (e.id === entry.id ? entry : e)) };
        }
        return patchEverywhere(next, entry.id, { version: entry.version, savedHash: entry.savedHash });
      }
      case "video":
        return patchEverywhere(state, action.id, { video: action.video });
    }
  };
}

export function missingPages(entries: Entry[], sitemap: string[]): Entry[] {
  const known = new Set(entries.map((e) => e.path));
  const ids = new Set(entries.map((e) => e.id));
  const out: Entry[] = [];
  for (const path of sitemap) {
    if (known.has(path)) continue;
    known.add(path);
    const id = idFromPath(path, ids);
    ids.add(id);
    out.push({ id, path, title: titleFromPath(path), group: groupFromPath(path), theme: "light", image: null, version: null, savedHash: null });
  }
  return out;
}

export function buildPages(entries: Entry[], missing: Entry[]): PageItem[] {
  const all: PageItem[] = [...entries.map((entry) => ({ entry, missing: false })), ...missing.map((entry) => ({ entry, missing: true }))];
  const order: string[] = [];
  for (const item of all) if (!order.includes(item.entry.group)) order.push(item.entry.group);
  return order.flatMap((group) => all.filter((item) => item.entry.group === group));
}

export type Status = "missing" | "draft" | "saved" | "stale";

export function statusOf(
  item: PageItem,
  state: State,
  exists: boolean,
  hash: (entry: Entry) => string,
): Status {
  if (item.missing) return "missing";
  const savedCopy = state.saved[item.entry.id];
  if (!savedCopy || !exists || draftKey(item.entry) !== draftKey(savedCopy)) return "draft";
  if (!savedCopy.savedHash) return layoutOf(item.entry) === "image-only" ? "saved" : "stale";
  return hash(item.entry) === savedCopy.savedHash ? "saved" : "stale";
}

export function drawSystem(system: System, template: TemplateName, color: string): System {
  return { ...system, template, color };
}
