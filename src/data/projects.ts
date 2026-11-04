import type { Project, ProjectCategory, ProjectGalleryImage } from "../types";
import galleryData from "./project-galleries.json";

const galleries = galleryData as unknown as Record<string, ProjectGalleryImage[]>;

export const projects: Project[] = [
  {
    slug: "public-lighting-fault-reporting",
    name: "Public lighting fault reporting",
    shortName: "Lighting map",
    category: "Full-stack",
    description: "A Košice streetlight map helps residents explore fixtures and prepare fault reports with validated location details. Operators use a separate authenticated workspace to search and update the inventory.",
    context: "Thesis project",
    personalRole: "Individual thesis project · Full-stack development",
    contributions: [
      "Built the public map and multi-step report flow with locality and service-area validation.",
      "Implemented the authenticated operator workspace for inventory search, edits, import/export, and audit history.",
      "Connected the public and admin apps to a shared Node.js API and PostgreSQL/PostGIS data model.",
    ],
    projectStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "PostGIS", "Docker Compose"],
    cardTechnologies: ["React", "TypeScript", "Leaflet", "Node.js", "PostGIS"],
    highlights: [
      "Built a public map and multi-step report flow with locality and service-area validation.",
      "Connected an authenticated admin workspace to inventory search, edits, import/export, and audit history.",
      "Kept permanent fault history to approved operational metadata, excluding contact details and free text.",
    ],
    gallery: galleries["public-lighting-fault-reporting"],
    galleryNote:
      "Local Docker captures use synthetic inventory. The admin app currently uses Slovak labels; the two admin screenshots were translated in-browser for presentation. No report was submitted.",
    overview:
      "A thesis project for reporting public streetlight faults in Košice. It brings a citizen-facing map and report flow together with a separate inventory tool for operators.",
    problem:
      "A useful report needs enough location and fixture context for an operator to act, while handling personal information carefully and making no promise that an external service has accepted the request.",
    capabilities: [
      "Explore clustered streetlight inventory on a public map and choose a location manually or from device location.",
      "Prepare a validated service-2 report with resumable local drafts and optional attachments.",
      "Manage inventory through an authenticated workspace with filtering, sorting, pagination, import/export, and change history.",
    ],
    architecture:
      "Two React and TypeScript applications share a Node.js API. The API stores inventory and privacy-limited fault history in PostgreSQL with PostGIS; Docker Compose provides the local stack, while Nginx is used at the production edge.",
    limitations:
      "The repository describes this as a thesis / production-like project. Local persistence is explicit and environment-gated; there is no active AUSEMIO submission adapter, and the app does not represent official city acceptance.",
    github: "https://github.com/krustallik/public-lighting-fault-reporting",
  },
  {
    slug: "booktop-marketplace",
    name: "Booktop marketplace",
    shortName: "Booktop",
    category: "Full-stack",
    description: "Shoppers can browse and filter a book catalog, view product details, and add items to a cart. I focused on the Next.js frontend in a five-person cross-functional team spanning backend, DevOps, and design.",
    context: "Frontend Developer · Cross-functional team",
    personalRole: "Frontend Developer",
    contributions: [
      "Focused on frontend development as the team's frontend developer, collaborating with one backend developer, two designers, and one DevOps engineer.",
      "The screenshots show product and cart flows from the wider application; I do not claim the .NET API or backend features as my work.",
    ],
    projectStack: ["Next.js 16", "React 19", "TypeScript", ".NET 10", "ASP.NET Core", "PostgreSQL", "EF Core", "Redis", "Docker Compose"],
    cardTechnologies: ["Next.js 16", "React 19", "TypeScript"],
    highlights: [
      "Contributed frontend work in a five-person team alongside backend, design, and DevOps roles.",
      "Worked on a storefront for catalog browsing, search, filtering, product detail, and curated lists.",
      "The wider system separates API, application, domain, and infrastructure layers.",
    ],
    gallery: galleries["booktop-marketplace"],
    galleryNote: "The current repository screenshots use local synthetic seed data and show the application’s Ukrainian interface. No English screenshot set or verified public demo URL is available at the audited commit.",
    overview:
      "Booktop is a book storefront with catalog search and filters, product details, a cart, and checkout, supported by a layered .NET API. I focused on the Next.js frontend as part of a five-person team with one backend developer, two UI/UX designers, and one DevOps engineer.",
    problem:
      "The product needed to connect customer catalog journeys with account and company workflows, while giving a student team a realistic way to coordinate frontend, backend, design, and infrastructure work.",
    capabilities: [
      "Browse categories, search and filter the catalog, and open product detail pages.",
      "Present curated new, popular, and sale selections with related-product suggestions.",
      "Support account and company operations through the frontend and API.",
    ],
    architecture:
      "The Next.js and TypeScript client connects to an ASP.NET Core API organized into Domain, Application, Infrastructure, and API projects. PostgreSQL, Redis, background jobs, and Docker Compose support the wider system; the backend stack belongs to the project, not my documented role.",
    limitations:
      "Ihor's documented contribution focused on frontend development. The screenshots use local development seed data, and the repository does not provide a verified public demo URL.",
    github: "https://github.com/krustallik/Marketplace",
  },
  {
    slug: "gymbeam-shifts",
    name: "GymBeam shifts",
    shortName: "Shift automation",
    category: "Automation",
    description: "The bot filters a third-party shift portal by configured dates, times, holidays, and locations, then attempts to register for matching shifts. A separate dashboard lets me monitor and manage isolated bot instances.",
    context: "Independent project",
    personalRole: "Independent developer",
    contributions: [
      "Built a C# shift monitor that applies configurable date, time, holiday, lead-time, and location rules to a third-party portal.",
      "Built an ASP.NET Core manager for authenticated operations across isolated bot instances, with health views, bounded logs, and recovery-aware lifecycle controls.",
    ],
    projectStack: ["C#", ".NET 8", "ASP.NET Core", "Selenium", "Chromium", "Docker Compose", "Caddy", "GitHub Actions", "xUnit", "Moq"],
    cardTechnologies: ["C#", "Selenium", "ASP.NET Core"],
    highlights: [
      "Models time windows, weekday overrides, holidays, lead times, and shift priority as explicit rules.",
      "Uses stable shift identifiers and rebuilds listings after actions that can change pagination.",
      "Manages isolated bot instances with authenticated controls and recovery-aware operations.",
    ],
    gallery: galleries["gymbeam-shifts"],
    galleryNote: "These local application captures use synthetic demonstration settings and status data. They do not show a live account or production data.",
    overview:
      "A C# automation system that monitors a third-party shift portal, applies configurable rules, and attempts to register matching shifts. A separate manager operates multiple bot instances.",
    problem:
      "Finding a suitable shift repeatedly is a rule-heavy browser task. This project moves preferences into explicit configuration and pairs automation with visibility into each running instance.",
    capabilities: [
      "Scan paginated listings and filter by date, weekday, holiday, start time, lead time, type, and location.",
      "Send status and shift notifications through Telegram.",
      "Inspect instance health and bounded logs, and control each bot's container lifecycle through the manager.",
    ],
    architecture:
      "A Selenium-based C# worker runs each bot in an isolated container. An ASP.NET Core manager handles authenticated operator actions and container lifecycle; GitHub Actions validates the solution and deployment configuration.",
    limitations:
      "This independent project is not affiliated with or endorsed by GymBeam. The portfolio screenshot uses synthetic demonstration settings and status data, not a live account.",
    github: "https://github.com/krustallik/GymbeamShifts",
  },
  {
    slug: "bodycast",
    name: "BodyCast health analytics",
    shortName: "BodyCast",
    category: "Full-stack",
    description: "BodyCast brings health measurements, nutrition, and training history—including strength sessions—into a personal dashboard. It pairs body-composition estimates and planning scenarios with diagnostics for source data, gaps, and model freshness.",
    context: "Personal application",
    personalRole: "Personal full-stack application",
    contributions: [
      "Built the Next.js application and its route, feature-service, repository, and Prisma data layers.",
      "Implemented health history, training records, data-quality diagnostics, and scenario views that distinguish observations from derived estimates.",
    ],
    projectStack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL 17", "Prisma 6", "Better Auth", "Vitest", "Playwright"],
    cardTechnologies: ["Next.js 16", "TypeScript", "PostgreSQL 17", "Prisma 6"],
    highlights: [
      "Keeps unknown measurements unknown and records where workout-energy estimates came from.",
      "Makes model input coverage, freshness, and gaps inspectable rather than showing an unexplained score.",
      "Combines health history, training sessions, scenario planning, and an anatomy view in one application.",
    ],
    gallery: galleries.bodycast,
    galleryNote: "Screenshots use the English interface and synthetic records from an isolated local database. Desktop captures use a 1,600 px viewport; phone captures use a 390 px viewport.",
    overview:
      "BodyCast brings health measurements, workout history, and model-based body-composition estimates into an inspectable timeline. It treats observed data and derived estimates as different things.",
    problem:
      "Health dashboards can hide missing data or present derived numbers without their source. BodyCast is designed to expose data quality and model state alongside the result.",
    capabilities: [
      "Track measurements, timestamped samples, training sessions, sleep, activity, and nutrition.",
      "Accept validated health-sync payloads and retain source timestamps where available.",
      "Manage strength programs and sessions, then inspect workout-energy provenance and model coverage.",
      "Explore forecast and goal-planning scenarios when the current upstream model state supports them.",
    ],
    architecture:
      "A Next.js App Router application validates requests at route boundaries and delegates to feature services and repositories. Prisma persists source records and versioned derived results in PostgreSQL.",
    limitations:
      "Forecasts depend on current upstream model state; the README notes that the local capture fixture cannot calculate a fresh scenario. The public URL currently opens a sign-in page and no demo account is provided. Outputs are estimates and planning scenarios, not medical advice.",
    github: "https://github.com/krustallik/body-model",
    demo: "https://bodycast.ihorhub.eu",
    demoLabel: "View public sign-in",
  },
  {
    slug: "building-management-app",
    name: "Building management app",
    shortName: "Building app",
    category: "Mobile",
    description: "Administrators manage buildings and users, building managers send notices to assigned properties, and occupants receive them in this cross-platform app. Role-scoped access separates these workflows and supports scheduled notifications.",
    context: "Full-Stack Developer & Project Coordinator · Five-person team",
    personalRole: "Full-Stack Developer & Project Coordinator",
    contributions: [
      "Contributed to both frontend and backend development, helped with UI/UX, worked through technical challenges, and supported teammates where needed.",
      "Coordinated the five-person student team by creating and assigning tasks, tracking deadlines and progress, and helping participants stay aligned.",
      "Joined team meetings and presentations with company representatives and helped use their feedback to guide iterations.",
    ],
    projectStack: ["React Native", "Expo", "TypeScript", "React Navigation", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Jest", "Supertest"],
    cardTechnologies: ["React Native", "Expo", "TypeScript", "NestJS", "PostgreSQL"],
    highlights: [
      "Built by a five-student team through a university-arranged collaboration with AT&T.",
      "Includes scoped roles for administrators, building managers, and occupants.",
      "Combines mobile administration with notifications, scheduled messages, and bulk data operations.",
    ],
    gallery: galleries["building-management-app"],
    galleryNote: "Android emulator captures use local synthetic seed data. The notification and user-creation forms shown are drafts and were not submitted.",
    overview:
      "A cross-platform mobile client and REST API for managing buildings, users, and tenant communications. This five-person student team project was developed through a university-arranged collaboration with AT&T. The team met weekly with company representatives and iterated on feedback.",
    problem:
      "Building administrators need to manage shared records and communicate with residents while keeping managers' access limited to the buildings they are responsible for.",
    capabilities: [
      "Manage buildings, users, assignments, photos, and bulk CSV/JSON import/export.",
      "Send announcements and scheduled notifications with delivery history and read state.",
      "Provide optional address lookup when a provider key is configured.",
    ],
    architecture:
      "An Expo and React Native app communicates with a modular NestJS API. JWT-protected routes apply role checks; Prisma and PostgreSQL support persistence and migrations.",
    limitations:
      "This is a five-student team project and the application is shared work. Screenshots use synthetic local seed data. The university-arranged collaboration does not imply AT&T employment, endorsement, or ownership.",
    github: "https://github.com/krustallik/university-at-t-software-project",
    demo: "https://youtu.be/ODJcfr_vB3o",
    demoLabel: "Watch the team walkthrough",
  },
  {
    slug: "missing-data-tabular-models",
    name: "Tabular models with missing data",
    shortName: "Missing-data study",
    category: "Research",
    description: "This co-authored study compares classical models, TabPFN, and TabICL for bankruptcy prediction under simulated MCAR, MAR, and MNAR missingness, using PR-AUC to assess imbalanced data. The current pipeline is Taiwan-only; broader report results are historical and have not been reproduced from this checkout.",
    context: "Co-authored study",
    personalRole: "Co-author · Integration and experiment analysis",
    contributions: [
      "Co-authored the study with Taras Havryliuk and led much of the module integration, refactoring, and experiment-run coordination.",
      "Ran the main calculations across two computers and primarily led the cross-model and cross-dataset comparisons, analysis, and later corrections.",
      "Both authors remain credited; commit totals and compute runs do not capture the full shared research work, so no percentage is assigned.",
    ],
    projectStack: ["Python", "pandas", "NumPy", "SciPy", "scikit-learn", "PyTorch", "TabPFN", "TabICL", "XGBoost", "LightGBM", "CatBoost", "Matplotlib"],
    cardTechnologies: ["Python", "pandas", "scikit-learn", "TabPFN", "TabICL"],
    highlights: [
      "Simulates MCAR, MAR, and MNAR missingness for controlled experiments.",
      "Includes data preparation, imputation benchmarks, experiment runners, and randomized search.",
      "Keeps the current Taiwan-only main experiment scope distinct from the separate three-dataset randomized-search pipeline.",
      "Includes charts redrawn from historical co-authored report values, clearly separated from current-checkout results.",
    ],
    gallery: galleries["missing-data-tabular-models"],
    galleryNote: "The dataset overview is calculated from committed processed CSVs. The PR-AUC charts redraw historical report values; they were not reproduced from this checkout.",
    overview:
      "A co-authored study of classical and pretrained tabular models for bankruptcy classification with incomplete features. The repository contains an experiment pipeline and input datasets; the separate technical report records historical results.",
    problem:
      "Bankruptcy datasets can have severe class imbalance and missing features. A useful comparison needs explicit missingness scenarios, repeatable preparation, and clear limits on what each pipeline covers.",
    capabilities: [
      "Includes three processed datasets with recorded source attribution and native missingness.",
      "Simulate MCAR, MAR, and MNAR masks and compare imputation strategies.",
      "Run a configured experiment matrix and a separate randomized hyperparameter-search pipeline.",
    ],
    architecture:
      "A Python project separates configuration and dataset loading from missingness simulation, split preparation, experiment execution, and randomized search. The main experiment runner is configured for Taiwan; the separate randomized-search script covers three datasets.",
    limitations:
      "The co-authored report is not redistributed in this repository. Its results have not been reproduced from the current checkout: the main pipeline currently activates only the Taiwan dataset, and consolidated benchmark tables are absent. The reported classical and pretrained models also used different tuning budgets, so no equal-budget ranking is claimed here.",
    github: "https://github.com/krustallik/missing-data-tabular-models",
  },
];

export const projectCategories: ProjectCategory[] = [...new Set(projects.map((project) => project.category))];

export function getFilteredProjects(category: ProjectCategory | "All"): Project[] {
  return category === "All" ? projects : projects.filter((project) => project.category === category);
}

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
