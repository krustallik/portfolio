import { useState } from "react";
import { ArrowDown, ArrowUpRight, GitBranch, MapPin } from "lucide-react";
import { ProjectAtlas } from "../components/ProjectAtlas";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectFilters } from "../components/ProjectFilters";
import { SectionHeading } from "../components/SectionHeading";
import { additionalExperience, skillGroups } from "../data/skills";
import { profile } from "../data/profile";
import { getFilteredProjects } from "../data/projects";
import type { ProjectCategory } from "../types";
import { usePageMetadata } from "../hooks/usePageMetadata";

export function HomePage() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const visibleProjects = getFilteredProjects(filter);
  usePageMetadata(
    "Full-stack developer and computer science student",
    "Ihor Havryliv is a computer science student in Košice, Slovakia, building full-stack applications, automation, and research projects.",
  );

  return (
    <main id="main-content">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-location"><MapPin size={15} aria-hidden="true" />{profile.name} · {profile.location}</p>
          <h1 id="hero-title">Software for the <span>real world.</span></h1>
          <p className="hero-lede">
            I build useful applications, connect the systems behind them, and automate work that should not need repeating.
          </p>
          <p className="hero-positioning">Computer Science student <span aria-hidden="true">/</span> Full-stack development <span aria-hidden="true">/</span> Automation</p>
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
              <ProjectCard key={project.slug} project={project} featured={filter === "All" && index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="about-section section-shell" id="about" aria-labelledby="about-title">
        <div className="shell about-layout">
          <div className="about-copy">
            <SectionHeading label="A bit about me" title="Curious about the whole system." titleId="about-title" />
            <p className="about-lede">
              I am a computer science student at the Technical University of Košice. I have completed my bachelor’s degree and am finishing the final year of engineering-level studies.
            </p>
            <p>
              My projects move between web and mobile products, APIs, data, and automation. I enjoy the decisions between those layers: how a user action becomes a reliable workflow, how data stays explainable, and how a project can be run again by someone else.
            </p>
            <p>
              I am looking for a part-time software development role alongside university, based in Košice or remote.
            </p>
            <a className="text-link about-link" href={profile.github} target="_blank" rel="noreferrer">See the source work <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="education-card">
            <div className="education-card-label">Education</div>
            <div className="education-mark" aria-hidden="true">TUKE</div>
            <h3>Technical University of Košice</h3>
            <p>Computer Science</p>
            <div className="education-rule" />
            <div className="education-stage"><span className="stage-dot" /><div><strong>Bachelor’s degree</strong><span>Completed</span></div></div>
            <div className="education-stage"><span className="stage-dot stage-dot-current" /><div><strong>Engineering studies</strong><span>Final year in progress</span></div></div>
            <p className="education-note">No graduation date listed.</p>
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
              description="These groups reflect technologies used in the selected repositories. The project links show where that experience comes from."
            />
            <p className="skills-note">Experience varies by tool. Java is earlier experience rather than a current focus.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-group" key={group.title}>
                <div className="skill-group-top"><span className="skill-index">0{index + 1}</span><span className="skill-group-rule" /></div>
                <h3>{group.title}</h3>
                <ul className="skill-pills">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                <p className="skill-evidence">Evidence: {group.evidence}</p>
              </article>
            ))}
          </div>
          <div className="additional-skills"><span>Also worked with</span>{additionalExperience.map((skill) => <span className="additional-skill" key={skill}>{skill}</span>)}</div>
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
            <p className="contact-description">I am open to part-time software development work while finishing my degree. Košice, hybrid, and suitable remote roles all work for me.</p>
          </div>
          <div className="contact-card">
            <span className="contact-card-label">Best way to reach me</span>
            <a className="contact-github" href={profile.github} target="_blank" rel="noreferrer"><GitBranch size={21} aria-hidden="true" /><span>GitHub profile</span><ArrowUpRight size={18} aria-hidden="true" /></a>
            <p>Public repositories and contact route</p>
            <span className="contact-card-handle">github.com/krustallik</span>
          </div>
        </div>
      </section>
    </main>
  );
}
