"use client";
import BreadCrumb from "@/app/breadcrumbs/page";
import SearchBar from "@/app/components/Search/SearchBar";
import StampGrid from "@/app/components/StampGrid/stampgrid";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Pagination from "@/app/components/Pagination/Pagination";

export default function Stamps() {
  const stamps = [
    {
      id: 1,
      slug: "np-01",
      title: "Blue Heron",
      year: 1985,
      country: "Nepal",
      description: "Wildlife Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 2,
      slug: "np-02",
      title: "Test",
      year: 1881,
      country: "Nepal",
      description: "Spring Collection",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 3,
      slug: "np-03",
      title: "Golden ",
      year: 1955,
      country: "Nepal",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 4,
      slug: "np-04",
      title: "Golden Temple1",
      year: 1955,
      country: "Nepal",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 5,
      slug: "np-05",
      title: "Golden Temple2",
      year: 1955,
      country: "Nepal",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 6,
      slug: "np-06",
      title: "Golden Temple3",
      year: 1955,
      country: "Nepal",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
  ];

  const currentYear = new Date().getFullYear();
  const currentDecade = `${Math.floor(currentYear / 10) * 10}-${Math.floor(currentYear / 10) * 10 + 9}`;

  const decades = [
    {
      decade: "2020-2029",
      years: [
        { year: 2026, count: 7 },
        { year: 2025, count: 8 },
      ],
    },
    { decade: "2010-2019", years: [] },
    { decade: "2000-2009", years: [] },
    { decade: "1990-1999", years: [] },
    { decade: "1980-1989", years: [] },
    { decade: "1970-1979", years: [] },
    { decade: "1960-1969", years: [] },
    { decade: "1950-1959", years: [] },
    { decade: "1940-1949", years: [] },
    { decade: "1930-1939", years: [] },
    { decade: "1920-1929", years: [] },
    { decade: "1910-1919", years: [] },
    { decade: "1881-1909", years: [] },
  ];

  const [openDecades, setOpenDecades] = useState<string[]>([currentDecade]);
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStamps = stamps.slice(startIndex, startIndex + itemsPerPage);
  const totalRecords = stamps.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);

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
                          className="flex items-center justify-between"
                        >
                          <span
                            className={`font-body text-sm ${
                              year.year === currentYear
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
                          className="flex items-center justify-between px-1 py-1.5 rounded-md cursor-pointer hover:bg-brand-surface transition-colors"
                        >
                          <span
                            className={`font-body text-sm ${
                              year.year === currentYear
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

        {/* ── RIGHT: Search + sort + grid + pagination ──────── */}
        <div className="w-full lg:flex-1 lg:min-w-0 lg:pl-8">
          {/* Controls row */}
          <div className="flex items-center gap-3 mb-6">
            <SearchBar query={query} setQuery={setQuery} />
            <div className="flex items-center flex-shrink-0 gap-2">
              <span className="hidden text-sm sm:inline font-meta text-brand-secondary">
                Sort
              </span>
              <select className="px-4 py-2 text-sm border rounded cursor-pointer border-brand-border font-meta">
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          {/* Stamp grid */}
          <StampGrid stamps={paginatedStamps} />

          {/* Pagination */}
          <div className="mt-20">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              itemName="Stamps"
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
