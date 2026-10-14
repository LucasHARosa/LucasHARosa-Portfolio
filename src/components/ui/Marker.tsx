import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Quadrado de sinal + texto, como o "■ CUSTOMER STORY" da referência. */
export function Marker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2.5 font-mono text-label text-ink", className)}>
      <span aria-hidden="true" className="size-[7px] shrink-0 bg-signal" />
      {children}
    </p>
  );
}
