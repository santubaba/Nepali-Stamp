"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch, IconX } from "@tabler/icons-react";

type SearchResult = {
  id: number;
  title: string;
  slug: string;
  eyebrow: string | null;
  image: string | null;
  categoryName: string;
  categorySlug: string;
  route: string;
};

type SearchBarProps = {
  onResultSelect?: () => void;
};

export default function SearchBar({ onResultSelect }: SearchBarProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const selectResult = (result: SearchResult) => {
    setIsOpen(false);
    setActiveIndex(-1);
    onResultSelect?.();
    router.push(result.route);
  };

  // Debounced search
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setIsLoading(false);
      setError(false);
      setActiveIndex(-1);
      return;
    }

    let cancelled = false;

    setIsLoading(true);
    setError(false);

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmedQuery)}`,
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data: { results: SearchResult[] } = await response.json();

        if (!cancelled) {
          setResults(data.results ?? []);
          setActiveIndex(-1);
        }
      } catch {
        if (!cancelled) {
          setResults([]);
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        containerRef.current &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search input */}
      <div className="flex h-11 w-full items-center rounded-lg border border-brand-border bg-brand-surface px-3">
        <IconSearch size={16} className="shrink-0 text-brand-muted" />

        <input
          type="text"
          value={query}
          onChange={(e) => {
            const nextQuery = e.target.value;

            setQuery(nextQuery);
            setActiveIndex(-1);
            setIsOpen(true);
            setError(false);

            // Show loading immediately, before the debounce finishes.
            if (nextQuery.trim().length >= 2) {
              setIsLoading(true);
            } else {
              setIsLoading(false);
              setResults([]);
            }
          }}
          onFocus={() => {
            if (query.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && results.length > 0) {
              e.preventDefault();
              setIsOpen(true);
              setActiveIndex((current) =>
                current >= results.length - 1 ? 0 : current + 1,
              );
            } else if (e.key === "ArrowUp" && results.length > 0) {
              e.preventDefault();
              setIsOpen(true);
              setActiveIndex((current) =>
                current <= 0 ? results.length - 1 : current - 1,
              );
            } else if (e.key === "Enter") {
              const selected = results[activeIndex];

              if (isOpen && selected && !isLoading) {
                e.preventDefault();
                selectResult(selected);
              }
            } else if (e.key === "Escape") {
              e.preventDefault();
              setIsOpen(false);
              setActiveIndex(-1);
              e.currentTarget.blur();
            }
          }}
          placeholder="Search stamps..."
          autoComplete="off"
          aria-label="Search stamps"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="stamp-search-results"
          className="min-w-0 flex-1 bg-transparent px-2 text-sm text-brand-text outline-none placeholder:text-brand-muted"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setActiveIndex(-1);
              setIsOpen(false);
              setIsLoading(false);
              setError(false);
            }}
            aria-label="Clear search"
            className="shrink-0 text-brand-muted hover:text-brand-text"
          >
            <IconX size={15} />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && query.trim().length >= 2 && (
        <div
          id="stamp-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-brand-border bg-brand-bg py-2 shadow-lg"
        >
          {isLoading && (
            <p className="px-4 py-3 text-sm text-brand-muted">
              Searching stamps...
            </p>
          )}

          {!isLoading && error && (
            <p className="px-4 py-3 text-sm text-red-600">
              Search failed. Please try again.
            </p>
          )}

          {!isLoading && !error && results.length === 0 && (
            <p className="px-4 py-3 text-sm text-brand-muted">
              No stamps found.
            </p>
          )}

          {!isLoading &&
            !error &&
            results.map((result, index) => (
              <button
                key={result.id}
                id={`stamp-search-option-${index}`}
                type="button"
                role="option"
                aria-selected={activeIndex === index}
                onClick={() => selectResult(result)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                  activeIndex === index
                    ? "bg-brand-surface"
                    : "hover:bg-brand-surface"
                }`}
              >
                {result.image ? (
                  <img
                    src={result.image}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-md border border-brand-border object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 shrink-0 rounded-md bg-brand-surface" />
                )}

                <div className="flex min-w-0 flex-col items-start gap-1">
                  <p className="w-full truncate text-sm font-semibold text-brand-text">
                    {result.title}
                  </p>

                  <p className="w-full truncate text-xs text-brand-primary">
                    {result.categoryName}
                  </p>

                  {result.eyebrow && (
                    <p className="w-full truncate text-xs text-brand-muted">
                      {result.eyebrow}
                    </p>
                  )}
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
