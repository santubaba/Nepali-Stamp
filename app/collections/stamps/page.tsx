"use client";
import BreadCrumb from "@/app/breadcrumbs/page";
import SearchBar from "@/app/components/Search/SearchBar";
import StampGrid from "@/app/components/StampGrid/stampgrid";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Stamps() {
  const stamps = [
    {
      id: 1,
      slug: "np-01",
      title: "Blue Heron",
      year: 1985,
      country: "Canada",
      description: "Wildlife Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 2,
      slug: "np-02",
      title: "Cherry Blossom",
      year: 1881,
      country: "Japan",
      description: "Spring Collection",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 3,
      slug: "np-03",
      title: "Golden Temple",
      year: 1955,
      country: "India",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 4,
      slug: "np-04",
      title: "Golden Temple",
      year: 1955,
      country: "India",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 5,
      slug: "np-05",
      title: "Golden Temple",
      year: 1955,
      country: "India",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
    {
      id: 6,
      slug: "np-06",
      title: "Golden Temple",
      year: 1955,
      country: "India",
      description: "Heritage Series",
      img: "/stamps/stamp2.jpg",
    },
  ];

  // Temporary mock data.
  // Later replace this with the API response.
  const decades = [
    {
      decade: "2020-2029",
      years: [
        { year: 2026, count: 7 },
        { year: 2025, count: 8 },
      ],
    },
    {
      decade: "2010-2019",
      years: [],
    },
    {
      decade: "2000-2009",
      years: [],
    },
    {
      decade: "1990-1999",
      years: [],
    },
    {
      decade: "1980-1989",
      years: [],
    },
    {
      decade: "1970-1979",
      years: [],
    },
    {
      decade: "1960-1969",
      years: [],
    },
  ];

  const [openDecades, setOpenDecades] = useState<string[]>(["2020-2029"]);
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const toggleDecade = (decade: string) => {
    setOpenDecades((prev) =>
      prev.includes(decade)
        ? prev.filter((item) => item !== decade)
        : [...prev, decade],
    );
  };

  return (
    <div>
      <div>
        <BreadCrumb />
        <h2 className="text-[30px] font-heading">Stamp Archive</h2>
        <h2 className="text-brand-secondary font-body">
          Postal stationery and envelopes from Nepal (1881–2026)
        </h2>
      </div>

      <div className="border border-t border-brand-border">
        <SearchBar query={query} setQuery={setQuery} />

        {/* Stamp Grid */}
        <div className="flex">
          <div className="border-r border-brand-border h-30">
            <h1 className="mb-4 text-lg font-semibold uppercase font-meta text-brand-secondary">
              Browse By Decade
            </h1>

            <div className="flex gap-2 mb-6">
              <span>Sort</span>

              <div className="px-2 bg-white rounded">
                <select>
                  <option>Latest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>

            {decades.map((item) => {
              const isOpen = openDecades.includes(item.decade);

              return (
                <div key={item.decade} className="relative mb-3">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleDecade(item.decade)}
                  >
                    {isOpen ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )}

                    <span className="font-semibold font-body text-brand-text">
                      {item.decade}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="px-2 mt-2 ml-2 space-y-2 border-l border-brand-primary">
                      {item.years.map((year) => (
                        <div
                          key={year.year}
                          className="flex items-center justify-between"
                        >
                          <span
                            className={`font-body ${
                              year.year === 2026
                                ? "text-brand-primary"
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

          <StampGrid stamps={stamps} />
        </div>
      </div>
    </div>
  );
}
