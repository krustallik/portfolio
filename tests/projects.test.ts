import { describe, expect, it } from "vitest";
import { additionalWork } from "../src/data/additional-work";
import { profile } from "../src/data/profile";
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

  it("keeps project roles and limitations grounded in the reviewed repositories", () => {
    expect(getProjectBySlug("booktop-marketplace")?.contribution).toContain("frontend developer");
    expect(getProjectBySlug("building-management-app")?.contribution).toContain("Project Coordinator");
    expect(getProjectBySlug("missing-data-tabular-models")?.contribution).toContain("co-authored");
    expect(getProjectBySlug("missing-data-tabular-models")?.limitations).toContain("have not been reproduced");
    expect(additionalWork).toHaveLength(5);
    expect(additionalWork.some((item) => item.github.includes("feedaily"))).toBe(false);
  });

  it("shows the two education paths and the user-provided contact email", () => {
    expect(profile.education).toEqual([
      {
        institution: "Technical University of Košice",
        location: "Košice, Slovakia",
        qualifications: [
          {
            program: "Bachelor's degree in Computer Science",
            status: "Completed in 2025",
          },
          {
            program: "Engineering studies (Ing.) in Computer Science",
            status: "Currently studying · second and final year",
            current: true,
          },
        ],
      },
      {
        institution: "IT STEP Academy",
        location: "Chernivtsi, Ukraine",
        qualifications: [
          {
            program: "Software Development — Two-Year Program",
            status: "Completed",
          },
        ],
      },
    ]);
    expect(profile.name).toBe("Bc. Ihor Havryliv");
    expect(profile.role).toContain("Computer Science graduate");
    expect(profile.email).toBe("ihorhavryliv123@gmail.com");
  });
});
