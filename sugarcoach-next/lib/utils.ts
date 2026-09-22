import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Tokens propios de tailwind.config.ts (theme.extend.fontSize / fontFamily).
// Sin esto, twMerge con su config por defecto trata p. ej. `font-label-lg`
// y `text-label-lg` como conflicto y elimina una (los links de la navbar
// perdian su tamano y heredaban text-body-md del <main>).
const CUSTOM_TOKENS = [
  "display-lg",
  "display-lg-mobile",
  "headline-lg",
  "headline-lg-mobile",
  "headline-md",
  "headline-sm",
  "label-lg",
  "label-md",
  "label-sm",
  "body-lg",
  "body-md",
  "body-sm",
];

const FONT_SIZE_CLASSES = CUSTOM_TOKENS.map((t) => `text-${t}`);
const FONT_FAMILY_CLASSES = CUSTOM_TOKENS.map((t) => `font-${t}`);

const twMergeWithTheme = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": FONT_SIZE_CLASSES,
      "font-family": FONT_FAMILY_CLASSES,
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMergeWithTheme(clsx(inputs));
}
