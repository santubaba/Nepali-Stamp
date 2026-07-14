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
    new Set(defaultOpen),
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
    <aside className="pr-5 border-r w-72 border-brand-border">
      <h2 className="mb-6 text-3xl font-medium tracking-wide uppercase font-body text-brand-secondary">
        Browse by Decade
      </h2>

      <nav aria-label="Browse by decade">
        {data.map((group) => {
          const open = openGroups.has(group.decade);

          return (
            <div key={group.decade} className="mb-3">
              <button
                onClick={() => toggleGroup(group.decade)}
                className="flex items-center w-full gap-2 py-2 text-left transition-colors hover:text-brand-primary"
              >
                {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}

                <span className="text-2xl font-semibold font-body text-brand-secondary">
                  {group.decade}
                </span>
              </button>

              {open && (
                <div className="pl-4 mt-2 ml-2 border-l border-brand-border">
                  {group.years.map((year) => {
                    const active = selectedYear === year.year;

                    return (
                      <button
                        key={year.year}
                        onClick={() => onYearSelect?.(year.year)}
                        className="flex items-center justify-between w-full px-2 py-1 mb-2 transition-all rounded-md hover:bg-brand-surface"
                      >
                        <span
                          className={`text-xl font-medium ${
                            active ? "text-brand-primary" : "text-brand-text"
                          }`}
                        >
                          {year.year}
                        </span>

                        <span className="px-3 py-1 text-sm font-medium rounded-lg bg-brand-surface text-brand-muted">
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
