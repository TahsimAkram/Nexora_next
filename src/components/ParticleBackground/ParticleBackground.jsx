import { useEffect, useRef } from "react";
import "./ParticleBackground.css";

const CONFIG = {
  desktop: {
    count: 90,
    connectionDistance: 125,
    particleSize: 1.5,
    speed: 0.42,
  },

  tablet: {
    count: 60,
    connectionDistance: 105,
    particleSize: 1.35,
    speed: 0.32,
  },

  mobile: {
    count: 35,
    connectionDistance: 85,
    particleSize: 1.2,
    speed: 0.24,
  },
};

const THEMES = {
  default: {
    connection: (opacity) => `rgba(112, 145, 15, ${opacity})`,

    particle: (alpha) => `rgba(132, 177, 0, ${alpha})`,

    glow: "rgba(132, 177, 0, 0.35)",

    shadowBlur: 0,
  },

  // Dark Nexora sections such as OurStory
  story: {
    connection: (opacity) => `rgba(83, 225, 133, ${opacity})`,

    particle: (alpha) => `rgba(126, 245, 47, ${alpha})`,

    glow: "rgba(126, 245, 47, 0.55)",

    shadowBlur: 7,
  },
};

export default function ParticleBackground({ variant = "default" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return undefined;
    }

    // ParticleBackground is expected to be a direct child
    // of the section that owns it.
    const section = container.parentElement;

    if (!section) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return undefined;
    }

    const theme = THEMES[variant] || THEMES.default;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;

    let animationFrame = null;

    let particles = [];

    let config = CONFIG.desktop;

    let mouse = {
      x: null,
      y: null,
    };

    // =========================================================
    // CONFIG
    // =========================================================

    const getConfig = () => {
      if (window.innerWidth <= 640) {
        return CONFIG.mobile;
      }

      if (window.innerWidth <= 1024) {
        return CONFIG.tablet;
      }

      return CONFIG.desktop;
    };

    // =========================================================
    // CREATE PARTICLES
    // =========================================================

    const createParticles = () => {
      config = getConfig();

      particles = Array.from(
        {
          length: config.count,
        },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,

          vx: (Math.random() - 0.5) * config.speed,

          vy: (Math.random() - 0.5) * config.speed,

          radius: Math.random() * 1.1 + config.particleSize,

          alpha: Math.random() * 0.35 + 0.35,
        }),
      );
    };

    // =========================================================
    // RESIZE
    // =========================================================

    const resizeCanvas = () => {
      const bounds = container.getBoundingClientRect();

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = bounds.width;
      height = bounds.height;

      canvas.width = Math.round(width * dpr);

      canvas.height = Math.round(height * dpr);

      canvas.style.width = `${width}px`;

      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();

      draw();
    };

    // =========================================================
    // GEOMETRIC CONNECTIONS
    // =========================================================

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            const opacity = (1 - distance / config.connectionDistance) * 0.17;

            ctx.beginPath();

            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = theme.connection(opacity);

            ctx.lineWidth = 0.7;

            ctx.stroke();
          }
        }
      }
    };

    // =========================================================
    // PARTICLES
    // =========================================================

    const drawParticles = () => {
      particles.forEach((particle) => {
        ctx.beginPath();

        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        ctx.fillStyle = theme.particle(particle.alpha);

        if (theme.shadowBlur > 0) {
          ctx.shadowBlur = theme.shadowBlur;

          ctx.shadowColor = theme.glow;
        }

        ctx.fill();

        // Important: don't let one particle's
        // shadow affect the next particle.
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
      });
    };

    // =========================================================
    // DRAW
    // =========================================================

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      drawConnections();
      drawParticles();
    };

    // =========================================================
    // UPDATE
    // =========================================================

    const updateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around canvas edges.
        if (particle.x < -5) {
          particle.x = width + 5;
        }

        if (particle.x > width + 5) {
          particle.x = -5;
        }

        if (particle.y < -5) {
          particle.y = height + 5;
        }

        if (particle.y > height + 5) {
          particle.y = -5;
        }

        // =====================================================
        // CURSOR REPULSION
        // =====================================================

        if (mouse.x !== null && mouse.y !== null) {
          const dx = particle.x - mouse.x;

          const dy = particle.y - mouse.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          const influenceRadius = 135;

          if (distance > 0 && distance < influenceRadius) {
            const force = (1 - distance / influenceRadius) * 0.035;

            particle.vx += (dx / distance) * force;

            particle.vy += (dy / distance) * force;
          }
        }

        // =====================================================
        // BOUND SPEED
        // =====================================================

        const maxSpeed = config.speed * 2.1;

        particle.vx = Math.max(-maxSpeed, Math.min(maxSpeed, particle.vx));

        particle.vy = Math.max(-maxSpeed, Math.min(maxSpeed, particle.vy));

        particle.vx *= 0.998;
        particle.vy *= 0.998;
      });
    };

    // =========================================================
    // ANIMATION LOOP
    // =========================================================

    const animate = () => {
      updateParticles();
      draw();

      animationFrame = requestAnimationFrame(animate);
    };

    // =========================================================
    // POINTER
    // =========================================================

    const handlePointerMove = (event) => {
      const bounds = container.getBoundingClientRect();

      mouse.x = event.clientX - bounds.left;

      mouse.y = event.clientY - bounds.top;
    };

    const handlePointerLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // =========================================================
    // OBSERVER
    // =========================================================

    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(container);

    section.addEventListener("pointermove", handlePointerMove);

    section.addEventListener("pointerleave", handlePointerLeave);

    window.addEventListener("resize", handleResize);

    // =========================================================
    // INITIALIZE
    // =========================================================

    resizeCanvas();

    if (!reducedMotion) {
      animationFrame = requestAnimationFrame(animate);
    }

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      resizeObserver.disconnect();

      section.removeEventListener("pointermove", handlePointerMove);

      section.removeEventListener("pointerleave", handlePointerLeave);

      window.removeEventListener("resize", handleResize);
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`particle-background particle-background--${variant}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
