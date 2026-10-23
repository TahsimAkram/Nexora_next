import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./OurWorkProjects.css";

gsap.registerPlugin(ScrollTrigger);
import {
  UsersRound,
  Workflow,
  Gauge,
  Database,
  Code2,
  Layers3,
  Building2,
  CalendarDays,
  Users,
  Target,
  Network,
  Eye,
  ChartNoAxesCombined,
  Check,
} from "lucide-react";
import {
  FaReact,
  FaJava,
  FaDocker,
  FaAws,
  FaWordpress,
  FaJs,
  FaCss3Alt,
  FaNodeJs,
} from "react-icons/fa";
import { FaLeaf, FaDatabase, FaShoppingCart } from "react-icons/fa";
import freightPro from "../../../assets/Traft.png";
import smileBeautyImage from "../../../assets/Smile Beauty.png";
import hydroponicImage from "../../../assets/Hydroponic Farm.png";

const projects = [
  {
    number: "01",
    category: "LOGISTICS & TRADE MANAGEMENT",
    name: "FreightPro",
    subtitle: "Logistics & Trade Management Platform",
    description:
      "FreightPro streamlines complex logistics operations with a centralized platform for shipment tracking, trade coordination, and real-time supply chain visibility. From managing orders and monitoring deliveries to coordinating partners and tracking shipment status, it brings critical logistics workflows together to help businesses operate with greater efficiency, transparency, and control.",
    image: freightPro,
    theme: "light",
    details: [
      { icon: Building2, label: "Industry", value: "Logistics & Trade" },
      { icon: CalendarDays, label: "Project Duration", value: "6+ Months" },
      { icon: Users, label: "Team Size", value: "5+ Members" },
      { icon: Layers3, label: "Platform", value: "Web Application" },
    ],
    challenge: [
      "Fragmented tracking across multiple systems",
      "Manual coordination between teams",
      "Limited real-time shipment visibility",
      "Difficulties managing operational workflows",
    ],
    solution:
      "We developed FreightPro to address fragmented shipment tracking and the challenges of coordinating logistics across multiple systems. By bringing shipment updates, order management, and team workflows into one platform, we help businesses improve delivery visibility, reduce manual coordination, and manage logistics operations more efficiently.",
    features: [
      "Task and workflow management",
      "Role-based access and permissions",
      "Operational status tracking",
      "Centralized information",
    ],
    impact: [
      "Faster coordination across teams",
      "Improved visibility across shipments",
      "Reduced manual effort in tracking and reporting",
      "Better decision making with real-time data",
    ],
    technologies: [
      "React",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
  },
  {
    number: "02",
    category: "BEAUTY & E-COMMERCE",
    name: "Smile Beauty",
    subtitle: "Beauty & Cosmetics E-commerce",
    description:
      "A refined e-commerce platform for beauty and skincare, combining an elegant storefront with intuitive product discovery, detailed product showcases, and a seamless shopping journey. Designed to elevate product presentation, build customer confidence, and make exploring cosmetics, skincare essentials, and beauty collections effortless across devices.",
    image: smileBeautyImage,
    theme: "dark",
    details: [
      { icon: Building2, label: "Industry", value: "Beauty & E-commerce" },
      { icon: CalendarDays, label: "Project Duration", value: "4+ Months" },
      { icon: Users, label: "Team Size", value: "4 Members" },
      { icon: Layers3, label: "Platform", value: "E-commerce Website" },
    ],
    challenge: [
      "Presenting products clearly",
      "Making product discovery intuitive",
      "Creating a consistent shopping journey",
      "Building customer trust through design",
    ],
    solution:
      "A thoughtfully crafted e-commerce experience that blends elegant design with intuitive navigation and a seamless, responsive shopping journey. With a refined product layout, visually engaging collections, and streamlined browsing, the storefront makes discovering beauty and skincare essentials effortless while creating a polished and engaging customer experience.",
    features: [
      "Product category browsing",
      "Product detail pages",
      "Responsive storefront",
      "Shopping cart experience",
    ],
    impact: [
      "Clearer product presentation",
      "Simpler product discovery",
      "Consistent shopping experience",
      "Stronger visual identity",
    ],
    technologies: ["WordPress", "WooCommerce", "JavaScript", "CSS"],
  },
  {
    number: "03",
    category: "AGRICULTURE & TECHNOLOGY",
    name: "Hydroponic Farm",
    subtitle: "Smart Farming Management Platform",
    description:
      "A digital farming concept for presenting hydroponic operations, growing information, and farm-management workflows.",
    image: hydroponicImage,
    theme: "light",
    details: [
      { icon: Building2, label: "Industry", value: "Agriculture & Technology" },
      { icon: CalendarDays, label: "Project Duration", value: "5+ Months" },
      { icon: Users, label: "Team Size", value: "4 Members" },
      { icon: Layers3, label: "Platform", value: "Web Application" },
    ],
    challenge: [
      "Monitoring growing conditions",
      "Keeping farm information organized",
      "Understanding changes in crop conditions",
      "Supporting repeatable farm workflows",
    ],
    solution:
      "A clean digital interface concept focused on making farm information easier to review and supporting more organized agricultural operations.",
    features: [
      "Farm overview and monitoring",
      "Growing-condition summaries",
      "Organized crop information",
      "Operational data presentation",
    ],
    impact: [
      "More accessible farm information",
      "Clearer operational overview",
      "Organized growing records",
      "Better visibility into workflows",
    ],
    technologies: ["React", "Node.js", "IoT Integration", "Cloud"],
  },
];

function ProjectDetails({ items }) {
  return (
    <aside className="case-study__details">
      {items.map(({ icon: Icon, label, value }) => (
        <div className="case-study__detail" key={label}>
          <Icon className="case-study__detail-icon" aria-hidden="true" />
          <div>
            <span className="case-study__detail-label">{label}</span>
            <span className="case-study__detail-value">{value}</span>
          </div>
        </div>
      ))}
    </aside>
  );
}

function InformationPanel({ icon: Icon, title, children, className = "" }) {
  return (
    <article className={`case-study__info ${className}`}>
      <div className="case-study__info-heading">
        <span className="case-study__info-icon">
          <Icon aria-hidden="true" />
        </span>
        <h3>{title}</h3>
      </div>
      {children}
    </article>
  );
}

function BulletList({ items, check = false }) {
  return (
    <ul
      className={`case-study__list ${check ? "case-study__list--check" : ""}`}
    >
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const section = cardRef.current;

    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
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
        .from(".case-study__eyebrow", {
          y: 22,
          autoAlpha: 0,
          duration: 0.3,
        })
        .from(
          ".case-study__title, .case-study__subtitle",
          {
            y: 30,
            autoAlpha: 0,
            duration: 0.35,
            stagger: 0.12,
          },
          "-=0.25",
        )
        .from(
          ".case-study__description",
          {
            y: 22,
            autoAlpha: 0,
            duration: 0.45,
          },
          "-=0.35",
        )
        .from(
          ".case-study__visual",
          {
            y: 35,
            autoAlpha: 0,
            scale: 0.57,
            duration: 0.9,
          },
          "-=0.4",
        )
        .from(
          ".case-study__detail",
          {
            y: 18,
            autoAlpha: 0,
            duration: 0.3,
            stagger: 0.1,
          },
          "-=0.45",
        )
        .from(
          ".case-study__info",
          {
            y: 28,
            autoAlpha: 0,
            duration: 0.45,
            stagger: 0.14,
          },
          "-=0.2",
        )
        .from(
          ".case-study__impact-item",
          {
            y: 16,
            autoAlpha: 0,
            duration: 0.25,
            stagger: 0.08,
          },
          "-=0.25",
        )
        .from(
          ".case-study__tech-tag",
          {
            y: 12,
            autoAlpha: 0,
            duration: 0.3,
            stagger: 0.06,
          },
          "-=0.25",
        );

      // Subtle movement inside the project preview while scrolling.
      const previewImage = section.querySelector(".case-study__visual img");

      if (previewImage) {
        gsap.to(previewImage, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={cardRef}
      className={`case-study case-study--${project.theme}`}
      id={`project-${project.number}`}
      aria-labelledby={`project-title-${project.number}`}
    >
      <div className="case-study__inner">
        <div className="case-study__overview">
          <div className="case-study__intro">
            <div className="case-study__eyebrow">
              <span>{project.number} / 04</span>
              <span className="case-study__eyebrow-line" />
              <span>{project.category}</span>
            </div>

            <h2
              className="case-study__title"
              id={`project-title-${project.number}`}
            >
              {project.name}
            </h2>

            <p className="case-study__subtitle">{project.subtitle}</p>
            <p className="case-study__description">{project.description}</p>
          </div>

          <div className="case-study__visual">
            <img
              src={project.image}
              alt={`${project.name} website displayed across desktop and mobile devices`}
              loading="lazy"
            />
          </div>

          <ProjectDetails items={project.details} />
        </div>

        <div className="case-study__information">
          <InformationPanel icon={Target} title="The Challenge">
            <BulletList items={project.challenge} />
          </InformationPanel>

          <InformationPanel icon={Network} title="Our Solution">
            <p className="case-study__body-copy">{project.solution}</p>
          </InformationPanel>

          <InformationPanel icon={Layers3} title="Key Features">
            <BulletList items={project.features} check />
          </InformationPanel>
        </div>

        <div className="case-study__footer">
          <div className="case-study__impact">
            <div className="case-study__footer-heading">
              <span className="case-study__footer-heading-icon case-study__footer-heading-icon--impact">
                <Target aria-hidden="true" />
              </span>
              <h3>Impact &amp; Results</h3>
            </div>

            <div className="case-study__impact-items">
              {project.impact.map((item, index) => {
                const ImpactIcon = [Workflow, Eye, Gauge, ChartNoAxesCombined][
                  index % 4
                ];

                return (
                  <div className="case-study__impact-item" key={item}>
                    <ImpactIcon
                      className="case-study__impact-item-icon"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="case-study__tech">
            <div className="case-study__footer-heading">
              <span className="case-study__footer-heading-icon case-study__footer-heading-icon--tech">
                <Workflow aria-hidden="true" />
              </span>
              <h3>Tech Stack</h3>
            </div>

            <div className="case-study__tech-list">
              {project.technologies.map((technology) => {
                const techIcons = {
                  React: FaReact,
                  Java: FaJava,
                  "Spring Boot": FaLeaf,
                  PostgreSQL: FaDatabase,
                  Docker: FaDocker,
                  AWS: FaAws,
                  WordPress: FaWordpress,
                  WooCommerce: FaShoppingCart,
                  JavaScript: FaJs,
                  CSS: FaCss3Alt,
                  "Node.js": FaNodeJs,
                };

                const techColors = {
                  React: "#61DAFB",
                  Java: "#E76F00",
                  "Spring Boot": "#6DB33F",
                  PostgreSQL: "#4169E1",
                  Docker: "#2496ED",
                  AWS: "#FF9900",
                  WordPress: "#21759B",
                  WooCommerce: "#96588A",
                  JavaScript: "#D6B600",
                  CSS: "#1572B6",
                  "Node.js": "#539E43",
                };

                const TechIcon = techIcons[technology] || Code2;
                const techColor = techColors[technology] || "#8dbb0b";

                return (
                  <span className="case-study__tech-tag" key={technology}>
                    <TechIcon aria-hidden="true" style={{ color: techColor }} />
                    {technology}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OurWorkProjects() {
  return (
    <div className="case-studies">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.number} />
      ))}
    </div>
  );
}
