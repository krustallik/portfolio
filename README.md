# Bc. Ihor Havryliv — portfolio

A responsive, recruiter-focused portfolio for a Computer Science graduate and engineering student in Košice, Slovakia. It presents six documented GitHub projects as concise case studies, links to eight additional repositories, and keeps availability, education, skills, and contact information close to the work.

## Stack

- React 19, Vite 8, and TypeScript 6
- Official Node 24.21.0 Alpine image for development and builds
- React Router for project case-study URLs
- Custom CSS tokens and responsive layouts, with IBM Plex Sans and Mono self-hosted from npm packages
- Vitest and Testing Library for component and data checks
- Playwright for a Dockerized browser smoke run
- Docker Compose for development, verification, and production builds
- Nginx unprivileged runtime for static production files

## Start the development site

Requirements: Docker Desktop with Docker Compose v2, Git, and a browser. Node.js and npm are not required on the host.

```powershell
docker compose up --build
```

Open <http://127.0.0.1:5173>. Source files are bind-mounted for Vite HMR. `node_modules` lives in a named Docker volume; the container runs `npm ci` from the checked-in lockfile when it starts. Polling is enabled for reliable Windows file-change detection.

Stop the development server with `Ctrl+C`, then run `docker compose down` when finished.

## Verification

With the development container running:

```powershell
docker compose exec portfolio npm run lint
docker compose exec portfolio npm run typecheck
docker compose exec portfolio npm run test:run
docker compose exec portfolio npm run build
```

Run the Playwright smoke checks and capture the review screenshots from its browser container:

```powershell
docker compose --profile test run --build --rm e2e
```

The browser checks all six case studies, source-gallery image loading and navigation, team-role attribution, skills evidence links, mobile swipe and navigation, HMR, uncaught page errors, and horizontal overflow at 360, 390, 768, 1024, 1440, and 1920 pixels. Screenshots are written to `docs/reports/screenshots/`.

## Production image

Set `VITE_SITE_URL` in `.env` after choosing the real portfolio domain. Leave it empty during local work. Build and run the static production image:

```powershell
Copy-Item .env.example .env
docker compose -p profile-production -f compose.production.yaml build --pull
docker compose -p profile-production -f compose.production.yaml up -d
```

The container serves Nginx on `127.0.0.1:4173` by default. Change `PORT` in `.env` if needed. The listener stays on loopback for an existing reverse proxy. See [self-hosting notes](docs/deployment/SELF_HOSTING.md) and the [VPS CI/CD deployment guide](docs/deployment/VPS_DEPLOYMENT.md).

## Features

- Curated, local project data with no runtime GitHub API dependency
- Five working project filters
- Six detail pages with genuine, optimized repository screenshots
- Project scope and known limitations shown alongside the technical summary
- Mobile navigation, keyboard focus, skip link, and reduced-motion support
- Configurable canonical URLs, Open Graph metadata, favicon, and a portfolio-specific social preview
- Pre-rendered home and project routes with per-page metadata; sitemap output is enabled once a real domain is configured
- Contact through the user-provided email and verified GitHub profile; no contact form or unverified LinkedIn/CV
- Education shows a Computer Science bachelor's degree completed in 2025 and second, final-year engineering studies (Ing.) at TUKE, alongside the two-year Software Development program completed at IT STEP Academy in 2026
- Eight additional repository links with repository-based descriptions

## Project content

Edit the typed content in `src/data/`, including `projects.ts`, `additional-work.ts`, `profile.ts`, and `skills.ts`. Add a real CV before setting `cvUrl` in the profile data. The CV action stays hidden while `cvUrl` is unset. Keep project claims grounded in their repository READMEs and code; team work must be identified as team work.

Project galleries use genuine screenshots from the linked repositories, pinned to the audited commit in `src/data/project-galleries.json`. Refresh the optimized WebP files and thumbnails from those source URLs through the running development container:

```powershell
docker compose exec portfolio npm run gallery:refresh
```

The generated files live in `public/images/gallery/`; the portfolio does not depend on GitHub availability at runtime. Building Management is presented as a five-person student project developed through a university-arranged collaboration with AT&T. The owner's role is Full-Stack Developer & Project Coordinator, with both technical and coordination contributions described in the case study.

## Structure

```text
src/
  components/       reusable navigation, project, and section components
  data/             typed, editable portfolio content
  hooks/            page metadata
  pages/            home, case studies, and fallback routes
  test/             test setup
  styles.css        design tokens and responsive component styles
public/
  images/gallery/   optimized, commit-pinned repository screenshots and thumbnails
docs/
  deployment/       self-hosting guide
  reports/          implementation notes and browser captures
tests/              Vitest component and content checks
scripts/            Playwright smoke checks
```

## Design and implementation notes

See [DESIGN.md](DESIGN.md) for the visual rationale and [AGENTS.md](AGENTS.md) for architecture and content rules. The implementation and verification summary is in [docs/reports/IMPLEMENTATION_REPORT.md](docs/reports/IMPLEMENTATION_REPORT.md).
