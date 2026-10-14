import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Chip técnico. "Projeto Real" recebe o marcador de sinal. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  const real = children === "Projeto Real";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-[3px] font-mono text-label leading-none",
        real ? "border-ink text-ink" : "border-line text-dim",
        className,
      )}
    >
      {real && <span aria-hidden="true" className="size-1.5 bg-signal" />}
      {children}
    </span>
  );
}
