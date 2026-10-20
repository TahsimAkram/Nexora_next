import { useEffect, useRef, useState } from "react";
import "./Testimonials.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 0,
    quote: "A truly dependable partner with deep technical expertise.",
    highlight: "deep technical expertise.",
    name: "ARVIND RAO",
    role: "Director, HydroGrow",
  },
  {
    id: 1,
    quote:
      "Nexora didn’t just build our product. They understood our business.",
    highlight: "understood our business.",
    name: "ROHIT MEHTA",
    role: "CEO, FreightPro",
  },
  {
    id: 2,
    quote:
      "A genuinely thoughtful team that understands both design and technology.",
    highlight: "design and technology.",
    name: "ANJALI VERMA",
    role: "Product Head, TSL",
  },
  {
    id: 3,
    quote: "They made a complex idea feel simple and intuitive.",
    highlight: "simple and intuitive.",
    name: "NEHA SHARMA",
    role: "Founder, GreenLeaf",
  },
  {
    id: 4,
    quote: "Excellent communication and ownership throughout the project.",
    highlight: "communication and ownership",
    name: "KUNAL DAS",
    role: "Director, BuildKart",
  },
  {
    id: 5,
    quote: "A reliable partner for our digital journey.",
    highlight: "digital journey.",
    name: "SAMEER KHAN",
    role: "Founder, TradeX",
  },
];
export default function Testimonials() {
  const particleCanvasRef = useRef(null);
  const [testimonialCards, setTestimonialCards] = useState(() => [
    {
      id: "testimonial-card-0",
      testimonialIndex: 0,
      position: "left-1",
    },
    {
      id: "testimonial-card-1",
      testimonialIndex: 1,
      position: "active",
    },
    {
      id: "testimonial-card-2",
      testimonialIndex: 2,
      position: "right-1",
    },
    {
      id: "testimonial-card-3",
      testimonialIndex: 3,
      position: "right-2",
    },
    {
      id: "testimonial-card-4",
      testimonialIndex: 4,
      position: "staging",
    },
  ]);

  const nextTestimonialRef = useRef(5 % TESTIMONIALS.length);
  const isAnimatingRef = useRef(false);
  const recycleTimerRef = useRef(null);

  useEffect(() => {
    const section = document.querySelector(".testimonials");

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const intro = section.querySelector(".testimonials__intro");

      const label = section.querySelector(".testimonials__label");
      const eyebrow = section.querySelector(".testimonials__eyebrow");
      const heading = section.querySelector(".testimonials__intro h2");
      const description = section.querySelector(".testimonials__intro p");

      const testimonials = gsap.utils.toArray(".testimonial", section);

      if (reducedMotion) {
        gsap.set([label, eyebrow, heading, description, testimonials], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
        });

        return;
      }

      /* --------------------------------
       Initial state
    -------------------------------- */

      gsap.set(label, {
        opacity: 0,
        y: 25,
      });

      gsap.set(eyebrow, {
        opacity: 0,
        y: 35,
      });

      gsap.set(heading, {
        opacity: 0,
        y: 70,
        filter: "blur(10px)",
      });

      gsap.set(description, {
        opacity: 0,
        y: 30,
      });

      gsap.set(testimonials, {
        opacity: 0,
        y: 55,
        scale: 0.96,
      });

      /* --------------------------------
       Scroll animation
    -------------------------------- */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 20%",
          scrub: 1.8,
        },
      });

      timeline.to(
        label,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0,
      );

      timeline.to(
        eyebrow,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        0.1,
      );

      timeline.to(
        heading,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power3.out",
        },
        0.2,
      );

      timeline.to(
        description,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        0.45,
      );

      timeline.to(
        testimonials,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          stagger: 0.08,
          ease: "power3.out",
        },
        0.25,
      );
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let animationFrame;

    const ambientParticles = [];
    const flowParticles = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    /*
     * ---------------------------------------------------------
     * ATMOSPHERIC PARTICLES
     * ---------------------------------------------------------
     *
     * These particles are distributed across the entire section.
     * They prevent the background from feeling empty.
     */
    const createAmbientParticles = () => {
      ambientParticles.length = 0;

      const count = Math.min(820, Math.max(640, Math.floor(width / 7)));

      for (let i = 0; i < count; i++) {
        ambientParticles.push({
          x: Math.random() * width,

          y: Math.random() * height,

          size: 0.85 + Math.random() * 1.25,

          alpha: 0.11 + Math.random() * 0.5,

          phase: Math.random() * Math.PI * 2,

          drift: 0.00015 + Math.random() * 0.0008,

          vx: (Math.random() - 0.5) * 0.038,

          vy: (Math.random() - 0.5) * 0.028,

          lime: Math.random() > 0.9,

          depth: Math.random(),
        });
      }
    };

    /*
     * ---------------------------------------------------------
     * FLOW CURVE
     * ---------------------------------------------------------
     *
     * This is NOT drawn.
     *
     * It only influences the position of the lower particle
     * stream.
     */
    const getFlowY = (x) => {
      const progress = x / width;

      const primaryWave =
        Math.sin(progress * Math.PI * 2.1 - 0.7) * height * 0.075;

      const secondaryWave =
        Math.sin(progress * Math.PI * 4.3 + 1.1) * height * 0.018;

      return height * 0.72 + primaryWave + secondaryWave;
    };

    /*
     * ---------------------------------------------------------
     * FLOW PARTICLES
     * ---------------------------------------------------------
     *
     * A denser stream near the bottom gives the background
     * a subtle sense of direction.
     */
    const createFlowParticles = () => {
      flowParticles.length = 0;

      const count = Math.min(110, Math.max(70, Math.floor(width / 14)));

      for (let i = 0; i < count; i++) {
        flowParticles.push({
          progress: Math.random(),

          speed: 0.000018 + Math.random() * 0.000035,

          spread: (Math.random() - 0.5) * height * 0.16,

          size: 0.8 + Math.random() * 1.9,

          alpha: 0.16 + Math.random() * 0.35,

          phase: Math.random() * Math.PI * 2,

          lime: Math.random() > 0.84,

          depth: Math.random(),
        });
      }
    };

    const createParticles = () => {
      createAmbientParticles();
      createFlowParticles();
    };

    /*
     * ---------------------------------------------------------
     * DRAW
     * ---------------------------------------------------------
     */
    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      /*
       * =======================================================
       * 1. AMBIENT PARTICLES
       * =======================================================
       */

      ambientParticles.forEach((particle) => {
        /*
         * Very slow horizontal movement.
         */
        particle.x += particle.vx;

        /*
         * Gentle vertical breathing.
         */
        const breathing =
          Math.sin(time * particle.drift + particle.phase) * 0.18;

        particle.y += particle.vy + breathing;

        /*
         * Wrap particles around the screen.
         */
        if (particle.x > width + 5) {
          particle.x = -5;
        }

        if (particle.x < -5) {
          particle.x = width + 5;
        }

        if (particle.y > height + 5) {
          particle.y = -5;
        }

        if (particle.y < -5) {
          particle.y = height + 5;
        }

        /*
         * Subtle breathing opacity.
         */
        const pulse = 0.75 + Math.sin(time * 0.0008 + particle.phase) * 0.25;

        const alpha = particle.alpha * pulse;

        const radius = particle.size * (0.8 + particle.depth * 0.45);

        ctx.beginPath();

        ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);

        ctx.fillStyle = particle.lime
          ? `rgba(190,235,70,${alpha})`
          : `rgba(65,175,200,${alpha})`;

        ctx.fill();

        /*
         * Only some deeper particles receive
         * an extremely subtle glow.
         */
        if (particle.depth > 0.82 && particle.size > 1) {
          ctx.beginPath();

          ctx.arc(particle.x, particle.y, radius * 3, 0, Math.PI * 2);

          ctx.fillStyle = particle.lime
            ? `rgba(190,235,70,${alpha * 0.08})`
            : `rgba(65,175,200,${alpha * 0.06})`;

          ctx.fill();
        }
      });

      /*
       * =======================================================
       * 2. FLOW PARTICLES
       * =======================================================
       */

      flowParticles.forEach((particle) => {
        particle.progress += particle.speed;

        if (particle.progress > 1) {
          particle.progress = 0;
        }

        const x = particle.progress * width;

        const baseY = getFlowY(x);

        /*
         * Organic movement around the flow.
         */
        const breathing = Math.sin(time * 0.00045 + particle.phase) * 3.5;

        const drift = Math.sin(time * 0.00025 + particle.phase * 1.7) * 2;

        const y = baseY + particle.spread + breathing + drift;

        /*
         * Particles around the center of the
         * section become slightly more visible.
         */
        const centerDistance = Math.abs(particle.progress - 0.5);

        const centerInfluence = 1 - Math.min(centerDistance * 1.5, 0.75);

        const pulse = 0.8 + Math.sin(time * 0.001 + particle.phase) * 0.2;

        const alpha = particle.alpha * pulse * (0.75 + centerInfluence * 0.25);

        const radius = particle.size * (0.8 + particle.depth * 0.5);

        ctx.beginPath();

        ctx.arc(x, y, radius, 0, Math.PI * 2);

        ctx.fillStyle = particle.lime
          ? `rgba(190,235,70,${alpha})`
          : `rgba(65,185,210,${alpha})`;

        ctx.fill();

        /*
         * Occasional highlighted particles.
         */
        if (particle.lime && particle.depth > 0.55) {
          ctx.beginPath();

          ctx.arc(x, y, radius * 3.5, 0, Math.PI * 2);

          ctx.fillStyle = `rgba(190,235,70,${alpha * 0.08})`;

          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    /*
     * Initial setup.
     */
    resize();

    window.addEventListener("resize", resize);

    animationFrame = requestAnimationFrame(draw);

    /*
     * Cleanup.
     */
    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const ANIMATION_DURATION = 1350;
    const SLIDE_INTERVAL = 3000;

    const advanceTestimonials = () => {
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;

      /*
       * Physical cards:
       *
       * LEFT      ACTIVE      RIGHT-1      RIGHT-2      STAGING
       *
       * A         B           C            D            E
       *
       * After advancing:
       *
       * EXIT      LEFT        ACTIVE       RIGHT-1      RIGHT-2
       *
       * A         B           C            D            E
       *
       * This is the important part:
       *
       * A never moves from LEFT to RIGHT.
       *
       * A exits the carousel first.
       */

      setTestimonialCards((currentCards) => {
        return currentCards.map((card) => {
          switch (card.position) {
            case "left-1":
              return {
                ...card,
                position: "exit-left",
              };

            case "active":
              return {
                ...card,
                position: "left-1",
              };

            case "right-1":
              return {
                ...card,
                position: "active",
              };

            case "right-2":
              return {
                ...card,
                position: "right-1",
              };

            case "staging":
              return {
                ...card,
                position: "right-2",
              };

            default:
              return card;
          }
        });
      });

      /*
       * Wait until the physical slide has completely finished.
       */
      recycleTimerRef.current = window.setTimeout(() => {
        const newTestimonialIndex = nextTestimonialRef.current;

        nextTestimonialRef.current =
          (nextTestimonialRef.current + 1) % TESTIMONIALS.length;

        /*
         * The card that exited LEFT is now completely
         * outside the visible scene.
         *
         * Reuse that physical DOM card as STAGING.
         *
         * Because STAGING has transition:none,
         * the card cannot visibly travel from LEFT → RIGHT.
         */
        setTestimonialCards((currentCards) => {
          return currentCards.map((card) => {
            if (card.position !== "exit-left") {
              return card;
            }

            return {
              ...card,
              testimonialIndex: newTestimonialIndex,
              position: "staging",
            };
          });
        });

        isAnimatingRef.current = false;
      }, ANIMATION_DURATION);
    };

    const timer = window.setInterval(advanceTestimonials, SLIDE_INTERVAL);

    return () => {
      window.clearInterval(timer);

      if (recycleTimerRef.current) {
        window.clearTimeout(recycleTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="testimonials">
      {/* Background */}
      <div className="testimonials__arc">
        <canvas
          ref={particleCanvasRef}
          className="testimonial-particle-canvas"
        />
      </div>
      {/* Left content */}
      <div className="testimonials__intro">
        <div className="testimonials__label">
          <i />
          <strong>TESTIMONIALS</strong>
        </div>

        <div className="testimonials__eyebrow">
          REAL CLIENTS.
          <br />
          REAL IMPACT.
        </div>

        <h2>
          Stories
          <br />
          that drive
          <br />
          real <span>results.</span>
        </h2>

        <p>
          Long-term partnerships.
          <br />
          Meaningful outcomes.
          <br />
          Here’s what our clients say
          <br />
          about working with Nexora.
        </p>
      </div>

      {/* Testimonial scene */}
      <div className="testimonials__scene">
        <div className="testimonials__arc">
          <canvas
            ref={particleCanvasRef}
            className="testimonial-particle-canvas"
          />
        </div>
        {testimonialCards.map((card) => {
          const testimonial = TESTIMONIALS[card.testimonialIndex];

          return (
            <article
              key={card.id}
              className={`testimonial testimonial--${card.position}`}
            >
              <div className="testimonial__marker">
                <i />
              </div>

              <div className="testimonial__content">
                <div className="testimonial__quote-mark">“</div>

                <p>
                  {testimonial.highlight
                    ? renderHighlightedQuote(testimonial)
                    : testimonial.quote}
                </p>

                <div className="testimonial__author">
                  <i />

                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function renderHighlightedQuote(testimonial) {
  const { quote, highlight } = testimonial;

  if (!highlight) return quote;

  const index = quote.indexOf(highlight);

  if (index === -1) return quote;

  return (
    <>
      {quote.slice(0, index)}
      <span>{highlight}</span>
      {quote.slice(index + highlight.length)}
    </>
  );
}
