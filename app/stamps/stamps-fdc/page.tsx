"use client";
import BreadCrumb from "@/app/breadcrumbs/page";
import StampGrid from "@/app/components/StampGrid/stampgrid";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Pagination from "@/app/components/Pagination/Pagination";
import stamps from "./mock-data";

export default function Stamps() {
  const currentYear = new Date().getFullYear();
  const availableYears = [...new Set(stamps.map((stamp) => stamp.year))].sort(
    (a, b) => a - b,
  );

  const [selectedYear, setSelectedYear] = useState(
    availableYears.includes(currentYear)
      ? currentYear
      : availableYears[availableYears.length - 1],
  );
  const selectedDecade =
    selectedYear >= 1881 && selectedYear <= 1909
      ? "1881-1909"
      : `${Math.floor(selectedYear / 10) * 10}-${Math.floor(selectedYear / 10) * 10 + 9}`;

  const [openDecades, setOpenDecades] = useState<string[]>([selectedDecade]);
  const yearCounts = stamps.reduce(
    (acc, stamp) => {
      acc[stamp.year] = (acc[stamp.year] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  const decades = Object.entries(yearCounts)
    .reduce(
      (acc, [year, count]) => {
        const numericYear = Number(year);

        const decade =
          numericYear >= 1881 && numericYear <= 1909
            ? "1881-1909"
            : `${Math.floor(numericYear / 10) * 10}-${Math.floor(numericYear / 10) * 10 + 9}`;

        let group = acc.find((d) => d.decade === decade);

        if (!group) {
          group = {
            decade,
            years: [],
          };

          acc.push(group);
        }

        group.years.push({
          year: numericYear,
          count,
        });

        return acc;
      },
      [] as { decade: string; years: { year: number; count: number }[] }[],
    )
    .map((decade) => ({
      ...decade,
      years: decade.years.sort((a, b) => b.year - a.year),
    }))
    .sort(
      (a, b) => Number(b.decade.split("-")[0]) - Number(a.decade.split("-")[0]),
    );

  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const itemsPerPage = 3;
  const filteredStamps = stamps.filter((stamp) => stamp.year === selectedYear);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStamps = filteredStamps.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalRecords = filteredStamps.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / itemsPerPage));
  const currentYearIndex = availableYears.indexOf(selectedYear);

  const canGoPrevious = currentPage > 1 || currentYearIndex > 0;

  const canGoNext =
    currentPage < totalPages || currentYearIndex < availableYears.length - 1;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setQuery(q);
    setDebounceQuery(q);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debounceQuery) params.set("q", debounceQuery);
    router.replace(`${pathname}?${params.toString()}`);
  }, [debounceQuery, router, pathname]);

  const toggleDecade = (decade: string) => {
    setOpenDecades((prev) =>
      prev.includes(decade)
        ? prev.filter((item) => item !== decade)
        : [...prev, decade],
    );
  };
  const handlePageChange = (page: number) => {
    // Normal pagination
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      return;
    }

    const currentYearIndex = availableYears.indexOf(selectedYear);

    // Next Year
    if (page > totalPages) {
      const nextYear = availableYears[currentYearIndex + 1];

      if (nextYear !== undefined) {
        setSelectedYear(nextYear);
        const nextDecade =
          nextYear >= 1881 && nextYear <= 1909
            ? "1881-1909"
            : `${Math.floor(nextYear / 10) * 10}-${Math.floor(nextYear / 10) * 10 + 9}`;

        setOpenDecades([nextDecade]);
        setCurrentPage(1);
      }
      return;
    }

    // Previous Year
    if (page < 1) {
      const previousYear = availableYears[currentYearIndex - 1];

      if (previousYear !== undefined) {
        const previousYearRecords = stamps.filter(
          (stamp) => stamp.year === previousYear,
        ).length;

        const previousYearPages = Math.max(
          1,
          Math.ceil(previousYearRecords / itemsPerPage),
        );

        setSelectedYear(previousYear);
        setSelectedYear(previousYear);
        const previousDecade =
          previousYear >= 1881 && previousYear <= 1909
            ? "1881-1909"
            : `${Math.floor(previousYear / 10) * 10}-${Math.floor(previousYear / 10) * 10 + 9}`;

        setOpenDecades([previousDecade]);
        setCurrentPage(previousYearPages);
      }
    }
  };
  return (
    <div className="min-h-screen px-4 bg-brand-bg sm:px-6 lg:px-20">
      {/* ── Page header ───────────────────────────────────── */}
      <div className="py-6">
        <BreadCrumb />
        <h2 className="mt-3 text-[30px] font-heading text-brand-text">
          Stamp Archive
        </h2>
        <p className="text-sm text-brand-secondary font-body">
          Postal stationery and envelopes from Nepal (1881–2026)
        </p>
        <hr className="mt-4 border-brand-border" />
      </div>

      {/* ── Mobile decade toggle — shown below lg only ──────── */}
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-white border rounded-lg border-brand-border font-meta text-brand-muted"
        >
          {sidebarOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          Browse by decade
        </button>

        {sidebarOpen && (
          <div className="p-4 mt-3 overflow-y-auto bg-white border rounded-lg border-brand-border max-h-64">
            {decades.map((item) => {
              const isOpen = openDecades.includes(item.decade);
              return (
                <div key={item.decade} className="mb-3">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleDecade(item.decade)}
                  >
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    <span className="text-sm font-semibold font-body text-brand-text">
                      {item.decade}
                    </span>
                  </div>
                  {isOpen && item.years.length > 0 && (
                    <div className="pl-2 mt-2 ml-4 space-y-2 border-l border-brand-primary">
                      {item.years.map((year) => (
                        <div
                          key={year.year}
                          onClick={() => {
                            setSelectedYear(year.year);
                            setCurrentPage(1);

                            const decade =
                              year.year >= 1881 && year.year <= 1909
                                ? "1881-1909"
                                : `${Math.floor(year.year / 10) * 10}-${Math.floor(year.year / 10) * 10 + 9}`;

                            setOpenDecades([decade]);
                          }}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <span
                            className={`font-body text-sm ${
                              year.year === selectedYear
                                ? "text-brand-primary font-medium"
                                : "text-brand-text"
                            }`}
                          >
                            {year.year}
                          </span>
                          <span className="rounded-md bg-brand-surface px-2 py-0.5 text-xs text-brand-muted">
                            {year.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Main layout ───────────────────────────────────── */}
      <div className="flex gap-0 mb-16">
        {/* ── LEFT: Decade sidebar — hidden below lg ────────── */}
        <div className="flex-shrink-0 hidden pr-6 border-r lg:block w-52 border-brand-border">
          <h1 className="mb-4 text-lg font-semibold uppercase font-meta text-brand-secondary">
            Browse By Decade
          </h1>
          <div className="overflow-y-auto max-h-[calc(100vh-100px)] pr-1">
            {decades.map((item) => {
              const isOpen = openDecades.includes(item.decade);
              return (
                <div key={item.decade} className="relative mb-3">
                  <div
                    className="flex items-center gap-2 cursor-pointer py-1.5 hover:text-brand-primary transition-colors"
                    onClick={() => toggleDecade(item.decade)}
                  >
                    {isOpen ? (
                      <ChevronDown
                        size={14}
                        className="flex-shrink-0 text-brand-muted"
                      />
                    ) : (
                      <ChevronRight
                        size={14}
                        className="flex-shrink-0 text-brand-muted"
                      />
                    )}
                    <span className="text-sm font-semibold font-body text-brand-text">
                      {item.decade}
                    </span>
                  </div>
                  {isOpen && item.years.length > 0 && (
                    <div className="pl-3 mt-1 ml-4 space-y-1 border-l border-brand-border">
                      {item.years.map((year) => (
                        <div
                          key={year.year}
                          onClick={() => {
                            setSelectedYear(year.year);
                            setCurrentPage(1);
                            const decade =
                              year.year >= 1881 && year.year <= 1909
                                ? "1881-1909"
                                : `${Math.floor(year.year / 10) * 10}-${Math.floor(year.year / 10) * 10 + 9}`;

                            setOpenDecades([decade]);
                          }}
                          className="flex items-center justify-between px-1 py-1.5 rounded-md cursor-pointer hover:bg-brand-surface transition-colors"
                        >
                          <span
                            className={`font-body text-sm ${
                              year.year === selectedYear
                                ? "text-brand-primary font-medium"
                                : "text-brand-text"
                            }`}
                          >
                            {year.year}
                          </span>
                          <span className="rounded-md bg-brand-surface px-2 py-0.5 text-xs font-meta text-brand-muted">
                            {year.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: pagination ──────── */}
        <div className="w-full lg:flex-1 lg:min-w-0 lg:pl-8">
          {/* Stamp grid */}
          <StampGrid stamps={paginatedStamps} />

          {/* Pagination */}
          <div className="mt-20">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              itemName="Stamps"
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
