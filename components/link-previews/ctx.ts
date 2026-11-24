import type { Dispatch } from "react";
import type { Entry, SheetImage, SourceFile, System, Video } from "@/lib/link-previews/types";
import type { Action, Files, PageItem, Snap, State, Status } from "./state";

export type Ctx = {
  system: System;
  state: State;
  dispatch: Dispatch<Action>;
  pages: PageItem[];
  statusOf: (item: PageItem) => Status;
  files: Files;
  sources: SourceFile[];
  loadedSheets: Record<string, SheetImage>;
  registryFile: string;
  edit: (item: PageItem, key: string, merge: boolean | ((before: Snap, after: Snap) => boolean), mutate: (entry: Entry) => Entry) => void;
  setTemplate: (name: string) => void;
  setColor: (color: string) => void;
  select: (view: State["view"]) => void;
  upload: (file: File) => Promise<SourceFile>;
  setVideo: (item: PageItem, file: File | null) => Promise<string | null>;
  notes: Record<string, string | undefined>;
  saving: Record<string, boolean>;
};

export type { Video };
