"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutInfo() {
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      value: "1,400+", // TODO: will implement with db later on.
      label: "Total records",
    },
    {
      value: "10",
      label: "Collection categories",
    },
    {
      value: "1881",
      label: "Earliest documented issue",
    },
    {
      value: "22",
      label: "Metadata fields per record",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      // Left content
      tl.from(".about-eyebrow", {
        opacity: 0,
        y: 15,
        duration: 0.5,
      })
        .from(
          ".about-heading",
          {
            opacity: 0,
            y: 35,
            duration: 0.8,
          },
          "-=0.2",
        )
        .from(
          ".about-copy",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .from(
          ".about-link",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.25",
        )

        // Right-side statistics
        .from(
          ".about-stat",
          {
            opacity: 0,
            y: 25,
            duration: 0.65,
            stagger: 0.08,
          },
          "-=0.2",
        )
        .from(
          ".about-range",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.3",
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",

        onEnter: () => {
          tl.restart();
        },

        onEnterBack: () => {
          tl.restart();
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-brand-secondary)] py-24 px-6 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_1fr]">
        {/* Left content */}
        <div className="text-[var(--color-brand-surface)]">
          <div className="about-eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-brand-accent)]" />

            <p className="font-[var(--font-meta)] text-xs uppercase tracking-[0.2em] text-[var(--color-brand-accent)]">
              About The Archive
            </p>
          </div>

          <h2 className="about-heading mb-8 max-w-xl font-[var(--font-heading)] text-4xl leading-tight lg:text-5xl">
            Nepal&apos;s postal history,
            <br />
            documented in one place
          </h2>

          <div className="max-w-xl space-y-8 font-[var(--font-body)] text-base leading-8 text-white/65">
            <p className="about-copy">
              The Nepal Philatelic Archive is a structured, searchable reference
              database documenting Nepalese postal materials from 1881 to the
              present. Each record is built around a consistent metadata system
              accommodating everything from a single known field to thirty or
              more documented attributes.
            </p>

            <p className="about-copy">
              The archive serves philatelists, historians, researchers, and
              institutions. Records span postage stamps, envelopes, postcards,
              revenue stamps, court-fee stamps, postal money orders,
              commemoratives, service stamps, and other archival materials.
            </p>
          </div>

          <a
            href="/about"
            className="about-link mt-14 inline-block font-[var(--font-meta)] text-sm text-[var(--color-brand-accent)] transition hover:translate-x-1"
          >
            Read the full project history →
          </a>
        </div>

        {/* Right cards */}
        <div className="grid gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {stats.map((item) => (
              <div
                key={item.label}
                className="about-stat rounded-[var(--radius-2xl)]
                border border-white/10
                bg-white/[0.02]
                p-8 backdrop-blur-sm"
              >
                <h3 className="font-[var(--font-heading)] text-5xl text-white">
                  {item.value}
                </h3>

                <p className="mt-2 font-[var(--font-body)] text-sm text-white/50">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div
            className="about-range rounded-[var(--radius-2xl)]
            border border-white/10
            bg-white/[0.02]
            p-8"
          >
            <h3 className="font-[var(--font-heading)] text-5xl text-white">
              BS 1938 – present
            </h3>

            <p className="mt-2 font-[var(--font-body)] text-sm text-white/50">
              Date range covered in Bikram Sambat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
