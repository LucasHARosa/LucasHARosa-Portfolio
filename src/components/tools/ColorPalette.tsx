import { Shuffle } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { contrastText, formatHsl, gerarPaleta, HARMONIAS, hexToHsl, parseHex, randomHex, type Harmonia } from "@/lib/color";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import { fieldClass } from "./styles";
import { CopyButton, Label, Panel, Segmented } from "./ui";

export default function ColorPalette() {
  const [searchParams] = useSearchParams();
  const [base, setBase] = useState(() => parseHex(searchParams.get("cor") ?? "") ?? "#3b82f6");
  const [draft, setDraft] = useState(base);
  const [harmonia, setHarmonia] = useState<Harmonia>("monocromatica");

  const setColor = (hex: string) => {
    setBase(hex);
    setDraft(hex);
  };

  const palette = gerarPaleta(base, harmonia);

  return (
    <div className="grid gap-6">
      <Panel title="Cor base">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="paleta-picker" className="sr-only">
            Escolher cor
          </label>
          <input
            id="paleta-picker"
            type="color"
            value={base}
            onChange={(e) => setColor(e.target.value)}
            className="h-11 w-14 cursor-pointer rounded-xs border border-line bg-surface p-1"
          />
          <label htmlFor="paleta-hex" className="sr-only">
            Cor em hexadecimal
          </label>
          <input
            id="paleta-hex"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              const hex = parseHex(e.target.value);
              if (hex) setBase(hex);
            }}
            onBlur={() => setDraft(base)}
            spellCheck={false}
            className={cn(fieldClass, "w-32")}
          />
          <button
            type="button"
            onClick={() => setColor(randomHex())}
            aria-label="Cor aleatória"
            title="Cor aleatória"
            className="grid size-11 place-items-center rounded-xs border border-line text-dim transition-colors hover:border-ink hover:text-ink"
          >
            <Shuffle className="size-4" />
          </button>
        </div>

        <div className="mt-5">
          <Label>Harmonia</Label>
          <Segmented
            label="Harmonia"
            options={HARMONIAS.map((h) => ({ value: h.id, label: h.label }))}
            value={harmonia}
            onChange={setHarmonia}
          />
        </div>
      </Panel>

      <div>
        <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-flow-col lg:grid-cols-none lg:auto-cols-fr">
          {palette.map((hex, i) => (
            <li key={`${hex}-${i}`} className="border-r border-b border-line">
              <button
                type="button"
                onClick={() => copyText(hex, `${hex} copiado!`)}
                className="group block w-full text-left"
                aria-label={`Copiar ${hex}`}
              >
                <span
                  className="grid h-28 place-items-center font-mono text-label md:h-36"
                  style={{ background: hex, color: contrastText(hex) }}
                >
                  <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    COPIAR
                  </span>
                </span>
                <span className="block px-3 py-2.5 font-mono text-[0.875rem]">{hex}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Button onClick={() => copyText(palette.join(", "), "Paleta copiada!")}>Copiar todas as cores</Button>
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {palette.map((hex, i) => (
          <li key={`${hex}-${i}`} className="flex items-center gap-3 border border-line p-3">
            <span aria-hidden="true" className="size-12 shrink-0 rounded-xs border border-line" style={{ background: hex }} />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[0.875rem]">{hex}</p>
              <p className="font-mono text-label text-dim">{formatHsl(hexToHsl(hex))}</p>
            </div>
            <CopyButton value={hex} message={`${hex} copiado!`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
