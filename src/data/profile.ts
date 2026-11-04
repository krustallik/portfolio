export const profile = {
  name: "Bc. Ihor Havryliv",
  role: "Computer Science graduate · Engineering student · Full-stack development · Automation",
  location: "Košice, Slovakia",
  availability: "Open to junior, working-student, and part-time roles",
  education: [
    {
      institution: "Technical University of Košice",
      location: "Košice, Slovakia",
      qualifications: [
        {
          program: "Bachelor's degree in Computer Science",
          status: "Completed in 2025",
        },
        {
          program: "Engineering studies (Ing.) in Computer Science",
          status: "Currently studying · second and final year",
          current: true,
        },
      ],
    },
    {
      institution: "IT STEP Academy",
      location: "Chernivtsi, Ukraine",
      qualifications: [
        {
          program: "Software Development — Two-Year Program",
          status: "Completed",
        },
      ],
    },
  ],
  github: "https://github.com/krustallik",
  linkedin: null as string | null,
  email: "ihorhavryliv123@gmail.com",
  cvUrl: null as string | null,
  siteUrl: import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "",
} as const;
