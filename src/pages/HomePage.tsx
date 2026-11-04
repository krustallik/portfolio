import { Fragment, useState } from "react";
import { ArrowDown, ArrowUpRight, GitBranch, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectAtlas } from "../components/ProjectAtlas";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectFilters } from "../components/ProjectFilters";
import { SectionHeading } from "../components/SectionHeading";
import { additionalWork, getAdditionalWorkBySlug, researchNote } from "../data/additional-work";
import { additionalExperience, skillGroups } from "../data/skills";
import { profile } from "../data/profile";
import { getFilteredProjects, getProjectBySlug } from "../data/projects";
import type { ProjectCategory } from "../types";
import { usePageMetadata } from "../hooks/usePageMetadata";

function renderSkillEvidence(reference: (typeof skillGroups)[number]["skills"][number]["evidence"][number], index: number) {
  if ("projectSlug" in reference) {
    const project = getProjectBySlug(reference.projectSlug);
    if (!project) return null;
    return (
      <Fragment key={`${reference.projectSlug}-${reference.context ?? ""}`}>
        {index > 0 && <span aria-hidden="true"> · </span>}
        <Link to={`/projects/${project.slug}`}>{project.shortName}</Link>
        {reference.context && <span className="evidence-context"> ({reference.context})</span>}
      </Fragment>
    );
  }

  const item = getAdditionalWorkBySlug(reference.additionalWorkSlug);
  if (!item) return null;
  return (
    <Fragment key={`${reference.additionalWorkSlug}-${reference.context ?? ""}`}>
      {index > 0 && <span aria-hidden="true"> · </span>}
      <a href={item.github} target="_blank" rel="noreferrer">{item.name}</a>
      {reference.context && <span className="evidence-context"> ({reference.context})</span>}
    </Fragment>
  );
}

export function HomePage() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const visibleProjects = getFilteredProjects(filter);
  usePageMetadata(
    "Full-stack developer and Computer Science graduate",
    `${profile.name} is a Computer Science graduate and engineering student in Košice, Slovakia, building full-stack applications, automation, and research projects.`,
  );

  return (
    <main id="main-content">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-location">
            <MapPin size={15} aria-hidden="true" />
            <span className="hero-name">{profile.name}</span>
            <span className="hero-city">{profile.location}</span>
          </p>
          <h1 id="hero-title">Software for the <span>real world.</span></h1>
          <p className="hero-lede">
            I build useful applications, connect the systems behind them, and automate work that should not need repeating.
          </p>
          <p className="hero-positioning">
            {profile.role.split(" · ").map((item, index) => (
              <Fragment key={item}>{index > 0 && <span aria-hidden="true">/</span>}{item}</Fragment>
            ))}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore selected work <ArrowDown size={16} aria-hidden="true" /></a>
            <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer"><GitBranch size={17} aria-hidden="true" /> GitHub profile <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
          <div className="availability-line"><span className="availability-dot" aria-hidden="true" />{profile.availability}<span className="availability-separator" />Košice, hybrid, or remote</div>
        </div>
        <div className="hero-visual"><ProjectAtlas /></div>
        <a className="hero-scroll" href="#projects" aria-label="Scroll to selected projects"><span>Scroll to explore</span><ArrowDown size={14} aria-hidden="true" /></a>
      </section>

      <section className="projects-section section-shell" id="projects" aria-labelledby="projects-title">
        <div className="shell">
          <div className="projects-heading-row">
            <SectionHeading
              label="Selected projects"
              title="Proof in the work."
              titleId="projects-title"
              description="A small selection across applications, automation, mobile, and applied research. Each case study explains what is implemented and where the boundaries are."
            />
            <a className="all-work-link" href={profile.github} target="_blank" rel="noreferrer">All repositories <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <ProjectFilters value={filter} onChange={setFilter} />
          <p className="project-result-count" aria-live="polite">Showing {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}</p>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                featured={filter === "All" && index === 0}
                wide={filter === "All" && index === visibleProjects.length - 1 && visibleProjects.length % 2 === 0}
              />
            ))}
          </div>
          {filter === "All" && (
            <section className="other-work" aria-labelledby="other-work-title">
              <div className="other-work-heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />Beyond the case studies</p>
                <h3 id="other-work-title">More work, across platforms.</h3>
              </div>
              <ul className="other-work-grid">
                {additionalWork.map((item) => (
                  <li className="other-work-item" key={item.name}>
                    <div className="other-work-item-heading">
                      <h4>{item.name}</h4>
                      <span>{item.technologies}</span>
                    </div>
                    <p>{item.description}</p>
                    <a href={item.github} target="_blank" rel="noreferrer">
                      Repository <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="research-note">
                Historical thesis note: 2025 OpenFOAM and Modulus results came from a separate steady run and have not been reproduced from the current repositories. The tracked OpenFOAM transient log is incomplete, and the current Modulus checkout has no training result. See <a href={researchNote.openFoam} target="_blank" rel="noreferrer">OpenFOAM</a> and <a href={researchNote.modulus} target="_blank" rel="noreferrer">Modulus</a>.
              </p>
            </section>
          )}
        </div>
      </section>

      <section className="about-section section-shell" id="about" aria-labelledby="about-title">
        <div className="shell about-layout">
          <div className="about-copy">
            <SectionHeading label="A bit about me" title="Curious about the whole system." titleId="about-title" />
            <p className="about-lede">
              I enjoy building software that connects interfaces, APIs, data, and automation into systems people can understand and rely on.
            </p>
            <p>
              My recent work spans web and mobile applications, operations automation, and applied research. I like following a feature from a user action through validation and persistence to the way it runs.
            </p>
            <a className="text-link about-link" href={profile.github} target="_blank" rel="noreferrer">See the source work <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="education-card">
            <h3 className="education-card-label">Education</h3>
            <div className="education-mark" aria-hidden="true">02</div>
            {profile.education.map((item, index) => (
              <div className={`education-record${index > 0 ? " education-record-secondary" : ""}`} key={item.institution}>
                <h4>{item.institution}</h4>
                {item.qualifications.map((qualification) => (
                  <div className="education-qualification" key={qualification.program}>
                    <p>{qualification.program}</p>
                    <div className="education-stage">
                      <span className={`stage-dot${"current" in qualification && qualification.current ? " stage-dot-current" : ""}`} aria-hidden="true" />
                      <div><strong>{qualification.status}</strong><span>{item.location}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section section-shell" id="skills" aria-labelledby="skills-title">
        <div className="shell">
          <div className="skills-intro">
            <SectionHeading
              label="Tools in practice"
              title="Breadth with evidence."
              titleId="skills-title"
              description="Each tool or delivery skill links to the work that supports it. Team-project examples are labeled so the shared contribution stays clear."
            />
            <p className="skills-note">Experience varies by tool. Java is earlier experience rather than a current focus.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-group" key={group.title}>
                <div className="skill-group-top"><span className="skill-index">0{index + 1}</span><span className="skill-group-rule" /></div>
                <h3>{group.title}</h3>
                <ul className="skill-practice-list">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <span className="skill-practice-name">{skill.name}</span>
                      <span className="skill-evidence-links">{skill.evidence.map(renderSkillEvidence)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="additional-skills">
            <span>Also worked with</span>
            {additionalExperience.map((skill) => {
              const item = getAdditionalWorkBySlug(skill.additionalWorkSlug);
              return (
                <span className="additional-skill" key={skill.name}>
                  {item ? <a href={item.github} target="_blank" rel="noreferrer">{skill.name}</a> : skill.name}
                  <span className="additional-skill-context"> · {skill.context}</span>
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <section className="approach-section" aria-labelledby="approach-title">
        <div className="shell approach-inner">
          <div className="approach-heading">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" aria-hidden="true" />How I like to work</p>
            <h2 id="approach-title">Understand the edges.<br /><span>Then make it useful.</span></h2>
          </div>
          <div className="approach-list">
            <article><span>01</span><div><h3>Follow the data</h3><p>Keep inputs, assumptions, and derived results visible so the system can be understood and checked.</p></div></article>
            <article><span>02</span><div><h3>Think end to end</h3><p>Connect the interface to the API, storage, and operating environment instead of stopping at the first screen.</p></div></article>
            <article><span>03</span><div><h3>Automate the repeatable</h3><p>Make recurring work explicit, configurable, and easier to observe when something changes.</p></div></article>
          </div>
        </div>
      </section>

      <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
        <div className="shell contact-layout">
          <div>
            <SectionHeading label="Start a conversation" title="Have a role in mind?" titleId="contact-title" />
            <p className="contact-description">I welcome messages about software roles and projects where I could contribute.</p>
          </div>
          <div className="contact-card">
            <span className="contact-card-label">Best way to reach me</span>
            <a className="contact-primary" href={`mailto:${profile.email}`}><Mail size={21} aria-hidden="true" /><span>{profile.email}</span><ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="contact-secondary" href={profile.github} target="_blank" rel="noreferrer"><GitBranch size={15} aria-hidden="true" /> GitHub profile <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
