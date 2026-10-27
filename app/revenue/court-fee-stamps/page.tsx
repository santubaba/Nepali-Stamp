
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import BreadCrumb from "@/app/breadcrumbs/page";

type StampRecord = {
  id: number;
  slug: string;
  title: string;
  eyebrow: string | null;
  image: string | null;
  tags: { color?: string } | null;
  keyAttributes: {
    denomination?: string;
    motif?: string;
  } | null;
  physicalProperties: {
    dimensions?: string;
    perforation?: string;
  } | null;
  printingProduction: {
    printer?: string;
    method?: string;
    paper?: string;
  } | null;
  issuance: {
    firstPrinted?: string;
    issuedIntoCirculation?: string;
    demonetized?: string;
  } | null;
  historicalContext: Record<string, string> | null;
};

type SpecRow = {
  label: string;
  value: string;
};

type SortOption = "collection" | "title";

const API_URL = "/api/stamps/court-fee-stamps";

const RICH_HTML_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
  "div",
  "span",
  "hr",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
];

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: RICH_HTML_TAGS,
    ALLOWED_ATTR: ["href", "title"],
  });
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseStampResponse(data: unknown): StampRecord[] {
  if (!isObject(data) || !Array.isArray(data.stamps)) {
    throw new Error("The server returned an invalid stamp collection.");
  }

  const valid = data.stamps.every(
    (stamp: unknown) =>
      isObject(stamp) &&
      typeof stamp.id === "number" &&
      typeof stamp.slug === "string" &&
      typeof stamp.title === "string",
  );

  if (!valid) {
    throw new Error("Some stamp records have an invalid data format.");
  }

  return data.stamps as StampRecord[];
}

function cleanSpecValue(value: string): string {
  return value
    .replace(/<\/?strong\b[^>]*>/gi, "")
    .replace(/<\/?b\b[^>]*>/gi, "")
    .replace(/<\/?em\b[^>]*>/gi, "")
    .replace(/<\/?i\b[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function toSpecRows(
  fields: [label: string, value: string | undefined][],
): SpecRow[] {
  return fields.flatMap(([label, value]) => {
    if (typeof value !== "string" || !value.trim()) {
      return [];
    }

    const cleanedValue = cleanSpecValue(value);

    return cleanedValue ? [{ label, value: cleanedValue }] : [];
  });
}

function formatHeading(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/^./, (character) => character.toUpperCase())
    .trim();
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
          {eyebrow}
        </p>
      )}

      <h2 className="text-2xl font-heading text-brand-text sm:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="max-w-2xl mt-2 text-sm leading-6 text-brand-secondary">
          {description}
        </p>
      )}
    </div>
  );
}

function RichContent({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  const sanitizedHtml = useMemo(() => sanitizeHtml(html), [html]);

  return (
    <div
      className={`rich-content text-sm leading-7 text-brand-secondary
        [&_strong]:font-semibold
        [&_em]:italic
        [&_p]:mb-4
        [&_p:last-child]:mb-0
        [&_h2]:mb-3
        [&_h2]:mt-6
        [&_h2]:text-xl
        [&_h2]:font-semibold
        [&_h3]:mb-2
        [&_h3]:mt-5
        [&_h3]:text-lg
        [&_h3]:font-semibold
        [&_h4]:mb-2
        [&_h4]:mt-4
        [&_h4]:font-semibold
        [&_ul]:mb-4
        [&_ul]:list-disc
        [&_ul]:pl-6
        [&_ol]:mb-4
        [&_ol]:list-decimal
        [&_ol]:pl-6
        [&_li]:mb-1
        [&_a]:text-brand-primary
        [&_a]:underline
        [&_blockquote]:my-4
        [&_blockquote]:border-l-2
        [&_blockquote]:border-brand-border
        [&_blockquote]:pl-4
        [&_table]:my-4
        [&_table]:w-full
        [&_td]:border
        [&_td]:border-brand-border
        [&_td]:p-2
        [&_th]:border
        [&_th]:border-brand-border
        [&_th]:p-2
        ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-stamp-dialog] button:not(:disabled)",
        ),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      data-stamp-dialog
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute z-10 inline-flex items-center gap-2 px-4 py-2 text-sm text-white transition border rounded-full right-4 top-4 border-white/30 bg-black/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span aria-hidden="true">✕</span>
        Close
      </button>

      <div
        className="relative flex max-h-[88vh] max-w-[92vw] items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1600}
          sizes="92vw"
          unoptimized
          className="block max-h-[82vh] w-auto max-w-[92vw] rounded-sm object-contain"
        />
      </div>
    </div>
  );
}

/* =========================================================
   STAMP CARD
========================================================= */

function DenominationCard({ stamp }: { stamp: StampRecord }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const color = stamp.tags?.color;
  const motif = stamp.keyAttributes?.motif;
  const denomination = stamp.keyAttributes?.denomination;
  const dimensions = stamp.physicalProperties?.dimensions;

  return (
    <>
      <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-brand-border bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg hover:shadow-black/[0.04]">
        <button
          type="button"
          onClick={() => {
            if (stamp.image) setIsOpen(true);
          }}
          disabled={!stamp.image}
          aria-label={
            stamp.image
              ? `View full image of ${stamp.title}`
              : `No image available for ${stamp.title}`
          }
          className="relative block w-full overflow-hidden border-b border-brand-border bg-brand-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary disabled:cursor-default"
        >
          <div className="flex aspect-[4/3] items-center justify-center p-4 sm:p-5">
            {stamp.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={stamp.image}
                alt={stamp.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-brand-muted">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  className="w-10 h-10 opacity-50"
                >
                  <rect
                    x="8"
                    y="7"
                    width="32"
                    height="34"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10 34L21 24L27 30L32 25L38 32"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>

                <span className="text-[10px] uppercase tracking-[0.15em]">
                  Image unavailable
                </span>
              </div>
            )}
          </div>

          {stamp.image && (
            <span className="absolute flex items-center justify-center w-8 h-8 transition-opacity rounded-full shadow-sm opacity-0 bottom-3 right-3 bg-white/90 text-brand-text group-hover:opacity-100 group-focus-within:opacity-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M15.5 15.5L21 21M10.5 7.5V13.5M7.5 10.5H13.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          )}
        </button>

        <div className="flex flex-col flex-1 p-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {denomination && (
              <span className="rounded-sm bg-brand-surface px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-primary">
                {denomination}
              </span>
            )}

            {color && (
              <span className="text-[10px] uppercase tracking-wider text-brand-muted">
                {color}
              </span>
            )}
          </div>

          <h3 className="text-base leading-snug font-heading text-brand-text">
            {stamp.title}
          </h3>

          {motif && (
            <p className="mt-2 text-xs leading-5 line-clamp-2 text-brand-secondary">
              {motif}
            </p>
          )}

          <div className="pt-4 mt-auto">
            {dimensions && (
              <div className="flex items-center justify-between gap-2 border-t border-brand-border pt-3 text-[10px] text-brand-muted">
                <span>Dimensions</span>
                <span className="text-right">{dimensions}</span>
              </div>
            )}
          </div>
        </div>
      </article>

      {isOpen && stamp.image && (
        <Lightbox
          src={stamp.image}
          alt={stamp.title}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

/* =========================================================
   SPECIFICATION TABLE
========================================================= */

function SpecTable({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: SpecRow[];
}) {
  if (rows.length === 0) return null;

  return (
    <section className="overflow-hidden bg-white border rounded-xl border-brand-border">
      <div className="px-5 py-5 border-b border-brand-border bg-brand-surface sm:px-6">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary">
          Collection details
        </p>
        <h3 className="text-xl font-heading text-brand-text">{title}</h3>
        <p className="mt-1 text-xs text-brand-secondary">{subtitle}</p>
      </div>

      <dl className="px-5 divide-y divide-brand-border sm:px-6">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4 py-4"
          >
            <dt className="text-xs leading-5 text-brand-muted sm:text-sm">
              {row.label}
            </dt>

            <dd className="text-xs font-medium leading-5 text-right break-words text-brand-text sm:text-sm">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function StampGridSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading stamp collection"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden bg-white border rounded-xl border-brand-border"
        >
          <div className="aspect-[4/3] animate-pulse bg-brand-surface" />

          <div className="p-4 space-y-3">
            <div className="w-1/3 h-3 rounded animate-pulse bg-brand-surface" />
            <div className="w-4/5 h-4 rounded animate-pulse bg-brand-surface" />
            <div className="w-full h-3 rounded animate-pulse bg-brand-surface" />
          </div>
        </div>
      ))}

      <span className="sr-only">Loading stamps...</span>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function CourtFeeStamps() {
  const [stamps, setStamps] = useState<StampRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("collection");

  useEffect(() => {
    const controller = new AbortController();

    async function loadStamps() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Unable to load the stamp collection (${response.status}).`,
          );
        }

        const data: unknown = await response.json();
        const records = parseStampResponse(data);

        if (!controller.signal.aborted) {
          setStamps(records);
        }
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while loading the collection.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadStamps();

    return () => controller.abort();
  }, [retryCount]);

  const firstStamp = stamps[0];

  const historicalContext = firstStamp?.historicalContext ?? null;
  const printingProduction = firstStamp?.printingProduction ?? null;
  const issuance = firstStamp?.issuance ?? null;

  const denominationOverview = historicalContext?.denominationOverview;

  const productionRows = useMemo(
    () =>
      toSpecRows([
        ["Printer", printingProduction?.printer],
        ["Printing method", printingProduction?.method],
        ["Paper", printingProduction?.paper],
      ]),
    [printingProduction],
  );

  const issuanceRows = useMemo(
    () =>
      toSpecRows([
        ["First printed", issuance?.firstPrinted],
        ["Issued into circulation", issuance?.issuedIntoCirculation],
        ["Demonetized", issuance?.demonetized],
      ]),
    [issuance],
  );

  const historicalSections = useMemo(
    () =>
      Object.entries(historicalContext ?? {}).filter(
        ([key, value]) =>
          key !== "denominationOverview" &&
          typeof value === "string" &&
          value.trim().length > 0,
      ),
    [historicalContext],
  );

  const filteredStamps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const results = stamps.filter((stamp) => {
      const matchesColor =
        selectedColor === "all" ||
        stamp.tags?.color?.trim() === selectedColor;

      const searchableText = [
        stamp.title,
        stamp.slug,
        stamp.eyebrow,
        stamp.tags?.color,
        stamp.keyAttributes?.denomination,
        stamp.keyAttributes?.motif,
        stamp.physicalProperties?.dimensions,
        stamp.physicalProperties?.perforation,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesColor && (!query || searchableText.includes(query));
    });

    if (sortBy === "title") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [stamps, searchQuery, selectedColor, sortBy]);

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">
      {/* HEADER */}
      <header className="bg-white border-b border-brand-border">
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-12">
          <BreadCrumb />

          <div className="flex flex-col gap-5 mt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {firstStamp?.eyebrow && (
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
                  {firstStamp.eyebrow}
                </p>
              )}

              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-muted">
                Nepal · Fiscal Philately
              </p>

              <h1 className="text-3xl leading-tight font-heading text-brand-text sm:text-4xl lg:text-5xl">
                Court Fee Stamps
              </h1>

              <p className="max-w-2xl mt-3 text-sm leading-6 text-brand-secondary sm:text-base">
                A visual archive of Nepal&apos;s judicial, legal, and
                administrative heritage through court fee stamps.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t shrink-0 border-brand-border sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <div className="flex items-center justify-center border rounded-full h-11 w-11 border-brand-border bg-brand-surface">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-brand-primary"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="3"
                    width="16"
                    height="18"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <rect
                    x="7"
                    y="6"
                    width="10"
                    height="12"
                    rx="0.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M9 9H15M9 12H15M9 15H13"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>

              <div>
                <p className="text-2xl font-heading text-brand-text">
                  {loading ? "—" : stamps.length}
                </p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-brand-muted">
                  Catalogued items
                </p>
              </div>
            </div>
          </div>

          <nav
            aria-label="Page sections"
            className="flex flex-wrap pt-4 border-t mt-7 gap-x-6 gap-y-3 border-brand-border"
          >
            <a
              href="#collection"
              className="text-xs font-medium transition text-brand-secondary hover:text-brand-primary"
            >
              The collection
            </a>
            <a
              href="#historical-context"
              className="text-xs font-medium transition text-brand-secondary hover:text-brand-primary"
            >
              Historical context
            </a>
            <a
              href="#production"
              className="text-xs font-medium transition text-brand-secondary hover:text-brand-primary"
            >
              Printing & issuance
            </a>
          </nav>
        </div>
      </header>

      {/* INTRODUCTORY FEATURE */}
      {!loading && !error && firstStamp && (
        <section className="border-b border-brand-border bg-brand-surface">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:py-12 lg:px-12">
            <div className="max-w-2xl">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                An introduction to the archive
              </p>

              <h2 className="text-2xl leading-snug font-heading text-brand-text sm:text-3xl">
                Documents of a judicial history
              </h2>

              <p className="mt-4 text-sm leading-7 text-brand-secondary">
                Explore Nepal&apos;s court fee stamps through their visual
                designs, inscriptions, denominations, printing characteristics,
                and historical context. Each item offers a glimpse into the
                legal institutions and administrative systems of its time.
              </p>
            </div>

            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute border -inset-3 border-brand-border" />

              <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden border border-brand-border bg-brand-bg p-5 sm:p-8">
                {firstStamp.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={firstStamp.image}
                    alt={`Featured archival stamp: ${firstStamp.title}`}
                    loading="eager"
                    decoding="async"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-xl font-heading text-brand-text">
                      Court Fee Stamps
                    </p>
                    <p className="mt-2 text-xs text-brand-muted">
                      Historical collection
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.15em] text-brand-muted">
                {firstStamp.title}
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        {/* COLLECTION */}
        <section id="collection" className="py-10 scroll-mt-8 sm:py-14">
          {/* DENOMINATION OVERVIEW */}
          {!loading && !error && denominationOverview?.trim() && (
            <section
              aria-labelledby="denomination-overview-heading"
              className="overflow-hidden mb-7"
            >
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_5px]">
                <div className="p-5 sm:p-7 lg:p-8">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                    Collection reference
                  </p>

                  <h3
                    id="denomination-overview-heading"
                    className="text-2xl font-heading text-brand-text sm:text-3xl"
                  >
                    Denomination overview
                  </h3>

                  <div className="max-w-4xl mt-4">
                    <RichContent
                      html={denominationOverview}
                      className="[&_p]:leading-7"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* LOADING */}
          {loading && <StampGridSkeleton />}

          {/* ERROR */}
          {!loading && error && (
            <div
              role="alert"
              className="px-6 py-12 text-center bg-white border rounded-xl border-brand-border"
            >
              <h3 className="text-xl font-heading text-brand-text">
                The collection could not be loaded
              </h3>

              <p className="max-w-lg mx-auto mt-3 text-sm leading-6 text-brand-secondary">
                Something went wrong while retrieving the stamp records. Please
                try again.
              </p>

              <button
                type="button"
                onClick={() => setRetryCount((count) => count + 1)}
                className="px-5 py-3 mt-6 text-sm font-semibold text-white transition rounded-lg bg-brand-primary hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              >
                Try again
              </button>
            </div>
          )}

          {/* EMPTY COLLECTION */}
          {!loading && !error && stamps.length === 0 && (
            <div className="px-6 py-16 text-center bg-white border rounded-xl border-brand-border">
              <h3 className="text-xl font-heading text-brand-text">
                No stamps available yet
              </h3>
              <p className="mt-2 text-sm text-brand-secondary">
                The collection does not currently contain any records.
              </p>
            </div>
          )}

          {/* STAMP GRID */}
          {!loading && !error && stamps.length > 0 && (
            <>
              {filteredStamps.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
                  {filteredStamps.map((stamp) => (
                    <DenominationCard key={stamp.id} stamp={stamp} />
                  ))}
                </div>
              ) : (
                <div className="px-6 py-16 text-center bg-white border rounded-xl border-brand-border">
                  <h3 className="text-xl font-heading text-brand-text">
                    No matching stamps
                  </h3>
                  <p className="mt-2 text-sm text-brand-secondary">
                    Try another search term or remove a filter.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedColor("all");
                    }}
                    className="mt-5 text-sm font-semibold underline text-brand-primary underline-offset-4"
                  >
                    Reset search and filters
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* HISTORICAL CONTEXT */}
        {!loading && !error && historicalSections.length > 0 && (
          <section
            id="historical-context"
            className="py-10 border-t scroll-mt-8 border-brand-border sm:py-14"
          >
            <SectionHeading
              eyebrow="Beyond the artifact"
              title="Historical context"
              description="Understand the institutions, circumstances, and historical significance behind Nepal's court fee stamp collection."
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {historicalSections.map(([key, value], index) => (
                <article
                  key={key}
                  className={`rounded-xl border border-brand-border bg-white p-5 sm:p-7 ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="flex items-center justify-center text-sm border rounded-full h-9 w-9 shrink-0 border-brand-border bg-brand-surface font-heading text-brand-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="pt-1 text-xl font-heading text-brand-text">
                      {formatHeading(key)}
                    </h3>
                  </div>

                  <RichContent
                    html={value}
                    className={index === 0 ? "max-w-4xl" : ""}
                  />
                </article>
              ))}
            </div>
          </section>
        )}

        {/* PRINTING & ISSUANCE */}
        {!loading &&
          !error &&
          (productionRows.length > 0 || issuanceRows.length > 0) && (
            <section
              id="production"
              className="py-10 border-t scroll-mt-8 border-brand-border sm:py-14"
            >
              <SectionHeading
                eyebrow="Technical reference"
                title="Printing & issuance"
                description="Production methods, materials, and issuance information recorded for the court fee stamp collection."
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SpecTable
                  title="Printing & production"
                  subtitle="Materials and manufacturing details"
                  rows={productionRows}
                />

                <SpecTable
                  title="Issuance"
                  subtitle="Dates and circulation history"
                  rows={issuanceRows}
                />
              </div>

              <p className="mt-4 text-xs leading-5 text-brand-muted">
                These details reflect the metadata provided by the current
                collection record.
              </p>
            </section>
          )}
      </div>
    </main>
  );
}
