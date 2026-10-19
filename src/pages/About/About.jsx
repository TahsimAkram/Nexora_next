import Hero from "../../components/About/hero/hero";
import OurApproach from "../../components/About/OurApproach/OurApproach.jsx";
import OurPeople from "../../components/About/OurPeople/OurPeople.jsx";
import OurStory from "../../components/About/OurStory/OurStory";
import OurValues from "../../components/About/OurValues/OurValues.jsx";
import ReadyToBuild from "../../components/About/ReadyToBuild/ReadyToBuild.jsx";

import "./About.css";

export default function About({ onOpenContact }) {
  return (
    <>
      <Hero />
      <OurStory />
      <OurValues />
      <OurApproach />
      <OurPeople />
      <ReadyToBuild onOpenContact={onOpenContact} />
    </>
  );
}
