import { useEffect, useRef } from "react";
import { Sparkles, Palette, Code2 } from "lucide-react";
import { gsap } from "gsap";
import "./hero.css";

// Use your EXISTING house/building image here.
import houseImage from "../../../assets/home.png";

export default function Hero() {
  const sectionRef = useRef(null);
  const buildingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".about-eyebrow", {
        x: -25,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".about-title span",
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.25",
        )
        .from(
          ".about-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
          },
          "-=0.3",
        )
        .from(
          ".about-cta",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.25",
        )
        .from(
          ".about-meta",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2",
        )
        .from(
          buildingRef.current,
          {
            y: 55,
            opacity: 0,
            scale: 0.97,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.9",
        )
        .from(
          ".about-info-card",
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.12,
          },
          "-=0.7",
        )
        .from(
          ".network-node",
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.06,
          },
          "-=0.7",
        );

      gsap.to(".network-node", {
        scale: 1.35,
        opacity: 0.45,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
      });
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
