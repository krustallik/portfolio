# VPS deployment

The portfolio deployment is kept separate from BodyCast and GymBeam Shifts. GitHub Actions runs the existing Docker Compose lint, typecheck, unit, browser, and production checks. It exports the static `dist/` output from the pinned Node 24.21.0 build stage and binds the artifact to the exact commit SHA, workflow run, and attempt.

## Deployment layout

- Host: the verified `bodycast` SSH alias (Ubuntu 24.04, 6 vCPU, 11 GiB RAM, 122 GB free disk at discovery).
- Public host: `portfolio.ihorhub.eu`, derived from the existing `bodycast.ihorhub.eu` host.
- Static releases: `/srv/portfolio/releases/<commit-sha>`.
- Incoming artifacts: `/srv/portfolio/incoming/<sha>-<run-id>-<attempt>`.
- Active version: `/srv/portfolio/current`, switched atomically to a prepared release.
- Previous version: `/srv/portfolio/previous` for a quick rollback.
- Runtime: one unprivileged Nginx container on the existing `gymbeam-internal` Docker network, with no published ports. Caddy remains the public TLS endpoint.

The deployment user is dedicated to the `/srv/portfolio` tree and has no Docker or sudo access. GitHub Actions authenticates with a separate Ed25519 key and a pinned host key. The public build is uploaded with rsync to a per-run staging directory; the server script validates the files, switches `current`, checks the site through local HTTPS, and restores the prior link if the health check fails. Old portfolio releases are pruned only after a successful health check, while the current and previous releases are retained.

## GitHub Actions settings

The repository uses these Actions variables:

- `PORTFOLIO_SITE_URL=https://portfolio.ihorhub.eu`
- `PORTFOLIO_DEPLOY_HOST=169.58.239.149`
- `PORTFOLIO_DEPLOY_USER=portfolio-deploy`
- `PORTFOLIO_DEPLOY_PATH=/srv/portfolio`
- `PORTFOLIO_DEPLOY_KNOWN_HOSTS`: the verified Ed25519 host-key line for the VPS.
- `PORTFOLIO_DEPLOY_ENABLED=true` only after DNS and the Caddy route have been activated.

The only Actions secret is `PORTFOLIO_DEPLOY_SSH_KEY`. It is a portfolio-only key and is not the developer's interactive SSH identity. Pull requests cannot deploy. A deployment starts only after successful CI for a push to `main`; it downloads the artifact from that same run and refuses to deploy if the run SHA is no longer the current `main` tip. A manual workflow dispatch is available for the first release after the public route is ready and must reference a successful CI run and its exact SHA.

## Public routing prerequisite

The authoritative nameservers for `ihorhub.eu` are on Porkbun. The subdomain did not have an A or AAAA record at discovery. Add this DNS record:

| Type | Name | Value |
| --- | --- | --- |
| A | `portfolio` | `169.58.239.149` |

Do not add an AAAA record unless the VPS is separately confirmed to serve IPv6.

The candidate Caddy site block is in [`deploy/vps/portfolio.caddy`](../../deploy/vps/portfolio.caddy). It is intentionally not installed automatically: the existing Caddy instance is the shared reverse proxy for BodyCast and GymBeam Shifts. Adding that one route to the existing imported dynamic directory and reloading Caddy needs the owner's separate approval. The portfolio runtime container itself exposes no host port and does not replace or recreate existing containers.

After approval and DNS propagation, start only the portfolio runtime with the dedicated Compose file in the VPS configuration directory, add the prepared Caddy route, reload Caddy, and enable `PORTFOLIO_DEPLOY_ENABLED`. Then dispatch `deploy.yml` with the successful CI run ID and commit SHA for the first release. Subsequent successful pushes to `main` deploy automatically.

## Rollback

The deploy workflow rolls back automatically if the post-deploy HTTPS, asset, route, or Playwright smoke check fails. For a manual rollback from the configured root SSH alias:

```sh
ssh bodycast 'runuser -u portfolio-deploy -- /srv/portfolio/bin/rollback.sh https://portfolio.ihorhub.eu'
```

Rollback swaps only the portfolio's `current` and `previous` symlinks. It does not run Docker cleanup or modify BodyCast/GymBeam data or configuration.
