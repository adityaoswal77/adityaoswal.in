export const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24282C] focus-visible:ring-offset-1 focus-visible:ring-offset-[#F7F6F0] active:scale-[0.98] motion-reduce:active:transform-none";
export const LINE = "border-[0.5px] border-[#D6D5CB]";

export type Attached = { name: string; size: string };

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-[#F6E8CC] px-2 py-0.5 text-[11px] leading-none text-[#6B5320]">{children}</span>
  );
}

export function CountPill({ n }: { n: number }) {
  return <span className="rounded-full bg-[#EFEEE6] px-2 py-0.5 text-xs text-[#24282C]/60">{n}</span>;
}
