import { ArrowLeft, ArrowUpRight, Check, GitBranch } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ProjectGallery } from "../components/ProjectGallery";
import { getProjectBySlug, projects } from "../data/projects";
import { getLocalizedProject } from "../data/project-translations";
import { useLocale } from "../i18n/useLocale";
import { usePageMetadata } from "../hooks/usePageMetadata";

export function ProjectPage() {
  const { slug } = useParams();
  const { locale, messages, format } = useLocale();
  const sourceProject = getProjectBySlug(slug);
  const project = sourceProject ? getLocalizedProject(sourceProject, locale) : undefined;

  usePageMetadata(
    project?.name ?? messages.projectPage.unknownTitle,
    project?.description ?? messages.projectPage.unknownDescription,
  );

  if (!project) {
    return (
      <main className="not-found shell" id="main-content">
        <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />{messages.projectPage.unknownTitle}</p>
        <h1>{messages.notFound.title}</h1>
        <p>{messages.projectPage.unknownDescription} {messages.notFound.description}</p>
        <Link className="button button-primary" to="/">{messages.projectPage.backToPortfolio} <ArrowLeft size={16} aria-hidden="true" /></Link>
      </main>
    );
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug) + 1;

  return (
    <main className="project-page" id="main-content">
      <section className="project-detail-hero shell">
        <Link className="back-link" to="/#projects"><ArrowLeft size={15} aria-hidden="true" /> {messages.projectPage.backToWork}</Link>
        <div className="project-detail-heading">
          <div className="project-detail-intro">
            <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />{messages.categories[project.category]} · {format(messages.projectPage.caseStudy, { number: String(projectIndex).padStart(2, "0") })}</p>
            <h1>{project.name}</h1>
            <p className="project-detail-lede">{project.description}</p>
            <p className="project-context">{project.context}</p>
            <div className="project-detail-actions">
              <a className="button button-primary" href={project.github} target="_blank" rel="noreferrer"><GitBranch size={17} aria-hidden="true" /> {messages.projectPage.source} <ArrowUpRight size={14} aria-hidden="true" /></a>
              {project.demo && <a className="button button-quiet" href={project.demo} target="_blank" rel="noreferrer">{project.demoLabel} <ArrowUpRight size={14} aria-hidden="true" /></a>}
            </div>
          </div>
          <div className="detail-project-stack">
            <p>{messages.projectPage.projectStack}</p>
            <ul className="detail-tech-list" aria-label={messages.projectPage.projectStackLabel}>
              {project.projectStack.map((technology) => <li key={technology} translate="no">{technology}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <ProjectGallery projectName={project.name} images={project.gallery} note={project.galleryNote} />

      <section className="project-story shell" aria-label={messages.projectPage.details}>
        <div className="project-story-aside">
          <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />{messages.projectPage.notes}</p>
          <p>{messages.projectPage.notesDescription}</p>
        </div>
        <div className="project-story-content">
          <article className="story-block"><h2>{messages.projectPage.overview}</h2><p>{project.overview}</p></article>
          <article className="story-block">
            <h2>{messages.projectPage.roleAndContributions}</h2>
            <p className="story-role"><strong>{messages.projectPage.myRole}</strong> {project.personalRole}</p>
            <h3 className="contribution-heading">{messages.projectPage.myContributions}</h3>
            <ul className="contribution-list">
              {project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
            </ul>
          </article>
          <article className="story-block"><h2>{messages.projectPage.problem}</h2><p>{project.problem}</p></article>
          <article className="story-block"><h2>{messages.projectPage.capabilities}</h2><ul className="capability-list">{project.capabilities.map((capability) => <li key={capability}><Check size={16} aria-hidden="true" />{capability}</li>)}</ul></article>
          <article className="story-block"><h2>{messages.projectPage.build}</h2><p>{project.architecture}</p></article>
          <article className="story-block story-limitations"><h2>{messages.projectPage.limitations}</h2><p>{project.limitations}</p></article>
          <a className="story-source-link" href={project.github} target="_blank" rel="noreferrer"><GitBranch size={17} aria-hidden="true" /> {messages.projectPage.readRepository} <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </section>
      <nav className="project-pagination shell" aria-label={messages.projectPage.moreCaseStudies}>
        {projects.filter((item) => item.slug !== project.slug).slice(0, 3).map((item) => {
          const localizedItem = getLocalizedProject(item, locale);
          return (
            <Link key={item.slug} to={`/projects/${item.slug}`}><span>{messages.projectPage.nextToExplore}</span><strong>{localizedItem.shortName}</strong><ArrowUpRight size={15} aria-hidden="true" /></Link>
          );
        })}
      </nav>
    </main>
  );
}
