"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

type Mode = "light" | "dark";
type Brand = "brand" | "premium";

const TOKENS: Record<Brand, Record<Mode, { primary: string; onPrimary: string; soft: string }>> = {
  brand: {
    light: { primary: "#2C7BE5", onPrimary: "#FFFFFF", soft: "#E3EEFC" },
    dark: { primary: "#5B9BF0", onPrimary: "#0E1420", soft: "#1B2B45" },
  },
  premium: {
    light: { primary: "#6D3FC0", onPrimary: "#FFFFFF", soft: "#ECE3FA" },
    dark: { primary: "#A98BEF", onPrimary: "#140E24", soft: "#2A1F45" },
  },
};

const SURFACES: Record<Mode, { bg: string; card: string; text: string; muted: string; line: string }> = {
  light: { bg: "#F4F7FB", card: "#FFFFFF", text: "#1B2433", muted: "#5B6677", line: "#DCE3EE" },
  dark: { bg: "#0E1420", card: "#172033", text: "#E8EDF5", muted: "#9AA6B8", line: "#27324A" },
};

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full border border-[#2A2438]/15 bg-white/70 p-0.5 dark:rounded-lg dark:border-white/10 dark:bg-white/5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] dark:rounded-md dark:font-mono dark:focus-visible:ring-white ${
            value === o.value
              ? "bg-[#FF5C39] text-[#2A2438] dark:bg-white dark:text-black"
              : "text-[#6E6580] hover:text-[#2A2438] dark:text-zinc-400 dark:hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function TokenPlayground({ size = "sm" }: { size?: "sm" | "lg" }) {
  const [mode, setMode] = useState<Mode>("light");
  const [brand, setBrand] = useState<Brand>("brand");
  const [liked, setLiked] = useState(false);
  const t = TOKENS[brand][mode];
  const s = SURFACES[mode];

  const tokenRows: [string, string][] = [
    ["primary", t.primary],
    ["surface", s.card],
    ["background", s.bg],
    ["text", s.text],
  ];

  return (
    <div className={`flex gap-4 p-4 ${size === "lg" ? "flex-col md:flex-row md:items-stretch" : "flex-col sm:flex-row sm:items-stretch"}`}>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Segmented
            label="Mode"
            value={mode}
            onChange={setMode}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
          <Segmented
            label="Theme"
            value={brand}
            onChange={setBrand}
            options={[
              { value: "brand", label: "Brand" },
              { value: "premium", label: "Premium" },
            ]}
          />
        </div>

        <div
          className="rounded-2xl border p-4 transition-colors duration-300 motion-reduce:transition-none"
          style={{ backgroundColor: s.bg, borderColor: s.line }}
        >
          <div
            className="rounded-xl border p-4 transition-colors duration-300 motion-reduce:transition-none"
            style={{ backgroundColor: s.card, borderColor: s.line, color: s.text }}
          >
            <span
              className="inline-block rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors duration-300 motion-reduce:transition-none"
              style={{ backgroundColor: t.soft, color: t.primary }}
            >
              {brand === "brand" ? "KardiaMobile" : "KardiaCare"}
            </span>
            <p className="mt-3 text-base font-bold">Your heart, in one place</p>
            <p className="mt-1 text-xs leading-relaxed transition-colors duration-300 motion-reduce:transition-none" style={{ color: s.muted }}>
              Every colour here comes from a token, not a hard-coded value.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                className="rounded-xl px-4 py-2.5 text-sm font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none"
                style={{ backgroundColor: t.primary, color: t.onPrimary, ["--tw-ring-color" as string]: t.primary, ["--tw-ring-offset-color" as string]: s.card }}
              >
                Continue
              </button>
              <button
                type="button"
                aria-pressed={liked}
                aria-label="Favourite"
                onClick={() => setLiked((l) => !l)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none"
                style={{ borderColor: t.primary, color: t.primary, backgroundColor: liked ? t.soft : "transparent", ["--tw-ring-color" as string]: t.primary, ["--tw-ring-offset-color" as string]: s.card }}
              >
                <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[11px] text-[#6E6580] dark:text-zinc-400">
          {tokenRows.map(([name, value]) => (
            <div key={name} className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-sm border border-black/10 dark:border-white/20" style={{ backgroundColor: value }} aria-hidden="true" />
              <dt className="sr-only">{name}</dt>
              <dd className="truncate">
                {name} <span className="text-[#2A2438] dark:text-white">{value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={`relative mx-auto shrink-0 ${size === "lg" ? "h-[300px] w-[155px] md:h-auto md:w-[170px]" : "h-[220px] w-[114px] sm:h-auto sm:w-[100px]"}`}>
        <Image
          src="/assets/kardia-ds/Mockup-DS-crop.png"
          alt="The redesigned Kardia app on a phone, built with the design system"
          fill
          sizes="170px"
          className="object-contain drop-shadow-[0_14px_20px_rgba(44,123,229,0.35)] dark:drop-shadow-none"
        />
      </div>
    </div>
  );
}
