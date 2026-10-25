import {
  Braces,
  Fingerprint,
  Globe,
  Hash,
  KeyRound,
  LockKeyhole,
  Palette,
  Pipette,
  QrCode,
  type LucideIcon,
} from "lucide-react";
import lista from "./ferramentas.json";

/**
 * Ferramentas da página /ferramentas. Nome, descrição e relacionadas ficam no
 * JSON porque scripts/route-meta.mjs também os lê para gerar o HTML de cada rota.
 */
export interface Ferramenta {
  slug: string;
  nome: string;
  descricao: string;
  relacionadas: string[];
  icone: LucideIcon;
  /** Consulta um serviço externo (não roda só no navegador). */
  externa?: boolean;
}

const icones: Record<string, LucideIcon> = {
  uuid: Fingerprint,
  hash: Hash,
  json: Braces,
  ip: Globe,
  jwt: KeyRound,
  senha: LockKeyhole,
  qrcode: QrCode,
  paleta: Palette,
  cores: Pipette,
};

export const listaFerramentas: Ferramenta[] = lista.map((f) => ({
  ...f,
  icone: icones[f.slug],
  externa: f.slug === "ip",
}));

export function buscarFerramenta(slug: string | undefined) {
  return listaFerramentas.find((f) => f.slug === slug);
}
