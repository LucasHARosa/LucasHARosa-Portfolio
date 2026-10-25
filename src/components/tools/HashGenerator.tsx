import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { md5 } from "@/lib/md5";
import { fieldClass } from "./styles";
import { CopyButton, Label, Notice, Panel, Segmented } from "./ui";

const ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
type Algorithm = (typeof ALGORITHMS)[number];
type Encoding = "hex" | "base64";

const ENCODINGS = [
  { value: "hex", label: "Hex" },
  { value: "base64", label: "Base64" },
] as const;

const toHex = (bytes: Uint8Array) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
const toBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));

async function digest(algorithm: Algorithm, data: Uint8Array) {
  if (algorithm === "MD5") return md5(data);
  return new Uint8Array(await crypto.subtle.digest(algorithm, data));
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [encoding, setEncoding] = useState<Encoding>("hex");
  const [hashes, setHashes] = useState<Record<Algorithm, Uint8Array> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    const hasInput = file || text;
    if (!hasInput) {
      setHashes(null);
      return;
    }
    (async () => {
      const data = file ? new Uint8Array(await file.arrayBuffer()) : new TextEncoder().encode(text);
      const results = await Promise.all(ALGORITHMS.map((a) => digest(a, data)));
      if (!cancelled) setHashes(Object.fromEntries(ALGORITHMS.map((a, i) => [a, results[i]])) as Record<Algorithm, Uint8Array>);
    })();
    return () => {
      cancelled = true;
    };
  }, [text, file]);

  const clearFile = () => {
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="grid gap-6">
      <Panel
        title="Entrada"
        aside={
          <div className="flex items-center gap-2">
            <input
              ref={fileRef}
              id="hash-arquivo"
              type="file"
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <label
              htmlFor="hash-arquivo"
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-xs border border-line px-2.5 font-mono text-label text-dim uppercase transition-colors hover:border-ink hover:text-ink [&_svg]:size-3.5"
            >
              <Upload aria-hidden="true" /> Arquivo
            </label>
          </div>
        }
      >
        {file ? (
          <div className="flex items-center justify-between gap-3 border border-line px-3 py-3">
            <p className="min-w-0 font-mono text-[0.875rem] break-all">
              {file.name} <span className="text-dim">· {formatSize(file.size)}</span>
            </p>
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remover arquivo"
              className="grid size-8 shrink-0 place-items-center rounded-xs border border-line text-dim hover:border-ink hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <>
            <Label htmlFor="hash-texto" className="sr-only">
              Texto
            </Label>
            <textarea
              id="hash-texto"
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite ou cole o texto…"
              spellCheck={false}
              className={fieldClass}
            />
          </>
        )}
      </Panel>

      <Panel
        title="Resultados"
        aside={<Segmented label="Formato da saída" options={ENCODINGS} value={encoding} onChange={setEncoding} />}
      >
        <dl className="grid gap-3">
          {ALGORITHMS.map((algorithm) => {
            const bytes = hashes?.[algorithm];
            const value = bytes ? (encoding === "hex" ? toHex(bytes) : toBase64(bytes)) : "";
            return (
              <div key={algorithm} className="grid gap-2 border-b border-line pb-3 last:border-0 last:pb-0 sm:grid-cols-[6rem_1fr_auto] sm:items-center">
                <dt className="font-mono text-label text-dim">{algorithm}</dt>
                <dd className="min-w-0 font-mono text-[0.8125rem] break-all text-ink">{value || <span className="text-dim">—</span>}</dd>
                <dd>
                  <CopyButton value={value} message={`${algorithm} copiado!`} />
                </dd>
              </div>
            );
          })}
        </dl>
      </Panel>

      <Notice>
        MD5 e SHA-1 servem para checksums, não para segurança. Para guardar senhas, use bcrypt ou Argon2.
      </Notice>
    </div>
  );
}
