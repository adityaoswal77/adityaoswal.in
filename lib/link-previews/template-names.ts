export const TEMPLATE_NAMES = ["plate", "poster", "inset"] as const;
export type TemplateName = (typeof TEMPLATE_NAMES)[number];
export const DEFAULT_TEMPLATE: TemplateName = "plate";

export const TEMPLATE_USES: Record<TemplateName, { theme: boolean; image: boolean; color: boolean }> = {
  plate: { theme: true, image: true, color: false },
  poster: { theme: false, image: false, color: true },
  inset: { theme: true, image: true, color: false },
};

export function isTemplateName(value: unknown): value is TemplateName {
  return typeof value === "string" && (TEMPLATE_NAMES as readonly string[]).includes(value);
}

export function templateOrDefault(value: unknown): TemplateName {
  return isTemplateName(value) ? value : DEFAULT_TEMPLATE;
}
