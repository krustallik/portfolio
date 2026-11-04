import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import { BrandMark } from "./BrandMark";
import { useLocale } from "../i18n/useLocale";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { key: "work", href: "/#projects" },
  { key: "about", href: "/#about" },
  { key: "skills", href: "/#skills" },
  { key: "contact", href: "/#contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { messages } = useLocale();
  const isHome = location.pathname === "/";

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" to="/" aria-label={`${profile.name} — ${messages.header.home}`} onClick={() => setMenuOpen(false)}>
          <BrandMark />
          <span className="brand-name">{profile.name}</span>
        </Link>
        <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label={messages.header.navigation} id="main-navigation">
          {navItems.map((item) => (
            <a
              className={isHome && location.hash === item.href.slice(1) ? "nav-link is-active" : "nav-link"}
              href={item.href}
              key={item.key}
              onClick={() => setMenuOpen(false)}
            >
              {messages.header[item.key]}
            </a>
          ))}
          <a className="nav-github" href={profile.github} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
            {messages.header.github} <span aria-hidden="true">↗</span>
          </a>
          <LanguageSwitcher />
        </nav>
        <button
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? messages.header.closeMenu : messages.header.openMenu}
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
