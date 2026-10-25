import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClass } from "./styles";
import { CopyButton, Label, Panel, Segmented, Toggle } from "./ui";

type Version = "v4" | "v7";

const hexOf = (bytes: Uint8Array) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
const withHyphens = (hex: string) =>
  `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;

/** UUID v7 (RFC 9562): 48 bits de timestamp em ms + aleatório — ordena por tempo. */
function uuidV7() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const ms = Date.now();
  for (let i = 0; i < 6; i++) bytes[i] = Math.floor(ms / 2 ** (8 * (5 - i))) & 0xff;
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return withHyphens(hexOf(bytes));
}

/** randomUUID só existe em contexto seguro; o fallback monta o v4 na mão. */
function uuidV4() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return withHyphens(hexOf(bytes));
}

const VERSIONS = [
  { value: "v4", label: "v4 · aleatório" },
  { value: "v7", label: "v7 · por tempo" },
] as const;

export default function UuidGenerator() {
  const [version, setVersion] = useState<Version>("v4");
  const [quantity, setQuantity] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = useCallback(() => {
    const n = Math.min(100, Math.max(1, quantity || 1));
    setUuids(Array.from({ length: n }, version === "v4" ? uuidV4 : uuidV7));
  }, [quantity, version]);

  useEffect(generate, [generate]);

  const format = (uuid: string) => {
    const value = hyphens ? uuid : uuid.replaceAll("-", "");
    return uppercase ? value.toUpperCase() : value;
  };
  const formatted = uuids.map(format);

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <Panel title="Opções">
        <div className="grid gap-5">
          <div>
            <Label>Versão</Label>
            <Segmented label="Versão do UUID" options={VERSIONS} value={version} onChange={setVersion} />
          </div>
          <div>
            <Label htmlFor="uuid-quantidade">Quantidade (1–100)</Label>
            <input
              id="uuid-quantidade"
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={fieldClass}
            />
          </div>
          <div className="grid gap-3">
            <Toggle label="Maiúsculas" checked={uppercase} onChange={setUppercase} />
            <Toggle label="Incluir hífens" checked={hyphens} onChange={setHyphens} />
          </div>
          <Button variant="signal" onClick={generate}>
            <RefreshCw aria-hidden="true" /> Gerar
          </Button>
        </div>
      </Panel>

      <Panel
        title={`${formatted.length} ${formatted.length === 1 ? "UUID" : "UUIDs"} ${version}`}
        aside={<CopyButton value={formatted.join("\n")} label="Copiar todos" message="UUIDs copiados!" />}
      >
        <ol className="grid gap-1.5">
          {formatted.map((uuid, i) => (
            <li key={`${uuids[i]}-${i}`} className="flex items-center justify-between gap-3 border-b border-line pb-1.5 last:border-0 last:pb-0">
              <code className="min-w-0 font-mono text-[0.875rem] break-all text-ink">{uuid}</code>
              <CopyButton value={uuid} />
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
