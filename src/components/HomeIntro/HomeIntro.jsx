import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./HomeIntro.css";
import ParticleBackground from "./ParticleBackground";
import heroTechVisual from "../../assets/home-hero.png";

gsap.registerPlugin(ScrollTrigger);

const headlineWords = ["success.", "growth.", "progress.", "possibility."];

export default function HomeIntro() {
  const sectionRef = useRef(null);
  const visualWrapRef = useRef(null);

  const [headlineWord, setHeadlineWord] = useState(headlineWords[0]);

  // ==========================================================
  // TYPEWRITER
  // ==========================================================

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let wordIndex = 0;
    let charIndex = headlineWords[0].length;
    let phase = "hold";
    let timeoutId;

    const tick = () => {
      if (phase === "hold") {
        phase = "delete";

        timeoutId = window.setTimeout(tick, 1500);

        return;
      }

      if (phase === "delete") {
        charIndex -= 1;

        setHeadlineWord(headlineWords[wordIndex].slice(0, charIndex));

        if (charIndex === 0) {
          wordIndex = (wordIndex + 1) % headlineWords.length;

          phase = "type";

          timeoutId = window.setTimeout(tick, 240);

          return;
        }

        timeoutId = window.setTimeout(tick, 65);

        return;
      }

      charIndex += 1;

      setHeadlineWord(headlineWords[wordIndex].slice(0, charIndex));

      if (charIndex === headlineWords[wordIndex].length) {
        phase = "hold";

        timeoutId = window.setTimeout(tick, 2200);

        return;
      }

      timeoutId = window.setTimeout(tick, 85);
    };

    timeoutId = window.setTimeout(tick, 2200);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // ==========================================================
  // ALL HERO ANIMATIONS
  // ==========================================================

  useEffect(() => {
    const section = sectionRef.current;
    const visualWrap = visualWrapRef.current;

    if (!section || !visualWrap) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      // ======================================================
      // INITIAL ENTRANCE
      // ======================================================

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(".home-intro__kicker", {
          y: 16,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".home-intro__word",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .from(
          ".home-intro__description",
          {
            y: 18,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45",
        )
        .from(
          visualWrap,
          {
            scale: 0.94,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.5",
        );

      // ======================================================
      // SUBTLE "ALIVE" MOVEMENT
      //
      // This affects the visual only by a few pixels.
      // ======================================================

      gsap.to(visualWrap, {
        y: -4,
        rotationZ: 0.15,

        duration: 4.8,

        ease: "sine.inOut",

        repeat: -1,
        yoyo: true,
      });

      // ======================================================
      // SCROLL PARALLAX
      //
      // Tiny movement so it has depth without drifting.
      // ======================================================

      gsap.to(visualWrap, {
        yPercent: 1.5,

        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top top",
          end: "bottom top",

          scrub: 1.4,
        },
      });

      // ======================================================
      // CURSOR TILT
      //
      // Very small 3D response.
      // ======================================================

      const handlePointerMove = (event) => {
        const rect = section.getBoundingClientRect();

        const relativeX = (event.clientX - rect.left) / rect.width;

        const relativeY = (event.clientY - rect.top) / rect.height;

        const rotateY = (relativeX - 0.5) * 2;

        const rotateX = (0.5 - relativeY) * 1.5;

        gsap.to(visualWrap, {
          rotateX,
          rotateY,

          duration: 1.1,

          ease: "power3.out",

          transformPerspective: 1400,

          transformOrigin: "center center",

          overwrite: "auto",
        });
      };

      const handlePointerLeave = () => {
        gsap.to(visualWrap, {
          rotateX: 0,
          rotateY: 0,

          duration: 1.1,

          ease: "power3.out",

          overwrite: "auto",
        });
      };

      section.addEventListener("pointermove", handlePointerMove);

      section.addEventListener("pointerleave", handlePointerLeave);

      // ======================================================
      // CLEANUP
      // ======================================================

      return () => {
        section.removeEventListener("pointermove", handlePointerMove);

        section.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-intro"
      aria-labelledby="home-title"
    >
      {/* ======================================================
          EXISTING GEOMETRIC PARTICLE BACKGROUND
      ======================================================= */}

      <ParticleBackground />

      {/* ======================================================
          HERO CONTENT
      ======================================================= */}

      <div className="home-intro__content">
        {/* ====================================================
            LEFT CONTENT
        ===================================================== */}

        <div className="home-intro__main">
          <p className="home-intro__kicker">Ideas, meet possibility.</p>

          <h1 className="home-intro__title" id="home-title">
            <span className="home-intro__title-line">
              <span className="home-intro__word">Turning</span>
            </span>

            <span className="home-intro__title-line">
              <span className="home-intro__word">ambitions</span>
            </span>

            <span className="home-intro__title-line home-intro__title-line--last">
              <span className="home-intro__word home-intro__word--fixed">
                into
              </span>

              <span
                className="home-intro__word home-intro__word--typing"
                aria-live="off"
              >
                {headlineWord}
              </span>
            </span>
          </h1>

          <p className="home-intro__description">
            We shape thoughtful digital experiences through design, technology,
            and a clear point of view.
          </p>
        </div>

        {/* ====================================================
            TECH VISUAL
        ===================================================== */}

        <div className="home-intro__visual" aria-hidden="true">
          <div ref={visualWrapRef} className="hero-tech-visual-wrap">
            <div className="hero-tech-light-sweep" />

            <img
              className="hero-tech-visual"
              src={heroTechVisual}
              alt=""
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
