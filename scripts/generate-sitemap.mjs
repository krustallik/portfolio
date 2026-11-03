import { readFile, writeFile } from "node:fs/promises";

const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, "");
if (!siteUrl) {
  console.log("VITE_SITE_URL is empty; sitemap generation is skipped until the public domain is configured.");
  process.exit(0);
}

const projectSource = await readFile(new URL("../src/data/projects.ts", import.meta.url), "utf8");
const slugs = [...projectSource.matchAll(/^\s+slug: "([^"]+)",/gm)].map((match) => match[1]);
if (slugs.length === 0) {
  throw new Error("No project slugs found in src/data/projects.ts.");
}
const urls = ["/", ...slugs.map((slug) => `/projects/${slug}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(new URL("../dist/sitemap.xml", import.meta.url), xml);
await writeFile(new URL("../dist/robots.txt", import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`Generated sitemap for ${urls.length} portfolio routes.`);
