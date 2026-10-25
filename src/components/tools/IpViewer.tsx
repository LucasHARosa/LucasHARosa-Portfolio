import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton, Notice, Panel } from "./ui";

/** Endereço de uma família: carregando, encontrado ou sem rota (rede sem IPv6, bloqueio). */
type Address = { status: "loading" } | { status: "ok"; ip: string } | { status: "none" };

interface Location {
  country?: string;
  region?: string;
  isp?: string;
  timezone?: string;
}

interface IpwhoisResponse {
  success: boolean;
  country: string;
  country_code: string;
  region: string;
  city: string;
  connection?: { isp?: string; org?: string };
  timezone?: { id?: string };
}

const TIMEOUT = 6000;

// Cada endpoint do ipify só responde por uma família — é assim que dá para ver os dois IPs
const ENDPOINTS = {
  v4: "https://api.ipify.org?format=json",
  v6: "https://api6.ipify.org?format=json",
} as const;

async function fetchAddress(url: string): Promise<Address> {
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(TIMEOUT) });
    const data: { ip: string } = await res.json();
    return { status: "ok", ip: data.ip };
  } catch {
    return { status: "none" };
  }
}

const externalLink = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
    {label}
  </a>
);

const regionNames = new Intl.DisplayNames(["pt-BR"], { type: "region" });

async function fetchLocation(): Promise<Location | null> {
  try {
    const res = await fetch("https://ipwho.is/", { cache: "no-store", signal: AbortSignal.timeout(TIMEOUT) });
    const data: IpwhoisResponse = await res.json();
    if (!data.success) return null;
    let country = data.country;
    try {
      country = regionNames.of(data.country_code) ?? data.country;
    } catch {
      // country_code inválido: fica o nome em inglês
    }
    return {
      country,
      region: [data.city, data.region].filter(Boolean).join(", "),
      isp: data.connection?.isp || data.connection?.org,
      timezone: data.timezone?.id,
    };
  } catch {
    return null;
  }
}

function AddressCard({ label, address, hint }: { label: string; address: Address; hint: string }) {
  return (
    <Panel
      title={label}
      aside={address.status === "ok" && <CopyButton value={address.ip} message={`${label} copiado!`} />}
    >
      <p className="py-2 font-mono text-lead leading-snug break-all text-ink sm:text-h3" aria-live="polite">
        {address.status === "loading" && <span className="text-dim">Detectando…</span>}
        {address.status === "none" && <span className="text-dim">Não disponível</span>}
        {address.status === "ok" && address.ip}
      </p>
      {address.status === "none" && <p className="mt-2 text-[0.875rem] text-dim">{hint}</p>}
    </Panel>
  );
}

export default function IpViewer() {
  const [v4, setV4] = useState<Address>({ status: "loading" });
  const [v6, setV6] = useState<Address>({ status: "loading" });
  const [location, setLocation] = useState<Location | null | "loading">("loading");

  const load = useCallback(() => {
    setV4({ status: "loading" });
    setV6({ status: "loading" });
    setLocation("loading");
    fetchAddress(ENDPOINTS.v4).then(setV4);
    fetchAddress(ENDPOINTS.v6).then(setV6);
    fetchLocation().then(setLocation);
  }, []);

  useEffect(load, [load]);

  const loading = v4.status === "loading" || v6.status === "loading" || location === "loading";
  const failed = v4.status === "none" && v6.status === "none";
  const rows =
    location && location !== "loading"
      ? [
          { label: "País", value: location.country },
          { label: "Região", value: location.region },
          { label: "Provedor", value: location.isp },
          { label: "Fuso horário", value: location.timezone },
        ].filter((row) => row.value)
      : [];

  return (
    <div className="grid gap-6">
      <div className="flex justify-end">
        <Button size="sm" onClick={load} disabled={loading}>
          <RefreshCw aria-hidden="true" className={loading ? "animate-spin" : undefined} />
          Atualizar
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <AddressCard label="IPv4" address={v4} hint="Não foi possível obter o IPv4 desta conexão." />
        <AddressCard
          label="IPv6"
          address={v6}
          hint="Sua rede ou seu provedor não oferece IPv6. É comum, e nesse caso só o IPv4 é usado."
        />
      </div>

      {rows.length > 0 && (
        <Panel title="Conexão">
          <dl className="grid gap-4 sm:grid-cols-2">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-label text-dim uppercase">{row.label}</dt>
                <dd className="mt-1 text-[0.9375rem]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      )}

      {failed && (
        <Notice tone="error">
          Não foi possível consultar o IP. Bloqueadores de anúncio às vezes barram esses serviços. Tente desativá-lo nesta
          página.
        </Notice>
      )}

      <Notice>
        Muitas conexões têm dois IPs públicos ao mesmo tempo, um IPv4 e um IPv6, e cada site enxerga o da rota que o
        navegador escolheu. Por isso outros sites podem mostrar só um deles. Esta é a única ferramenta que consulta
        serviços externos ({externalLink("https://www.ipify.org", "ipify")} e {externalLink("https://ipwho.is", "ipwho.is")}).
        A localização é aproximada e reflete o seu provedor, não o seu endereço.
      </Notice>
    </div>
  );
}
