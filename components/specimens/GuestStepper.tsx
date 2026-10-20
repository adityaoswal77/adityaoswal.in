"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, RotateCcw } from "lucide-react";

const STEP_COUNT = 4;
const EKG_PATH =
  "M0 40 H30 L36 40 L42 30 L48 40 H62 L68 46 L74 8 L80 66 L86 40 H104 L112 34 L120 40 H150 L156 40 L162 30 L168 40 H182 L188 46 L194 8 L200 66 L206 40 H224 L232 34 L240 40";

export function GuestStepper({ size = "sm", accent }: { size?: "sm" | "lg"; accent: string }) {
  const [step, setStep] = useState(0);
  const [who, setWho] = useState<"me" | "guest">("guest");
  const [real, setReal] = useState(false);
  const reduce = useReducedMotion();
  const last = step === STEP_COUNT - 1;

  const next = () => {
    if (last) {
      setStep(0);
      setReal(false);
    } else {
      setStep((s) => s + 1);
    }
  };

  const fade = reduce
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  return (
    <div
      className={`flex items-center gap-5 px-4 py-5 ${
        size === "lg" ? "flex-col sm:flex-row sm:justify-center sm:gap-10" : "flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-[2rem] border-[6px] border-[#090F05] bg-white shadow-[0_18px_40px_-16px_rgba(217,119,6,0.55)] dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-none ${
          size === "lg" ? "h-[440px] w-[220px]" : "h-[380px] w-[188px]"
        }`}
      >
        <div
          className="absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-[#090F05] dark:bg-zinc-700"
          aria-hidden="true"
        />
        {real ? (
          <Image
            src="/assets/projects/guest-ekg/after.png"
            alt="The shipped guest recording screen in the KardiaMobile app"
            fill
            sizes="220px"
            className="object-cover object-top"
          />
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              {...fade}
              transition={{ duration: 0.22 }}
              className="flex h-full flex-col px-4 pb-4 pt-8 text-[#090F05] dark:text-white"
              aria-live="polite"
            >
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: STEP_COUNT }, (_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i <= step ? "bg-[#d97706]" : "bg-[#090F05]/10 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>

              {step === 0 && (
                <>
                  <p className="mt-6 text-lg font-bold leading-tight">Who&apos;s recording?</p>
                  <div role="radiogroup" aria-label="Who is recording" className="mt-4 flex flex-col gap-2">
                    {(["me", "guest"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        role="radio"
                        aria-checked={who === v}
                        onClick={() => setWho(v)}
                        className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] dark:focus-visible:ring-white ${
                          who === v
                            ? "border-[#d97706] bg-[#E8F3DA] dark:border-amber-500/60 dark:bg-amber-500/10"
                            : "border-[#E2EADA] bg-white dark:border-white/10 dark:bg-white/[0.03]"
                        }`}
                      >
                        {v === "me" ? "Me" : "Guest"}
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            who === v
                              ? "border-[#d97706] bg-[#d97706] dark:border-amber-500 dark:bg-amber-500"
                              : "border-[#090F05]/30 dark:border-white/30"
                          }`}
                          aria-hidden="true"
                        >
                          {who === v && <Check className="h-3 w-3 text-[#090F05]" strokeWidth={3} />}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <p className="mt-6 text-lg font-bold leading-tight">{who === "guest" ? "Guest" : "Me"}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#4A5B38] dark:text-zinc-400">
                    {who === "guest"
                      ? "Rest two fingers on the sensors and stay still."
                      : "Recording for your own history. Go back to the start and pick Guest to try the new flow."}
                  </p>
                  <div className="mt-6 flex justify-center gap-3" aria-hidden="true">
                    {[0, 1].map((i) => (
                      <span
                        key={i}
                        className="h-14 w-14 rounded-full border-2 border-dashed border-[#d97706] bg-[#E8F3DA]/70 dark:border-amber-500/70 dark:bg-amber-500/10"
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="mt-6 text-lg font-bold leading-tight">Recording</p>
                  <p className="mt-2 text-xs text-[#4A5B38] dark:text-zinc-400">Hold still.</p>
                  <svg viewBox="0 0 240 80" className="mt-6 w-full" role="img" aria-label="EKG trace being drawn">
                    <motion.path
                      d={EKG_PATH}
                      fill="none"
                      stroke={accent}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: reduce ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: reduce ? 0 : 2.6, ease: "linear" }}
                    />
                  </svg>
                </>
              )}

              {step === 3 && (
                <>
                  <span
                    className="mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#D3EEC8] dark:bg-emerald-500/15"
                    aria-hidden="true"
                  >
                    <Check className="h-5 w-5 text-[#090F05] dark:text-emerald-400" strokeWidth={3} />
                  </span>
                  <p className="mt-4 text-lg font-bold leading-tight">Saved to guest, not your history</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#4A5B38] dark:text-zinc-400">
                    {who === "guest"
                      ? "Your own recordings stay untouched."
                      : "Pick Guest in the first step to see this flow."}
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="flex w-full max-w-[220px] flex-col gap-2">
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B2EB76] px-5 py-2.5 text-sm font-bold text-[#090F05] transition-transform hover:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] focus-visible:ring-offset-2 dark:rounded-lg dark:bg-white dark:font-mono dark:text-black dark:hover:rotate-0 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black motion-reduce:transition-none"
        >
          {last ? (
            <>
              Start over <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </>
          ) : (
            <>
              Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
        {last && (
          <button
            type="button"
            onClick={() => setReal((r) => !r)}
            aria-pressed={real}
            className="rounded-full border border-[#090F05]/25 px-4 py-2 text-xs font-bold text-[#090F05] transition-colors hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] dark:rounded-lg dark:border-white/20 dark:font-mono dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white"
          >
            {real ? "Back to the prototype" : "See the real screen"}
          </button>
        )}
        <p className="text-center text-[11px] font-medium text-[#4A5B38] dark:font-mono dark:text-zinc-500">
          Step {step + 1} of {STEP_COUNT}
        </p>
      </div>
    </div>
  );
}
