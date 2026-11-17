"use client";

import { useRef, useState } from "react";
import { ArrowLeft, File, FileSpreadsheet, FileText, Search, Upload, Workflow as WorkflowIcon } from "lucide-react";
import { FILES, FIRM, WORKFLOWS, type FileItem, type Workflow } from "./data";
import { FOCUS, LINE, formatSize, type Attached } from "./ui";

export type PanelTab = "workflows" | "files";
export type Upload = FileItem & { uploaded: true };

function typeOf(name: string): FileItem["type"] {
  const ext = name.split(".").pop()?.toLowerCase();
  return ext === "xlsx" || ext === "csv" ? "xlsx" : ext === "docx" || ext === "doc" ? "docx" : "pdf";
}

export function toUpload(f: Attached, client: string, i: number): Upload {
  return { id: `u-${Date.now()}-${i}`, name: f.name, size: f.size, client, date: "Just now", type: typeOf(f.name), uploaded: true };
}

function TypeIcon({ type, className }: { type: FileItem["type"]; className?: string }) {
  const I = type === "xlsx" ? FileSpreadsheet : type === "docx" ? File : FileText;
  return <I className={className} aria-hidden />;
}

const STATUS_STYLE = {
  "Waiting on you": "bg-[#F6E8CC] text-[#6B5320]",
  Running: "bg-[#E3F4C4] text-[#3F5A12]",
  Paused: "bg-[#EFEEE6] text-[#24282C]/70",
} as const;

type Props = {
  tab: PanelTab;
  onTab: (t: PanelTab) => void;
  uploads: Upload[];
  onUpload: (files: Attached[], scope: string) => void;
  onOpenWorkflow: (w: Workflow) => void;
  onAsk: (fileName: string) => void;
};

export function RightPanel({ tab, onTab, uploads, onUpload, onOpenWorkflow, onAsk }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<FileItem | null>(null);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const take = (list: FileList | null) => {
    const files = Array.from(list ?? []).map((f) => ({ name: f.name, size: formatSize(f.size) }));
    if (files.length) onUpload(files, "All clients");
  };

  const q = query.trim().toLowerCase();
  const match = (f: FileItem) => !q || f.name.toLowerCase().includes(q) || f.client.toLowerCase().includes(q);
  const shownUploads = uploads.filter(match);
  const clients = Array.from(new Set(FILES.map((f) => f.client)));

  const row = (f: FileItem, showClient: boolean) => (
    <li key={f.id}>
      <button type="button" onClick={() => setSelected(f)} className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[#EFEEE6] ${FOCUS}`}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EFEEE6]">
          <TypeIcon type={f.type} className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">{f.name}</span>
          <span className="block truncate text-xs text-[#24282C]/60">
            {f.size}
            {showClient ? ` · ${f.client}` : ""} · {f.date}
          </span>
        </span>
      </button>
    </li>
  );

  return (
    <div className="flex h-full w-[320px] flex-col border-l-[0.5px] border-[#D6D5CB] bg-[#FBFBF7]">
      <div role="tablist" className="flex shrink-0 gap-1 p-3">
        {(["workflows", "files"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => onTab(t)}
            className={`flex-1 rounded-full px-3 py-2 text-sm capitalize transition-colors ${FOCUS} ${tab === t ? "bg-[#24282C] font-bold text-[#C2EF72]" : "hover:bg-[#EFEEE6]"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-6">
        {tab === "workflows" && (
          <ul className="flex flex-col">
            {WORKFLOWS.map((w) => (
              <li key={w.id} className="border-b-[0.5px] border-[#D6D5CB] last:border-0">
                <button type="button" onClick={() => onOpenWorkflow(w)} className={`block w-full rounded-xl px-2 py-3 text-left transition-colors hover:bg-[#EFEEE6] ${FOCUS}`}>
                  <span className="block truncate text-sm font-bold">{w.name}</span>
                  <span className="flex items-center gap-1.5 text-xs text-[#24282C]/60">
                    <WorkflowIcon className="h-3 w-3 shrink-0" aria-hidden />
                    <span className="truncate">{w.scope}</span>
                  </span>
                  <span className="mt-2 flex items-center gap-2">
                    <span className="block h-1 flex-1 overflow-hidden rounded-full bg-[#E8E7DE]">
                      <span className="block h-full rounded-full bg-[#24282C]" style={{ width: `${(w.done / w.total) * 100}%` }} />
                    </span>
                    <span className="text-xs text-[#24282C]/60">
                      {w.done}/{w.total}
                    </span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_STYLE[w.status]}`}>{w.status}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {tab === "files" && !selected && (
          <div>
            <label className={`flex items-center gap-2 rounded-full ${LINE} bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-[#24282C]`}>
              <Search className="h-4 w-4 shrink-0 text-[#24282C]/60" aria-hidden />
              <span className="sr-only">Search files</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search files" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#24282C]/45" />
            </label>

            <input ref={inputRef} type="file" multiple className="hidden" aria-label="Upload files" tabIndex={-1} onChange={(e) => { take(e.target.files); e.target.value = ""; }} />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files); }}
              className={`mt-3 flex w-full flex-col items-center gap-1 rounded-2xl border border-dashed px-4 py-5 text-sm transition-colors ${FOCUS} ${drag ? "border-[#24282C] bg-[#EFEEE6]" : "border-[#B9B8AD] hover:bg-[#EFEEE6]"}`}
            >
              <Upload className="h-5 w-5" aria-hidden />
              <span className="font-bold">Upload files</span>
              <span className="text-xs text-[#24282C]/60">Click to browse or drop files here</span>
            </button>

            {shownUploads.length > 0 && (
              <section className="mt-4">
                <h2 className="px-2 text-xs font-bold text-[#24282C]/60">Just now</h2>
                <ul className="mt-1">{shownUploads.map((f) => row(f, true))}</ul>
              </section>
            )}

            {clients.map((c) => {
              const list = FILES.filter((f) => f.client === c && match(f));
              if (!list.length) return null;
              return (
                <section key={c} className="mt-4">
                  <h2 className="px-2 text-xs font-bold text-[#24282C]/60">{c === FIRM ? "Firm files" : c}</h2>
                  <ul className="mt-1">{list.map((f) => row(f, false))}</ul>
                </section>
              );
            })}
          </div>
        )}

        {tab === "files" && selected && (
          <div>
            <button type="button" onClick={() => setSelected(null)} className={`flex items-center gap-1.5 rounded-full py-1.5 pl-2 pr-3 text-sm transition-colors hover:bg-[#EFEEE6] ${FOCUS}`}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Files
            </button>
            <div className={`mt-3 rounded-2xl ${LINE} bg-white p-5`} role="img" aria-label={`Preview of ${selected.name}`}>
              <div className="flex items-center gap-3">
                <TypeIcon type={selected.type} className="h-8 w-8" />
                <span className="h-2 w-24 rounded-full bg-[#D6D5CB]" />
              </div>
              <div className="mt-5 flex flex-col gap-2">
                {[100, 92, 96, 70, 100, 88, 55].map((w, i) => (
                  <span key={i} className="h-1.5 rounded-full bg-[#EFEEE6]" style={{ width: `${w}%` }} />
                ))}
              </div>
              {selected.type === "xlsx" && (
                <div className="mt-5 grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }, (_, i) => (
                    <span key={i} className="h-4 rounded bg-[#EFEEE6]" />
                  ))}
                </div>
              )}
            </div>
            <h2 className="mt-4 break-words text-base font-bold">{selected.name}</h2>
            <dl className="mt-3 grid grid-cols-[80px_1fr] gap-y-2 text-sm">
              <dt className="text-[#24282C]/60">Type</dt>
              <dd>{selected.type.toUpperCase()}</dd>
              <dt className="text-[#24282C]/60">Size</dt>
              <dd>{selected.size}</dd>
              <dt className="text-[#24282C]/60">Client</dt>
              <dd>{selected.client}</dd>
              <dt className="text-[#24282C]/60">Added</dt>
              <dd>{selected.date}</dd>
            </dl>
            <button type="button" onClick={() => onAsk(selected.name)} className={`mt-5 w-full rounded-full bg-[#C2EF72] px-4 py-2.5 text-sm font-bold text-[#24282C] transition-colors hover:bg-[#B3E45C] ${FOCUS}`}>
              Ask Instead about this file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
