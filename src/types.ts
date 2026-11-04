export type ProjectCategory =
  | "Full-stack"
  | "Automation"
  | "Mobile"
  | "AI & ML"
  | "Research";

export interface Project {
  slug: string;
  name: string;
  shortName: string;
  category: ProjectCategory;
  description: string;
  context: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  technologies: string[];
  highlights: string[];
  contribution?: string;
  overview: string;
  problem: string;
  capabilities: string[];
  architecture: string;
  limitations: string;
  github: string;
  demo?: string;
  demoLabel?: string;
}

export interface AdditionalWork {
  name: string;
  technologies: string;
  description: string;
  github: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
  evidence: string;
}
