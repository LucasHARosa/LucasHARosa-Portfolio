import { useEffect, useState } from "react";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import { fieldClass } from "./styles";
import { CopyButton, Notice, Panel } from "./ui";

// Token de exemplo (o do jwt.io), assinado com "your-256-bit-secret"
const EXAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const CLAIMS_DE_DATA = [
  { key: "iat", label: "Emitido em" },
  { key: "nbf", label: "Válido a partir de" },
  { key: "exp", label: "Expira em" },
] as const;

type Decoded = { header: Record<string, unknown>; payload: Record<string, unknown>; signature: string };

function decodePart(part: string) {
  const base64 = part.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(part.length / 4) * 4, "=");
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function decode(token: string): Decoded {
  const parts = token.trim().replace(/^Bearer\s+/i, "").split(".");
  if (parts.length !== 3) throw new Error("Um JWT tem três partes separadas por ponto: header.payload.assinatura.");
  try {
    return { header: decodePart(parts[0]), payload: decodePart(parts[1]), signature: parts[2] };
  } catch {
    throw new Error("Não foi possível decodificar o header ou o payload — confira se o token está completo.");
  }
}

function tryDecode(token: string): { decoded: Decoded | null; error: string } {
  if (!token.trim()) return { decoded: null, error: "" };
  try {
    return { decoded: decode(token), error: "" };
  } catch (e) {
    return { decoded: null, error: (e as Error).message };
  }
}

const formatDate =(seconds: number) =>
  new Date(seconds * 1000).toLocaleString("pt-BR", { dateStyle: "medium", timeStyle: "medium" });

function relative(seconds: number, now: number) {
  const diff = seconds - now / 1000;
  const abs = Math.abs(diff);
  const [value, unit] =
    abs < 60 ? [abs, "second"] : abs < 3600 ? [abs / 60, "minute"] : abs < 86400 ? [abs / 3600, "hour"] : [abs / 86400, "day"];
  return new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" }).format(
    Math.round(Math.sign(diff) * value),
    unit as Intl.RelativeTimeFormatUnit,
  );
}

export default function JwtDecoder() {
  const [token, setToken] = useState(EXAMPLE);
  const [now, setNow] = useState(Date.now);

  // Atualiza o "expira em…" enquanto a página está aberta
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const { decoded, error } = tryDecode(token);

  const exp = typeof decoded?.payload.exp === "number" ? decoded.payload.exp : null;
  const expired = exp !== null && exp * 1000 < now;
  const header = decoded ? JSON.stringify(decoded.header, null, 2) : "";
  const payload = decoded ? JSON.stringify(decoded.payload, null, 2) : "";

  return (
    <div className="grid gap-6">
      <Panel title="Token">
        <label htmlFor="jwt-token" className="sr-only">
          JWT
        </label>
        <textarea
          id="jwt-token"
          rows={5}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Cole o JWT (com ou sem “Bearer”)…"
          spellCheck={false}
          className={cn(fieldClass, "break-all")}
        />
      </Panel>

      {error && <Notice tone="error">{error}</Notice>}

      {decoded && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {typeof decoded.header.alg === "string" && <Tag>alg: {decoded.header.alg}</Tag>}
            {typeof decoded.header.typ === "string" && <Tag>typ: {decoded.header.typ}</Tag>}
            {exp === null ? (
              <Tag>sem expiração</Tag>
            ) : expired ? (
              <Tag className="border-signal text-ink">expirado</Tag>
            ) : (
              <Tag className="border-ink text-ink">válido</Tag>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Header" aside={<CopyButton value={header} />}>
              <pre className="overflow-x-auto font-mono text-[0.8125rem] leading-relaxed text-ink">{header}</pre>
            </Panel>
            <Panel title="Payload" aside={<CopyButton value={payload} />}>
              <pre className="overflow-x-auto font-mono text-[0.8125rem] leading-relaxed text-ink">{payload}</pre>
            </Panel>
          </div>

          {CLAIMS_DE_DATA.some(({ key }) => typeof decoded.payload[key] === "number") && (
            <Panel title="Datas">
              <dl className="grid gap-3">
                {CLAIMS_DE_DATA.map(({ key, label }) => {
                  const value = decoded.payload[key];
                  if (typeof value !== "number") return null;
                  return (
                    <div key={key} className="grid gap-1 sm:grid-cols-[12rem_1fr]">
                      <dt className="font-mono text-label text-dim">
                        {label} <span className="text-dim">({key})</span>
                      </dt>
                      <dd className="text-[0.9375rem]">
                        {formatDate(value)} <span className="text-dim">· {relative(value, now)}</span>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </Panel>
          )}
        </>
      )}

      <Notice>
        A decodificação acontece no navegador e não verifica a assinatura — qualquer pessoa consegue ler o payload de um JWT,
        então não coloque dados sensíveis nele.
      </Notice>
    </div>
  );
}
