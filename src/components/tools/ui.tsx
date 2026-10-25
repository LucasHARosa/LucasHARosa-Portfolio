import { Check, Copy } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

/** Rótulo mono acima de um campo. */
export function Label({ children, htmlFor, className }: { children: ReactNode; htmlFor?: string; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-2 block font-mono text-label text-dim uppercase", className)}>
      {children}
    </label>
  );
}

/** Bloco com hairline e título mono — divide as áreas de cada ferramenta. */
export function Panel({
  title,
  aside,
  children,
  className,
}: {
  title?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border border-line bg-bg", className)}>
      {(title || aside) && (
        <div className="dashed-b flex min-h-11 items-center justify-between gap-3 px-4 py-2">
          <p className="font-mono text-label text-dim uppercase">{title}</p>
          {aside}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

/** Copia `value`; mostra o check por um instante. */
export function CopyButton({
  value,
  label = "Copiar",
  message,
  className,
}: {
  value: string;
  label?: string;
  message?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      disabled={!value}
      onClick={async () => setCopied(await copyText(value, message))}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-xs border border-line px-2.5 font-mono text-label text-dim uppercase transition-colors hover:border-ink hover:text-ink disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-3.5",
        className,
      )}
    >
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {copied ? "Copiado" : label}
    </button>
  );
}

/** Grupo de opções exclusivas, no estilo dos filtros do site. */
export function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: readonly { value: T; label: ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-9 rounded-xs border px-3 font-mono text-label uppercase transition-colors",
              active
                ? "border-signal bg-signal text-on-signal"
                : "border-line text-dim hover:border-ink hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/** Checkbox com rótulo. */
export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-[0.9375rem] text-ink select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-(--signal)"
      />
      {label}
    </label>
  );
}

/** Mensagem de erro/aviso das ferramentas. */
export function Notice({ tone = "info", children }: { tone?: "info" | "error"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : undefined}
      className={cn(
        "flex items-start gap-2.5 border px-3 py-2.5 text-[0.875rem] leading-relaxed",
        tone === "error" ? "border-signal text-ink" : "border-line text-dim",
      )}
    >
      <span aria-hidden="true" className={cn("mt-1.5 size-1.5 shrink-0", tone === "error" ? "bg-signal" : "bg-dim")} />
      <span>{children}</span>
    </p>
  );
}
