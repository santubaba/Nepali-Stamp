   import gsap from "gsap";

   /** True if the user has requested reduced motion. Client-only; safe to call anywhere. */
   export function prefersReducedMotion(): boolean {
     if (typeof window === "undefined") return false;
     return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   }

   /** Reduced-motion fallback: jump targets straight to their animated end-state. */
   export function skipToEndState(targets: gsap.TweenTarget) {
     gsap.set(targets, { opacity: 1, y: 0, scale: 1, clearProps: "transform" });
   }