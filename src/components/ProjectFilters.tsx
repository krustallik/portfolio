import type { ProjectCategory } from "../types";
import { projectCategories } from "../data/projects";

interface ProjectFiltersProps {
  value: ProjectCategory | "All";
  onChange: (category: ProjectCategory | "All") => void;
}

export function ProjectFilters({ value, onChange }: ProjectFiltersProps) {
  const filters: Array<ProjectCategory | "All"> = ["All", ...projectCategories];
  return (
    <div className="project-filters" role="group" aria-label="Filter projects by category">
      {filters.map((category) => (
        <button
          aria-pressed={value === category}
          className={`filter-button${value === category ? " is-selected" : ""}`}
          key={category}
          onClick={() => onChange(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
