import { Download } from "lucide-react";
import QRCode, { type QRCodeErrorCorrectionLevel } from "qrcode";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass } from "./styles";
import { Label, Notice, Panel, Segmented } from "./ui";

const LEVELS = [
  { value: "L", label: "L · 7%" },
  { value: "M", label: "M · 15%" },
  { value: "Q", label: "Q · 25%" },
  { value: "H", label: "H · 30%" },
] as const;

const SIZES = [256, 512, 1024] as const;

function download(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
}

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://lucasrosa.dev.br");
  const [level, setLevel] = useState<QRCodeErrorCorrectionLevel>("M");
  const [size, setSize] = useState<(typeof SIZES)[number]>(512);
  const [dark, setDark] = useState("#000000");
  const [light, setLight] = useState("#ffffff");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  const options = useMemo(
    () => ({ errorCorrectionLevel: level, margin: 2, width: size, color: { dark, light } }),
    [level, size, dark, light],
  );

  useEffect(() => {
    let cancelled = false;
    if (!text) {
      setSvg("");
      setError("");
      return;
    }
    QRCode.toString(text, { ...options, type: "svg" })
      .then((result) => {
        if (cancelled) return;
        setSvg(result);
        setError("");
      })
      .catch(() => {
        if (cancelled) return;
        setSvg("");
        setError("Texto longo demais para um QR Code nesse nível de correção.");
      });
    return () => {
      cancelled = true;
    };
  }, [text, options]);

  const svgUrl = svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <Panel title="Conteúdo">
        <div className="grid gap-5">
          <div>
            <Label htmlFor="qr-texto">Texto ou link</Label>
            <textarea
              id="qr-texto"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://…"
              spellCheck={false}
              className={fieldClass}
            />
          </div>
          <div>
            <Label>Correção de erro</Label>
            <Segmented label="Nível de correção de erro" options={LEVELS} value={level} onChange={setLevel} />
          </div>
          <div>
            <Label>Tamanho do PNG</Label>
            <Segmented
              label="Tamanho do PNG"
              options={SIZES.map((s) => ({ value: s, label: `${s}px` }))}
              value={size}
              onChange={setSize}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "qr-cor", label: "Cor", value: dark, set: setDark },
              { id: "qr-fundo", label: "Fundo", value: light, set: setLight },
            ].map((c) => (
              <div key={c.id}>
                <Label htmlFor={c.id}>{c.label}</Label>
                <div className="flex items-center gap-2">
                  <input
                    id={c.id}
                    type="color"
                    value={c.value}
                    onChange={(e) => c.set(e.target.value)}
                    className="h-10 w-12 shrink-0 cursor-pointer rounded-xs border border-line bg-surface p-1"
                  />
                  <code className="font-mono text-[0.875rem] text-dim">{c.value}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="QR Code">
        <div className="grid gap-4">
          <div className="grid aspect-square place-items-center border border-line bg-surface p-4">
            {svgUrl ? (
              <img src={svgUrl} alt={`QR Code de: ${text}`} className="size-full object-contain" />
            ) : (
              <p className="font-mono text-label text-dim">Digite algo para gerar</p>
            )}
          </div>
          {error && <Notice tone="error">{error}</Notice>}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="signal"
              disabled={!svg}
              onClick={async () => download(await QRCode.toDataURL(text, options), "qrcode.png")}
            >
              <Download aria-hidden="true" /> PNG
            </Button>
            <Button disabled={!svg} onClick={() => download(svgUrl, "qrcode.svg")}>
              <Download aria-hidden="true" /> SVG
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
