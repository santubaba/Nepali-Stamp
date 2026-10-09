"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BreadCrumb from "@/app/breadcrumbs/page";

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
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 z-10 rounded-full border border-white/30 px-3 py-1.5 font-meta text-sm text-white transition-colors hover:bg-white/10"
        aria-label="Close image view"
      >
        Close ✕
      </button>

      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1200}
          className="block max-h-[90vh] w-auto max-w-[90vw] rounded-xl object-contain"
          sizes="90vw"
        />
      </div>
    </div>
  );
}

function DenominationCard({ stamp }: { stamp: StampRecord }) {
  const [isOpen, setIsOpen] = useState(false);

  const tags = stamp.tags;
  const keyAttributes = stamp.keyAttributes;
  const physical = stamp.physicalProperties;

  return (
    <>
      <div className="overflow-hidden bg-white border rounded-xl border-brand-border">
        <button
          type="button"
          onClick={() => {
            if (stamp.image) setIsOpen(true);
          }}
          disabled={!stamp.image}
          className="relative block w-full border-b group border-brand-border bg-brand-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-default"
          aria-label={
            stamp.image
              ? `View full image of ${stamp.title}`
              : `No image available for ${stamp.title}`
          }
        >
          {stamp.image ? (
            <img
              src={stamp.image}
              alt={stamp.title}
              className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full aspect-square bg-brand-surface">
              <span className="text-xs font-meta text-brand-muted">
                No image
              </span>
            </div>
          )}
        </button>

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
            <p className="mt-0.5 line-clamp-2 text-xs font-meta text-brand-muted">
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

function SpecTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden bg-white border rounded-xl border-brand-border">
      <div className="px-6 py-4 bg-brand-surface">
        <h2 className="text-xl font-heading text-brand-text">{title}</h2>
      </div>

      <dl className="divide-y divide-brand-border">
        {rows.map((row, index) => (
          <div
            key={`${row.label}-${index}`}
            className="flex items-center justify-between gap-6 px-6 py-4"
          >
            <dt
              className="text-sm font-body text-brand-muted"
              dangerouslySetInnerHTML={{
                __html: row.label,
              }}
            />

            <dd
              className="text-sm font-semibold text-right font-body text-brand-text"
              dangerouslySetInnerHTML={{
                __html: row.value,
              }}
            />
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function CourtFeeStamps() {
  const [stamps, setStamps] = useState<StampRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stamps/landlord-stamps")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch court fee stamps");
        }

        return res.json();
      })
      .then((data) => {
        setStamps(data.stamps ?? []);
      })
      .catch((error) => {
        console.error("Error fetching court fee stamps:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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
      <div className="min-h-screen px-4 bg-brand-bg sm:px-6 lg:px-20">
        <div className="py-6">
          <BreadCrumb />

          <p className="mt-4 text-sm font-meta text-brand-muted">Loading...</p>
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
            <p className="text-xs tracking-widest uppercase font-meta text-brand-primary">
              {firstStamp.eyebrow}
            </p>
          )}
          <h1 className="mt-1 font-heading text-[30px] text-brand-text">
            LandLord Stamps
          </h1>
          <p className="text-sm font-body text-brand-secondary">
            Land Lord stamps from Nepal&apos;s administrative history
          </p>
        </div>
        <hr className="mt-4 border-brand-border" />
      </div>

      {/* ── Historical context ───────────────────────────── */}
      {historicalContext && Object.keys(historicalContext).length > 0 && (
        <div className="px-4 sm:px-6 lg:px-20">
          {Object.entries(historicalContext)
            .filter(([key]) => key !== "denominationOverview")
            .map(([key, value]) => {
              const heading = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .trim();

              return (
                <div key={key} className="mb-8">
                  <h3 className="mb-3 text-lg font-semibold font-heading text-brand-text">
                    {heading}
                  </h3>
                  <div
                    className="text-sm leading-7 font-body text-brand-secondary
                [&_p]:mb-3
                [&_strong]:font-semibold
                [&_em]:italic
                [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6
                [&_li]:mb-1
                [&_a]:underline"
                    dangerouslySetInnerHTML={{
                      __html: typeof value === "string" ? value : "",
                    }}
                  />
                </div>
              );
            })}
        </div>
      )}

      {/* ── Spec tables ──────────────────────────────────── */}
      {(productionRows.length > 0 || issuanceRows.length > 0) && (
        <div className="px-4 mt-8 sm:px-6 lg:px-20">
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

      {/* ── Denomination Overview + Grid ─────────────────── */}
      <section className="px-4 mb-16 sm:px-6 lg:px-20">
        <hr className="mb-10 border-brand-border" />

        {historicalContext?.denominationOverview && (
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold font-heading text-brand-text">
              Denomination Overview
            </h3>
            <div
              className="text-sm leading-7 font-body text-brand-secondary [&_strong]:font-semibold [&_em]:italic [&_p]:mb-4 [&_p:last-child]:mb-0 [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_a]:text-brand-primary [&_a]:underline"
              dangerouslySetInnerHTML={{
                __html: historicalContext.denominationOverview,
              }}
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {stamps.map((stamp) => (
            <DenominationCard key={stamp.id} stamp={stamp} />
          ))}
        </div>
      </section>
    </div>
  );
}
