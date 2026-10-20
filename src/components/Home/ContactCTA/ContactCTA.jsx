import { useEffect, useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactCTA.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA({ onOpenContact }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return undefined;

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let animationFrame;

    const ambientParticles = [];
    const flowParticles = [];

    // --------------------------------
    // Resize
    // --------------------------------

    const resize = () => {
      const rect = section.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    // --------------------------------
    // Ambient particles
    // --------------------------------

    const createAmbientParticles = () => {
      ambientParticles.length = 0;

      const count = Math.min(220, Math.max(120, Math.floor(width / 8)));

      for (let i = 0; i < count; i++) {
        const depth = Math.random();

        ambientParticles.push({
          x: Math.random() * width,

          // Spread through almost the entire section
          y: height * 0.08 + Math.random() * height * 0.82,

          size:
            depth > 0.78
              ? 1.1 + Math.random() * 1.2
              : depth > 0.4
                ? 0.7 + Math.random() * 0.8
                : 0.35 + Math.random() * 0.5,

          alpha:
            depth > 0.78
              ? 0.12 + Math.random() * 0.16
              : depth > 0.4
                ? 0.07 + Math.random() * 0.11
                : 0.035 + Math.random() * 0.07,

          phase: Math.random() * Math.PI * 2,

          drift:
            depth > 0.78
              ? 0.0009 + Math.random() * 0.0006
              : 0.00035 + Math.random() * 0.0005,

          vx:
            depth > 0.78
              ? 0.015 + Math.random() * 0.035
              : 0.005 + Math.random() * 0.025,

          lime: Math.random() > 0.9,

          depth,
        });
      }
    };

    // --------------------------------
    // Invisible flow trajectory
    // Particles follow it, but the line
    // itself is NEVER rendered.
    // --------------------------------

    const getFlowY = (x) => {
      const progress = x / width;

      const primary =
        Math.sin(progress * Math.PI * 1.15 + 0.35) * height * 0.105;

      const secondary =
        Math.sin(progress * Math.PI * 2.4 + 1.2) * height * 0.018;

      return height * 0.86 + primary + secondary;
    };

    // --------------------------------
    // Flow particles
    // --------------------------------

    const createFlowParticles = () => {
      flowParticles.length = 0;

      const count = Math.min(170, Math.max(90, Math.floor(width / 9)));

      for (let i = 0; i < count; i++) {
        const depth = Math.random();

        flowParticles.push({
          progress: Math.random(),

          speed:
            depth > 0.75
              ? 0.000035 + Math.random() * 0.00004
              : 0.000018 + Math.random() * 0.00003,

          spread:
            (Math.random() - 0.5) * height * (0.08 + Math.random() * 0.12),

          size:
            depth > 0.75 ? 0.9 + Math.random() * 1.5 : 0.45 + Math.random() * 1,

          alpha:
            depth > 0.75
              ? 0.12 + Math.random() * 0.2
              : 0.06 + Math.random() * 0.15,

          phase: Math.random() * Math.PI * 2,

          lime: Math.random() > 0.82,

          depth,
        });
      }
    };

    const createParticles = () => {
      createAmbientParticles();
      createFlowParticles();
    };

    // --------------------------------
    // Draw
    // --------------------------------

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      // --------------------------------
      // Ambient field
      // --------------------------------

      ambientParticles.forEach((particle) => {
        particle.x += particle.vx;

        if (particle.x > width + 8) {
          particle.x = -8;
        }

        const breathing =
          Math.sin(time * particle.drift + particle.phase) * 0.6;

        particle.y += breathing * 0.018;

        // Keep particles inside atmosphere
        if (particle.y < height * 0.06) {
          particle.y = height * 0.06;
        }

        if (particle.y > height * 0.91) {
          particle.y = height * 0.91;
        }

        // Vertical density gradient
        const vertical = particle.y / height;

        let density = 1;

        if (vertical < 0.28) {
          density = 0.42;
        } else if (vertical < 0.5) {
          density = 0.68;
        } else if (vertical < 0.7) {
          density = 0.82;
        }

        const pulse = 0.72 + Math.sin(time * 0.0008 + particle.phase) * 0.28;

        const alpha = particle.alpha * pulse * density;

        const radius = particle.size * (0.75 + particle.depth * 0.55);

        ctx.beginPath();

        ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);

        ctx.fillStyle = particle.lime
          ? `rgba(190,235,70,${alpha})`
          : `rgba(55,165,195,${alpha})`;

        ctx.fill();

        // Near-depth particles get a very subtle glow
        if (particle.depth > 0.82 && particle.size > 1) {
          ctx.beginPath();

          ctx.arc(particle.x, particle.y, radius * 3.5, 0, Math.PI * 2);

          ctx.fillStyle = particle.lime
            ? `rgba(190,235,70,${alpha * 0.045})`
            : `rgba(55,175,205,${alpha * 0.035})`;

          ctx.fill();
        }
      });

      // --------------------------------
      // Bottom energy field
      // --------------------------------

      flowParticles.forEach((particle) => {
        particle.progress += particle.speed;

        if (particle.progress > 1) {
          particle.progress = 0;
        }

        const x = particle.progress * width;

        const baseY = getFlowY(x);

        const breathing = Math.sin(time * 0.0005 + particle.phase) * 3;

        const drift = Math.sin(time * 0.0003 + particle.phase * 1.6) * 2;

        const y = baseY + particle.spread + breathing + drift;

        const pulse = 0.72 + Math.sin(time * 0.001 + particle.phase) * 0.28;

        const alpha = particle.alpha * pulse;

        const radius = particle.size * (0.8 + particle.depth * 0.55);

        ctx.beginPath();

        ctx.arc(x, y, radius, 0, Math.PI * 2);

        ctx.fillStyle = particle.lime
          ? `rgba(190,235,70,${alpha})`
          : `rgba(55,175,205,${alpha})`;

        ctx.fill();

        // Near particles
        if (particle.depth > 0.8 && particle.size > 1) {
          ctx.beginPath();

          ctx.arc(x, y, radius * 3, 0, Math.PI * 2);

          ctx.fillStyle = particle.lime
            ? `rgba(190,235,70,${alpha * 0.055})`
            : `rgba(55,175,205,${alpha * 0.04})`;

          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener("resize", resize);

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const eyebrow = section.querySelector(".contact-cta__eyebrow");

      const titleLines = section.querySelectorAll(".contact-cta__title-line");

      const description = section.querySelector(".contact-cta__description");

      const action = section.querySelector(".contact-cta__action");

      const email = section.querySelector(".contact-cta__email");

      const glow = section.querySelector(".contact-cta__glow");

      if (reducedMotion) {
        gsap.set(
          [eyebrow, ...titleLines, description, action, email, glow].filter(
            Boolean,
          ),
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        );

        return;
      }

      // --------------------------------
      // Initial state
      // --------------------------------

      gsap.set(eyebrow, {
        opacity: 0,
        y: 24,
      });

      gsap.set(titleLines, {
        opacity: 0,
        y: 65,
        filter: "blur(10px)",
      });

      gsap.set(description, {
        opacity: 0,
        y: 28,
      });

      gsap.set(action, {
        opacity: 0,
        y: 28,
        scale: 0.96,
      });

      gsap.set(email, {
        opacity: 0,
        y: 22,
      });

      gsap.set(glow, {
        opacity: 0,
        scale: 0.85,
      });

      // --------------------------------
      // Scroll reveal
      // --------------------------------

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "top 25%",
          scrub: 1.8,
        },
      });

      timeline.to(
        glow,
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
        },
        0,
      );

      timeline.to(
        eyebrow,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0.05,
      );

      timeline.to(
        titleLines,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.15,
          stagger: 0.13,
          ease: "power3.out",
        },
        0.1,
      );

      timeline.to(
        description,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.42,
      );

      timeline.to(
        action,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
        },
        0.55,
      );

      timeline.to(
        email,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0.68,
      );
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return undefined;

    const context = gsap.context(() => {
      const glow = section.querySelector(".contact-cta__glow");

      const arrow = section.querySelector(".contact-cta__arrow");

      if (glow) {
        gsap.to(glow, {
          opacity: 0.85,
          scale: 1.035,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (arrow) {
        gsap.to(arrow, {
          x: 2,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact-cta" id="contact-cta">
      <canvas ref={canvasRef} className="contact-cta__particles" />

      <div className="contact-cta__glow" />

      {/* Decorative side lines */}
      <div className="contact-cta__line contact-cta__line--left" />
      <div className="contact-cta__line contact-cta__line--right" />

      <div className="contact-cta__content">
        <div className="contact-cta__eyebrow">
          <span />
          <span>LET'S TURN IDEAS INTO REALITY</span>
          <span />
        </div>

        <h2 className="contact-cta__title">
          <span className="contact-cta__title-line">HAVE A PROJECT</span>

          <span className="contact-cta__title-line contact-cta__title-line--accent">
            IN MIND?
          </span>
        </h2>

        <p className="contact-cta__description">
          We'd love to hear about it. Let's create something remarkable
          together.
        </p>

        <button
          type="button"
          className="contact-cta__action"
          onClick={onOpenContact}
        >
          <span>START A PROJECT</span>

          <span className="contact-cta__arrow">
            <ArrowRight size={19} strokeWidth={1.8} />
          </span>
        </button>

        <a href="mailto:hello@nexoradigital.com" className="contact-cta__email">
          <Mail size={18} strokeWidth={1.5} />
          <span>hello@nexoradigital.com</span>
        </a>
      </div>
    </section>
  );
}
