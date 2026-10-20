"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";

export function BrowserScroller({ src, size = "sm" }: { src: string; size?: "sm" | "lg" }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [full, setFull] = useState(false);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { x: e.clientX, y: e.clientY, left: ref.current.scrollLeft, top: ref.current.scrollTop };
    ref.current.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !ref.current) return;
    ref.current.scrollLeft = d.left - (e.clientX - d.x);
    ref.current.scrollTop = d.top - (e.clientY - d.y);
  };

  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-xl border border-[#e11d48]/25 bg-white shadow-[0_18px_40px_-18px_rgba(225,29,72,0.45)] dark:rounded-lg dark:border-white/10 dark:bg-zinc-950 dark:shadow-none">
        <div className="flex items-center gap-3 border-b border-[#e11d48]/15 bg-[#FFF3F6] px-3 py-2 dark:border-white/10 dark:bg-zinc-900">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#B2EB76]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8F3DA] dark:bg-zinc-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#D3EEC8] dark:bg-zinc-600" />
          </div>
          <span className="min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-center font-mono text-[11px] text-[#4A5B38] dark:rounded-md dark:bg-black dark:text-zinc-400">
            freshfolios.com
          </span>
          <button
            type="button"
            onClick={() => {
              setFull((f) => !f);
              if (ref.current) ref.current.scrollTo({ left: 0, top: 0 });
            }}
            aria-pressed={full}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#090F05]/20 px-2.5 py-1 text-[11px] font-bold text-[#090F05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] dark:rounded-md dark:border-white/20 dark:font-mono dark:text-white dark:focus-visible:ring-white"
          >
            {full ? (
              <>
                <Minimize2 className="h-3 w-3" aria-hidden="true" /> Fit
              </>
            ) : (
              <>
                <Maximize2 className="h-3 w-3" aria-hidden="true" /> Full size
              </>
            )}
          </button>
        </div>
        <div
          ref={ref}
          tabIndex={0}
          role="region"
          aria-label="Freshfolios website preview. Scroll or drag to explore."
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`overflow-auto bg-[#FFF3F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#090F05] dark:bg-zinc-900 dark:focus-visible:ring-white ${
            size === "lg" ? "h-[420px]" : "h-[300px]"
          } ${full ? (dragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
        >
          <Image
            src={src}
            alt="Freshfolios website homepage"
            width={2048}
            height={1243}
            sizes="(max-width: 768px) 100vw, 1200px"
            draggable={false}
            className={`block h-auto select-none ${full ? "w-[900px] max-w-none" : "w-full"}`}
          />
        </div>
      </div>
      <p className="mt-2 text-center font-mono text-[11px] text-[#4A5B38] dark:text-zinc-500">
        {full ? "Scroll or drag to look around" : "Tap Full size, then scroll or drag"}
      </p>
    </div>
  );
}
