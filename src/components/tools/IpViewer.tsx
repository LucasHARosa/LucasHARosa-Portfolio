import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton, Notice, Panel } from "./ui";

interface IpInfo {
  ip: string;
  type?: string;
  country?: string;
  flag?: string;
  region?: string;
  city?: string;
  isp?: string;
  timezone?: string;
}

type State = { status: "loading" } | { status: "ready"; info: IpInfo } | { status: "error" };

interface IpwhoisResponse {
  success: boolean;
  ip: string;
  type: string;
  country: string;
  region: string;
  city: string;
  flag?: { emoji?: string };
  connection?: { isp?: string; org?: string };
  timezone?: { id?: string };
}

/** ipwho.is traz IP e localização; se falhar (cota, bloqueio), o ipify traz só o IP. */
async function fetchIp(): Promise<IpInfo> {
  try {
    const res = await fetch("https://ipwho.is/", { cache: "no-store" });
    const data: IpwhoisResponse = await res.json();
    if (!data.success) throw new Error("ipwho.is sem sucesso");
    return {
      ip: data.ip,
      type: data.type,
      country: data.country,
      flag: data.flag?.emoji,
      region: data.region,
      city: data.city,
      isp: data.connection?.isp || data.connection?.org,
      timezone: data.timezone?.id,
    };
  } catch {
    const res = await fetch("https://api64.ipify.org?format=json", { cache: "no-store" });
    const data: { ip: string } = await res.json();
    return { ip: data.ip, type: data.ip.includes(":") ? "IPv6" : "IPv4" };
  }
}

export default function IpViewer() {
  const [state, setState] = useState<State>({ status: "loading" });

  const load = useCallback(() => {
    setState({ status: "loading" });
    fetchIp()
      .then((info) => setState({ status: "ready", info }))
      .catch(() => setState({ status: "error" }));
  }, []);

  useEffect(load, [load]);

  const info = state.status === "ready" ? state.info : null;
  const rows = info
    ? [
        { label: "Tipo", value: info.type },
        { label: "País", value: info.country && `${info.flag ? `${info.flag} ` : ""}${info.country}` },
        { label: "Região", value: [info.city, info.region].filter(Boolean).join(", ") },
        { label: "Provedor", value: info.isp },
        { label: "Fuso horário", value: info.timezone },
      ].filter((row) => row.value)
    : [];

  return (
    <div className="grid gap-6">
      <Panel
        title="Seu IP público"
        aside={
          <Button size="sm" onClick={load} disabled={state.status === "loading"}>
            <RefreshCw aria-hidden="true" className={state.status === "loading" ? "animate-spin" : undefined} />
            Atualizar
          </Button>
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-4 py-4" aria-live="polite">
          <p className="min-w-0 font-mono text-h3 break-all text-ink sm:text-h2">
            {state.status === "loading" && <span className="text-dim">Detectando…</span>}
            {state.status === "error" && <span className="text-dim">Indisponível</span>}
            {info?.ip}
          </p>
          {info && <CopyButton value={info.ip} message="IP copiado!" />}
        </div>

        {rows.length > 0 && (
          <dl className="grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-label text-dim uppercase">{row.label}</dt>
                <dd className="mt-1 text-[0.9375rem]">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Panel>

      {state.status === "error" && (
        <Notice tone="error">
          Não foi possível consultar o IP. Bloqueadores de anúncio às vezes barram esses serviços — tente desativá-lo nesta página.
        </Notice>
      )}

      <Notice>
        Esta é a única ferramenta que consulta um serviço externo (ipwho.is ou ipify) — é ele quem enxerga de onde vem a
        requisição. A localização é aproximada e reflete o seu provedor, não o seu endereço.
      </Notice>
    </div>
  );
}
