import type { Project, ProjectCategory } from "../types";

export const projects: Project[] = [
  {
    slug: "public-lighting-fault-reporting",
    name: "Public lighting fault reporting",
    shortName: "Lighting map",
    category: "Full-stack",
    description: "A Košice streetlight map that connects public reports with an operator inventory workspace.",
    context: "Bachelor thesis · Full-stack application",
    image: "/images/projects/lighting-map.webp",
    imageAlt: "Streetlight reporting map with sample inventory markers around Košice",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "PostGIS", "Docker"],
    highlights: [
      "Built a public map and multi-step report flow with locality and service-area validation.",
      "Connected an authenticated admin workspace to inventory search, edits, import/export, and audit history.",
      "Kept permanent fault history to approved operational metadata, excluding contact details and free text.",
    ],
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
    description: "A book-focused storefront backed by a layered .NET API and local-first Docker setup.",
    context: "Five-person diploma project · Frontend contribution",
    image: "/images/projects/booktop-storefront.webp",
    imageAlt: "Booktop book marketplace storefront running with local seed data",
    technologies: ["Next.js", "React", "TypeScript", ".NET", "PostgreSQL", "Redis", "Docker Compose"],
    highlights: [
      "Contributed frontend work in a five-person team alongside backend, design, and DevOps roles.",
      "Worked on a storefront for catalog browsing, search, filtering, product detail, and curated lists.",
      "The wider system separates API, application, domain, and infrastructure layers.",
    ],
    overview:
      "Booktop is a book marketplace with a web storefront and a multi-layer .NET API. The project was developed by a five-person team at IT Step Academy.",
    problem:
      "The product needed to connect customer catalog journeys with account and company workflows, while giving a student team a realistic way to coordinate frontend, backend, design, and infrastructure work.",
    capabilities: [
      "Browse categories, search and filter the catalog, and open product detail pages.",
      "Present curated new, popular, and sale selections with related-product suggestions.",
      "Support account and company operations through the frontend and API.",
    ],
    architecture:
      "A Next.js and TypeScript client uses an ASP.NET Core API organized into Domain, Application, Infrastructure, and API projects. PostgreSQL, Redis, background jobs, and Docker Compose support the broader system.",
    limitations:
      "Ihor's documented contribution focused on frontend development. The screenshots use local development seed data, and the repository does not provide a verified public demo URL.",
    github: "https://github.com/krustallik/Marketplace",
  },
  {
    slug: "gymbeam-shifts",
    name: "GymBeam shifts",
    shortName: "Shift automation",
    category: "Automation",
    description: "A configurable C# shift monitor with browser automation, notifications, and an operations manager.",
    context: "Independent automation project",
    image: "/images/projects/shift-manager.webp",
    imageAlt: "Shift automation manager showing synthetic bot status cards and controls",
    technologies: ["C#", ".NET", "Selenium", "ASP.NET Core", "Docker", "GitHub Actions"],
    highlights: [
      "Models time windows, weekday overrides, holidays, lead times, and shift priority as explicit rules.",
      "Uses stable shift identifiers and rebuilds listings after actions that can change pagination.",
      "Manages isolated bot instances with authenticated controls and recovery-aware operations.",
    ],
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
    description: "A health and training timeline that keeps data provenance and model uncertainty visible.",
    context: "Personal full-stack application",
    image: "/images/projects/bodycast-overview.webp",
    imageAlt: "BodyCast daily overview with synthetic health and training data",
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Vitest", "Playwright"],
    highlights: [
      "Keeps unknown measurements unknown and records where workout-energy estimates came from.",
      "Makes model input coverage, freshness, and gaps inspectable rather than showing an unexplained score.",
      "Combines health history, training sessions, scenario planning, and an anatomy view in one application.",
    ],
    overview:
      "BodyCast brings health measurements, workout history, and model-based body-composition estimates into an inspectable timeline. It treats observed data and derived estimates as different things.",
    problem:
      "Health dashboards can hide missing data or present derived numbers without their source. BodyCast is designed to expose data quality and model state alongside the result.",
    capabilities: [
      "Track measurements, timestamped samples, training sessions, sleep, activity, and nutrition.",
      "Accept validated health-sync payloads and retain source timestamps where available.",
      "Inspect model coverage and explore forecast scenarios when the current upstream model state supports them.",
    ],
    architecture:
      "A Next.js App Router application validates requests at route boundaries and delegates to feature services and repositories. Prisma persists source records and versioned derived results in PostgreSQL.",
    limitations:
      "Forecasts depend on current upstream model state; the README notes that the local capture fixture cannot calculate a fresh scenario. Outputs are estimates and planning scenarios, not medical advice.",
    github: "https://github.com/krustallik/body-model",
    demo: "https://bodycast.ihorhub.eu",
    demoLabel: "Open the live app",
  },
  {
    slug: "building-management-app",
    name: "Building management app",
    shortName: "Building app",
    category: "Mobile",
    description: "A cross-platform building app with role-scoped administration, API workflows, and notifications.",
    context: "Five-student team · University collaboration with AT&T",
    image: "/images/projects/building-management-mobile.webp",
    imageAlt: "Android emulator capture of the building list in the student team's mobile app",
    imageFit: "contain",
    technologies: ["React Native", "Expo", "TypeScript", "NestJS", "PostgreSQL", "Prisma"],
    highlights: [
      "Built by a five-student team through a university-arranged collaboration with AT&T.",
      "Includes scoped roles for administrators, building managers, and occupants.",
      "Combines mobile administration with notifications, scheduled messages, and bulk data operations.",
    ],
    overview:
      "A cross-platform mobile client and REST API for managing buildings, users, and tenant communications. The team met weekly with company representatives and iterated on feedback.",
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
      "This is a five-student team project; the repository represents the application as shared work. The screenshots use synthetic local seed data, and the external collaboration does not imply AT&T endorsement.",
    github: "https://github.com/krustallik/university-at-t-software-project",
    demo: "https://youtu.be/ODJcfr_vB3o",
    demoLabel: "Watch the team walkthrough",
  },
  {
    slug: "missing-data-tabular-models",
    name: "Tabular models with missing data",
    shortName: "Missing-data study",
    category: "Research",
    description: "A reproducible benchmark for bankruptcy prediction under controlled missingness patterns.",
    context: "Machine-learning research pipeline",
    image: "/images/projects/missing-data-benchmark.webp",
    imageAlt: "Dataset overview chart showing class balance, feature counts, and native missing values",
    technologies: ["Python", "pandas", "NumPy", "scikit-learn", "PyTorch", "TabPFN"],
    highlights: [
      "Simulates MCAR, MAR, and MNAR missingness for controlled experiments.",
      "Includes data preparation, imputation benchmarks, experiment runners, and randomized search.",
      "Documents which datasets each pipeline actually runs so comparisons remain reproducible.",
    ],
    overview:
      "A research benchmark comparing classical and pretrained tabular models for bankruptcy classification when features are incomplete.",
    problem:
      "Bankruptcy datasets can have severe class imbalance and missing features. A useful comparison needs explicit missingness scenarios, repeatable preparation, and clear limits on what each pipeline covers.",
    capabilities: [
      "Prepare three processed datasets with recorded source attribution and native missingness.",
      "Simulate MCAR, MAR, and MNAR masks and compare imputation strategies.",
      "Run a configured experiment matrix and a separate randomized hyperparameter-search pipeline.",
    ],
    architecture:
      "A Python project separates configuration and dataset loading from missingness simulation, split preparation, experiment execution, and randomized search. Requirements and experiment notes are kept in the repository.",
    limitations:
      "The README says the main pipeline currently activates only the Taiwan dataset, while randomized search registers all three. The repository contains experiment code and input data, not committed benchmark result tables; no model ranking is claimed here.",
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
