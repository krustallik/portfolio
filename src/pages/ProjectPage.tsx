import { ArrowLeft, ArrowUpRight, Check, GitBranch } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug, projects } from "../data/projects";
import { usePageMetadata } from "../hooks/usePageMetadata";

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  usePageMetadata(
    project?.name ?? "Project not found",
    project?.description ?? "The requested project case study is not in this portfolio.",
  );

  if (!project) {
    return (
      <main className="not-found shell" id="main-content">
        <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />No matching project</p>
        <h1>This page is off the map.</h1>
        <p>The project link may have changed. Return to the selected work and choose another case study.</p>
        <Link className="button button-primary" to="/">Back to the portfolio <ArrowLeft size={16} aria-hidden="true" /></Link>
      </main>
    );
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug) + 1;

  return (
    <main className="project-page" id="main-content">
      <section className="project-detail-hero shell">
        <Link className="back-link" to="/#projects"><ArrowLeft size={15} aria-hidden="true" /> All selected work</Link>
        <div className="project-detail-heading">
          <div className="project-detail-intro">
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />{project.category} · Case study {String(projectIndex).padStart(2, "0")}</p>
            <h1>{project.name}</h1>
            <p className="project-detail-lede">{project.description}</p>
            <p className="project-context">{project.context}</p>
            <div className="project-detail-actions">
              <a className="button button-primary" href={project.github} target="_blank" rel="noreferrer"><GitBranch size={17} aria-hidden="true" /> View source <ArrowUpRight size={14} aria-hidden="true" /></a>
              {project.demo && <a className="button button-quiet" href={project.demo} target="_blank" rel="noreferrer">{project.demoLabel} <ArrowUpRight size={14} aria-hidden="true" /></a>}
            </div>
          </div>
          <ul className="detail-tech-list" aria-label="Technologies used">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
        <figure className={`detail-image${project.imageFit === "contain" ? " detail-image--contain" : ""}`}>
          <img src={project.image} alt={project.imageAlt} width="1440" height="1000" fetchPriority="high" />
          <figcaption>{project.imageAlt}. <span>Repository screenshot</span></figcaption>
        </figure>
      </section>

      <section className="project-story shell" aria-label="Project details">
        <div className="project-story-aside">
          <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />Project notes</p>
          <p>What it solves, how it is assembled, and what the repository says is still out of scope.</p>
        </div>
        <div className="project-story-content">
          <article className="story-block"><h2>Overview</h2><p>{project.overview}</p></article>
          <article className="story-block"><h2>The problem</h2><p>{project.problem}</p></article>
          <article className="story-block"><h2>What it can do</h2><ul className="capability-list">{project.capabilities.map((capability) => <li key={capability}><Check size={16} aria-hidden="true" />{capability}</li>)}</ul></article>
          <article className="story-block"><h2>How it is built</h2><p>{project.architecture}</p></article>
          <article className="story-block story-limitations"><h2>Scope and limitations</h2><p>{project.limitations}</p></article>
          <a className="story-source-link" href={project.github} target="_blank" rel="noreferrer"><GitBranch size={17} aria-hidden="true" /> Read the repository <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </section>
      <nav className="project-pagination shell" aria-label="More project case studies">
        {projects.filter((item) => item.slug !== project.slug).slice(0, 3).map((item) => (
          <Link key={item.slug} to={`/projects/${item.slug}`}><span>Next to explore</span><strong>{item.shortName}</strong><ArrowUpRight size={15} aria-hidden="true" /></Link>
        ))}
      </nav>
    </main>
  );
}
