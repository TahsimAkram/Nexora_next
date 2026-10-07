import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let lenis = null;

    const stopLenis = () => {
      if (!lenis) return;

      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenis = null;
    };

    const updateLenis = (time) => {
      lenis?.raf(time * 1000);
    };

    const startLenis = () => {
      if (motionPreference.matches || lenis) return;

      lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.1,
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();
    };

    const handleMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        stopLenis();
      } else {
        startLenis();
      }
    };

    startLenis();

    motionPreference.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      motionPreference.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );

      stopLenis();
    };
  }, []);

  return children;
}
