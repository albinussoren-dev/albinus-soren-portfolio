import Link from "next/link";
import { getPublicProjects } from "@/lib/projects";
import { ContactForm } from "@/components/contact-form";
import { ProjectExplorer } from "@/components/project-explorer";
import { SiteChrome } from "@/components/site-chrome";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getPublicProjects();
  return (
    <SiteChrome>
      <main>
        <section className="hero shell" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> OPEN TO LEARNING & COLLABORATION</div>
            <p className="kicker">HELLO, WORLD! I&apos;M</p>
            <h1>Albinus<br /><span className="gradient-text">Soren.</span></h1>
            <h2 className="hero-role">Developer <i>/</i> Creator <i>/</i> AI Enthusiast</h2>
            <p className="hero-description">I turn ideas into digital experiences — from websites and apps to AI-powered tools and creative projects.</p>
            <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <span>↗</span></a><a className="button secondary" href="#contact">Let’s connect</a></div>
            <div className="social-row"><a href="https://github.com/albinussor" target="_blank" rel="noreferrer">GitHub ↗</a><span /> <a href="mailto:albinussoren@gmail.com">Email ↗</a><span /> <b>Jharkhand, India</b></div>
          </div>
          <div className="hero-visual" aria-label="Decorative code illustration">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-glow" />
            <div className="code-window">
              <div className="window-top"><span /><span /><span /><small>albinus.ts</small></div>
              <div className="code-lines">
                <p><i>01</i> <b>const</b> developer = {"{"}</p>
                <p><i>02</i> &nbsp; name: <em>&apos;Albinus Soren&apos;</em>,</p>
                <p><i>03</i> &nbsp; role: <em>&apos;Builder of ideas&apos;</em>,</p>
                <p><i>04</i> &nbsp; interests: [</p>
                <p><i>05</i> &nbsp;&nbsp; <em>&apos;Web & App Dev&apos;</em>,</p>
                <p><i>06</i> &nbsp;&nbsp; <em>&apos;AI & SaaS&apos;</em>,</p>
                <p><i>07</i> &nbsp;&nbsp; <em>&apos;Creative Tech&apos;</em></p>
                <p><i>08</i> &nbsp; ]</p><p><i>09</i> {"};"}</p><p className="code-comment"><i>10</i> {"// always learning ✦"}</p>
              </div>
              <div className="window-footer"><span className="live-pulse" /> BUILDING SOMETHING NEW <small>UTF-8</small></div>
            </div>
            <div className="float-chip chip-top">✳ &nbsp;Creative thinking</div><div className="float-chip chip-bottom">⌘ &nbsp;Build · Learn · Repeat</div>
          </div>
          <a className="scroll-cue" href="#about">— &nbsp; SCROLL TO EXPLORE</a>
        </section>

        <section className="section shell" id="about">
          <div className="section-heading"><p className="kicker">01 / ABOUT ME</p><h2>Curious mind.<br /><span className="muted">Builder mindset.</span></h2></div>
          <div className="about-grid">
            <div className="about-copy"><p className="lead">I’m an Electronics & Communication Engineering student from India with a strong interest in technology, product building, and digital creativity.</p><p>I enjoy exploring how software and emerging AI tools can solve real problems. My interests span frontend experiences, app development, SaaS ideas, content creation, and tools that make technology more accessible.</p><p>This portfolio is my evolving workspace — a place to share experiments, projects, and what I’m learning along the way.</p><a className="text-link" href="mailto:albinussoren@gmail.com?subject=Please%20send%20your%20resume">Request résumé <span>↗</span></a></div>
            <div className="about-cards"><article className="mini-card"><span>⌘</span><h3>Build</h3><p>Practical websites, apps, and digital products.</p></article><article className="mini-card"><span>✳</span><h3>Explore</h3><p>AI, automation, and new ways to create.</p></article><article className="mini-card"><span>↗</span><h3>Improve</h3><p>Learn continuously and ship better work.</p></article><article className="mini-card"><span>◉</span><h3>Create</h3><p>Technology with a thoughtful visual identity.</p></article></div>
          </div>
        </section>

        <section className="section shell" id="skills">
          <div className="section-heading"><p className="kicker">02 / TOOLKIT</p><h2>Things I work with<span className="gradient-text">.</span></h2><p className="section-subtitle">A growing toolkit. Proficiency varies by tool and project.</p></div>
          <div className="skills-grid">
            <article className="skill-card"><div className="skill-top"><span>⌘</span><small>01</small></div><h3>Web Development</h3><p>Responsive interfaces and web fundamentals.</p><div className="tags"><span>HTML</span><span>CSS</span><span>JavaScript</span><span>React / Next.js</span></div></article>
            <article className="skill-card"><div className="skill-top"><span>⌬</span><small>02</small></div><h3>Backend & Data</h3><p>APIs, application logic, and data storage.</p><div className="tags"><span>Python</span><span>FastAPI</span><span>SQL</span><span>REST APIs</span></div></article>
            <article className="skill-card"><div className="skill-top"><span>✳</span><small>03</small></div><h3>AI & Automation</h3><p>Exploring AI-assisted workflows and tools.</p><div className="tags"><span>LLMs</span><span>Prompt Design</span><span>Automation</span></div></article>
            <article className="skill-card"><div className="skill-top"><span>◈</span><small>04</small></div><h3>Creative Technology</h3><p>Product thinking, content, and visual experiences.</p><div className="tags"><span>UI/UX</span><span>Figma</span><span>Content</span><span>Video</span></div></article>
          </div>
        </section>

        <section className="section shell" id="projects">
          <div className="section-heading"><p className="kicker">03 / SELECTED WORK</p><h2>Projects & experiments<span className="gradient-text">.</span></h2><p className="section-subtitle">Manage this section through the private admin dashboard. Concepts are labelled honestly.</p></div>
          <ProjectExplorer projects={projects} />
        </section>

        <section className="section shell journey-section">
          <div className="section-heading"><p className="kicker">04 / CURRENT FOCUS</p><h2>Learning by building<span className="gradient-text">.</span></h2></div>
          <div className="journey-list"><div className="journey-item"><span>01</span><div><h3>Engineering fundamentals</h3><p>Electronics, communication systems, digital logic, and MATLAB.</p></div><b>↗</b></div><div className="journey-item"><span>02</span><div><h3>Full-stack development</h3><p>Building better user interfaces and connecting them to APIs and data.</p></div><b>↗</b></div><div className="journey-item"><span>03</span><div><h3>AI-powered products</h3><p>Learning how AI can make tools more useful, approachable, and creative.</p></div><b>↗</b></div></div>
        </section>

        <section className="contact-section" id="contact"><div className="shell contact-inner"><p className="kicker">05 / HAVE AN IDEA?</p><h2>Let’s make something<br /><span className="gradient-text">meaningful.</span></h2><p className="contact-intro">Have a project, collaboration, or just want to talk technology? Send me a message.</p><ContactForm /><a className="email-big" href="mailto:albinussoren@gmail.com">albinussoren@gmail.com ↗</a></div></section>
      </main>
      <footer className="footer shell"><a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span className="brand-name">ALBINUS SOREN<small>BUILD · LEARN · REPEAT</small></span></a><p>Designed with curiosity. Built for what’s next.</p><div className="footer-links"><a href="https://github.com/albinussor" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:albinussoren@gmail.com">Email ↗</a><Link href="/admin">Admin ↗</Link></div><small className="copyright">© {new Date().getFullYear()} Albinus Soren</small></footer>
    </SiteChrome>
  );
}