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
import { getLocalizedProject } from "../data/project-translations";
import { useLocale } from "../i18n/useLocale";
import { projectCountMessage } from "../i18n/messages";
import type { ProjectCategory } from "../types";
import { usePageMetadata } from "../hooks/usePageMetadata";

export function HomePage() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const { locale, messages, format } = useLocale();
  const visibleProjects = getFilteredProjects(filter).map((project) => getLocalizedProject(project, locale));
  usePageMetadata(
    messages.metadata.homeTitle,
    format(messages.metadata.homeDescription, { name: profile.name }),
  );

  function renderSkillEvidence(reference: (typeof skillGroups)[number]["skills"][number]["evidence"][number], index: number) {
    const context = reference.context === "team contribution"
      ? messages.skills.teamContribution
      : reference.context === "five-person student team"
        ? messages.skills.fivePersonTeam
        : reference.context === "frontend"
          ? messages.skills.frontend
          : reference.context;

    if ("projectSlug" in reference) {
      const project = getProjectBySlug(reference.projectSlug);
      if (!project) return null;
      const localizedProject = getLocalizedProject(project, locale);
      return (
        <Fragment key={`${reference.projectSlug}-${reference.context ?? ""}`}>
          {index > 0 && <span aria-hidden="true"> · </span>}
          <Link to={`/projects/${project.slug}`}>{localizedProject.shortName}</Link>
          {context && <span className="evidence-context"> ({context})</span>}
        </Fragment>
      );
    }

    const item = getAdditionalWorkBySlug(reference.additionalWorkSlug);
    if (!item) return null;
    const itemContent = messages.additionalWork[item.slug] ?? item;
    return (
      <Fragment key={`${reference.additionalWorkSlug}-${reference.context ?? ""}`}>
        {index > 0 && <span aria-hidden="true"> · </span>}
        <a href={item.github} target="_blank" rel="noreferrer">{itemContent.name}</a>
        {context && <span className="evidence-context"> ({context})</span>}
      </Fragment>
    );
  }

  return (
    <main id="main-content">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-location">
            <MapPin size={15} aria-hidden="true" />
            <span className="hero-name">{profile.name}</span>
            <span className="hero-city">{messages.profile.location}</span>
          </p>
          <h1 id="hero-title">{messages.home.heroTitleBefore} <span>{messages.home.heroTitleAccent}</span></h1>
          <p className="hero-lede">{messages.home.heroDescription}</p>
          <p className="hero-positioning">
            {messages.profile.role.split(" · ").map((item, index) => (
              <Fragment key={item}>{index > 0 && <span aria-hidden="true">/</span>}{item}</Fragment>
            ))}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">{messages.home.exploreWork} <ArrowDown size={16} aria-hidden="true" /></a>
            <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer"><GitBranch size={17} aria-hidden="true" /> {messages.home.githubProfile} <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
          <div className="availability-line"><span className="availability-dot" aria-hidden="true" />{messages.profile.availability}<span className="availability-separator" />{messages.home.availabilityLocation}</div>
        </div>
        <div className="hero-visual"><ProjectAtlas /></div>
        <a className="hero-scroll" href="#projects" aria-label={messages.home.scrollToWork}><span>{messages.home.scrollToWork}</span><ArrowDown size={14} aria-hidden="true" /></a>
      </section>

      <section className="projects-section section-shell" id="projects" aria-labelledby="projects-title">
        <div className="shell">
          <div className="projects-heading-row">
            <SectionHeading
              label={messages.home.projectsLabel}
              title={messages.home.projectsTitle}
              titleId="projects-title"
              description={messages.home.projectsDescription}
            />
            <a className="all-work-link" href={profile.github} target="_blank" rel="noreferrer">{messages.home.allRepositories} <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <ProjectFilters value={filter} onChange={setFilter} />
          <p className="project-result-count" aria-live="polite">{projectCountMessage(locale, visibleProjects.length)}</p>
          <div className="project-grid">
            {visibleProjects.length > 0 ? visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                featured={filter === "All" && index === 0}
                wide={filter === "All" && index === visibleProjects.length - 1 && visibleProjects.length % 2 === 0}
              />
            )) : <p className="project-empty-state">{messages.home.emptyProjects}</p>}
          </div>
          {filter === "All" && (
            <section className="other-work" aria-labelledby="other-work-title">
              <div className="other-work-heading">
                <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />{messages.home.beyondCaseStudies}</p>
                <h3 id="other-work-title">{messages.home.moreWorkTitle}</h3>
              </div>
              <ul className="other-work-grid">
                {additionalWork.map((item) => {
                  const itemContent = messages.additionalWork[item.slug] ?? item;
                  return (
                    <li className="other-work-item" key={item.name}>
                      <div className="other-work-item-heading">
                        <h4>{itemContent.name}</h4>
                        <span>{item.technologies}</span>
                      </div>
                      <p>{itemContent.description}</p>
                      <a href={item.github} target="_blank" rel="noreferrer">
                        {messages.home.repository} <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="research-note">
                {messages.home.researchNote} <a href={researchNote.openFoam} target="_blank" rel="noreferrer">{messages.home.openFoam}</a> {locale === "en" ? "and" : "a"} <a href={researchNote.modulus} target="_blank" rel="noreferrer">{messages.home.modulus}</a>.
              </p>
            </section>
          )}
        </div>
      </section>

      <section className="about-section section-shell" id="about" aria-labelledby="about-title">
        <div className="shell about-layout">
          <div className="about-copy">
            <SectionHeading label={messages.about.label} title={messages.about.title} titleId="about-title" />
            <p className="about-lede">{messages.about.lede}</p>
            <p>{messages.about.body}</p>
            <a className="text-link about-link" href={profile.github} target="_blank" rel="noreferrer">{messages.about.sourceWork} <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="education-card">
            <h3 className="education-card-label">{messages.about.education}</h3>
            <div className="education-mark" aria-hidden="true">02</div>
            {profile.education.map((item, index) => (
              <div className={`education-record${index > 0 ? " education-record-secondary" : ""}`} key={item.institution}>
                <h4>{item.institution}</h4>
                {item.qualifications.map((qualification, qualificationIndex) => {
                  const program = index === 0
                    ? qualificationIndex === 0 ? messages.education.universityBachelor : messages.education.engineering
                    : messages.education.academyProgram;
                  const status = index === 0
                    ? qualificationIndex === 0 ? messages.education.bachelorStatus : messages.education.engineeringStatus
                    : messages.education.academyStatus;
                  const location = index === 0 ? messages.education.universityLocation : messages.education.academyLocation;
                  return (
                    <div className="education-qualification" key={qualification.program}>
                      <p>{program}</p>
                      <div className="education-stage">
                        <span className={`stage-dot${"current" in qualification && qualification.current ? " stage-dot-current" : ""}`} aria-hidden="true" />
                        <div><strong>{status}</strong><span>{location}</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section section-shell" id="skills" aria-labelledby="skills-title">
        <div className="shell">
          <div className="skills-intro">
            <SectionHeading
              label={messages.skills.label}
              title={messages.skills.title}
              titleId="skills-title"
              description={messages.skills.description}
            />
            <p className="skills-note">{messages.skills.note}</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-group" key={group.title}>
                <div className="skill-group-top"><span className="skill-index">0{index + 1}</span><span className="skill-group-rule" /></div>
                <h3>{messages.skills.groups[group.title] ?? group.title}</h3>
                <ul className="skill-practice-list">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <span className="skill-practice-name">{skill.name === "Project coordination" ? messages.skills.projectCoordination : skill.name}</span>
                      <span className="skill-evidence-links">{skill.evidence.map(renderSkillEvidence)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="additional-skills">
            <span>{messages.skills.otherSkills}</span>
            {additionalExperience.map((skill) => {
              const item = getAdditionalWorkBySlug(skill.additionalWorkSlug);
              const context = messages.skills.additionalContexts[skill.context]
                ?? (skill.context === "Earlier experience" ? messages.skills.earlierExperience : skill.context);
              const itemContent = item ? messages.additionalWork[item.slug] ?? item : undefined;
              return (
                <span className="additional-skill" key={skill.name}>
                  {item && itemContent ? <a href={item.github} target="_blank" rel="noreferrer">{itemContent.name}</a> : skill.name}
                  <span className="additional-skill-context"> · {context}</span>
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <section className="approach-section" aria-labelledby="approach-title">
        <div className="shell approach-inner">
          <div className="approach-heading">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" aria-hidden="true" />{messages.approach.label}</p>
            <h2 id="approach-title">{messages.approach.titleFirst}<br /><span>{messages.approach.titleSecond}</span></h2>
          </div>
          <div className="approach-list">
            {messages.approach.items.map((item, index) => (
              <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
        <div className="shell contact-layout">
          <div>
            <SectionHeading label={messages.contact.label} title={messages.contact.title} titleId="contact-title" />
            <p className="contact-description">{messages.contact.description}</p>
          </div>
          <div className="contact-card">
            <span className="contact-card-label">{messages.contact.bestWay}</span>
            <a className="contact-primary" href={`mailto:${profile.email}`}><Mail size={21} aria-hidden="true" /><span>{profile.email}</span><ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="contact-secondary" href={profile.github} target="_blank" rel="noreferrer"><GitBranch size={15} aria-hidden="true" /> {messages.home.githubProfile} <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
