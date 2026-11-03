FROM node:24.21.0-alpine AS base
WORKDIR /workspace
RUN apk add --no-cache fontconfig ttf-dejavu
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS development
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base AS build
COPY . .
ARG VITE_SITE_URL=
ENV VITE_SITE_URL=${VITE_SITE_URL}
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-alpine AS runtime
COPY --from=build --chown=nginx:nginx /workspace/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx/security-headers.inc /etc/nginx/security-headers.inc
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/health || exit 1
