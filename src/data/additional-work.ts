import type { AdditionalWork } from "../types";

export const additionalWork: AdditionalWork[] = [
  {
    name: "Northline storefront",
    technologies: "Django · Python",
    description:
      "An English-first storefront prototype with an original synthetic catalog; checkout, payments, and shipping are outside its scope.",
    github: "https://github.com/krustallik/internet_shop_django",
  },
  {
    name: "MVS Skills",
    technologies: "ASP.NET Core MVC · C#",
    description:
      "An academic skills directory with search and owner-managed profiles. Demo profiles are synthetic, and production hosting is unverified.",
    github: "https://github.com/krustallik/MVS_Skills",
  },
  {
    name: "Citizen reporting app",
    technologies: "Expo · React Native · Koa",
    description:
      "A mobile reporting prototype with an offline queue; repository screenshots use labeled synthetic reports and locations.",
    github: "https://github.com/krustallik/finalProject",
  },
  {
    name: "Personal spending log",
    technologies: "Expo · React Native · SQLite",
    description:
      "An on-device expense and weight tracker. The app has no configured API, cloud sync, or in-app backup.",
    github: "https://github.com/krustallik/MoneyControllMobile",
  },
  {
    name: "Chess",
    technologies: "C++ · Qt · Stockfish",
    description:
      "A Qt desktop game with local two-player and Stockfish modes, backed by a bundled engine binary.",
    github: "https://github.com/krustallik/Chess",
  },
];

export const researchNote = {
  openFoam: "https://github.com/krustallik/OpenFoamFlowSimulation",
  modulus: "https://github.com/krustallik/modulus_workspace",
} as const;
