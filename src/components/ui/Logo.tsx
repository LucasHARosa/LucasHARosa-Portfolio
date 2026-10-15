import { cn } from "@/lib/utils";

/**
 * Monograma LR em pixel (o mesmo desenho do favicon). As letras herdam a cor
 * do texto para acompanhar o tema; o marcador usa a cor de sinal.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="1.5 1.5 14 11"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={cn("h-[22px] w-auto", className)}
    >
      <g fill="currentColor">
        <rect x="2" y="4" width="1.6" height="8" />
        <rect x="2" y="10.4" width="4.6" height="1.6" />
        <rect x="8" y="4" width="1.6" height="8" />
        <rect x="8" y="4" width="4.4" height="1.6" />
        <rect x="11.6" y="4" width="1.6" height="4" />
        <rect x="8" y="7.2" width="4.4" height="1.6" />
        <rect x="10.4" y="8.8" width="1.6" height="1.6" />
        <rect x="11.6" y="10.4" width="1.6" height="1.6" />
      </g>
      <rect x="13.6" y="2" width="1.4" height="1.4" fill="var(--signal)" />
    </svg>
  );
}
