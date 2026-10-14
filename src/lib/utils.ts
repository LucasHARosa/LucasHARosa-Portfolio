import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Ensina ao tailwind-merge a escala tipográfica do tema (text-label, text-h2…),
// senão ela é confundida com cor e descartada ao lado de text-ink/text-dim.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["label", "body", "lead", "h3", "h2", "display"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
