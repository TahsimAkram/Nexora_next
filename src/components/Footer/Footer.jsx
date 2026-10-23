import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

import "./Footer.css";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Terms of Service",
    href: "/terms",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* Decorative background waves */}
      <svg
        className="footer__waves"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="footer-wave-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#176BFF" />
            <stop offset="55%" stopColor="#7B8CFF" />
            <stop offset="100%" stopColor="#B6FF00" />
          </linearGradient>

          <linearGradient
            id="footer-glow-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#176BFF" stopOpacity="0" />
            <stop offset="60%" stopColor="#176BFF" stopOpacity=".13" />
            <stop offset="100%" stopColor="#B6FF00" stopOpacity=".1" />
          </linearGradient>
        </defs>

        <path
          className="footer__wave-glow"
          d="M650 300 C790 250 790 90 970 105 S1220 280 1440 30 L1440 300 Z"
          fill="url(#footer-glow-gradient)"
        />

        <path
          d="M480 300 C680 240 760 90 950 130 S1230 270 1440 35"
          fill="none"
          stroke="url(#footer-wave-gradient)"
          strokeWidth="1.2"
        />

        <path
          d="M550 300 C730 245 810 115 990 150 S1250 275 1440 70"
          fill="none"
          stroke="#176BFF"
          strokeWidth=".8"
        />

        <path
          d="M620 300 C800 255 870 145 1050 170 S1290 280 1440 105"
          fill="none"
          stroke="#B6FF00"
          strokeWidth=".7"
        />

        <path
          d="M720 300 C880 260 950 185 1110 195 S1320 275 1440 140"
          fill="none"
          stroke="url(#footer-wave-gradient)"
          strokeWidth=".7"
        />
      </svg>

      <div className="footer__main">
        {/* Brand */}
        <div className="footer__brand">
          <a
            href="#home"
            className="footer__logo"
            aria-label="Design and Domain home"
          >
            <span className="footer__logo-design">Design</span>
            <span className="footer__logo-and"> and </span>
            <span className="footer__logo-domain">Domain</span>
            <span className="footer__logo-dot">.</span>
          </a>

          <p className="footer__venture">A venture by Akram Enterprise</p>

          <p className="footer__tagline">Websites. Brands. Digital Growth.</p>
        </div>

        {/* Contact details */}
        <div className="footer__contact">
          <a
            className="footer__contact-link"
            href="mailto:hello@designanddomain.com"
          >
            <Mail aria-hidden="true" size={18} />
            <span>hello@designanddomain.com</span>
          </a>

          <a className="footer__contact-link" href="tel:+918420063029">
            <Phone aria-hidden="true" size={18} />
            <span>+91 84200 63029</span>
          </a>

          <div className="footer__contact-link footer__location">
            <MapPin aria-hidden="true" size={18} />
            <span>Dubai</span>
          </div>
        </div>

        {/* Social links and back to top */}
        <div className="footer__actions">
          <div className="footer__socials">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="footer__social"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>

          <button
            type="button"
            className="footer__top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={19} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Copyright and legal links */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Design and Domain. A venture by Akram
          Enterprise. All rights reserved.
        </p>

        <div className="footer__legal">
          {legalLinks.map(({ label, href }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
