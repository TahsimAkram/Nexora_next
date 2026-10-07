import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BarChart3,
  Box,
  CheckCircle2,
  Cloud,
  CreditCard,
  Grid2X2,
  Layers3,
  Link2,
  Play,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";

import "./Services.css";

import webAppVisual from "../../assets/webapp.png";
import websiteDevelopmentVisual from "../../assets/website.png";
import ecommerceVisual from "../../assets/ecommerce.png";
import uiUxVisual from "../../assets/ui-ux.png";
import digitalGrowthVisual from "../../assets/seo.png";

/* =========================================================
   SERVICES DATA
   ========================================================= */

const SERVICES = [
  {
    id: 1,
    category: "WEB APPLICATIONS",
    eyebrow: "YOUR WORKSPACE, REIMAGINED",
    title: "Web apps that",
    accentText: "make work flow.",
    color: "#83b900",
    visual: webAppVisual,

    description:
      "We build intuitive, scalable web applications that simplify complex workflows, connect your systems, and help teams work faster.",

    cta: "Explore web apps",

    features: [
      [Settings2, "Custom", "Built for you"],
      [TrendingUp, "Scalable", "Grows with you"],
      [Smartphone, "Responsive", "Any device"],
      [Link2, "API Ready", "Easy integration"],
      [ShieldCheck, "Secure", "Data protection"],
      [Cloud, "Cloud Ready", "Always available"],
    ],
  },

  {
    id: 3,
    category: "E-COMMERCE DEVELOPMENT",
    eyebrow: "THE NEW COLLECTION",
    title: "Digital stores",
    accentText: "built to sell.",
    color: "#f47724",
    visual: ecommerceVisual,

    description:
      "We build smooth e-commerce experiences that make products easy to discover, purchases easy to complete, and businesses easy to manage.",

    cta: "Explore e-commerce",

    features: [
      [ShieldCheck, "Secure", "Safe payments"],
      [Smartphone, "Mobile First", "Shop anywhere"],
      [CreditCard, "Payments", "Multiple options"],
      [Box, "Product Ready", "Easy management"],
      [TrendingUp, "Scalable", "Grow effortlessly"],
      [BarChart3, "Analytics", "Data driven"],
    ],
  },

  {
    id: 2,
    category: "WEBSITE DEVELOPMENT",
    eyebrow: "DESIGNED TO MOVE YOU FORWARD",
    title: "Websites built to",
    accentText: "make an impression.",
    color: "#83b900",
    visual: websiteDevelopmentVisual,

    description:
      "We create fast, responsive websites that communicate your brand clearly, engage visitors, and turn attention into meaningful action.",

    cta: "Explore websites",

    features: [
      [Smartphone, "Responsive", "Any device"],
      [Search, "SEO Ready", "Search friendly"],
      [Zap, "Fast Loading", "Better experience"],
      [Layers3, "CMS Ready", "Easy updates"],
      [UserRound, "Accessible", "Inclusive design"],
      [TrendingUp, "Conversion", "More customers"],
    ],
  },

  {
    id: 4,
    category: "UI/UX DESIGN",
    eyebrow: "INTERFACES DESIGNED AROUND PEOPLE",
    title: "Interfaces designed",
    accentText: "for real experiences.",
    color: "#7447ff",
    visual: uiUxVisual,

    description:
      "We design clear, engaging digital experiences that balance visual quality with usability, helping users understand and navigate with ease.",

    cta: "Explore UI/UX",

    features: [
      [UserRound, "User Focused", "Real needs"],
      [Grid2X2, "Wireframes", "Clear structure"],
      [Play, "Prototypes", "Test early"],
      [Layers3, "Design Systems", "Consistent UI"],
      [Smartphone, "Responsive", "All devices"],
      [CheckCircle2, "Usability", "Better experience"],
    ],
  },

  {
    id: 5,
    category: "DIGITAL GROWTH",
    eyebrow: "DIGITAL EXPERIENCES THAT GROW",
    title: "More visibility.",
    accentText: "More opportunities.",
    color: "#13aaa4",
    visual: digitalGrowthVisual,

    description:
      "We improve your digital presence through SEO, social media, and targeted campaigns that increase visibility, engagement, and opportunities.",

    cta: "Explore digital growth",

    features: [
      [Search, "SEO", "More visibility"],
      [UserRound, "SMO", "Social presence"],
      [BarChart3, "Analytics", "Track performance"],
      [Send, "Campaigns", "Targeted reach"],
      [Layers3, "Content", "Engaging stories"],
      [TrendingUp, "Growth", "Long term results"],
    ],
  },
];

/* =========================================================
   SERVICE VISUAL SWITCH
   ========================================================= */

function ServiceVisual({ service }) {
  if (!service?.visual) return null;

  return (
    <div className="service-visual">
      <img
        src={service.visual}
        alt={service.category}
        className="service-visual__image"
      />
    </div>
  );
}

/* =========================================================
   SERVICE CARD
   ========================================================= */

function ServiceCard({ service, index, cardRef }) {
  return (
    <article
      ref={cardRef}
      className="service-card"
      style={{
        "--service-color": service.color,
        "--card-index": index,
      }}
    >
      <div className="service-card-inner">
        {/* Header */}

        <div className="service-card-header">
          <div className="service-card-meta">
            <span className="service-header-line" />

            <span className="service-category">{service.category}</span>
          </div>
        </div>

        {/* Main */}

        <div className="service-card-content">
          <div className="service-copy">
            <div className="service-eyebrow">{service.eyebrow}</div>

            <h3>
              {service.title}
              <br />

              <span
                className="service-accent"
                style={{
                  color: service.color,
                }}
              >
                {service.accentText}
              </span>
            </h3>

            <p>{service.description}</p>

            {/* <button className="service-cta">
              {service.cta}

              <ArrowRight size={15} />
            </button> */}
          </div>

          <ServiceVisual service={service} />
        </div>

        {/* Features */}

        <div className="service-features">
          {service.features.map(([Icon, title, description]) => (
            <div className="service-feature" key={title}>
              <Icon
                size={19}
                strokeWidth={1.6}
                style={{
                  color: service.color,
                }}
              />

              <div>
                <strong>{title}</strong>
                <span>{description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN SERVICES COMPONENT
   ========================================================= */

export default function Services() {
  const deckRef = useRef(null);

  const cardRefs = useRef([]);

  const activeIndexRef = useRef(0);

  const isAnimating = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  /* =======================================================
     POSITION CALCULATOR
     ======================================================= */

  const getPosition = useCallback((index, active) => {
    let offset = index - active;

    /*
     * Circular arrangement.
     *
     * Example:
     *
     * active = 2
     *
     * 0 -> -2
     * 1 -> -1
     * 2 ->  0
     * 3 -> +1
     * 4 -> +2
     */

    if (offset > 2) {
      offset -= SERVICES.length;
    }

    if (offset < -2) {
      offset += SERVICES.length;
    }

    return offset;
  }, []);

  useEffect(() => {
    const section = document.querySelector(".services-section");

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const intro = section.querySelector(".services-intro");
      const deck = section.querySelector(".service-deck-area");
      const progress = section.querySelector(".services-progress");

      if (reducedMotion) {
        gsap.set([intro, deck, progress], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
        return;
      }

      gsap.set(intro, {
        opacity: 0,
        y: 80,
        filter: "blur(12px)",
      });

      gsap.set(deck, {
        opacity: 0,
        y: 120,
        scale: 0.94,
        filter: "blur(8px)",
      });

      gsap.set(progress, {
        opacity: 0,
        y: 40,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 20%",
          scrub: 1.8,
        },
      });

      timeline.to(
        intro,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
        },
        0,
      );

      timeline.to(
        deck,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
        },
        0.2,
      );

      timeline.to(
        progress,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        0.75,
      );
    }, section);

    return () => context.revert();
  }, []);

  /* =======================================================
     APPLY POSITION
     ======================================================= */

  const setCardPosition = useCallback((card, offset, immediate = false) => {
    if (!card) return;

    let x = 0;
    let scale = 1;
    let rotate = 0;
    let zIndex = 100;
    let dim = 0;

    if (offset === 0) {
      // ACTIVE
      x = 0;
      scale = 1;
      rotate = 0;
      zIndex = 100;
      dim = 0;
    } else if (offset === -1) {
      // PREVIOUS
      x = -350;
      scale = 0.78;
      rotate = -1.5;
      zIndex = 80;
      dim = 0.12;
    } else if (offset === 1) {
      // NEXT
      x = 350;
      scale = 0.78;
      rotate = 1.5;
      zIndex = 80;
      dim = 0.12;
    } else if (offset === -2) {
      // FAR PREVIOUS
      x = -505;
      scale = 0.6;
      rotate = -2;
      zIndex = 50;
      dim = 0.28;
    } else if (offset === 2) {
      // FAR NEXT
      x = 505;
      scale = 0.6;
      rotate = 2;
      zIndex = 50;
      dim = 0.28;
    } else {
      // HIDDEN
      x = offset < 0 ? -650 : 650;
      scale = 0.5;
      rotate = offset < 0 ? -3 : 3;
      zIndex = 0;
      dim = 0.5;
    }

    gsap.set(card, {
      x,
      scale,
      rotate,
      opacity: 1,
      zIndex,

      pointerEvents: Math.abs(offset) <= 2 ? "auto" : "none",

      immediateRender: immediate,
    });
  }, []);

  /* =======================================================
     INITIALIZE
     ======================================================= */

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const offset = getPosition(index, activeIndexRef.current);

      setCardPosition(card, offset, true);
    });
  }, [getPosition, setCardPosition]);

  /* =======================================================
     ANIMATE TO INDEX
     ======================================================= */

  const goTo = useCallback(
    (newIndex) => {
      if (isAnimating.current) return;

      const normalized = (newIndex + SERVICES.length) % SERVICES.length;

      const oldIndex = activeIndexRef.current;

      if (normalized === oldIndex) return;

      isAnimating.current = true;

      // Update active service immediately
      activeIndexRef.current = normalized;
      setActiveIndex(normalized);

      const tl = gsap.timeline({
        defaults: {
          duration: 0.7,
          ease: "power3.inOut",
        },

        onComplete: () => {
          isAnimating.current = false;

          // Make absolutely sure the cards end
          // exactly on their slot positions.
          cardRefs.current.forEach((card, index) => {
            if (!card) return;

            const offset = getPosition(index, normalized);

            setCardPosition(card, offset, true);
          });
        },
      });

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const offset = getPosition(index, normalized);

        let x = 0;
        let scale = 1;
        let rotate = 0;
        let zIndex = 100;

        if (offset === 0) {
          x = 0;
          scale = 1;
          rotate = 0;
          zIndex = 100;
        } else if (offset === -1) {
          x = -350;
          scale = 0.78;
          rotate = -1.5;
          zIndex = 80;
        } else if (offset === 1) {
          x = 350;
          scale = 0.78;
          rotate = 1.5;
          zIndex = 80;
        } else if (offset === -2) {
          x = -505;
          scale = 0.6;
          rotate = -2;
          zIndex = 50;
        } else if (offset === 2) {
          x = 505;
          scale = 0.6;
          rotate = 2;
          zIndex = 50;
        } else {
          x = offset < 0 ? -650 : 650;
          scale = 0.5;
          rotate = offset < 0 ? -3 : 3;
          zIndex = 0;
        }

        gsap.set(card, {
          zIndex,
          pointerEvents: Math.abs(offset) <= 2 ? "auto" : "none",
        });

        tl.to(
          card,
          {
            x,
            scale,
            rotate,
          },
          0,
        );
      });
    },
    [getPosition, setCardPosition],
  );

  /* =======================================================
     NEXT / PREVIOUS
     ======================================================= */

  const next = useCallback(() => {
    goTo(activeIndexRef.current + 1);
  }, [goTo]);

  const previous = useCallback(() => {
    goTo(activeIndexRef.current - 1);
  }, [goTo]);

  /* =======================================================
     WHEEL
     ======================================================= */

  useEffect(() => {
    const deck = deckRef.current;

    if (!deck) return;

    let wheelLocked = false;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();

      if (wheelLocked) return;

      wheelLocked = true;

      if (event.deltaY > 0) {
        next();
      } else {
        previous();
      }

      window.setTimeout(() => {
        wheelLocked = false;
      }, 750);
    };

    deck.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      deck.removeEventListener("wheel", handleWheel);
    };
  }, [next, previous]);

  /* =======================================================
     KEYBOARD
     ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        previous();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [next, previous]);

  /* =======================================================
     RENDER
     ======================================================= */

  const activeService = SERVICES[activeIndex];

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* INTRO */}

        <div className="services-intro">
          <span className="services-label">OUR SERVICES</span>

          <h2>
            Digital Solutions
            <br />
            for a <span>Smarter Tomorrow.</span>
          </h2>

          <div className="intro-line" />
        </div>

        {/* DECK */}

        <div className="service-deck-area" ref={deckRef}>
          <div className="service-deck">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                cardRef={(element) => {
                  cardRefs.current[index] = element;
                }}
              />
            ))}
          </div>
        </div>

        {/* PROGRESS */}

        <div className="services-progress">
          <div className="progress-track">
            {SERVICES.map((service, index) => (
              <button
                key={service.id}
                type="button"
                className={index === activeIndex ? "active" : ""}
                aria-label={`Go to ${service.category}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => goTo(index)}
                style={{
                  "--progress-color": service.color,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
