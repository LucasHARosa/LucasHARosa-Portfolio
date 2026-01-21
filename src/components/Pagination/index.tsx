import { CaretLeft, CaretRight } from "phosphor-react";
import {
  PaginationContainer,
  PaginationButton,
  PaginationArrow,
  PaginationEllipsis,
} from "./styles";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(
      <PaginationButton
        key={1}
        isActive={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </PaginationButton>
    );

    // Show ellipsis after first page if needed
    if (showEllipsisStart) {
      pages.push(<PaginationEllipsis key="ellipsis-start">...</PaginationEllipsis>);
    }

    // Show current page and neighbors
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationButton
          key={i}
          isActive={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    // Show ellipsis before last page if needed
    if (showEllipsisEnd) {
      pages.push(<PaginationEllipsis key="ellipsis-end">...</PaginationEllipsis>);
    }

    // Always show last page if there's more than 1 page
    if (totalPages > 1) {
      pages.push(
        <PaginationButton
          key={totalPages}
          isActive={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PaginationButton>
      );
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <PaginationArrow
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <CaretLeft size={16} weight="bold" />
        <span>Anterior</span>
      </PaginationArrow>

      {renderPageNumbers()}

      <PaginationArrow
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span>Próxima</span>
        <CaretRight size={16} weight="bold" />
      </PaginationArrow>
    </PaginationContainer>
  );
}
