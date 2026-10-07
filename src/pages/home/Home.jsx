import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HomeIntro from "../../components/HomeIntro/HomeIntro";

import "./Home.css";
import Services from "../../components/Capabilities/Services";
import Impact from "../../components/Impact/Impact";
import Work from "../../components/Work/Work";
import Testimonials from "../../components/Testimonials/Testimonials";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import Footer from "../../components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home({ onOpenContact }) {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]", page).forEach((element) => {
        gsap.fromTo(
          element,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 85%", once: true },
          },
        );
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-page" ref={pageRef}>
      <HomeIntro />
      <Services />
      <Impact />
      <Work />
      <Testimonials />
      <ContactCTA onOpenContact={onOpenContact} />
      <Footer />
      {/* <WorkExhibition />
      <Process /> */}
    </div>
  );
}
