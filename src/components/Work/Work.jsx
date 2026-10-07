import "./Work.css";
import { useEffect, useRef } from "react";

import traftVisual from "../../assets/Traft.png";
import smileBeautyVisual from "../../assets/smile.png";
import hydroponicVisual from "../../assets/hydroponic.png";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import {
  SiReact,
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiNodedotjs,
  SiMongodb,
} from "react-icons/si";

const PROJECTS = [
  {
    id: 1,
    number: "01",
    category: "FREIGHT MANAGEMENT PLATFORM",
    title: "FreightPro",
    tagline: "Move Smarter. Deliver Faster.",
    description:
      "A modern freight management platform built to simplify shipment tracking, streamline logistics operations, and give businesses real-time visibility across their supply chain.",
    technologies: [
      { name: "React", icon: SiReact },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
    image: traftVisual,
    className: "work-project--traft",
  },
  {
    id: 2,
    number: "02",
    category: "E-COMMERCE PLATFORM",
    title: "Smile Beauty",
    tagline: "Beauty for Every You.",
    description:
      "A modern e-commerce experience designed to make beauty products easier to discover, explore and purchase.",
    technologies: [
      { name: "React", icon: SiReact },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "MySQL", icon: SiMysql },
    ],
    image: smileBeautyVisual,
    className: "work-project--beauty",
  },
  {
    id: 3,
    number: "03",
    category: "AGRITECH SOLUTION",
    title: "Hydroponic Farm",
    tagline: "Grow Fresh. Grow Better.",
    description:
      "A digital platform to monitor and manage hydroponic farming operations with real-time insights and automation.",
    technologies: [
      { name: "React", icon: SiReact },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "MongoDB", icon: SiMongodb },
    ],
    image: hydroponicVisual,
    className: "work-project--hydroponic",
  },
];

function Technology({ name, icon: Icon }) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <span className={`work-tech work-tech--${slug}`} title={name}>
      <Icon className="work-tech__icon" />
      <span>{name}</span>
    </span>
  );
}

function CaseStudyLink() {
  return (
    <a href="/work" className="work-case-link">
      <span className="work-case-link__icon">↗</span>
      <span>VIEW CASE STUDY</span>
    </a>
  );
}

export default function Work() {
  const workSectionRef = useRef(null);
  const workCanvasRef = useRef(null);
  const workHeaderRef = useRef(null);
  const workProjectsRef = useRef(null);

  useEffect(() => {
    const section = workSectionRef.current;
    const canvas = workCanvasRef.current;

    if (!section || !canvas) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return undefined;

    const ctx = canvas.getContext("2d");

    if (!ctx) return undefined;

    let animationFrame;
    let width = 0;
    let height = 0;
    let time = 0;

    const particles = [];

    const orbits = [
      {
        radiusX: 0.46,
        radiusY: 0.13,
        centerX: 0.58,
        centerY: 0.24,
        rotation: -0.08,
        rotationSpeed: 0.000035,
        color: "rgba(131, 185, 0, 0.32)",
        lineWidth: 1.2,
      },
      {
        radiusX: 0.42,
        radiusY: 0.2,
        centerX: 0.42,
        centerY: 0.52,
        rotation: 0.06,
        rotationSpeed: -0.000025,
        color: "rgba(19, 170, 164, 0.22)",
        lineWidth: 1,
      },
      {
        radiusX: 0.5,
        radiusY: 0.17,
        centerX: 0.62,
        centerY: 0.78,
        rotation: -0.04,
        rotationSpeed: 0.00002,
        color: "rgba(131, 185, 0, 0.24)",
        lineWidth: 1,
      },
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      particles.length = 0;

      const count = window.innerWidth <= 768 ? 45 : 110;

      for (let i = 0; i < count; i += 1) {
        const orbitIndex = Math.floor(Math.random() * orbits.length);

        particles.push({
          orbit: orbitIndex,
          progress: Math.random() * Math.PI * 2,
          speed: 0.00012 + Math.random() * 0.00018,
          size: 1.2 + Math.random() * 1.8,
          alpha: 0.5 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const getOrbitPoint = (orbit, angle) => {
      const breathing = Math.sin(time * 0.00025 + angle) * 5;

      const centerX = width * orbit.centerX;

      const centerY = height * orbit.centerY;

      const radiusX = width * orbit.radiusX;

      const radiusY = height * orbit.radiusY + breathing;

      const cos = Math.cos(angle);

      const sin = Math.sin(angle);

      const rotationCos = Math.cos(orbit.rotation);

      const rotationSin = Math.sin(orbit.rotation);

      const x =
        centerX + radiusX * cos * rotationCos - radiusY * sin * rotationSin;

      const y =
        centerY + radiusX * cos * rotationSin + radiusY * sin * rotationCos;

      return {
        x,
        y,
      };
    };

    const drawOrbit = (orbit) => {
      ctx.beginPath();

      const steps = 180;

      for (let i = 0; i <= steps; i += 1) {
        const angle = (i / steps) * Math.PI * 2;

        const point = getOrbitPoint(orbit, angle);

        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }

      ctx.strokeStyle = orbit.color;

      ctx.lineWidth = orbit.lineWidth;

      ctx.stroke();
    };

    const drawParticle = (particle) => {
      const orbit = orbits[particle.orbit];

      const point = getOrbitPoint(orbit, particle.progress);

      const pulse = 0.65 + Math.sin(time * 0.002 + particle.phase) * 0.35;

      const size = particle.size * pulse;

      ctx.beginPath();

      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);

      if (particle.orbit === 1) {
        ctx.fillStyle = `rgba(19, 170, 164, ${particle.alpha * pulse})`;

        ctx.shadowColor = "rgba(19, 170, 164, 0.65)";
      } else {
        ctx.fillStyle = `rgba(131, 185, 0, ${particle.alpha * pulse})`;

        ctx.shadowColor = "rgba(131, 185, 0, 0.7)";
      }

      ctx.shadowBlur = 16;

      ctx.fill();

      ctx.shadowBlur = 0;
    };

    const render = (timestamp) => {
      time = timestamp;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.progress += particle.speed;

        if (particle.progress > Math.PI * 2) {
          particle.progress -= Math.PI * 2;
        }

        drawParticle(particle);
      });

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    createParticles();

    window.addEventListener("resize", resize);

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const section = workSectionRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const header = section.querySelector(".work-header");
      const projects = gsap.utils.toArray(".work-project");

      if (reducedMotion) {
        gsap.set(
          [
            header,
            ...projects,
            ...projects.flatMap((project) => [
              project.querySelector(".work-project__meta"),
              project.querySelector("h3"),
              project.querySelector(".work-project__tagline"),
              project.querySelector(".work-project__description"),
              project.querySelector(".work-technologies"),
              project.querySelector(".work-case-link"),
              project.querySelector(".work-project__visual"),
            ]),
          ].filter(Boolean),
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        );

        return;
      }

      /* =========================================
       HEADER INITIAL STATE
       ========================================= */

      gsap.set(header, {
        opacity: 0,
        y: 70,
        filter: "blur(10px)",
      });

      /* =========================================
       PROJECT INITIAL STATE
       ========================================= */

      projects.forEach((project) => {
        const meta = project.querySelector(".work-project__meta");
        const title = project.querySelector("h3");
        const tagline = project.querySelector(".work-project__tagline");
        const description = project.querySelector(".work-project__description");
        const technologies = project.querySelector(".work-technologies");
        const caseLink = project.querySelector(".work-case-link");
        const visual = project.querySelector(".work-project__visual");
        const image = project.querySelector(".work-project__visual img");

        /*
         * IMPORTANT:
         * Do NOT hide .work-project itself.
         * Only animate its children.
         */

        gsap.set(meta, {
          opacity: 0,
          y: 25,
        });

        gsap.set(title, {
          opacity: 0,
          y: 55,
          filter: "blur(8px)",
        });

        gsap.set(tagline, {
          opacity: 0,
          y: 25,
        });

        gsap.set(description, {
          opacity: 0,
          y: 25,
        });

        gsap.set(technologies, {
          opacity: 0,
          y: 20,
        });

        gsap.set(caseLink, {
          opacity: 0,
          y: 20,
        });

        gsap.set(visual, {
          opacity: 0,
          x: project.classList.contains("work-project--beauty") ? -70 : 70,
        });

        gsap.set(image, {
          scale: 0.94,
        });
      });

      /* =========================================
       HEADER SCROLL
       ========================================= */

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "top 30%",
            scrub: 1.4,
          },
        })
        .to(header, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        });

      /* =========================================
       PROJECT SCROLL
       ========================================= */

      projects.forEach((project) => {
        const meta = project.querySelector(".work-project__meta");
        const title = project.querySelector("h3");
        const tagline = project.querySelector(".work-project__tagline");
        const description = project.querySelector(".work-project__description");
        const technologies = project.querySelector(".work-technologies");
        const caseLink = project.querySelector(".work-case-link");
        const visual = project.querySelector(".work-project__visual");
        const image = project.querySelector(".work-project__visual img");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 85%",
            end: "top 30%",
            scrub: 1.5,
          },
        });

        timeline
          .to(
            meta,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            0,
          )

          .to(
            title,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power3.out",
            },
            0.08,
          )

          .to(
            tagline,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            },
            0.18,
          )

          .to(
            description,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            },
            0.25,
          )

          .to(
            technologies,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            0.32,
          )

          .to(
            caseLink,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            0.38,
          )

          .to(
            visual,
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
            },
            0.05,
          )

          .to(
            image,
            {
              scale: 1,
              duration: 1,
              ease: "power3.out",
            },
            0,
          );
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={workSectionRef} className="work-section" id="work">
      <div className="work-energy" aria-hidden="true">
        <canvas ref={workCanvasRef} className="work-energy__canvas" />
      </div>

      <div className="work-grid" />

      <div className="work-container">
        <header ref={workHeaderRef} className="work-header">
          <div className="work-heading">
            <div className="work-eyebrow">
              <span />
              <span>SELECTED WORK</span>
            </div>

            <h2>
              Turning Ideas into <span>Real Impact.</span>
            </h2>

            <p>
              A glimpse of the digital experiences we've built
              <br className="work-desktop-break" />
              for forward-thinking businesses.
            </p>
          </div>

          <a href="/work" className="work-all-link">
            <span>VIEW ALL WORK</span>
            <span>↗</span>
          </a>
        </header>

        <div ref={workProjectsRef} className="work-projects">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className={`work-project ${project.className}`}
            >
              <div className="work-project__content">
                <div className="work-project__meta">
                  <span className="work-project__meta-line" />

                  <span className="work-project__category">
                    {project.category}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <div className="work-project__tagline">{project.tagline}</div>

                <p className="work-project__description">
                  {project.description}
                </p>

                <div className="work-technologies">
                  {project.technologies.map((technology) => (
                    <Technology
                      key={technology.name}
                      name={technology.name}
                      icon={technology.icon}
                    />
                  ))}
                </div>

                <CaseStudyLink />
              </div>

              <div className="work-project__visual">
                <img
                  src={project.image}
                  alt={`${project.title} project`}
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
