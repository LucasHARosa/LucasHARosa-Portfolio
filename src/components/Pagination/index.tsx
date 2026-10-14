import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type Item = number | "ellipsis-start" | "ellipsis-end";

function pageItems(current: number, total: number): Item[] {
  const items: Item[] = [1];
  if (current > 3) items.push("ellipsis-start");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) items.push(i);
  if (current < total - 2) items.push("ellipsis-end");
  if (total > 1) items.push(total);
  return items;
}

const cell = "grid h-11 min-w-11 place-items-center px-3 font-mono text-label transition-colors";

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="Paginação" className="flex items-stretch justify-between border-b border-line">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={cn(cell, "flex gap-2 border-r border-line text-dim hover:text-ink disabled:opacity-40")}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        <span className="max-sm:sr-only">Anterior</span>
      </button>

      <ul className="flex">
        {pageItems(currentPage, totalPages).map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              <button
                type="button"
                onClick={() => handlePageChange(item)}
                aria-current={item === currentPage ? "page" : undefined}
                aria-label={`Página ${item}`}
                className={cn(cell, item === currentPage ? "text-ink" : "text-dim hover:text-ink")}
              >
                {item === currentPage ? `[${item}]` : item}
              </button>
            </li>
          ) : (
            <li key={item} aria-hidden="true" className={cn(cell, "text-dim")}>
              …
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={cn(cell, "flex gap-2 border-l border-line text-dim hover:text-ink disabled:opacity-40")}
      >
        <span className="max-sm:sr-only">Próxima</span>
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
