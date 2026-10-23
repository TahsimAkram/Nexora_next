import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBackground from "../../assets/servicesHero.png";
import "./ServicesHero.css";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesHero() {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;

    if (!section || !background) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        background,
        {
          yPercent: 1,
          scale: 1.039,
        },
        {
          yPercent: 4,
          scale: 1.039,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-hero"
      aria-labelledby="services-hero-title"
    >
      <div
        ref={backgroundRef}
        className="services-hero__background"
        style={{ backgroundImage: `url("${heroBackground}")` }}
        aria-hidden="true"
      />

      <div className="services-hero__content">
        <p className="services-hero__eyebrow">
          <span aria-hidden="true" />
          OUR SERVICES
        </p>

        <h1 id="services-hero-title">
          Everything you need to build,
          <br />
          <span>grow and scale online.</span>
        </h1>

        <p className="services-hero__description">
          From digital foundations to customer acquisition, we create end-to-end
          solutions that help your business succeed in a digital world.
        </p>
      </div>
    </section>
  );
}
