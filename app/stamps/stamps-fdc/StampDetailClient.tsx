"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BreadCrumb from "@/app/breadcrumbs/page";
import StampCard from "@/app/components/StampCard/StampCard";
import { prefersReducedMotion, skipToEndState } from "@/lib/animations/entrance";

gsap.registerPlugin(ScrollTrigger);

interface StampDetail {
  id: number;
  slug: string;
  title: string;
  year: number;
  country: string;
  description: string;
  img: string;
  details?: { label: string; value: string }[];
  meta?: { label: string; value: string }[];
}

interface StampDetailClientProps {
  stamp: StampDetail;
  featuredStamps: StampDetail[];
}

export default function StampDetailClient({
  stamp,
  featuredStamps,
}: StampDetailClientProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const secondMetaRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      [
        navRef,
        imageRef,
        headerRef,
        metaRef,
        tableRef,
        descriptionRef,
        secondMetaRef,
        featuredRef,
      ].forEach((ref) => {
        if (ref.current) skipToEndState(ref.current);
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Nav bar — slides down from top
    tl.fromTo(
      navRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4 },
    );

    // Image — slides in from left
    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5 },
      "-=0.1",
    );

    // Content — staggered top to bottom
    tl.fromTo(
      [
        headerRef.current,
        metaRef.current,
        tableRef.current,
        descriptionRef.current,
        secondMetaRef.current,
      ],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
      "-=0.3",
    );

    // Featured stamps — scroll triggered, cards stagger left to right
    if (featuredRef.current) {
      const cards = featuredRef.current.querySelectorAll(".featured-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 85%",
          },
        },
      );
    }
  }, []);

  return (
    <div>
      {/* ── Nav bar ───────────────────────────────────────── */}
      <div
        ref={navRef}
        className="flex items-center gap-3 px-4 py-5 mx-auto sm:px-8 sm:py-6 md:px-12 md:py-8"
      >
        <Link
          href="/stamps/stamps-fdc"
          className="flex items-center justify-center p-1 transition rounded-full shrink-0 text-brand-secondary hover:bg-brand-surface hover:text-brand-primary"
          aria-label="Back to Stamps"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 min-w-0 overflow-hidden">
          <BreadCrumb
            className="
              text-sm md:text-base
              whitespace-nowrap
              [&_a]:text-brand-text/60
              [&_a:hover]:text-brand-text
            "
          />
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="max-w-6xl px-6 py-8 mx-auto">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-16">

          {/* Stamp Image */}
          <div
            ref={imageRef}
            className="flex w-full justify-center lg:w-[430px] lg:flex-shrink-0"
          >
            <div className="flex w-full max-w-[430px] items-center justify-center rounded-xl border border-brand-border bg-white p-6">
              <Image
                src={stamp.img}
                alt={stamp.title}
                width={380}
                height={320}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>

          {/* Stamp Content */}
          <div className="flex w-full max-w-[520px] flex-col gap-5">

            {/* Header */}
            <div ref={headerRef}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-px bg-brand-accent" />
                <h2 className="text-brand-accent">Stamp Record</h2>
              </div>
              <h1 className="font-heading text-[35px] leading-tight text-brand-text">
                {stamp.title}
              </h1>
            </div>

            {/* Meta badges */}
            <div ref={metaRef} className="flex flex-wrap gap-2">
              <div className="px-3 py-1 text-sm border rounded border-brand-border bg-brand-surface text-brand-secondary">
                {stamp.country}
              </div>
              <div className="px-3 py-1 text-sm border rounded border-brand-border bg-brand-surface text-brand-secondary">
                {stamp.year}
              </div>
            </div>

            {/* Info table */}
            <section
              ref={tableRef}
              className="overflow-hidden bg-white border rounded-md border-brand-border"
            >
              {stamp.details?.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-[170px_1fr] border-b border-brand-border last:border-b-0"
                >
                  <div className="px-4 py-2 text-sm bg-brand-surface text-brand-secondary">
                    {label}
                  </div>
                  <div className="px-4 py-2 text-sm text-brand-text">
                    {value}
                  </div>
                </div>
              ))}
            </section>

            {/* Description */}
            <div ref={descriptionRef}>
              <h2 className="mb-2 text-xl font-heading text-brand-secondary">
                Historical Background
              </h2>
              <p className="leading-7 text-brand-secondary">
                {stamp.description}
              </p>
            </div>

            {/* Second meta */}
            <div ref={secondMetaRef} className="flex flex-wrap gap-2">
              {stamp.meta?.map(({ label, value }) => (
                <div
                  key={label}
                  className="px-3 py-1 text-xs border rounded border-brand-border bg-brand-surface text-brand-secondary"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Stamps ───────────────────────────────── */}
      {featuredStamps.length > 0 && (
        <section
          ref={featuredRef}
          className="px-12 py-8 mx-auto mt-16 border-t border-brand-border"
        >
          <h2 className="mb-6 text-xl font-semibold font-heading">
            Featured Stamps
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {featuredStamps.map((featuredStamp) => (
              <div
                key={featuredStamp.id}
                className="featured-card mx-auto w-full max-w-[220px]"
              >
                <StampCard {...featuredStamp} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}