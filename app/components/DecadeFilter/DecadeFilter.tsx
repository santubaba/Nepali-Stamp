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
    // hidden on mobile — lg:block shows it on desktop only
    <aside className="flex-shrink-0 hidden w-48 pr-6 border-r lg:block border-brand-border">

      {/* Section label — matches design system eyebrow style */}
      <p className="mb-4 font-meta text-[9px] font-medium uppercase tracking-widest text-brand-muted">
        Browse by decade
      </p>

      <nav aria-label="Browse by decade">
        {data.map((group) => {
          const open = openGroups.has(group.decade);

          return (
            <div key={group.decade} className="mb-1">
              <button
                onClick={() => toggleGroup(group.decade)}
                className="flex items-center w-full gap-2 py-2 text-left transition-colors hover:text-brand-primary"
                aria-expanded={open}
              >
                {open
                  ? <ChevronDown size={14} className="flex-shrink-0 text-brand-muted" />
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
                          active ? "text-brand-primary font-medium" : "text-brand-muted"
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