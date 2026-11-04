# Implementation report

Date: 4 November 2026

## Completed

- Kept the existing React, Vite, and TypeScript visual system and case-study routes.
- Curated six featured projects from the current state of all 15 public GitHub repositories, with five compact additional links and a research note about unreproduced CFD/PINN results.
- Added accurate, separate contribution statements for Booktop, the building-management team project, and the co-authored missing-data study.
- Built six navigable screenshot galleries with 31 repository captures pinned to the audited commit SHAs. The galleries use optimized local WebP assets, descriptive alt text and captions, original-source links, thumbnails, keyboard controls, swipe navigation, and an accessible lightbox.
- Made the Building Management case study explicit about both sides of the owner's role: Full-Stack Developer & Project Coordinator. The case study describes frontend/backend and UI/UX contributions, technical support, task and deadline coordination, and the five-person university collaboration with AT&T without implying employment or endorsement. The Tools in Practice section links the project as team evidence for React Native/NestJS and as five-person-team evidence for project coordination.
- Prefixed the displayed name across the hero, navigation, footer, and page metadata with the user-requested Slovak bachelor title `Bc.`. About / Education shows the completed Computer Science bachelor's degree (2025), current second and final year of Engineering studies (Ing.) at the Technical University of Košice, and the two-year Software Development program completed at IT STEP Academy in 2026.
- Added the user-provided `ihorhavryliv123@gmail.com` as the single visible email address in the contact card, alongside GitHub.
- Preserved genuine repository screenshots and added detail to known project boundaries, team context, synthetic data, and public-demo availability.
- Balanced the final selected-project row at desktop widths and kept the additional work list compact and responsive.
- Documented the 15-repository findings in [PORTFOLIO_REPOSITORY_AUDIT.md](PORTFOLIO_REPOSITORY_AUDIT.md).

## Repository audit and public links

- GitHub's public API listed 15 repositories as of 4 November 2026. The audit checked each current default branch, description, README, recursive file tree, available manifests, representative implementation files, screenshots/docs, and the latest three commit summaries.
- Marketplace is marked as a fork but remains featured because the current repository documents the distinct Booktop project and the owner's frontend role. `feedaily` is a third-party fork and is excluded.
- The BodyCast URL returned HTTP 200 at `/login`; the page is identified as a sign-in page and no demo account is advertised. GymBeam's README says it has no public demo URL or account. The team-app walkthrough URL returned HTTP 200.
- No public city acceptance or AUSEMIO delivery is claimed for public lighting. The OpenFOAM/Modulus thesis note distinguishes historical results from the current repositories' incomplete or unrun evidence.

## Skills and tools

- Applied the available frontend-design and vercel-react-best-practices guidance. Fetched and reviewed the current [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) on 4 November 2026.
- Development and dependency installation ran in Compose using the pinned official `node:24.21.0-alpine` image and checked-in `package-lock.json`. Playwright ran in the pinned `mcr.microsoft.com/playwright:v1.64.1-noble` test service.
- Source remains bind-mounted for development, with `node_modules` in the named Compose volume. The production runtime is the unprivileged Nginx image.

## Verification results

- `docker compose build` passed using the pinned official Node image and checked-in lockfile.
- The Compose Vite service ran at `127.0.0.1:5173`. The Playwright HMR smoke changed the hero heading in the mounted source and observed it update in the already-open page without navigation, then confirmed it reverted after the source was restored.
- `docker compose exec -T portfolio npm run lint` passed.
- `docker compose exec -T portfolio npm run typecheck` passed.
- `docker compose exec -T portfolio npm run test:run` passed: 3 files, 14 tests, including project attribution and gallery navigation, swipe, focus return, and Escape-key behavior.
- `docker compose exec -T portfolio npm run build` passed and pre-rendered the home page plus six case-study routes. The sitemap remains disabled until a real portfolio domain is configured.
- `docker compose --profile test run --build --rm e2e` passed. It checked the 2025 TUKE bachelor's completion, current final-year Ing. studies, IT STEP completion in 2026, six case-study routes and gallery counts, image loading and frame fit, image-source links, both Building Management role dimensions and team-project boundary, team-technology and project-coordination evidence links, filters, unknown-route handling, touch swipe, keyboard/lightbox behavior, mobile navigation, reduced motion, uncaught browser errors, HMR, and horizontal overflow at 360, 390, 768, 1024, 1440, and 1920 px.
- The production image was rebuilt with the production Compose project name `profile-production`; its Nginx container is healthy on `127.0.0.1:4173`. The homepage, Building Management route, social preview, health endpoint, and a gallery asset returned HTTP 200. The runtime has no Node.js binary.
- Opened the production site and Building Management case study in the visible in-app browser. Reviewed the desktop homepage, contribution block, desktop gallery, and mobile gallery captures. Playwright captures are in `docs/reports/screenshots/`.

## Git and deployment

- Work is on local branch `main`. No Git remote or upstream is configured, so there was nowhere to fetch, push, or check CI. No remote was added.
- No remote production server, VPS, DNS, or deployment workflow was accessed or changed.

## Remaining owner details and workspace note

- A real CV and verified LinkedIn URL were not supplied. Their actions remain hidden/unset.
- No portfolio domain was supplied; `VITE_SITE_URL` remains empty, so canonical URL and sitemap generation stay disabled.
- The completed bachelor's year (2025) was supplied; its approximate June month is omitted. No start dates are displayed.
- A pair of unreferenced Building Management screenshot files generated during initial gallery review remains in the gallery directory; it is not included in the project manifest or rendered by the site.
- An ignored host `node_modules` directory from setup before the Docker override remains in this workspace. No host Node.js/npm command was used for this refresh. Automatic review blocked its cleanup, so it was left untouched; Compose uses its separate named volume.
