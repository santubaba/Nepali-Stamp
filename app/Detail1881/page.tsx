"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    'In 1851 CE (BS 1908), Shree Jung Bahadur Rana, Nepal’s first Rana Prime Minister, imported a printing device known as the "Chisa Pani Press" from the United Kingdom after his travels across Europe.',
    "The press was installed in Thapathali, Kathmandu and later used to print Nepal's first postage stamps using white wove paper imported from Europe.",
    "Initial print runs relied entirely on imported European paper. Later editions used a mix of imported white wove paper and locally produced native wove paper, resulting in variations in print quality ranging from high-quality impressions to poorer impressions.",
    "These stamps were denominated in Anna currency and prominently featured the inscription of the Gorkha Government.",
  ],
};

type SpecRow = {
  label: string;
  value: string;
};

// ---------------------------------------------------------------------------
// Lightbox
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
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/90"
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

// ---------------------------------------------------------------------------
// Image Viewer
// ---------------------------------------------------------------------------

function ImageViewer({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative block w-full p-4 overflow-hidden text-left transition-shadow bg-white border shadow-sm group rounded-2xl border-brand-border hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
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
        <Lightbox
          src={src}
          alt={alt}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

function MetadataRow({ label }: { label: string }) {
  return (
    <li className="px-5 py-3.5 font-body text-sm text-brand-text">
      {label}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Identity Block
// ---------------------------------------------------------------------------

function IdentityBlock({
  eyebrow,
  title,
  tags,
  keyAttributes,
}: {
  eyebrow: string;
  title: string;
  tags: string[];
  keyAttributes: string[];
}) {
  return (
    <div className="detail-identity">
      <p className="flex items-center gap-2 text-sm tracking-wide uppercase detail-eyebrow font-meta text-brand-accent">
        <span
          className="w-6 h-px bg-brand-accent"
          aria-hidden="true"
        />
        {eyebrow}
      </p>

      <h1 className="detail-heading mt-3 font-heading text-4xl leading-tight text-brand-text md:text-[2.75rem]">
        {title}
      </h1>

      <div className="flex flex-wrap gap-2 mt-5 detail-tags">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-brand-border px-3.5 py-1.5 font-meta text-xs text-brand-secondary md:text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 detail-attributes">
        <p className="text-xs font-semibold tracking-wide uppercase font-meta text-brand-secondary">
          Key Attributes
        </p>

        <ul className="mt-3 bg-white border divide-y divide-brand-border rounded-xl border-brand-border">
          {keyAttributes.map((attribute) => (
            <MetadataRow
              key={attribute}
              label={attribute}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Spec Table
// ---------------------------------------------------------------------------

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
      <div className="px-6 py-4 bg-brand-surface">
        <h2 className="text-xl font-heading text-brand-text">
          {title}
        </h2>
      </div>

      <dl className="divide-y divide-brand-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-6 px-6 py-4"
          >
            <dt className="text-sm font-body text-brand-muted">
              {row.label}
            </dt>

            <dd className="text-sm font-semibold text-right font-body text-brand-text">
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
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---------------------------------------------------------------------
      // HERO
      // Runs immediately on page load.
      // ---------------------------------------------------------------------

      const heroTl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTl
        .from(".detail-breadcrumb", {
          opacity: 0,
          y: 15,
          duration: 0.5,
        })
        .from(
          ".detail-image",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.25",
        )
        .from(
          ".detail-eyebrow",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.5",
        )
        .from(
          ".detail-heading",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.3",
        )
        .from(
          ".detail-tags",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.4",
        )
        .from(
          ".detail-attributes",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.3",
        );

      // ---------------------------------------------------------------------
      // PHYSICAL PROPERTIES + PRINTING
      // Plays when this section enters the viewport.
      // Replays when entering again from either direction.
      // ---------------------------------------------------------------------

      const specsTl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      specsTl.from(".detail-specs", {
        opacity: 0,
        y: 30,
        duration: 0.8,
      });

      ScrollTrigger.create({
        trigger: ".detail-specs",
        start: "top 80%",
        onEnter: () => {
          specsTl.restart();
        },
        onEnterBack: () => {
          specsTl.restart();
        },
      });

      // ---------------------------------------------------------------------
      // ISSUANCE
      // ---------------------------------------------------------------------

      const issuanceTl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      issuanceTl.from(".detail-issuance", {
        opacity: 0,
        y: 25,
        duration: 0.7,
      });

      ScrollTrigger.create({
        trigger: ".detail-issuance",
        start: "top 80%",
        onEnter: () => {
          issuanceTl.restart();
        },
        onEnterBack: () => {
          issuanceTl.restart();
        },
      });

      // ---------------------------------------------------------------------
      // HISTORICAL CONTEXT
      // ---------------------------------------------------------------------

      const historyTl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      historyTl
        .from(".detail-history-heading", {
          opacity: 0,
          y: 20,
          duration: 0.6,
        })
        .from(
          ".detail-history-copy",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.3",
        );

      ScrollTrigger.create({
        trigger: ".detail-history",
        start: "top 80%",
        onEnter: () => {
          historyTl.restart();
        },
        onEnterBack: () => {
          historyTl.restart();
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg">
      <main className="max-w-6xl px-6 py-10 mx-auto md:px-10 md:py-14">

        {/* -----------------------------------------------------------------
            Breadcrumb
        ------------------------------------------------------------------ */}

        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-sm detail-breadcrumb font-meta text-brand-muted"
        >
          <Link
            href="/"
            className="hover:text-brand-primary"
          >
            ← Home
          </Link>

          <span className="mx-1.5">/</span>

          <span className="text-brand-text">
            1881 Collection
          </span>
        </nav>

        {/* -----------------------------------------------------------------
            Hero
        ------------------------------------------------------------------ */}

        <section className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-14">
          <div className="detail-image">
            <ImageViewer
              src={stamp.image.src}
              alt={stamp.image.alt}
            />
          </div>

          <IdentityBlock
            eyebrow={stamp.eyebrow}
            title={stamp.title}
            tags={stamp.tags}
            keyAttributes={stamp.keyAttributes}
          />
        </section>

        <hr className="mt-10 border-brand-border" />

        {/* -----------------------------------------------------------------
            Physical Properties / Printing and Production
        ------------------------------------------------------------------ */}

        <section className="grid grid-cols-1 gap-6 mt-16 detail-specs md:grid-cols-2 md:gap-8">
          <SpecTable
            title="Physical Properties"
            rows={stamp.physicalProperties}
          />

          <SpecTable
            title="Printing and production"
            rows={stamp.printingProduction}
          />
        </section>

        {/* -----------------------------------------------------------------
            Issuance
        ------------------------------------------------------------------ */}

        <section className="mt-8 detail-issuance">
          <SpecTable
            title="Issuance"
            rows={stamp.issuance}
          />
        </section>

        <hr className="mt-16 border-brand-border" />

        {/* -----------------------------------------------------------------
            Historical Context
        ------------------------------------------------------------------ */}

        <section className="mt-16 detail-history">
          <h2 className="text-2xl detail-history-heading font-heading text-brand-text">
            Historical Context
          </h2>

          <div className="mt-4 space-y-4">
            {stamp.historicalContext.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed detail-history-copy font-body text-brand-muted md:text-base"
                >
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
