"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  itemName: string;
  onPageChange: (page: number) => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  itemName,
  onPageChange,
  canGoPrevious,
  canGoNext,
}: PaginationProps) {
  const hasPrevious = canGoPrevious ?? currentPage > 1;
  const hasNext = canGoNext ?? currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <button
        type="button"
        disabled={!hasPrevious}
        onClick={() => onPageChange(currentPage - 1)}
        className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 font-meta text-sm transition-colors
          ${
            hasPrevious
              ? "cursor-pointer border-brand-border bg-white text-brand-muted hover:border-brand-secondary hover:text-brand-text"
              : "cursor-not-allowed border-brand-border bg-brand-surface text-brand-muted/40"
          }`}
      >
        <ChevronLeft size={15} />
        Previous
      </button>

      <span className="font-meta text-sm text-brand-muted">
        {currentPage} of {totalPages} {itemName} · {totalRecords} records
      </span>

      <button
        type="button"
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
        className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 font-meta text-sm transition-colors
          ${
            hasNext
              ? "cursor-pointer border-brand-border bg-white text-brand-muted hover:border-brand-secondary hover:text-brand-text"
              : "cursor-not-allowed border-brand-border bg-brand-surface text-brand-muted/40"
          }`}
      >
        Next
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
