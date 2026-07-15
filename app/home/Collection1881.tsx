import Image from "next/image";
import Link from "next/link";
import React from "react";

const metadata = [
  { label: "Issued", value: "1881 CE · BS 1938" },
  { label: "Format", value: "Imperforate" },
  { label: "Printer", value: "Chisa Pani Press, Kathmandu" },
  { label: "Denominations", value: "1 Anna · 2 Anna · 4 Anna" },
];

export default function Collection1881() {
  return (
    <section className="w-full bg-brand-bg">
      <div className="grid items-stretch grid-cols-1 gap-12 px-6 py-16 mx-auto max-w-7xl md:px-12 lg:px-20 md:py-24 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Left: cover image */}
        <Image
          src="/stamps/first.jpg"
          alt="1881 Nepal first postal issue — envelope bearing Crown and Crossed Khukuries stamps"
          width={600}
          height={400}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-auto rounded-lg mt-14"
        />

        {/* Right: content */}
        <div className="flex flex-col h-full gap-3">
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="block w-8 h-px bg-brand-accent"
              />
              <span className="text-xs tracking-widest uppercase font-meta text-brand-accent">
                1881 Collection
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-bold leading-tight font-heading md:text-5xl text-brand-text">
              Nepal&rsquo;s first postal issue
            </h2>

            {/* Body copy */}
            <p className="text-base leading-relaxed font-body md:text-lg text-brand-secondary max-w-prose">
              Issued in 1881 using the Chisa Pani Press in Kathmandu,
              Nepal&rsquo;s first postal stamps featured the iconic Crown and
              Crossed Khukuries design and marked the beginning of the
              nation&rsquo;s postal identity. Printed on European white wove
              paper, these imperforate stamps remain among the rarest surviving
              philatelic specimens from the region.
            </p>

            {/* Metadata card */}
            <div className="rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface px-5 py-4">
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                {metadata.map(({ label, value }) => (
                  // key on the Fragment, not on dt/dd individually
                  <React.Fragment key={label}>
                    <dt className="text-sm font-meta text-brand-muted whitespace-nowrap">
                      {label}
                    </dt>
                    <dd className="text-sm font-semibold font-meta text-brand-text">
                      {value}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6 mt-auto">
            <Link
              href="/1881"
              className="inline-flex items-center gap-2 bg-brand-primary text-white font-meta text-sm font-semibold tracking-wide px-6 py-3 rounded-[var(--radius-md)] transition-colors duration-200 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              <span aria-hidden="true">→</span>
              Explore the 1881 collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
