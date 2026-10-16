"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { SpecimenVideo } from "./SpecimenVideo";

const PLACES = [
  { id: "jaipur", name: "Hawa Mahal", region: "Jaipur, India", note: "A pink sandstone facade built so people could watch the street unseen.", x: 30, y: 24 },
  { id: "hampi", name: "Hampi", region: "Karnataka, India", note: "Boulder-strewn ruins of the Vijayanagara capital.", x: 34, y: 56 },
  { id: "dhanushkodi", name: "Dhanushkodi", region: "Tamil Nadu, India", note: "A ghost town at the tip of Pamban island.", x: 48, y: 82 },
  { id: "gardens", name: "Gardens by the Bay", region: "Singapore", note: "Supertree structures and conservatories on the waterfront.", x: 84, y: 70 },
] as const;

export function PlacesMini({ video, size = "sm" }: { video: string; size?: "sm" | "lg" }) {
  const [active, setActive] = useState<string>(PLACES[1].id);
  const place = PLACES.find((p) => p.id === active) ?? PLACES[0];

  return (
    <div className={`grid gap-3 p-4 ${size === "lg" ? "md:grid-cols-[1fr_1.15fr]" : "sm:grid-cols-2"}`}>
      <div className={`relative overflow-hidden rounded-xl border border-[#4C63D2]/25 bg-[#2A2438] dark:rounded-lg dark:border-white/10 dark:bg-black ${size === "lg" ? "h-[320px] md:h-full md:min-h-[340px]" : "h-[220px] sm:h-full sm:min-h-[260px]"}`}>
        <SpecimenVideo
          src={video}
          label="Screen recording of the Interesting Places app"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <div
          className={`relative overflow-hidden rounded-xl border border-[#4C63D2]/25 bg-[#EEF1FF] dark:rounded-lg dark:border-white/10 dark:bg-zinc-950 ${size === "lg" ? "h-[190px]" : "h-[150px]"}`}
        >
          <svg className="absolute inset-0 h-full w-full text-[#4C63D2]/25 dark:text-white/10" aria-hidden="true">
            <defs>
              <pattern id="places-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#places-grid)" />
          </svg>
          {PLACES.map((p) => {
            const on = p.id === active;
            return (
              <button
                key={p.id}
                type="button"
                aria-label={`${p.name}, ${p.region}`}
                aria-pressed={on}
                onClick={() => setActive(p.id)}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-full items-end justify-center pb-1 focus-visible:outline-none"
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-transform duration-200 motion-reduce:transition-none ${
                    on
                      ? "scale-110 border-[#2A2438] bg-[#FF5C39] text-[#2A2438] dark:border-white dark:bg-white dark:text-black"
                      : "border-[#2A2438]/40 bg-white text-[#4C63D2] dark:border-white/30 dark:bg-zinc-900 dark:text-white/70"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
            );
          })}
          <span className="pointer-events-none absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-[#4C63D2]/70 dark:text-white/40">
            Sample pins
          </span>
        </div>

        <div
          key={place.id}
          aria-live="polite"
          className="rounded-xl border border-[#4C63D2]/25 bg-white/80 p-3 dark:rounded-lg dark:border-white/10 dark:bg-white/5"
        >
          <p className="text-sm font-bold text-[#2A2438] dark:text-white">{place.name}</p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-[#6E6580] dark:text-zinc-400">{place.region}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-[#2A2438]/80 dark:text-zinc-300">{place.note}</p>
        </div>
      </div>
    </div>
  );
}
