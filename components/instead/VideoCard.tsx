"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

const NEETO_SCRIPT = "https://adi-os.neetorecord.com/javascript/embed.js";
const NEETO_ORG = "adi-os";
const NEETO_VIDEO_ID = "8fc4300e-fddc-4dc8-b7cf-5a9fdf6a876e";
const CONTAINER_ID = "instead-walkthrough-embed";

type NeetoRecord = { embed: (...args: unknown[]) => void; q?: unknown[][] };

declare global {
  interface Window {
    neetoRecord?: NeetoRecord;
  }
}

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24282C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F0]";

function embedVideo() {
  window.neetoRecord =
    window.neetoRecord ||
    ({
      embed: function (...args: unknown[]) {
        const nr = window.neetoRecord as NeetoRecord;
        (nr.q = nr.q || []).push(args);
      },
    } as NeetoRecord);

  window.neetoRecord.embed({
    type: "inline",
    id: NEETO_VIDEO_ID,
    organization: NEETO_ORG,
    elementSelector: `#${CONTAINER_ID}`,
    styles: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;",
  });

  if (!document.querySelector(`script[src="${NEETO_SCRIPT}"]`)) {
    const s = document.createElement("script");
    s.src = NEETO_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }
}

export function VideoCard({ className }: { className: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    embedVideo();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={`${className} text-left transition-colors hover:border-[#24282C]/40 hover:bg-white motion-reduce:transition-none ${FOCUS}`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-[#D6D5CB] bg-[#C2EF72]">
          <Play className="h-4 w-4" aria-hidden />
        </span>
        <span className="mt-6 block text-base font-bold">Walkthrough video</span>
        <span className="mt-1 block text-sm text-[#24282C]/60">A short tour of the work</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Walkthrough video"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#24282C]/70 p-4 md:p-10"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-[1100px] overflow-hidden rounded-[20px] bg-[#24282C] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 text-[#F7F6F0]">
              <span className="text-sm font-bold">Walkthrough video</span>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close video"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2EF72]"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div id={CONTAINER_ID} className="relative h-0 w-full bg-black pb-[62.5%]" />
          </div>
        </div>
      )}
    </>
  );
}
