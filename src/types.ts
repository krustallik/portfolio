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
  projectStack: string[];
  personalRole: string;
  contributions: string[];
  highlights: string[];
  gallery: ProjectGalleryImage[];
  galleryNote: string;
  overview: string;
  problem: string;
  capabilities: string[];
  architecture: string;
  limitations: string;
  github: string;
  demo?: string;
  demoLabel?: string;
}

export interface ProjectGalleryImage {
  src: string;
  thumbnail: string;
  sourceUrl: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  thumbnailWidth: number;
  thumbnailHeight: number;
  orientation: "landscape" | "portrait";
}

export interface AdditionalWork {
  slug: string;
  name: string;
  technologies: string;
  description: string;
  github: string;
}

export interface SkillGroup {
  title: string;
  skills: SkillWithEvidence[];
}

export interface SkillWithEvidence {
  name: string;
  evidence: SkillEvidenceReference[];
}

export type SkillEvidenceReference =
  | { projectSlug: string; context?: string }
  | { additionalWorkSlug: string; context?: string };

export interface AdditionalSkill {
  name: string;
  context: string;
  additionalWorkSlug?: string;
}
