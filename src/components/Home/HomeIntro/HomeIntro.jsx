import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./HomeIntro.css";
import heroBackground from "../../../assets/home-hero-background.png";
import ParticleBackground from "../../ParticleBackground/ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

const headlineWords = ["success.", "growth.", "progress.", "possibility."];

export default function HomeIntro() {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const [headlineWord, setHeadlineWord] = useState(headlineWords[0]);

  // Typewriter headline
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

  // Entrance and background movement
  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;

    if (!section || !background) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
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
          background,
          {
            opacity: 0,
            scale: 1.04,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.7",
        );

      gsap.to(background, {
        yPercent: 3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-intro"
      aria-labelledby="home-title"
    >
      <div
        ref={backgroundRef}
        className="home-intro__background"
        style={{ backgroundImage: `url("${heroBackground}")` }}
        aria-hidden="true"
      />

      <ParticleBackground />

      <div className="home-intro__content">
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
      </div>
    </section>
  );
}
