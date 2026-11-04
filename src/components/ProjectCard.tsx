import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  wide?: boolean;
}

export function ProjectCard({ project, featured = false, wide = false }: ProjectCardProps) {
  return (
    <article className={`project-card${featured ? " project-card--featured" : ""}${wide ? " project-card--wide" : ""}`}>
      <Link className="project-card-image" to={`/projects/${project.slug}`} aria-label={`View ${project.name} case study`}>
        <img
          alt={project.imageAlt}
          className={project.imageFit === "contain" ? "image-contain" : ""}
          decoding="async"
          height="900"
          loading="lazy"
          src={project.image}
          width="1300"
        />
        <span className="image-open" aria-hidden="true"><ArrowUpRight size={19} /></span>
      </Link>
      <div className="project-card-content">
        <div className="project-card-meta">
          <span>{project.category}</span>
          <span>{project.context}</span>
        </div>
        <h3><Link to={`/projects/${project.slug}`}>{project.name}</Link></h3>
        <p>{project.description}</p>
        <div className="project-card-bottom">
          <ul className="tag-list" aria-label="Technologies">
            {project.technologies.slice(0, featured ? 5 : 4).map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <Link className="text-link" to={`/projects/${project.slug}`}>
            Case study <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
