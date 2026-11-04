import { describe, expect, it } from "vitest";
import { additionalWork } from "../src/data/additional-work";
import { profile } from "../src/data/profile";
import { skillGroups } from "../src/data/skills";
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

  it("keeps contribution roles and project stack attribution explicit", () => {
    const booktop = getProjectBySlug("booktop-marketplace");
    const building = getProjectBySlug("building-management-app");
    const research = getProjectBySlug("missing-data-tabular-models");
    expect(booktop?.context).toBe("Frontend Developer · Five-person team");
    expect(booktop?.personalRole).toBe("Frontend Developer");
    expect(booktop?.projectStack).toContain(".NET 10");
    expect(booktop?.contributions.join(" ")).toContain("do not claim the .NET API");
    expect(building?.personalRole).toBe("Full-Stack Developer & Project Coordinator");
    expect(building?.contributions.join(" ")).toContain("both frontend and backend development");
    expect(building?.contributions.join(" ")).toContain("five-person student team");
    expect(building?.limitations).toContain("does not imply AT&T employment");
    expect(research?.personalRole).toContain("Co-author");
    expect(research?.limitations).toContain("have not been reproduced");
    expect(research?.highlights.join(" ")).not.toContain("reproducible");
    expect(additionalWork).toHaveLength(5);
    expect(additionalWork.some((item) => item.github.includes("feedaily"))).toBe(false);
  });

  it("maps each practice skill to personal project evidence and labels team contribution", () => {
    const skills = skillGroups.flatMap((group) => group.skills);
    const dotnet = skills.find((skill) => skill.name === "C# · .NET");
    const reactNative = skills.find((skill) => skill.name === "React Native");
    const nest = skills.find((skill) => skill.name === "NestJS");
    const coordination = skills.find((skill) => skill.name === "Project coordination");
    expect(dotnet?.evidence).toEqual([{ projectSlug: "gymbeam-shifts" }]);
    expect(reactNative?.evidence).toEqual([{ projectSlug: "building-management-app", context: "team contribution" }]);
    expect(nest?.evidence).toEqual([{ projectSlug: "building-management-app", context: "team contribution" }]);
    expect(coordination?.evidence).toEqual([{ projectSlug: "building-management-app", context: "five-person student team" }]);
    expect(skills.find((skill) => skill.name === "React")?.evidence.some((entry) => "projectSlug" in entry && entry.projectSlug === "booktop-marketplace" && entry.context === "frontend")).toBe(true);
    expect(skills.some((skill) => skill.name === "Prisma" && skill.evidence.some((entry) => "projectSlug" in entry && entry.projectSlug === "booktop-marketplace"))).toBe(false);
  });

  it("uses current screenshot collections across every featured case study", () => {
    expect(projects.map((project) => project.gallery.length)).toEqual([5, 5, 2, 8, 7, 4]);
    expect(projects.every((project) => project.gallery.every((image) => image.sourceUrl.includes("raw.githubusercontent.com/krustallik/")))).toBe(true);
    expect(getProjectBySlug("public-lighting-fault-reporting")?.galleryNote).toContain("translated in-browser");
    expect(getProjectBySlug("missing-data-tabular-models")?.galleryNote).toContain("historical report values");
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
            status: "Completed in 2026",
          },
        ],
      },
    ]);
    expect(profile.name).toBe("Bc. Ihor Havryliv");
    expect(profile.role).toContain("Computer Science graduate");
    expect(profile.email).toBe("ihorhavryliv123@gmail.com");
  });
});
