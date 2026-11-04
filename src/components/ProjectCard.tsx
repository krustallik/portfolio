import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../types";
import { useLocale } from "../i18n/useLocale";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  wide?: boolean;
}

export function ProjectCard({ project, featured = false, wide = false }: ProjectCardProps) {
  const { messages, format } = useLocale();
  const cover = project.gallery[0];

  return (
    <article className={`project-card${featured ? " project-card--featured" : ""}${wide ? " project-card--wide" : ""}`}>
      <Link className="project-card-image" to={`/projects/${project.slug}`} aria-label={format(messages.card.viewCaseStudy, { name: project.name })}>
        <img
          alt={cover.alt}
          className={cover.orientation === "portrait" ? "image-contain" : ""}
          decoding="async"
          height={cover.height}
          loading="lazy"
          src={cover.src}
          width={cover.width}
        />
        <span className="image-open" aria-hidden="true"><ArrowUpRight size={19} /></span>
      </Link>
      <div className="project-card-content">
        <div className="project-card-meta">
          <span>{messages.categories[project.category]}</span>
          <span>{project.context}</span>
        </div>
        <h3><Link to={`/projects/${project.slug}`}>{project.name}</Link></h3>
        <p>{project.description}</p>
        <div className="project-card-bottom">
          <ul className="tag-list" aria-label={messages.card.technologies}>
            {(project.cardTechnologies ?? project.projectStack).slice(0, featured ? 5 : 4).map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <Link className="text-link" to={`/projects/${project.slug}`}>
            {messages.card.caseStudy} <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
