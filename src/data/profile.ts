export const profile = {
  name: "Ihor Havryliv",
  role: "Computer Science student · Full-stack development · Automation",
  location: "Košice, Slovakia",
  availability: "Open to part-time roles",
  github: "https://github.com/krustallik",
  linkedin: null as string | null,
  email: null as string | null,
  cvUrl: null as string | null,
  siteUrl: import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "",
} as const;
