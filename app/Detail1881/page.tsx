"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const stamp = {
  recordId: "NP-1881-001",
  eyebrow: "1881 · First issue series",
  title: "Initial postage stamp release",
  tags: ["1881 CE · BS 1938", "Nepal", "First issue series"],
  image: {
    src: "/images/stamps/np-1881-001.jpg",
    alt: "1881 Nepal cover with first issue stamps affixed",
  },
  keyAttributes: [
    "Denominations · 1 Anna, 2 Anna, 4 Anna",
    "White wove paper",
    "Chisa Pani Press · Thapathali, Kathmandu",
    "Imperforate",
    "Sheet of 64 stamps",
    "24 × 21 mm",
  ],
  physicalProperties: [
    { label: "Size", value: "24 × 21 mm" },
    {
      label: "Paper type",
      value:
        "White wove · initial European import, later mixed with native paper",
    },
    { label: "Format", value: "Imperforate, later pin-perforated" },
    { label: "Sheet size", value: "64 stamps per sheet" },
  ],
  printingProduction: [
    { label: "Printer", value: "Chisa Pani Press" },
    { label: "Location", value: "Thapathali, Kathmandu" },
    { label: "Method", value: "Letterpress printing" },
    { label: "Press origin", value: "Imported from UK · 1851 CE" },
  ],
  issuance: [
    { label: "Denominations", value: "1 Anna · 2 Anna · 4 Anna" },
    { label: "Currency system", value: "Anna-based currency" },
    { label: "Release year", value: "1881 CE (BS 1938)" },
    { label: "Era", value: "19th century · Rana period" },
    { label: "Government marking", value: "Gorkha government inscription" },
  ],
  historicalContext: [
    'In 1851 CE (BS 1908), Shree Jung Bahadur Rana, Nepal\u2019s first Rana Prime Minister, imported a printing device known as the "Chisa Pani Press" from the United Kingdom after his travels across Europe.',
    "The press was installed in Thapathali, Kathmandu and later used to print Nepal's first postage stamps using white wove paper imported from Europe.",
    "Initial print runs relied entirely on imported European paper. Later editions used a mix of imported white wove paper and locally produced native wove paper, resulting in variations in print quality ranging from high-quality impressions to poorer impressions.",
    "These stamps were denominated in Anna currency and prominently featured the inscription of the Gorkha Government.",
  ],
  related: [
    {
      id: "1",
      image: "/images/stamps/np-1975-perf-1.jpg",
      condition: "Perforated",
      denomination: "One anna",
      origin: "Nepal · 1975",
    },
    {
      id: "2",
      image: "/images/stamps/np-1975-perf-2.jpg",
      condition: "Perforated",
      denomination: "One anna",
      origin: "Nepal · 1975",
    },
    {
      id: "3",
      image: "/images/stamps/np-1975-perf-3.jpg",
      condition: "Perforated",
      denomination: "One anna",
      origin: "Nepal · 1975",
    },
    {
      id: "4",
      image: "/images/stamps/np-1975-perf-4.jpg",
      condition: "Perforated",
      denomination: "One anna",
      origin: "Nepal · 1975",
    },
    {
      id: "5",
      image: "/images/stamps/np-1975-perf-5.jpg",
      condition: "Perforated",
      denomination: "One anna",
      origin: "Nepal · 1975",
    },
    {
      id: "6",
      image: "/images/stamps/np-1975-perf-6.jpg",
      condition: "Perforated",
      denomination: "One anna",
      origin: "Nepal · 1975",
    },
  ],
};

type SpecRow = { label: string; value: string };
type RelatedStamp = {
  id: string;
  image: string;
  condition: string;
  denomination: string;
  origin: string;
};

// ---------------------------------------------------------------------------
// Local pieces — co-located in this file rather than split out, since this
// page is the only place they're used right now.
// ---------------------------------------------------------------------------

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
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/90 p-6"
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
        className="relative max-h-[85vh] w-full max-w-3xl"
        onClick={(event) => event.stopPropagation()}
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

function ImageViewer({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-brand-border bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        aria-label={`Open full view of ${alt}`}
      >
        <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-brand-surface">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
        </span>
      </button>

      {isOpen && (
        <Lightbox src={src} alt={alt} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

function MetadataRow({ label }: { label: string }) {
  return (
    <li className="px-5 py-3.5 font-body text-sm text-brand-text">{label}</li>
  );
}

function IdentityBlock({
  eyebrow,
  title,
  tags,
  recordId,
  keyAttributes,
}: {
  eyebrow: string;
  title: string;
  tags: string[];
  recordId: string;
  keyAttributes: string[];
}) {
  return (
    <div>
      <p className="flex items-center gap-2 font-meta text-sm uppercase tracking-wide text-brand-accent">
        <span className="h-px w-6 bg-brand-accent" aria-hidden="true" />
        {eyebrow}
      </p>

      <h1 className="mt-3 font-heading text-4xl leading-tight text-brand-text md:text-[2.75rem]">
        {title}
      </h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-brand-border px-3.5 py-1.5 font-meta text-xs text-brand-secondary md:text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <p className="font-meta text-xs uppercase tracking-wide text-brand-secondary font-semibold">
          Key Attributes
        </p>
        <ul className="mt-3 divide-y divide-brand-border rounded-xl border border-brand-border bg-white">
          {keyAttributes.map((attribute) => (
            <MetadataRow key={attribute} label={attribute} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SpecTable({
  title,
  rows,
  className = "",
}: {
  title: string;
  rows: SpecRow[];
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-brand-border bg-white ${className}`}
    >
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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Detail1881() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 font-meta text-sm text-brand-muted"
        >
          <Link href="/" className="hover:text-brand-primary">
            ← Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-brand-text">1881 Collection</span>
        </nav>

        {/* Hero: image + identity */}
        <section className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-14">
          <ImageViewer src={stamp.image.src} alt={stamp.image.alt} />
          <IdentityBlock
            eyebrow={stamp.eyebrow}
            title={stamp.title}
            tags={stamp.tags}
            recordId={stamp.recordId}
            keyAttributes={stamp.keyAttributes}
          />
        </section>
        <hr className="mt-10 border-brand-border" />
        {/* Physical Properties / Printing and production */}
        <section className="mt-18 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <SpecTable
            title="Physical Properties"
            rows={stamp.physicalProperties}
          />
          <SpecTable
            title="Printing and production"
            rows={stamp.printingProduction}
          />
        </section>

        {/* Issuance */}
        <section className="mt-8">
          <SpecTable title="Issuance" rows={stamp.issuance} />
        </section>
        <hr className="mt-18 border-brand-border" />
        {/* Historical Context */}
        <section className="mt-18 ">
          <h2 className="font-heading text-2xl text-brand-text">
            Historical Context
          </h2>
          <div className="mt-4 space-y-4">
            {stamp.historicalContext.map((paragraph, index) => (
              <p
                key={index}
                className="font-body text-sm leading-relaxed text-brand-muted md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
