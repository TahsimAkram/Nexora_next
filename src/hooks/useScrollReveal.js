import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal(
  containerRef,
  {
    selector = "[data-reveal]",
    y = 36,
    duration = 0.85,
    stagger = 0.12,
    start = "top 85%",
  } = {},
) {
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      const elements = gsap.utils.toArray(selector, container);

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            y,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration,
            ease: "power3.out",
            delay: stagger * elements.indexOf(element),
            scrollTrigger: {
              trigger: element,
              start,
              once: true,
            },
          },
        );
      });
    }, container);

    return () => context.revert();
  }, [containerRef, selector, y, duration, stagger, start]);
}
