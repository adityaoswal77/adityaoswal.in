import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const IS_PRODUCTION = process.env.VERCEL_ENV === "production"

// Unfilled copy placeholders look like [IP_VISITORS_LAST_30D].
export function isPlaceholder(value: string) {
  return /^\[[A-Z0-9_]+\]$/.test(value)
}
