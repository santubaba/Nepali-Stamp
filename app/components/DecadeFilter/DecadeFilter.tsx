"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Decade } from "./type";

interface DecadeFilterProps {
  data: Decade[];
  defaultOpen?: string[];
  selectedYear?: number | null;
  onYearSelect?: (year: number) => void;
}

export default function DecadeFilter({
  data,
  defaultOpen = [],
  selectedYear,
  onYearSelect,
}: DecadeFilterProps) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(defaultOpen)
  );

  const toggleGroup = (decade: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(decade)) {
        next.delete(decade);
      } else {
        next.add(decade);
      }
      return next;
    });
  };

  return (
    <aside className="hidden lg:flex flex-col flex-shrink-0 w-48 pr-6 border-r border-brand-border">

      {/* Label */}
      <p className="mb-4 font-meta text-[9px] font-medium uppercase tracking-widest text-brand-muted flex-shrink-0">
        Browse by decade
      </p>

      {/* Scrollable list */}
      <nav
        aria-label="Browse by decade"
        className="overflow-y-auto max-h-[calc(100vh-220px)] pr-1 scrollbar-thin scrollbar-thumb-brand-border scrollbar-track-transparent"
      >
        {data.map((group) => {
          const open = openGroups.has(group.decade);

          return (
            <div key={group.decade} className="mb-1">
              <button
                onClick={() => toggleGroup(group.decade)}
                className="flex items-center w-full gap-2 py-1.5 text-left transition-colors hover:text-brand-primary"
                aria-expanded={open}
              >
                {open
                  ? <ChevronDown  size={14} className="flex-shrink-0 text-brand-muted" />
                  : <ChevronRight size={14} className="flex-shrink-0 text-brand-muted" />
                }
                <span className="text-sm font-medium font-body text-brand-text">
                  {group.decade}
                </span>
              </button>

              {open && (
                <div className="pl-3 ml-2 border-l border-brand-border">
                  {group.years.map((year) => {
                    const active = selectedYear === year.year;
                    return (
                      <button
                        key={year.year}
                        onClick={() => onYearSelect?.(year.year)}
                        className="flex items-center justify-between w-full px-2 py-1.5 mb-1 rounded-md transition-all hover:bg-brand-surface"
                      >
                        <span className={`font-body text-sm ${
                          active
                            ? "text-brand-primary font-medium"
                            : "text-brand-muted"
                        }`}>
                          {year.year}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-meta rounded-md bg-brand-surface text-brand-muted">
                          {year.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}