import ServicesHero from "../../components/services/ServicesHero";
import ServicesNavigation from "../../components/services/ServicesNavigation";
import ServiceDetails from "../../components/services/ServiceDetails";
import ServicesClosing from "../../components/services/ServicesClosing";
import { services } from "../../data/servicesData";
import "./Services.css";
import ReadyToBuild from "../../components/About/ReadyToBuild/ReadyToBuild";

export default function Services({ onOpenContact }) {
  return (
    <main className="services-page">
      <ServicesHero />
      <ServicesNavigation services={services} />

      <div className="services-list">
        {services.map((service, index) => (
          <ServiceDetails key={service.id} service={service} index={index} />
        ))}
      </div>

      <ReadyToBuild onOpenContact={onOpenContact} />
    </main>
  );
}
