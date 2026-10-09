 "use client";

import { useEffect, useState } from "react";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("albinus-theme");
      if (saved === "light") setLight(true);
    } catch {}
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light-theme", light);
    try { localStorage.setItem("albinus-theme", light ? "light" : "dark"); } catch {}
  }, [light]);

  return <>
    <div className="scroll-progress" id="scrollProgress" />
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Albinus Soren home"><span className="brand-mark">A<span>.</span></span><span className="brand-name">ALBINUS SOREN<small>DEVELOPER · CREATOR</small></span></a>
      <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><span /><span /></button>
      <nav className={`nav ${menuOpen ? "open" : ""}`}><a onClick={() => setMenuOpen(false)} href="#about">About</a><a onClick={() => setMenuOpen(false)} href="#skills">Skills</a><a onClick={() => setMenuOpen(false)} href="#projects">Projects</a><a onClick={() => setMenuOpen(false)} href="#contact">Contact</a><button className="theme-toggle" onClick={() => setLight(v => !v)} aria-label="Switch color theme">{light ? "☾" : "☼"}</button></nav>
    </header>
    <div onScroll={() => {}}>{children}</div>
    <ScrollProgress />
  </>;
}

function ScrollProgress() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const el = document.getElementById("scrollProgress");
      if (el) el.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}