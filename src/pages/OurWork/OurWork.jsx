import ReadyToBuild from "../../components/About/ReadyToBuild/ReadyToBuild";
import OurWorkHero from "../../components/Work/HeroSection/OurWorkHero";
import MoreProjects from "../../components/Work/MoreProjects/MoreProjects";

import OurWorkProjects from "../../components/Work/ProjectsSection/OurWorkProjects";

export default function OurWork({ onOpenContact }) {
  return (
    <main className="our-work-page">
      <OurWorkHero />
      <OurWorkProjects />
      <MoreProjects />
      <ReadyToBuild onOpenContact={onOpenContact} />
    </main>
  );
}
