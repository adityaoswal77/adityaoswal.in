"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

type Mode = "light" | "dark";
type Brand = "brand" | "premium";

type Token = { name: string; hex: string };

const TOKENS: Record<Brand, Record<Mode, { primary: Token; onPrimary: Token; soft: Token }>> = {
  brand: {
    light: { primary: { name: "brand.600", hex: "#113A69" }, onPrimary: { name: "white", hex: "#FFFFFF" }, soft: { name: "brand.100", hex: "#F2F7FD" } },
    dark: { primary: { name: "brand.300", hex: "#478FE1" }, onPrimary: { name: "brand.900", hex: "#030A12" }, soft: { name: "brand.500", hex: "#174E8C" } },
  },
  premium: {
    light: { primary: { name: "premium.600", hex: "#6B4983" }, onPrimary: { name: "white", hex: "#FFFFFF" }, soft: { name: "premium.100", hex: "#EBE4F3" } },
    dark: { primary: { name: "premium.300", hex: "#C2A0D9" }, onPrimary: { name: "premium.900", hex: "#1B1023" }, soft: { name: "premium.800", hex: "#3E2550" } },
  },
};

const SURFACES: Record<Mode, { bg: Token; card: Token; text: Token; muted: string; line: string }> = {
  light: {
    bg: { name: "brand.0", hex: "#F8FBFE" },
    card: { name: "white", hex: "#FFFFFF" },
    text: { name: "neutral.900", hex: "#182C3D" },
    muted: "#182C3DB3",
    line: "#C6CCD2",
  },
  dark: {
    bg: { name: "brand.800", hex: "#061323" },
    card: { name: "brand.700", hex: "#0C2746" },
    text: { name: "brand.100", hex: "#F2F7FD" },
    muted: "#B9D4F3",
    line: "#174E8C",
  },
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
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full border border-[#090F05]/15 bg-white/70 p-0.5 dark:rounded-lg dark:border-white/10 dark:bg-white/5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] dark:rounded-md dark:font-mono dark:focus-visible:ring-white ${
            value === o.value
              ? "bg-[#B2EB76] text-[#090F05] dark:bg-white dark:text-black"
              : "text-[#4A5B38] hover:text-[#090F05] dark:text-zinc-400 dark:hover:text-white"
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

  const tokenRows: [string, Token][] = [
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
          style={{ backgroundColor: s.bg.hex, borderColor: s.line }}
        >
          <div
            className="rounded-[8px] border p-4 transition-colors duration-300 motion-reduce:transition-none"
            style={{ backgroundColor: s.card.hex, borderColor: s.line, color: s.text.hex }}
          >
            <span
              className="inline-block rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors duration-300 motion-reduce:transition-none"
              style={{ backgroundColor: t.soft.hex, color: t.primary.hex }}
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
                className="rounded-[4px] px-4 py-2.5 text-sm font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none"
                style={{ backgroundColor: t.primary.hex, color: t.onPrimary.hex, ["--tw-ring-color" as string]: t.primary.hex, ["--tw-ring-offset-color" as string]: s.card.hex }}
              >
                Continue
              </button>
              <button
                type="button"
                aria-pressed={liked}
                aria-label="Favourite"
                onClick={() => setLiked((l) => !l)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none"
                style={{ borderColor: t.primary.hex, color: t.primary.hex, backgroundColor: liked ? t.soft.hex : "transparent", ["--tw-ring-color" as string]: t.primary.hex, ["--tw-ring-offset-color" as string]: s.card.hex }}
              >
                <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[11px] text-[#4A5B38] dark:text-zinc-400">
          {tokenRows.map(([role, token]) => (
            <div key={role} className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-sm border border-black/10 dark:border-white/20" style={{ backgroundColor: token.hex }} aria-hidden="true" />
              <dt className="sr-only">{role}</dt>
              <dd className="truncate">
                {role} <span className="text-[#090F05] dark:text-white">{token.name}</span>
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
