import { describe, expect, it } from "vitest";
import { getFilteredProjects, getProjectBySlug, projects } from "../src/data/projects";

describe("curated project data", () => {
  it("only returns projects in the selected category", () => {
    const results = getFilteredProjects("Automation");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((project) => project.category === "Automation")).toBe(true);
  });

  it("keeps all featured projects available without live API access", () => {
    expect(getFilteredProjects("All")).toHaveLength(6);
  });

  it("returns no project for an unknown slug", () => {
    expect(getProjectBySlug("not-a-real-project")).toBeUndefined();
    expect(getProjectBySlug(projects[0].slug)).toBe(projects[0]);
  });
});
