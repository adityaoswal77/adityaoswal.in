import type { ReactNode } from "react";

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-amber-500/[0.15] px-1 py-0.5 text-[0.9em] break-all text-amber-800 dark:text-amber-300">
      {children}
    </span>
  );
}
