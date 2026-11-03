# Project instructions for future agents

## Architecture

- This is a static React + Vite + TypeScript site. React Router handles project detail pages; Nginx falls back to index.html for client routes.
- Keep editable content in src/data/. Components belong in src/components/, routes in src/pages/, and browser metadata in src/hooks/.
- Do not add a backend, database, authentication, or runtime GitHub API dependency without a verified product need.
- The site must remain runnable without Node.js on the host. Use Docker Compose for dependency installation, dev, lint, type checking, tests, and build commands. Preserve package-lock.json and use npm ci in containers.
- Keep source bind-mounted for development and use the named node_modules Docker volume. The production image contains Vite output and Nginx only.

## Conventions

- Use strict TypeScript and typed local models for content.
- Prefer semantic HTML and native controls. Add ARIA only where native semantics do not express the state.
- Centralize design values as CSS custom properties in src/styles.css.
- Keep motion user-triggered or brief, transform/opacity based, and disabled under prefers-reduced-motion.
- Use genuine, optimized repository captures. Do not replace them with generated mock product screenshots.
- Keep external links explicit and verified; no client-side secrets or unnecessary third-party requests.

## Content integrity

- Never invent employment, client work, credentials, dates, metrics, contact details, live demos, or CV files.
- Use src/data/projects.ts to distinguish personal work, thesis work, and team projects. Keep known limitations visible.
- Do not imply endorsement by a company mentioned in a university collaboration.
- Do not present skills as equally strong or use fake proficiency percentages. Java is earlier experience and is not a primary focus.
- The profile name comes from the public GitHub profile. The brief provides university and study status. Email, LinkedIn, and CV remain unset until a real public value or file is supplied.

## Verification workflow

From a running dev container:

~~~powershell
docker compose exec portfolio npm run lint
docker compose exec portfolio npm run typecheck
docker compose exec portfolio npm run test:run
docker compose --profile test run --build --rm e2e
docker compose exec portfolio npm run build
~~~

Review responsive browser output at 360, 390, 768, 1024, 1440, and 1920 px. Keep browser captures in docs/reports/screenshots/, not in public/.

## Skills and MCP

- Applied the installed frontend-design and vercel-react-best-practices host skills. Their guidance informed the visual direction, content-first layout, reduced-motion behavior, and bundle restraint.
- Use the installed web-design-guidelines skill to review UI changes against its current source.
- Playwright runs in the isolated Docker test profile. The host browser is only used for visible review of the local loopback site; do not inspect or control unrelated browser sessions.
- Do not add or update user-wide MCP configuration unless an actual tool gap requires it. The project can be verified with its available browser and Docker runner.
