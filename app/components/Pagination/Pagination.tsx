"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  itemName: string;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  itemName,
  onPageChange,
}: PaginationProps) {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const goPrevious = () => {
    if (hasPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const goNext = () => {
    if (hasNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <button disabled={!hasPrevious} onClick={goPrevious}>
        <ChevronLeft />
        Previous
      </button>

      <span>
        {currentPage} of {totalPages} {itemName} · {totalRecords} records
      </span>

      <button disabled={!hasNext} onClick={goNext}>
        Next
        <ChevronRight />
      </button>
    </div>
  );
}
