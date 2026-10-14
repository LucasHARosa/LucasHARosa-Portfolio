import type { ReactNode } from "react";

/**
 * A prancha: coluna central limitada por dois trilhos verticais que percorrem
 * a página inteira. Os trilhos se desenham uma vez, no carregamento.
 */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-3 min-h-dvh sm:mx-6 xl:mx-auto xl:max-w-frame">
      <span aria-hidden="true" className="rail left-0" />
      <span aria-hidden="true" className="rail right-0" />
      {children}
    </div>
  );
}
