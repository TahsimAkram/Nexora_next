import { useEffect, useRef } from "react";
import { Sparkles, Palette, Code2 } from "lucide-react";
import { gsap } from "gsap";
import "./hero.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import houseImage from "../../../assets/home.png";

export default function Hero() {
  const sectionRef = useRef(null);
  const buildingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // ========================================================
      // INITIAL STATES
      // ========================================================

      gsap.set(".about-eyebrow", {
        opacity: 0,
        x: -30,
      });

      gsap.set(".about-title span", {
        opacity: 0,
        y: 45,
      });

      gsap.set(".about-description", {
        opacity: 0,
        y: 25,
      });

      gsap.set(".about-meta span", {
        opacity: 0,
        y: 15,
      });

      gsap.set(".about-building", {
        opacity: 0,
        y: 45,
        scale: 0.97,
      });

      gsap.set(".about-info-card", {
        opacity: 0,
        y: 25,
      });

      gsap.set(".network-node", {
        opacity: 0,
        scale: 0,
      });

      gsap.set(".about-network line", {
        opacity: 0,
      });

      // ========================================================
      // REDUCED MOTION
      // ========================================================

      if (reducedMotion) {
        gsap.set(
          [
            ".about-eyebrow",
            ".about-title span",
            ".about-description",
            ".about-meta span",
            ".about-building",
            ".about-info-card",
            ".network-node",
            ".about-network line",
          ],
          {
            clearProps: "all",
          },
        );

        return;
      }

      // ========================================================
      // SCROLL-TRIGGERED ENTRANCE
      // ========================================================

      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },

        defaults: {
          ease: "power3.out",
        },
      });

      entrance
        // ------------------------------------------------------
        // Eyebrow
        // ------------------------------------------------------

        .to(".about-eyebrow", {
          opacity: 1,
          x: 0,
          duration: 0.65,
        })

        // ------------------------------------------------------
        // Heading
        // ------------------------------------------------------

        .to(
          ".about-title span",
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
          },
          "-=0.25",
        )

        // ------------------------------------------------------
        // Description
        // ------------------------------------------------------

        .to(
          ".about-description",
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.35",
        )

        // ------------------------------------------------------
        // Metadata
        // ------------------------------------------------------

        .to(
          ".about-meta span",
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.3",
        )

        // ------------------------------------------------------
        // HOUSE
        //
        // Entrance only.
        // It does NOT continuously float.
        // ------------------------------------------------------

        .to(
          ".about-building",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.8",
        )

        // ------------------------------------------------------
        // INFO CARDS
        // ------------------------------------------------------

        .to(
          ".about-info-card",
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.12,
          },
          "-=0.65",
        )

        // ------------------------------------------------------
        // NETWORK LINES
        // ------------------------------------------------------

        .to(
          ".about-network line",
          {
            opacity: 1,
            duration: 0.7,
            stagger: 0.05,
          },
          "-=0.65",
        )

        // ------------------------------------------------------
        // NETWORK NODES
        // ------------------------------------------------------

        .to(
          ".network-node",
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.07,
            ease: "back.out(2)",
          },
          "-=0.55",
        );

      // ========================================================
      // NETWORK SCROLL PARALLAX
      //
      // Only the background network moves.
      // The house remains anchored.
      // ========================================================

      gsap.to(".about-network", {
        yPercent: 7,
        xPercent: -2,

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",

          scrub: 1.3,

          invalidateOnRefresh: true,
        },
      });

      // ========================================================
      // CARDS — TINY SCROLL PARALLAX
      //
      // Cards can have slight depth movement, but the house
      // remains completely stationary.
      // ========================================================

      gsap.to(".strategy-card", {
        y: -10,

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",

          scrub: 1.5,
        },
      });

      gsap.to(".ux-card", {
        y: 8,

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",

          scrub: 1.7,
        },
      });

      gsap.to(".development-card", {
        y: -7,

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",

          scrub: 1.6,
        },
      });

      // ========================================================
      // NETWORK NODE PULSE
      //
      // Idle animation after they appear.
      // ========================================================

      gsap.to(".network-node", {
        scale: 1.35,
        opacity: 0.55,

        duration: 1.7,

        repeat: -1,
        yoyo: true,

        stagger: {
          each: 0.18,
          from: "random",
        },

        ease: "sine.inOut",

        delay: entrance.duration(),
      });

      // ========================================================
      // SMALL MOUSE DEPTH EFFECT FOR CARDS ONLY
      //
      // No house movement.
      // ========================================================

      const handlePointerMove = (event) => {
        if (window.innerWidth < 900) return;

        const rect = section.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;

        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(".strategy-card", {
          x: x * 8,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(".ux-card", {
          x: x * -6,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(".development-card", {
          x: x * 7,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(".about-network", {
          x: x * -10,
          y: y * -6,
          duration: 1.4,
          ease: "power3.out",
        });
      };

      const handlePointerLeave = () => {
        gsap.to([".strategy-card", ".ux-card", ".development-card"], {
          x: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(".about-network", {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      };

      section.addEventListener("pointermove", handlePointerMove);

      section.addEventListener("pointerleave", handlePointerLeave);

      // ========================================================
      // REFRESH
      // ========================================================

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      // ========================================================
      // CLEANUP
      // ========================================================

      return () => {
        section.removeEventListener("pointermove", handlePointerMove);

        section.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-hero">
      {/* =====================================================
          BACKGROUND NETWORK
      ====================================================== */}

      <div className="about-network">
        <svg
          viewBox="0 0 1000 520"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="40" y1="120" x2="280" y2="70" />
          <line x1="280" y1="70" x2="460" y2="150" />
          <line x1="460" y1="150" x2="680" y2="80" />
          <line x1="680" y1="80" x2="900" y2="130" />

          <line x1="180" y1="350" x2="280" y2="70" />
          <line x1="280" y1="70" x2="470" y2="360" />
          <line x1="470" y1="360" x2="680" y2="80" />

          <line x1="470" y1="360" x2="760" y2="320" />
          <line x1="760" y1="320" x2="900" y2="130" />

          <line x1="70" y1="410" x2="470" y2="360" />
        </svg>

        <i className="network-node node-1" />
        <i className="network-node node-2" />
        <i className="network-node node-3" />
        <i className="network-node node-4" />
        <i className="network-node node-5" />
        <i className="network-node node-6" />
        <i className="network-node node-7" />
        <i className="network-node node-8" />
      </div>

      {/* =====================================================
          LEFT CONTENT
      ====================================================== */}

      <div className="about-content">
        <div className="about-eyebrow">
          <span className="eyebrow-line" />

          <span className="eyebrow-label">ABOUT</span>

          <strong>NEXORA</strong>
        </div>

        <h1 className="about-title">
          <span>Driven by ideas.</span>

          <span>
            Built for <em>impact.</em>
          </span>
        </h1>

        <p className="about-description">
          Nexora Digital Solutions is a creative and technology-driven studio
          focused on building digital products that help businesses grow, scale
          and make a real impact.
        </p>

        {/* Bottom-left text exactly as part of the screenshot */}
        <div className="about-meta">
          <span>IDEAS</span>
          <span>PEOPLE</span>
          <span>TECHNOLOGY</span>
          <span>GROWTH</span>
        </div>
      </div>

      {/* =====================================================
          RIGHT VISUAL
      ====================================================== */}

      <div className="about-visual">
        <div ref={buildingRef} className="about-building">
          <img src={houseImage} alt="Nexora digital studio" />
        </div>

        {/* Creative Strategy */}
        <div className="about-info-card strategy-card">
          <div className="info-icon">
            <Sparkles size={17} />
          </div>

          <div>
            <strong>Creative Strategy</strong>
            <span>Ideas that create impact.</span>
          </div>
        </div>

        {/* UI/UX */}
        <div className="about-info-card ux-card">
          <div className="info-icon">
            <Palette size={17} />
          </div>

          <div>
            <strong>UI/UX Design</strong>
            <span>Digital experiences people love.</span>
          </div>
        </div>

        {/* Development */}
        <div className="about-info-card development-card">
          <div className="info-icon">
            <Code2 size={17} />
          </div>

          <div>
            <strong>Development</strong>
            <span>Science. Secure. Future-ready.</span>
          </div>
        </div>

        {/* Right-side typography from screenshot */}
        <div className="visual-caption">
          <span>A CREATIVE</span>
          <span>TECHNOLOGY</span>
          <span>STUDIO</span>
        </div>

        <div className="visual-nexora">NEXORA</div>
      </div>
    </section>
  );
}
