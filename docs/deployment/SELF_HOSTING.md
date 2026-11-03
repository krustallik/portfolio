# Self-hosting

The portfolio builds into static files and runs in an unprivileged Nginx container. It is prepared for an existing reverse proxy; this repository does not change server, firewall, or TLS settings.

## Build and run

On a machine with Docker Compose v2, clone the repository and create a private .env from the example:

~~~sh
cp .env.example .env
~~~

Set VITE_SITE_URL to the real public origin before building. Leave it blank for local review. PORT controls the host loopback port and defaults to 4173.

~~~sh
docker compose -f compose.production.yaml build --pull
docker compose -f compose.production.yaml up -d
docker compose -f compose.production.yaml ps
~~~

The container listens on 127.0.0.1:4173 and serves port 8080 internally. The image has a health check at /health. It contains dist/ and the unprivileged Nginx runtime; no Node process or development server is present.

## Reverse proxy integration

Point the existing proxy to http://127.0.0.1:4173 (or the chosen PORT). Keep TLS termination and public routing in the existing proxy.

### Nginx

~~~nginx
location / {
    proxy_pass http://127.0.0.1:4173;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
~~~

### Caddy

~~~caddyfile
portfolio.example.com {
    reverse_proxy 127.0.0.1:4173
}
~~~

### Traefik

Configure the existing Traefik router/service to forward to the host loopback port, or attach this container to the already-managed internal proxy network and target port 8080. Do not publish the container to a public interface unless the server's network design explicitly requires it.

These are integration examples only. Select one proxy based on the server that is already running; this repository installs no proxy and generates no certificates.

## Updating and rollback

1. Record the currently running image tag or image ID.
2. Pull the intended Git revision and rebuild with docker compose -f compose.production.yaml build --pull.
3. Recreate the service with docker compose -f compose.production.yaml up -d.
4. Check the service status and request /health on the mapped port.
5. To roll back, rebuild from the recorded revision and run the same up command.

The site has no persistent application data to migrate. Preserve the previous image or source revision until the new container is healthy.

## Environment and troubleshooting

- VITE_SITE_URL is optional until the public domain is known. It is a public build-time value, not a secret.
- PORT defaults to 4173 and is bound to loopback by Compose.
- Add a real CV to public/resume/, then set its path in src/data/profile.ts before exposing a download.
- The site has no runtime GitHub API dependency.
- If the container is unhealthy, inspect its logs and request /health on the mapped port.
- If project deep links return 404, confirm the deployment uses the included Nginx configuration and its index.html route fallback.
- If canonical metadata is missing, set VITE_SITE_URL before building, then rebuild.
- If the port is occupied, choose another loopback-only PORT in .env and recreate the service.

No production host has been accessed or tested as part of this implementation.
