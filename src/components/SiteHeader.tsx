import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import { BrandMark } from "./BrandMark";

const navItems = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" to="/" aria-label={`${profile.name} — home`} onClick={() => setMenuOpen(false)}>
          <BrandMark />
          <span className="brand-name">Ihor Havryliv</span>
        </Link>
        <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation" id="main-navigation">
          {navItems.map((item) => (
            <a
              className={isHome && location.hash === item.href.slice(1) ? "nav-link is-active" : "nav-link"}
              href={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-github" href={profile.github} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <button
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
