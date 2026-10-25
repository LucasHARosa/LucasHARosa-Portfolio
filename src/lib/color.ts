/** Conversões de cor e harmonias usadas nas ferramentas de cores. */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** h em graus (0–360), s e l em porcentagem (0–100). */
export interface Hsl {
  h: number;
  s: number;
  l: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Aceita "#3b82f6", "3b82f6" e a forma curta "#38f". */
export function parseHex(value: string): string | null {
  const hex = value.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(hex)) return `#${[...hex].map((c) => c + c).join("")}`;
  if (/^[0-9a-f]{6}$/.test(hex)) return `#${hex}`;
  return null;
}

export function hexToRgb(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex({ r, g, b }: Rgb) {
  return `#${[r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("")}`;
}

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l: Math.round(l * 100) };

  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;

  return {
    h: Math.round((h * 60 + 360) % 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;
  const k = (n: number) => (n + (((h % 360) + 360) % 360) / 30) % 12;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

export const hexToHsl = (hex: string) => rgbToHsl(hexToRgb(hex));
export const hslToHex = (hsl: Hsl) => rgbToHex(hslToRgb(hsl));

export const formatRgb = ({ r, g, b }: Rgb) => `rgb(${r}, ${g}, ${b})`;
export const formatHsl = ({ h, s, l }: Hsl) => `hsl(${h}, ${s}%, ${l}%)`;

export function randomHex() {
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  return rgbToHex({ r: bytes[0], g: bytes[1], b: bytes[2] });
}

/** Texto legível sobre a cor: preto em cores claras, branco nas escuras. */
export function contrastText(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? "#000000" : "#ffffff";
}

export const HARMONIAS = [
  { id: "complementar", label: "Complementar" },
  { id: "triadica", label: "Triádica" },
  { id: "analoga", label: "Análoga" },
  { id: "dividida", label: "Complementar dividida" },
  { id: "tetradica", label: "Tetrádica" },
  { id: "monocromatica", label: "Monocromática" },
] as const;

export type Harmonia = (typeof HARMONIAS)[number]["id"];

/** Rotações de matiz (em graus) de cada harmonia, a partir da cor base. */
const ROTACOES: Record<Exclude<Harmonia, "monocromatica">, number[]> = {
  complementar: [0, 180],
  triadica: [0, 120, 240],
  analoga: [-60, -30, 0, 30, 60],
  dividida: [0, 150, 210],
  tetradica: [0, 90, 180, 270],
};

/** Luminosidades da monocromática: mesma matiz e saturação, do escuro ao claro. */
const LUMINOSIDADES = [30, 45, 60, 75, 90];

export function gerarPaleta(hex: string, harmonia: Harmonia): string[] {
  const base = hexToHsl(hex);
  if (harmonia === "monocromatica") {
    return LUMINOSIDADES.map((l) => hslToHex({ ...base, l }));
  }
  return ROTACOES[harmonia].map((r) => (r === 0 ? hex : hslToHex({ ...base, h: (base.h + r + 360) % 360 })));
}
