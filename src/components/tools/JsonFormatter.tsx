import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fieldClass } from "./styles";
import { CopyButton, Notice, Panel, Segmented, Toggle } from "./ui";

type Indent = "2" | "4" | "tab";

const INDENTS = [
  { value: "2", label: "2 espaços" },
  { value: "4", label: "4 espaços" },
  { value: "tab", label: "Tab" },
] as const;

const EXAMPLE = `{"nome":"Lucas Rosa","cargo":"Software Engineer","stacks":["Java","Node.js","Python","Go","React"],"disponivel":true,"projetos":{"total":25,"destaques":["RosaBet","Daily Diet"]}}`;

type Result = { status: "ok"; message: string } | { status: "error"; message: string } | null;

/** Converte a posição do erro do JSON.parse em linha e coluna. */
function describeError(input: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const position = message.match(/position (\d+)/)?.[1];
  const lineCol = message.match(/line (\d+) column (\d+)/);
  if (lineCol) return `Linha ${lineCol[1]}, coluna ${lineCol[2]}: ${message}`;
  if (position) {
    const before = input.slice(0, Number(position)).split("\n");
    return `Linha ${before.length}, coluna ${before[before.length - 1].length + 1}: ${message}`;
  }
  return message;
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, sortKeys((value as Record<string, unknown>)[k])]),
    );
  }
  return value;
}

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<Indent>("2");
  const [sort, setSort] = useState(false);
  const [result, setResult] = useState<Result>(null);

  function run(mode: "format" | "minify" | "validate", source = input) {
    if (!source.trim()) {
      setResult({ status: "error", message: "Cole um JSON na entrada." });
      return;
    }
    try {
      let parsed = JSON.parse(source);
      if (sort) parsed = sortKeys(parsed);
      if (mode === "format") {
        setOutput(JSON.stringify(parsed, null, indent === "tab" ? "\t" : Number(indent)));
        setResult(null);
      } else if (mode === "minify") {
        setOutput(JSON.stringify(parsed));
        setResult(null);
      } else {
        setResult({ status: "ok", message: "JSON válido." });
      }
    } catch (error) {
      setResult({ status: "error", message: describeError(source, error) });
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-wrap gap-2">
          <Button variant="signal" size="sm" onClick={() => run("format")}>
            Formatar
          </Button>
          <Button size="sm" onClick={() => run("minify")}>
            Minificar
          </Button>
          <Button size="sm" onClick={() => run("validate")}>
            Validar
          </Button>
          <Button
            variant="ghost"
            className="px-2 underline decoration-line-strong underline-offset-4"
            onClick={() => {
              setInput(EXAMPLE);
              run("format", EXAMPLE);
            }}
          >
            Carregar exemplo
          </Button>
        </div>
        <Segmented label="Indentação" options={INDENTS} value={indent} onChange={setIndent} />
        <Toggle label="Ordenar chaves" checked={sort} onChange={setSort} />
      </div>

      {result && <Notice tone={result.status === "error" ? "error" : "info"}>{result.message}</Notice>}

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Entrada">
          <label htmlFor="json-entrada" className="sr-only">
            JSON de entrada
          </label>
          <textarea
            id="json-entrada"
            rows={18}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"cole": "seu JSON aqui"}'
            spellCheck={false}
            className={cn(fieldClass, "resize-y leading-relaxed")}
          />
        </Panel>
        <Panel title="Saída" aside={<CopyButton value={output} message="JSON copiado!" />}>
          <label htmlFor="json-saida" className="sr-only">
            JSON de saída
          </label>
          <textarea
            id="json-saida"
            rows={18}
            value={output}
            readOnly
            spellCheck={false}
            className={cn(fieldClass, "resize-y leading-relaxed")}
          />
        </Panel>
      </div>
    </div>
  );
}
