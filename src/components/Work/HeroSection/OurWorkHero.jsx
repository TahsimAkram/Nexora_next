import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OurWorkHero.css";
import heroBg from "../../../assets/OurWork-heroBg.png";
import { Target, Layers2, Workflow } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OurWorkHero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      // MASTER SCROLL TIMELINE
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      reveal
        .from(".our-work-intro__eyebrow", {
          y: 25,
          autoAlpha: 0,
          duration: 0.65,
        })
        .from(
          ".our-work-intro__title",
          {
            y: 45,
            autoAlpha: 0,
            duration: 0.85,
          },
          "-=0.3",
        )
        .from(
          ".our-work-intro__description",
          {
            y: 22,
            autoAlpha: 0,
            duration: 0.6,
          },
          "-=0.35",
        )
        .from(
          ".our-work-intro__stat",
          {
            y: 30,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.25",
        );

      // BACKGROUND PARALLAX
      gsap.to(".our-work-intro__background", {
        yPercent: 5,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="our-work-intro" ref={sectionRef}>
      <div
        className="our-work-intro__background"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      <div className="our-work-intro__overlay" aria-hidden="true" />

      <div className="our-work-intro__content">
        <div className="our-work-intro__eyebrow">
          <span className="our-work-intro__eyebrow-line" />
          <span>OUR WORK</span>
        </div>

        <h1 className="our-work-intro__title">
          Ideas
          <br />
          into <span>impact.</span>
        </h1>

        <p className="our-work-intro__description">
          A showcase of digital products we have designed and developed to solve
          real business challenges, streamline operations, and create meaningful
          value.
        </p>

        <div className="our-work-intro__stats">
          <div className="our-work-intro__stat">
            <Target className="our-work-intro__stat-icon" aria-hidden="true" />

            <h3 className="our-work-intro__stat-title">
              Business-focused solutions
            </h3>

            <p className="our-work-intro__stat-description">
              Built around real operational challenges.
            </p>
          </div>

          <div className="our-work-intro__stat">
            <Layers2 className="our-work-intro__stat-icon" aria-hidden="true" />

            <h3 className="our-work-intro__stat-title">
              Design to development
            </h3>

            <p className="our-work-intro__stat-description">
              From user experience to working products.
            </p>
          </div>

          <div className="our-work-intro__stat">
            <Workflow
              className="our-work-intro__stat-icon"
              aria-hidden="true"
            />

            <h3 className="our-work-intro__stat-title">
              Across business domains
            </h3>

            <p className="our-work-intro__stat-description">
              Logistics, e-commerce, agriculture, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWorkHero;
