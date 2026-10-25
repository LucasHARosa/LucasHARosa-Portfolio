import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fieldClass } from "./styles";
import { CopyButton, Label, Notice, Panel, Toggle } from "./ui";

const SETS = {
  lower: { label: "Minúsculas (a-z)", chars: "abcdefghijklmnopqrstuvwxyz" },
  upper: { label: "Maiúsculas (A-Z)", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  digits: { label: "Números (0-9)", chars: "0123456789" },
  symbols: { label: "Símbolos (!@#…)", chars: "!@#$%^&*()-_=+[]{};:,.<>?/~" },
} as const;

type SetKey = keyof typeof SETS;

const AMBIGUOUS = /[O0oIl1|]/g;

/** Inteiro uniforme em [0, max) — rejeita o resto para não enviesar o módulo. */
function randomIndex(max: number) {
  const limit = Math.floor(2 ** 32 / max) * max;
  const buffer = new Uint32Array(1);
  do crypto.getRandomValues(buffer);
  while (buffer[0] >= limit);
  return buffer[0] % max;
}

function generatePassword(length: number, pools: string[]) {
  const alphabet = pools.join("");
  // Garante ao menos um caractere de cada conjunto marcado
  const chars = pools.map((pool) => pool[randomIndex(pool.length)]);
  while (chars.length < length) chars.push(alphabet[randomIndex(alphabet.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

function strength(bits: number) {
  if (bits < 40) return { label: "Fraca", level: 1 };
  if (bits < 60) return { label: "Razoável", level: 2 };
  if (bits < 80) return { label: "Forte", level: 3 };
  return { label: "Muito forte", level: 4 };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [enabled, setEnabled] = useState<Record<SetKey, boolean>>({
    lower: true,
    upper: true,
    digits: true,
    symbols: true,
  });
  const [noAmbiguous, setNoAmbiguous] = useState(false);
  const [quantity, setQuantity] = useState(5);
  const [passwords, setPasswords] = useState<string[]>([]);

  const pools = useMemo(
    () =>
      (Object.keys(SETS) as SetKey[])
        .filter((key) => enabled[key])
        .map((key) => (noAmbiguous ? SETS[key].chars.replace(AMBIGUOUS, "") : SETS[key].chars)),
    [enabled, noAmbiguous],
  );
  const alphabetSize = pools.join("").length;
  const bits = Math.round(length * Math.log2(Math.max(alphabetSize, 1)));
  const { label: strengthLabel, level } = strength(bits);

  const generate = useCallback(() => {
    setPasswords(pools.length ? Array.from({ length: quantity }, () => generatePassword(length, pools)) : []);
  }, [length, quantity, pools]);

  useEffect(generate, [generate]);

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <Panel title="Opções">
        <div className="grid gap-5">
          <div>
            <Label htmlFor="senha-tamanho">Tamanho: {length}</Label>
            <input
              id="senha-tamanho"
              type="range"
              min={8}
              max={128}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-(--signal)"
            />
          </div>
          <div className="grid gap-3">
            {(Object.keys(SETS) as SetKey[]).map((key) => (
              <Toggle
                key={key}
                label={SETS[key].label}
                checked={enabled[key]}
                onChange={(checked) => setEnabled((prev) => ({ ...prev, [key]: checked }))}
              />
            ))}
            <Toggle label="Evitar ambíguos (O 0 l 1 |)" checked={noAmbiguous} onChange={setNoAmbiguous} />
          </div>
          <div>
            <Label htmlFor="senha-quantidade">Quantidade</Label>
            <select
              id="senha-quantidade"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={fieldClass}
            >
              {[1, 5, 10, 20].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <Button variant="signal" onClick={generate} disabled={pools.length === 0}>
            <RefreshCw aria-hidden="true" /> Gerar
          </Button>
        </div>
      </Panel>

      <div className="grid content-start gap-6">
        {pools.length === 0 ? (
          <Notice tone="error">Marque pelo menos um conjunto de caracteres.</Notice>
        ) : (
          <div className="border border-line p-4">
            <div className="flex items-center justify-between gap-3 font-mono text-label uppercase">
              <span className="text-dim">Força</span>
              <span className="text-ink">
                {strengthLabel} · ~{bits} bits
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-1" aria-hidden="true">
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className={cn("h-1.5", n <= level ? "bg-signal" : "bg-line")} />
              ))}
            </div>
          </div>
        )}

        {passwords.length > 0 && (
          <Panel
            title={passwords.length === 1 ? "Senha" : `${passwords.length} senhas`}
            aside={passwords.length > 1 && <CopyButton value={passwords.join("\n")} label="Copiar todas" message="Senhas copiadas!" />}
          >
            <ol className="grid gap-1.5">
              {passwords.map((password, i) => (
                <li
                  key={`${password}-${i}`}
                  className="flex items-center justify-between gap-3 border-b border-line pb-1.5 last:border-0 last:pb-0"
                >
                  <code className="min-w-0 font-mono text-[0.875rem] break-all text-ink">{password}</code>
                  <CopyButton value={password} message="Senha copiada!" />
                </li>
              ))}
            </ol>
          </Panel>
        )}
      </div>
    </div>
  );
}
