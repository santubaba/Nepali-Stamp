"use client";

import stamps from "../stamps/stamps-fdc/mock-data";
import StampCard from "../components/StampCard/StampCard";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedStamps() {
  const sectionRef = useRef<HTMLElement>(null);

  const featuredStamps = stamps.filter((stamp) => stamp.featured).slice(0, 6);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".featured-heading", {
        opacity: 0,
        y: 25,
        duration: 0.7,
      })
        .from(
          ".featured-description",
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".featured-card",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.25",
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
      className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8"
    >
      <div className="mb-8">
        <h2 className="featured-heading text-2xl font-semibold font-heading text-brand-text sm:text-3xl">
          Featured Stamps
        </h2>

        <p className="featured-description mt-2 text-sm text-brand-muted">
          Discover a selection of notable commemorative stamps from the
          collection.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {featuredStamps.map((stamp) => (
          <div key={stamp.id} className="featured-card">
            <StampCard {...stamp} />
          </div>
        ))}
      </div>
    </section>
  );
}
