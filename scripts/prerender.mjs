import React from "react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { fileURLToPath } from "node:url";

const dist = new URL("../dist/", import.meta.url);
const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, "");
const vite = await createServer({
  configFile: fileURLToPath(new URL("../vite.config.ts", import.meta.url)),
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const [{ AppFrame }, { projects }] = await Promise.all([
    vite.ssrLoadModule("/src/App.tsx"),
    vite.ssrLoadModule("/src/data/projects.ts"),
  ]);
  const template = await readFile(new URL("index.html", dist), "utf8");
  const routes = [
    { path: "/", title: "Full-stack developer and computer science student", description: "Ihor Havryliv is a computer science student in Košice, Slovakia, building full-stack applications, automation, and research projects." },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      title: project.name,
      description: project.description,
    })),
  ];

  for (const route of routes) {
    const markup = renderToString(
      React.createElement(
        StaticRouter,
        { location: route.path },
        React.createElement(AppFrame),
      ),
    );
    const title = `${route.title} · Ihor Havryliv`;
    const canonical = siteUrl ? `<link rel="canonical" href="${siteUrl}${route.path}" />` : "";
    const image = siteUrl ? `${siteUrl}/social-preview.png` : "/social-preview.png";
    const html = template
      .replace("<div id=\"root\"></div>", `<div id="root" data-prerendered="true">${markup}</div>`)
      .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${route.description}" />`)
      .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${route.description}" />`)
      .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
      .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${route.description}" />`)
      .replace("</head>", `${canonical}\n  </head>`);
    const output = route.path === "/" ? new URL("index.html", dist) : new URL(`.${route.path}/index.html`, dist);
    await mkdir(new URL(".", output), { recursive: true });
    await writeFile(output, html);
  }
  console.log(`Pre-rendered ${routes.length} portfolio routes.`);
} finally {
  await vite.close();
}
