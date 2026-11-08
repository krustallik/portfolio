import type { AdditionalSkill, AdditionalWork } from "../types";

export const additionalWork: AdditionalWork[] = [
  {
    slug: "northline-storefront",
    name: "Northline storefront",
    technologies: "Django · Python",
    description:
      "An English-language Django storefront with product search, category filters, discounts, promo codes, customer reviews, and account profiles. A session-based shopping bag carries selected products through the browsing flow.",
    github: "https://github.com/krustallik/internet_shop_django",
  },
  {
    slug: "mvs-skills",
    name: "MVS Skills",
    technologies: "ASP.NET Core MVC · C#",
    description:
      "An academic skills directory built with ASP.NET Core MVC. Users can create professional profiles, search by name, profession, or skill, upload profile images, and rate other profiles.",
    github: "https://github.com/krustallik/MVS_Skills",
  },
  {
    slug: "citizen-reporting",
    name: "Citizen reporting app",
    technologies: "Expo · React Native · Koa",
    description:
      "A cross-platform community reporting app for creating reports with a category, photo, and location, then exploring them on a map or calendar. An offline queue syncs reports through a Koa API backed by MongoDB.",
    github: "https://github.com/krustallik/finalProject",
  },
  {
    slug: "personal-spending-log",
    name: "Personal spending log",
    technologies: "Expo · React Native · SQLite",
    description:
      "A mobile tracker for expenses and weight measurements, with date filters, spending summaries, category totals, and weight charts. Records are stored locally in SQLite.",
    github: "https://github.com/krustallik/MoneyControllMobile",
  },
  {
    slug: "chess",
    name: "Chess",
    technologies: "C++ · Qt · Stockfish",
    description:
      "A Qt desktop chess game with local two-player and Stockfish modes. It highlights legal destinations and includes controls to resign or restart a game.",
    github: "https://github.com/krustallik/Chess",
  },
  {
    slug: "python-algorithms",
    name: "Mathemechanic · Grid Sum Puzzle",
    technologies: "Python · Tkinter · Search algorithms",
    description:
      "A Tkinter puzzle game where players select cells to match target sums for every row and column. It includes DFS, backtracking, and forward-checking solvers with step-by-step feedback.",
    github: "https://github.com/krustallik/pythonAlgoritms",
  },
  {
    slug: "openfoam-drone-flow",
    name: "OpenFOAM Drone Flow Simulation",
    technologies: "OpenFOAM 12 · CFD · RANS",
    description:
      "A transient incompressible RANS case for airflow around a drone body and four propeller blades. The case defines STL geometry, snappyHexMesh setup, boundary conditions, and a k–ε turbulence model.",
    github: "https://github.com/krustallik/OpenFoamFlowSimulation",
  },
  {
    slug: "modulus-drone-flow",
    name: "Drone Flow PINN",
    technologies: "Python · NVIDIA Modulus Sym · PINNs",
    description:
      "A physics-informed neural network prototype for steady three-dimensional airflow around a drone. Its Modulus Sym scripts define velocity and pressure fields with Navier–Stokes and boundary constraints over STL geometry.",
    github: "https://github.com/krustallik/modulus_workspace",
  },
];

export function getAdditionalWorkBySlug(slug: string | undefined): AdditionalWork | undefined {
  return additionalWork.find((item) => item.slug === slug);
}

export const additionalExperience: AdditionalSkill[] = [
  { name: "Java", context: "Earlier experience" },
];
