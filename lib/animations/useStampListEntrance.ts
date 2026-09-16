"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion, skipToEndState } from "./entrance";

export function useStampListEntrance(filterKey: string | number) {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    if (prefersReducedMotion()) {
      skipToEndState(header);
      return;
    }

    gsap.fromTo(
      header,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    );
  }, []);

  useGSAP(
    () => {
      const grid = gridWrapperRef.current;
      if (!grid) return;

      if (prefersReducedMotion()) {
        skipToEndState(grid);
        return;
      }

      gsap.set(grid, { opacity: 0, y: 30 });
      gsap.to(grid, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    },
    {
      dependencies: [filterKey],
      revertOnUpdate: true,
    },
  );

  return { headerRef, gridWrapperRef };
}