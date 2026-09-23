"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BreadCrumb from "@/app/breadcrumbs/page";

// ── Types ──────────────────────────────────────────────
type StampRecord = {
  id: number;
  slug: string;
  title: string;
  eyebrow: string | null;
  image: string | null;
  tags: { color?: string } | null;
  keyAttributes: { denomination?: string; motif?: string } | null;
  physicalProperties: { dimensions?: string; perforation?: string } | null;
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

// ── Lightbox ───────────────────────────────────────────
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full border border-white/30 px-3 py-1.5 font-meta text-sm text-white transition-colors hover:bg-white/10"
        aria-label="Close image view"
      >
        Close ✕
      </button>
      <div
        className="relative max-h-[85vh] w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-brand-surface">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

// ── Denomination Card ──────────────────────────────────
function DenominationCard({ stamp }: { stamp: StampRecord }) {
  const [isOpen, setIsOpen] = useState(false);
  const tags = stamp.tags;
  const keyAttributes = stamp.keyAttributes;
  const physical = stamp.physicalProperties;

  return (
    <>
      <div className="bg-white border border-brand-border rounded-xl overflow-hidden">
        {/* Image — clickable */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative block w-full border-b border-brand-border bg-brand-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          aria-label={`View full image of ${stamp.title}`}
        >
          <div className="relative w-full aspect-[4/5]">
            <Image
              src={stamp.image ?? "/placeholder.jpg"}
              alt={stamp.title}
              fill
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </button>

        {/* Info */}
        <div className="p-3">
          <h4 className="text-sm font-medium font-heading text-brand-text">
            {stamp.title}
          </h4>
          {tags?.color && (
            <p className="mt-1 text-xs font-meta text-brand-primary">
              {tags.color}
            </p>
          )}
          {keyAttributes?.motif && (
            <p className="mt-0.5 text-xs font-meta text-brand-muted line-clamp-2">
              {keyAttributes.motif}
            </p>
          )}
          {physical?.dimensions && (
            <p className="mt-0.5 text-xs font-meta text-brand-muted">
              {physical.dimensions}
            </p>
          )}
        </div>
      </div>

      {isOpen && stamp.image && (
        <Lightbox
          src={stamp.image}
          alt={stamp.title}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// ── Spec Table ─────────────────────────────────────────
function SpecTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-brand-border bg-white">
      <div className="bg-brand-surface px-6 py-4">
        <h2 className="font-heading text-xl text-brand-text">{title}</h2>
      </div>
      <dl className="divide-y divide-brand-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-6 px-6 py-4"
          >
            <dt className="font-body text-sm text-brand-muted">{row.label}</dt>
            <dd className="text-right font-body text-sm font-semibold text-brand-text">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────
export default function IncomeRevenueStamps() {
  const [stamps, setStamps] = useState<StampRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stamps/income-revenue-stamps")
      .then((res) => res.json())
      .then((data) => {
        setStamps(data.stamps ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const firstStamp = stamps[0];
  const printingProduction = firstStamp?.printingProduction;
  const issuance = firstStamp?.issuance;
  const historicalContext = firstStamp?.historicalContext;

  const productionRows = [
    printingProduction?.printer && {
      label: "Printer",
      value: printingProduction.printer,
    },
    printingProduction?.method && {
      label: "Method",
      value: printingProduction.method,
    },
    printingProduction?.paper && {
      label: "Paper",
      value: printingProduction.paper,
    },
  ].filter(Boolean) as { label: string; value: string }[];

  const issuanceRows = [
    issuance?.firstPrinted && {
      label: "First Printed",
      value: issuance.firstPrinted,
    },
    issuance?.issuedIntoCirculation && {
      label: "Issued into Circulation",
      value: issuance.issuedIntoCirculation,
    },
    issuance?.demonetized && {
      label: "Demonetized",
      value: issuance.demonetized,
    },
  ].filter(Boolean) as { label: string; value: string }[];

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg px-4 sm:px-6 lg:px-20">
        <div className="py-6">
          <BreadCrumb />
          <p className="mt-4 text-sm text-brand-muted font-meta">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* ── Page header ─────────────────────────────────── */}
      <div className="px-4 py-6 sm:px-6 lg:px-20">
        <BreadCrumb />
        <div className="mt-3">
          {firstStamp?.eyebrow && (
            <p className="text-xs font-meta text-brand-primary uppercase tracking-widest">
              {firstStamp.eyebrow}
            </p>
          )}
          <h1 className="mt-1 font-heading text-[30px] text-brand-text">
            Income Revenue Stamps
          </h1>
          <p className="text-sm text-brand-secondary font-body">
            Fiscal and revenue stamps from Nepal's administrative history
          </p>
        </div>
        <hr className="mt-4 border-brand-border" />
      </div>

      {/* ── Denomination grid ────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-20">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest font-meta text-brand-secondary">
          Denominations · {stamps.length} issues
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {stamps.map((stamp) => (
            <DenominationCard key={stamp.id} stamp={stamp} />
          ))}
        </div>
      </div>

      {/* ── Spec tables ──────────────────────────────────── */}
      {(productionRows.length > 0 || issuanceRows.length > 0) && (
        <div className="px-4 mt-16 sm:px-6 lg:px-20">
          <hr className="mb-10 border-brand-border" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {productionRows.length > 0 && (
              <SpecTable title="Printing & Production" rows={productionRows} />
            )}
            {issuanceRows.length > 0 && (
              <SpecTable title="Issuance" rows={issuanceRows} />
            )}
          </div>
        </div>
      )}

      {/* ── Historical context ───────────────────────────── */}
      {historicalContext && (
        <div className="px-4 mt-16 mb-16 sm:px-6 lg:px-20">
          <hr className="mb-10 border-brand-border" />
          {Object.entries(historicalContext).map(([key, value]) => {
            const heading = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())
              .trim();

            return (
              <div key={key} className="mb-8">
                <h3 className="mb-3 text-lg font-semibold font-heading text-brand-text">
                  {heading}
                </h3>
                <p className="text-sm leading-7 text-brand-secondary font-body">
                  {value}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
