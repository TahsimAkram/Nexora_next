import "./MoreProjects.css";
import cineStreamImage from "../../../assets/CineStream.png";
import auctionImage from "../../../assets/Auction.png";
import learnImage from "../../../assets/Learn.png";
import bankingImage from "../../../assets/Banking.png";
import triporaImage from "../../../assets/Tripora.png";
import dineLuxImage from "../../../assets/DineLux.png";
import homeVistaImage from "../../../assets/HomeVista.png";

const projects = [
  {
    title: "CineVue Streaming",
    category: "Entertainment",
    image: cineStreamImage,
    alt: "Cinematic video streaming platform concept with featured shows and content rows",
  },
  {
    title: "BidAura Marketplace",
    category: "Online Auctions",
    image: auctionImage,
    alt: "Online auction marketplace concept with product listings and bidding features",
  },
  {
    title: "EduNexa Learning",
    category: "Education & E-learning",
    image: learnImage,
    alt: "Online learning platform concept with courses and learning dashboard",
  },
  {
    title: "Finora Banking",
    category: "FinTech",
    image: bankingImage,
    alt: "Digital banking and financial analytics platform concept",
  },
  {
    title: "Tripora Travel",
    category: "Travel & Tourism",
    image: triporaImage,
    alt: "Travel booking website concept with destination discovery and trip search",
  },
  {
    title: "DineLux Reservations",
    category: "Restaurant & Dining",
    image: dineLuxImage,
    alt: "Restaurant discovery and table reservation website concept",
  },
  {
    title: "HomeVista Properties",
    category: "Real Estate",
    image: homeVistaImage,
    alt: "Property marketplace concept with real estate search and featured listings",
  },
];

export default function MoreProjects() {
  const carouselProjects = [...projects, ...projects];

  return (
    <section className="more-projects" aria-labelledby="more-projects-title">
      <div className="more-projects__ambient" aria-hidden="true" />
      <div className="more-projects__container">
        <div className="more-projects__heading">
          <div className="more-projects__eyebrow">
            <span className="more-projects__eyebrow-line" />
            <span>AND MANY MORE</span>
          </div>
          <h2 id="more-projects-title">
            More websites
            <br />
            we have <span>developed.</span>
          </h2>
          <p>
            Explore more digital experiences across entertainment, education,
            finance, travel, dining, and real estate.
          </p>
        </div>

        <div
          className="more-projects__carousel"
          aria-label="Continuously scrolling project concepts"
        >
          <div className="more-projects__track">
            {carouselProjects.map((project, index) => (
              <article
                className="more-projects__card"
                key={`${project.title}-${index}`}
                aria-hidden={index >= projects.length ? "true" : undefined}
              >
                <a
                  className="more-projects__card-link"
                  tabIndex={index >= projects.length ? -1 : 0}
                  aria-label={`Discuss a project like ${project.title}`}
                >
                  <div className="more-projects__image-wrap">
                    <img src={project.image} alt={project.alt} loading="lazy" />
                  </div>
                  <div className="more-projects__card-content">
                    <h3>{project.title}</h3>
                    <span className="more-projects__category">
                      {project.category}
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
