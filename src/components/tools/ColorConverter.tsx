import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  contrastText,
  formatHsl,
  formatRgb,
  hexToRgb,
  hslToRgb,
  parseHex,
  rgbToHex,
  rgbToHsl,
  type Hsl,
  type Rgb,
} from "@/lib/color";
import { fieldClass } from "./styles";
import { CopyButton, Label, Panel } from "./ui";

const RGB_FIELDS = [
  { key: "r", label: "R", max: 255 },
  { key: "g", label: "G", max: 255 },
  { key: "b", label: "B", max: 255 },
] as const;

const HSL_FIELDS = [
  { key: "h", label: "H", max: 360, hint: "matiz" },
  { key: "s", label: "S", max: 100, hint: "saturação %" },
  { key: "l", label: "L", max: 100, hint: "luminosidade %" },
] as const;

const clampInt = (value: string, max: number) => Math.min(max, Math.max(0, Math.round(Number(value) || 0)));

export default function ColorConverter() {
  // RGB é a fonte da verdade; o HSL fica guardado à parte para não "pular" ao arredondar
  const [rgb, setRgb] = useState<Rgb>(() => hexToRgb("#3b82f6"));
  const [hsl, setHsl] = useState<Hsl>(() => rgbToHsl(rgb));
  const hex = rgbToHex(rgb);
  const [hexDraft, setHexDraft] = useState(hex);

  const fromRgb = (next: Rgb) => {
    setRgb(next);
    setHsl(rgbToHsl(next));
    setHexDraft(rgbToHex(next));
  };

  const fromHsl = (next: Hsl) => {
    const nextRgb = hslToRgb(next);
    setHsl(next);
    setRgb(nextRgb);
    setHexDraft(rgbToHex(nextRgb));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="grid gap-6">
        <Panel title="HEX" aside={<CopyButton value={hex} message={`${hex} copiado!`} />}>
          <label htmlFor="cor-hex" className="sr-only">
            HEX
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              aria-label="Escolher cor"
              value={hex}
              onChange={(e) => fromRgb(hexToRgb(e.target.value))}
              className="h-11 w-14 shrink-0 cursor-pointer rounded-xs border border-line bg-surface p-1"
            />
            <input
              id="cor-hex"
              value={hexDraft}
              onChange={(e) => {
                setHexDraft(e.target.value);
                const parsed = parseHex(e.target.value);
                if (parsed) {
                  const next = hexToRgb(parsed);
                  setRgb(next);
                  setHsl(rgbToHsl(next));
                }
              }}
              onBlur={() => setHexDraft(hex)}
              spellCheck={false}
              className={fieldClass}
            />
          </div>
        </Panel>

        <Panel title="RGB" aside={<CopyButton value={formatRgb(rgb)} message="RGB copiado!" />}>
          <div className="grid grid-cols-3 gap-3">
            {RGB_FIELDS.map((f) => (
              <div key={f.key}>
                <Label htmlFor={`cor-${f.key}`}>{f.label}</Label>
                <input
                  id={`cor-${f.key}`}
                  type="number"
                  min={0}
                  max={f.max}
                  value={rgb[f.key]}
                  onChange={(e) => fromRgb({ ...rgb, [f.key]: clampInt(e.target.value, f.max) })}
                  className={fieldClass}
                />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="HSL" aside={<CopyButton value={formatHsl(hsl)} message="HSL copiado!" />}>
          <div className="grid grid-cols-3 gap-3">
            {HSL_FIELDS.map((f) => (
              <div key={f.key}>
                <Label htmlFor={`cor-${f.key}`}>
                  {f.label} <span className="normal-case">· {f.hint}</span>
                </Label>
                <input
                  id={`cor-${f.key}`}
                  type="number"
                  min={0}
                  max={f.max}
                  value={hsl[f.key]}
                  onChange={(e) => fromHsl({ ...hsl, [f.key]: clampInt(e.target.value, f.max) })}
                  className={fieldClass}
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Prévia">
        <div
          className="grid aspect-square place-items-center border border-line font-mono text-[0.9375rem]"
          style={{ background: hex, color: contrastText(hex) }}
        >
          <div className="text-center leading-relaxed">
            <p>{hex}</p>
            <p>{formatRgb(rgb)}</p>
            <p>{formatHsl(hsl)}</p>
          </div>
        </div>
        <Button to={`/ferramentas/paleta?cor=${encodeURIComponent(hex)}`} className="mt-4 w-full">
          Gerar paleta desta cor <ArrowRight aria-hidden="true" />
        </Button>
      </Panel>
    </div>
  );
}
