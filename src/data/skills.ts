import type { SkillGroup } from "../types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend development",
    skills: [
      {
        name: "React",
        evidence: [
          { projectSlug: "public-lighting-fault-reporting" },
          { projectSlug: "booktop-marketplace", context: "frontend" },
          { projectSlug: "bodycast" },
        ],
      },
      {
        name: "React Native",
        evidence: [{ projectSlug: "building-management-app", context: "team contribution" }],
      },
      {
        name: "TypeScript",
        evidence: [
          { projectSlug: "public-lighting-fault-reporting" },
          { projectSlug: "booktop-marketplace", context: "frontend" },
          { projectSlug: "bodycast" },
          { projectSlug: "building-management-app", context: "team contribution" },
        ],
      },
      {
        name: "Next.js",
        evidence: [
          { projectSlug: "booktop-marketplace", context: "frontend" },
          { projectSlug: "bodycast" },
        ],
      },
    ],
  },
  {
    title: "APIs and data",
    skills: [
      {
        name: "Node.js",
        evidence: [{ projectSlug: "public-lighting-fault-reporting" }],
      },
      {
        name: "REST APIs",
        evidence: [
          { projectSlug: "public-lighting-fault-reporting" },
          { projectSlug: "bodycast" },
          { projectSlug: "building-management-app", context: "team contribution" },
        ],
      },
      {
        name: "NestJS",
        evidence: [{ projectSlug: "building-management-app", context: "team contribution" }],
      },
      {
        name: "PostgreSQL",
        evidence: [
          { projectSlug: "public-lighting-fault-reporting" },
          { projectSlug: "bodycast" },
        ],
      },
      {
        name: "PostGIS",
        evidence: [{ projectSlug: "public-lighting-fault-reporting" }],
      },
      {
        name: "Prisma",
        evidence: [{ projectSlug: "bodycast" }],
      },
    ],
  },
  {
    title: "Automation and delivery",
    skills: [
      {
        name: "C# · .NET",
        evidence: [{ projectSlug: "gymbeam-shifts" }],
      },
      {
        name: "ASP.NET Core",
        evidence: [{ projectSlug: "gymbeam-shifts" }],
      },
      {
        name: "Selenium",
        evidence: [{ projectSlug: "gymbeam-shifts" }],
      },
      {
        name: "Docker Compose",
        evidence: [
          { projectSlug: "public-lighting-fault-reporting" },
          { projectSlug: "gymbeam-shifts" },
        ],
      },
      {
        name: "GitHub Actions",
        evidence: [{ projectSlug: "gymbeam-shifts" }],
      },
      {
        name: "Project coordination",
        evidence: [{ projectSlug: "building-management-app", context: "five-person student team" }],
      },
    ],
  },
  {
    title: "Research and systems",
    skills: [
      {
        name: "Python",
        evidence: [{ projectSlug: "missing-data-tabular-models" }],
      },
      {
        name: "pandas · scikit-learn",
        evidence: [{ projectSlug: "missing-data-tabular-models" }],
      },
      {
        name: "C++ · Qt",
        evidence: [{ additionalWorkSlug: "chess" }],
      },
    ],
  },
];

export { additionalExperience } from "./additional-work";
