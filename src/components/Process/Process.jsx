import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Process.css";

const processSteps = [
  {
    number: "01",

    title: "Discover",

    label: "Listen before we build.",

    description:
      "We learn about your business, audience, goals, and challenges. This gives us the context to make purposeful decisions.",

    detail: "Consultation / Research / Goals",

    visual: "discover",
  },

  {
    number: "02",

    title: "Design",

    label: "Give the idea a direction.",

    description:
      "We shape the structure, user journeys, and visual language into an experience that feels clear and considered.",

    detail: "Structure / Experience / Interface",

    visual: "design",
  },

  {
    number: "03",

    title: "Develop",

    label: "Turn the direction into reality.",

    description:
      "We build with maintainable technology, responsive layouts, and a focus on performance and usability.",

    detail: "Engineering / Integration / Responsive",

    visual: "develop",
  },

  {
    number: "04",

    title: "Deliver",

    label: "Make sure every detail works.",

    description:
      "We test across devices and browsers, resolve issues, and prepare the experience for a confident launch.",

    detail: "Quality assurance / Testing / Launch",

    visual: "deliver",
  },

  {
    number: "05",

    title: "Evolve",

    label: "Keep improving after launch.",

    description:
      "We help your digital experience stay useful through ongoing maintenance, support, and future improvements.",

    detail: "Support / Optimization / Growth",

    visual: "evolve",
  },
];

export default function Process() {
  const processRef = useRef(null);
  const [activeProcess, setActiveProcess] = useState(0);

  useEffect(() => {
    const root = processRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray(".process-step", root);
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveProcess(index),
          onEnterBack: () => setActiveProcess(index),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="process-scene"
      ref={processRef}
      aria-labelledby="process-title"
      data-active-step={activeProcess}
    >
      <div className="process-scene__inner">
        <div className="process-scene__intro">
          <p className="process-scene__eyebrow">
            <span>04</span>

            <span>How we work</span>
          </p>

          <h2 id="process-title">
            A clear path
            <br />
            <span>from idea to impact.</span>
          </h2>

          <p className="process-scene__summary">
            Good work comes from good decisions, made together. Here’s how we
            move from the first conversation to what comes next.
          </p>

          <div className="process-scene__progress">
            <span>{processSteps[activeProcess].number} / 05</span>

            <span>{processSteps[activeProcess].title}</span>
          </div>

          <div className="process-scene__visual" aria-hidden="true">
            <div className="process-scene__visual-grid" />

            <div
              className={`process-scene__visual-art process-scene__visual-art--${processSteps[activeProcess].visual}`}
            >
              <span className="process-scene__visual-ring process-scene__visual-ring--one" />

              <span className="process-scene__visual-ring process-scene__visual-ring--two" />

              <span className="process-scene__visual-core">
                {processSteps[activeProcess].number}
              </span>

              <span className="process-scene__visual-orbit" />
            </div>

            <span className="process-scene__visual-caption">
              NEXORA / {processSteps[activeProcess].detail}
            </span>
          </div>
        </div>

        <div className="process-scene__steps">
          {processSteps.map((step, index) => (
            <article
              className={`process-step ${
                activeProcess === index ? "process-step--active" : ""
              }`}
              key={step.number}
              aria-current={activeProcess === index ? "step" : undefined}
            >
              <div className="process-step__meta">
                <span>{step.number}</span>

                <span className="process-step__indicator" />
              </div>

              <div className="process-step__content">
                <p>{step.label}</p>

                <h3>{step.title}</h3>

                <div className="process-step__description">
                  <p>{step.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="process-scene__footer">
        <span>Built through collaboration, not guesswork.</span>

        <Link to="/process">
          Explore our process <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
