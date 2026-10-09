 "use client";

import { useMemo, useState } from "react";
import type { PortfolioProject } from "@/lib/projects";

const artClasses: Record<string, string> = {
  web: "art-blue",
  ai: "art-purple",
  creative: "art-cyan"
};

export function ProjectExplorer({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => projects.filter(project => filter === "all" || project.category === filter), [projects, filter]);

  return <>
    <div className="project-filters" role="group" aria-label="Filter projects">
      {[["all", "All work"], ["web", "Web & Apps"], ["ai", "AI & SaaS"], ["creative", "Creative"]].map(([key, label]) =>
        <button key={key} className={`filter-btn ${filter === key ? "active" : ""}`} onClick={() => setFilter(key)}>{label}</button>
      )}
    </div>
    {filtered.length ? <div className="projects-grid">
      {filtered.map(project => <article className="project-card" key={project.id}>
        <div className={`project-art ${artClasses[project.category] || "art-blue"}`}>
          <span className="art-label">{project.category.toUpperCase()} / PORTFOLIO</span>
          <div className="project-art-mark">{project.title.split(/\s+/).map(s => s[0]).join("").slice(0, 4).toUpperCase()}</div>
          <div className="art-grid" />
        </div>
        <div className="project-info">
          <div className="project-meta"><span>{project.category === "web" ? "Web & Apps" : project.category === "ai" ? "AI & SaaS" : "Creative Tech"}</span><span className="project-state">{project.status}</span></div>
          <h3>{project.title}</h3><p>{project.summary}</p>
          <div className="tags">{(project.technologies || []).slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="project-bottom">
            <span className="project-slug">/{project.slug}</span>
            <div className="project-links">{project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer">Live ↗</a>}{project.repo_url && <a href={project.repo_url} target="_blank" rel="noreferrer">Code ↗</a>}</div>
          </div>
        </div>
      </article>)}
    </div> : <div className="empty-projects"><span>✳</span><h3>Projects are being updated.</h3><p>Check back soon for new experiments and releases.</p></div>}
  </>;
}