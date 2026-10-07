import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import "./Navbar.css";

const navigationItems = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "Process", path: "/process" },
  { label: "Careers", path: "/careers" },
];

export default function Navbar({ onOpenContact }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // inside Navbar()
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__shell">
        <div className="navbar__inner">
          <Link
            to="/"
            className="navbar__brand"
            aria-label="Nexora home"
            onClick={closeMenu}
          >
            NEXORA<span>.</span>
          </Link>

          <nav className="navbar__links" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="navbar__contact"
            onClick={() => {
              closeMenu();
              onOpenContact();
            }}
          >
            Let’s talk
            <ArrowOutwardIcon />
          </button>

          <IconButton
            className="navbar__menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        <nav
          id="mobile-navigation"
          className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          {navigationItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className={({ isActive }) =>
                `navbar__mobile-link ${
                  isActive ? "navbar__mobile-link--active" : ""
                }`
              }
            >
              <span>{item.label}</span>
              <ArrowOutwardIcon />
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="navbar__mobile-contact"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Let’s talk <ArrowOutwardIcon />
          </Link>
        </nav>
      </div>
    </header>
  );
}
