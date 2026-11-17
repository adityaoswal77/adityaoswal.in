"use client";

import { usePathname } from "next/navigation";

export function HideOnInstead({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/instead")) return null;
  return <>{children}</>;
}
