import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Kind words" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-20% 0px -60% 0px", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    menu?.querySelector("a")?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") { setIsMenuOpen(false); toggleRef.current?.focus(); }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...menu.querySelectorAll("a")];
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const desktop = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = (event) => { if (event.matches) setIsMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="scroll-progress" aria-hidden="true" />
      <nav className="page-container nav-inner" aria-label="Main navigation">
        <a href="#home" className="brand" aria-label="Ron Rontos home" onClick={closeMenu}>rr<span>.</span><span className="brand-name">RON RONTOS</span></a>
        <div className="desktop-nav">{navLinks.map((link) => <a key={link.href} href={link.href} className={activeSection === link.href.slice(1) ? "nav-link active" : "nav-link"} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>{link.label}</a>)}</div>
        <a href="#contact" className="nav-cta">Let’s talk <ArrowUpRight size={16} /></a>
        <button ref={toggleRef} className="icon-button menu-toggle" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">{isMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </nav>
      {isMenuOpen && <div className="mobile-menu-overlay" onClick={closeMenu}><div id="mobile-navigation" ref={menuRef} className="mobile-navigation" onClick={(event) => event.stopPropagation()}><p className="eyebrow">EXPLORE THE PORTFOLIO</p>{[...navLinks, { href: "#contact", label: "Let’s talk" }].map((link, index) => <a key={link.href} href={link.href} onClick={closeMenu}><span className="mono">0{index + 1}</span>{link.label}<ArrowUpRight size={20} /></a>)}<p className="mobile-menu-note">Ideas, good conversations, and meaningful work.</p></div></div>}
    </header>
  );
};
