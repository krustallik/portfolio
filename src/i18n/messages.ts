import type { ProjectCategory } from "../types";

export type Locale = "en" | "sk";
export type FilterCategory = ProjectCategory | "All";

export interface Messages {
  header: {
    skipToContent: string;
    home: string;
    navigation: string;
    work: string;
    about: string;
    skills: string;
    contact: string;
    github: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    languageEnglish: string;
    languageSlovak: string;
  };
  home: {
    heroTitleBefore: string;
    heroTitleAccent: string;
    heroDescription: string;
    exploreWork: string;
    githubProfile: string;
    availability: string;
    availabilityLocation: string;
    scrollToWork: string;
    projectsLabel: string;
    projectsTitle: string;
    projectsDescription: string;
    allRepositories: string;
    filterLabel: string;
    countOne: string;
    countFew: string;
    countMany: string;
    emptyProjects: string;
    beyondCaseStudies: string;
    moreWorkTitle: string;
    repository: string;
    researchNote: string;
    openFoam: string;
    modulus: string;
  };
  categories: Record<FilterCategory, string>;
  card: {
    viewCaseStudy: string;
    caseStudy: string;
    technologies: string;
  };
  about: {
    label: string;
    title: string;
    lede: string;
    body: string;
    sourceWork: string;
    education: string;
  };
  education: {
    universityLocation: string;
    academyLocation: string;
    universityBachelor: string;
    bachelorStatus: string;
    engineering: string;
    engineeringStatus: string;
    academyProgram: string;
    academyStatus: string;
  };
  skills: {
    label: string;
    title: string;
    description: string;
    note: string;
    groups: Record<string, string>;
    projectCoordination: string;
    teamContribution: string;
    fivePersonTeam: string;
    frontend: string;
    additionalExperience: string;
    earlierExperience: string;
  };
  approach: {
    label: string;
    titleFirst: string;
    titleSecond: string;
    items: Array<{ title: string; description: string }>;
  };
  contact: {
    label: string;
    title: string;
    description: string;
    bestWay: string;
  };
  projectPage: {
    backToWork: string;
    caseStudy: string;
    projectStack: string;
    projectStackLabel: string;
    source: string;
    details: string;
    notes: string;
    notesDescription: string;
    overview: string;
    roleAndContributions: string;
    myRole: string;
    myContributions: string;
    problem: string;
    capabilities: string;
    build: string;
    limitations: string;
    readRepository: string;
    moreCaseStudies: string;
    nextToExplore: string;
    unknownTitle: string;
    unknownDescription: string;
    backToPortfolio: string;
  };
  gallery: {
    label: string;
    slide: string;
    screenshots: string;
    screenshotOf: string;
    show: string;
    enlarge: string;
    openLarger: string;
    original: string;
    previous: string;
    next: string;
    choose: string;
    close: string;
    viewOriginal: string;
  };
  notFound: {
    label: string;
    title: string;
    description: string;
    back: string;
  };
  footer: {
    designedBy: string;
    githubLabel: string;
  };
  metadata: {
    homeTitle: string;
    homeDescription: string;
    projectMissingTitle: string;
    projectMissingDescription: string;
    pageMissingTitle: string;
    pageMissingDescription: string;
  };
  additionalWork: Record<string, { name: string; description: string }>;
  profile: {
    role: string;
    availability: string;
    location: string;
  };
  atlas: {
    label: string;
    title: string;
    description: string;
    north: string;
    field: string;
    build: string;
    applications: string;
    automate: string;
    repeatableWork: string;
    investigate: string;
    dataSystems: string;
    caption: string;
  };
}

const english: Messages = {
  header: {
    skipToContent: "Skip to content",
    home: "home",
    navigation: "Main navigation",
    work: "Work",
    about: "About",
    skills: "Skills",
    contact: "Contact",
    github: "GitHub",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    language: "Choose language",
    languageEnglish: "English",
    languageSlovak: "Slovenčina",
  },
  home: {
    heroTitleBefore: "Software for the",
    heroTitleAccent: "real world.",
    heroDescription: "I build useful applications, connect the systems behind them, and automate work that should not need repeating.",
    exploreWork: "Explore selected work",
    githubProfile: "GitHub profile",
    availability: "Open to junior, working-student, and part-time roles",
    availabilityLocation: "Košice, hybrid, or remote",
    scrollToWork: "Scroll to selected projects",
    projectsLabel: "Selected projects",
    projectsTitle: "Proof in the work.",
    projectsDescription: "A small selection across applications, automation, mobile, and applied research. Each case study explains what is implemented and where the boundaries are.",
    allRepositories: "All repositories",
    filterLabel: "Filter projects by category",
    countOne: "Showing {count} project",
    countFew: "Showing {count} projects",
    countMany: "Showing {count} projects",
    emptyProjects: "No projects match this category.",
    beyondCaseStudies: "Beyond the case studies",
    moreWorkTitle: "More work, across platforms.",
    repository: "Repository",
    researchNote: "Historical thesis note: 2025 OpenFOAM and Modulus results came from a separate steady run and have not been reproduced from the current repositories. The tracked OpenFOAM transient log is incomplete, and the current Modulus checkout has no training result. See",
    openFoam: "OpenFOAM",
    modulus: "Modulus",
  },
  categories: {
    All: "All",
    "Full-stack": "Full-stack",
    Automation: "Automation",
    Mobile: "Mobile",
    "AI & ML": "AI & ML",
    Research: "Research",
  },
  card: {
    viewCaseStudy: "View {name} case study",
    caseStudy: "Case study",
    technologies: "Technologies",
  },
  about: {
    label: "A bit about me",
    title: "Curious about the whole system.",
    lede: "I enjoy building software that connects interfaces, APIs, data, and automation into systems people can understand and rely on.",
    body: "My recent work spans web and mobile applications, operations automation, and applied research. I like following a feature from a user action through validation and persistence to the way it runs.",
    sourceWork: "See the source work",
    education: "Education",
  },
  education: {
    universityLocation: "Košice, Slovakia",
    academyLocation: "Chernivtsi, Ukraine",
    universityBachelor: "Bachelor's degree in Computer Science",
    bachelorStatus: "Completed in 2025",
    engineering: "Engineering studies (Ing.) in Computer Science",
    engineeringStatus: "Currently studying · second and final year",
    academyProgram: "Software Development — Two-Year Program",
    academyStatus: "Completed in 2026",
  },
  skills: {
    label: "Evidence from projects",
    title: "Skills in context.",
    description: "Each technology links to a repository where I used it. Team contributions are labeled so the shared work stays clear.",
    note: "The linked projects show the context for each skill; they do not imply the same depth of experience.",
    groups: {
      "Frontend development": "Frontend development",
      "APIs and data": "APIs and data",
      "Automation and delivery": "Automation and delivery",
      "Research and systems": "Research and systems",
    },
    projectCoordination: "Project coordination",
    teamContribution: "team contribution",
    fivePersonTeam: "five-person student team",
    frontend: "frontend",
    additionalExperience: "Additional Experience",
    earlierExperience: "Earlier experience",
  },
  approach: {
    label: "How I like to work",
    titleFirst: "Understand the edges.",
    titleSecond: "Then make it useful.",
    items: [
      { title: "Follow the data", description: "Keep inputs, assumptions, and derived results visible so the system can be understood and checked." },
      { title: "Think end to end", description: "Connect the interface to the API, storage, and operating environment instead of stopping at the first screen." },
      { title: "Automate the repeatable", description: "Make recurring work explicit, configurable, and easier to observe when something changes." },
    ],
  },
  contact: {
    label: "Start a conversation",
    title: "Have a role in mind?",
    description: "I welcome messages about software roles and projects where I could contribute.",
    bestWay: "Best way to reach me",
  },
  projectPage: {
    backToWork: "All selected work",
    caseStudy: "Case study {number}",
    projectStack: "Project stack",
    projectStackLabel: "Project technology stack",
    source: "View source",
    details: "Project details",
    notes: "Project notes",
    notesDescription: "What it solves, how it is assembled, and what the repository says is still out of scope.",
    overview: "Overview",
    roleAndContributions: "My role & contributions",
    myRole: "My role:",
    myContributions: "My contributions",
    problem: "The problem",
    capabilities: "What it can do",
    build: "How it is built",
    limitations: "Scope and limitations",
    readRepository: "Read the repository",
    moreCaseStudies: "More project case studies",
    nextToExplore: "Next to explore",
    unknownTitle: "Project not found",
    unknownDescription: "The requested project case study is not in this portfolio.",
    backToPortfolio: "Back to the portfolio",
  },
  gallery: {
    label: "{name} screenshot gallery",
    slide: "slide",
    screenshots: "Screenshots",
    screenshotOf: "Screenshot {current} of {total}",
    show: "Show screenshot {current} of {total}: {caption}",
    enlarge: "Enlarge screenshot {current} of {total}: {caption}",
    openLarger: "Open larger",
    original: "Original on GitHub",
    previous: "Previous screenshot",
    next: "Next screenshot",
    choose: "Choose a screenshot",
    close: "Close enlarged screenshot",
    viewOriginal: "View original image on GitHub",
  },
  notFound: {
    label: "404 · Not found",
    title: "That route ends here.",
    description: "Try the selected work or return to the start.",
    back: "Back to the portfolio",
  },
  footer: {
    designedBy: "Designed and built by",
    githubLabel: "{name} on GitHub",
  },
  metadata: {
    homeTitle: "Full-stack developer and Computer Science graduate",
    homeDescription: "{name} is a Computer Science graduate and engineering student in Košice, Slovakia, building full-stack applications, automation, and research projects.",
    projectMissingTitle: "Project not found",
    projectMissingDescription: "The requested project case study is not in this portfolio.",
    pageMissingTitle: "Page not found",
    pageMissingDescription: "This page is not part of {name}'s portfolio.",
  },
  additionalWork: {
    "northline-storefront": { name: "Northline storefront", description: "An English-first storefront prototype with an original synthetic catalog; checkout, payments, and shipping are outside its scope." },
    "mvs-skills": { name: "MVS Skills", description: "An academic skills directory with search and owner-managed profiles. Demo profiles are synthetic, and production hosting is unverified." },
    "citizen-reporting": { name: "Citizen reporting app", description: "A mobile reporting prototype with an offline queue; repository screenshots use labeled synthetic reports and locations." },
    "personal-spending-log": { name: "Personal spending log", description: "An on-device expense and weight tracker. The app has no configured API, cloud sync, or in-app backup." },
    chess: { name: "Chess", description: "A Qt desktop game with local two-player and Stockfish modes, backed by a bundled engine binary." },
  },
  profile: {
    role: "Computer Science graduate · Engineering student · Full-stack development · Automation",
    availability: "Open to junior, working-student, and part-time roles",
    location: "Košice, Slovakia",
  },
  atlas: {
    label: "WORK MAP",
    title: "Engineering work map",
    description: "A diagram of three kinds of engineering work: build, automate, and investigate",
    north: "N ↑",
    field: "FIELD / 03",
    build: "Build",
    applications: "applications",
    automate: "Automate",
    repeatableWork: "repeatable work",
    investigate: "Investigate",
    dataSystems: "data & systems",
    caption: "Curiosity becomes something people can use.",
  },
};

const slovak: Messages = {
  header: {
    skipToContent: "Preskočiť na obsah",
    home: "domov",
    navigation: "Hlavná navigácia",
    work: "Projekty",
    about: "O mne",
    skills: "Zručnosti",
    contact: "Kontakt",
    github: "GitHub",
    openMenu: "Otvoriť navigačné menu",
    closeMenu: "Zavrieť navigačné menu",
    language: "Vybrať jazyk",
    languageEnglish: "English",
    languageSlovak: "Slovenčina",
  },
  home: {
    heroTitleBefore: "Softvér pre",
    heroTitleAccent: "skutočný svet.",
    heroDescription: "Vyvíjam užitočné aplikácie, prepájam systémy, ktoré za nimi stoja, a automatizujem opakujúce sa úlohy.",
    exploreWork: "Pozrieť vybrané projekty",
    githubProfile: "Profil na GitHube",
    availability: "Zaujímajú ma juniorné, študentské a čiastočné úväzky",
    availabilityLocation: "Košice, hybridne alebo na diaľku",
    scrollToWork: "Prejsť na vybrané projekty",
    projectsLabel: "Vybrané projekty",
    projectsTitle: "Výsledky hovoria za mňa.",
    projectsDescription: "Výber projektov z oblasti aplikácií, automatizácie, mobilného vývoja a aplikovaného výskumu. Každá prípadová štúdia opisuje, čo je implementované a kde sú hranice riešenia.",
    allRepositories: "Všetky repozitáre",
    filterLabel: "Filtrovať projekty podľa kategórie",
    countOne: "Zobrazuje sa {count} projekt",
    countFew: "Zobrazujú sa {count} projekty",
    countMany: "Zobrazuje sa {count} projektov",
    emptyProjects: "Tejto kategórii zatiaľ nezodpovedá žiadny projekt.",
    beyondCaseStudies: "Ďalšie projekty",
    moreWorkTitle: "Ďalšia práca na rôznych platformách.",
    repository: "Repozitár",
    researchNote: "Poznámka k staršiemu výskumu: výsledky OpenFOAM a Modulus z roku 2025 pochádzajú zo samostatného ustáleného výpočtu a v aktuálnych repozitároch sa ich nepodarilo zopakovať. Zaznamenaný prechodový log OpenFOAM je neúplný a aktuálny checkout Modulus neobsahuje výsledok trénovania. Pozri",
    openFoam: "OpenFOAM",
    modulus: "Modulus",
  },
  categories: {
    All: "Všetky",
    "Full-stack": "Full-stack vývoj",
    Automation: "Automatizácia",
    Mobile: "Mobilné aplikácie",
    "AI & ML": "AI a strojové učenie",
    Research: "Výskum",
  },
  card: {
    viewCaseStudy: "Zobraziť prípadovú štúdiu: {name}",
    caseStudy: "Prípadová štúdia",
    technologies: "Technológie",
  },
  about: {
    label: "Niečo o mne",
    title: "Zaujíma ma celý systém.",
    lede: "Baví ma vytvárať softvér, ktorý prepája rozhrania, API, dáta a automatizáciu do systémov, ktorým ľudia rozumejú a môžu sa na ne spoľahnúť.",
    body: "V poslednom období pracujem na webových a mobilných aplikáciách, automatizácii prevádzkových úloh a aplikovanom výskume. Rád sledujem cestu funkcie od používateľskej akcie cez validáciu a uloženie až po jej prevádzku.",
    sourceWork: "Pozrieť zdrojový kód projektov",
    education: "Vzdelanie",
  },
  education: {
    universityLocation: "Košice, Slovensko",
    academyLocation: "Černivci, Ukrajina",
    universityBachelor: "Bakalárske štúdium informatiky",
    bachelorStatus: "Ukončené v roku 2025",
    engineering: "Inžinierske štúdium informatiky (Ing.)",
    engineeringStatus: "Aktuálne študujem · druhý a posledný plánovaný ročník",
    academyProgram: "Vývoj softvéru — dvojročný program",
    academyStatus: "Ukončené v roku 2026",
  },
  skills: {
    label: "Dôkazy z projektov",
    title: "Zručnosti v kontexte.",
    description: "Každá technológia odkazuje na repozitár, v ktorom som ju použil. Pri tímových projektoch je jasne označený spoločný prínos.",
    note: "Odkazy ukazujú kontext, v ktorom som technológie použil; nevyjadrujú rovnakú úroveň skúseností.",
    groups: {
      "Frontend development": "Frontend vývoj",
      "APIs and data": "API a dáta",
      "Automation and delivery": "Automatizácia a nasadzovanie",
      "Research and systems": "Výskum a systémy",
    },
    projectCoordination: "Koordinácia projektu",
    teamContribution: "príspevok v rámci tímu",
    fivePersonTeam: "päťčlenný študentský tím",
    frontend: "frontend",
    additionalExperience: "Ďalšie skúsenosti",
    earlierExperience: "Skoršia skúsenosť",
  },
  approach: {
    label: "Ako rád pracujem",
    titleFirst: "Rozumiem hraniciam.",
    titleSecond: "Potom hľadám praktické riešenie.",
    items: [
      { title: "Sledujem tok dát", description: "Zviditeľňujem vstupy, predpoklady a odvodené výsledky, aby sa systém dal pochopiť a overiť." },
      { title: "Myslím na celý proces", description: "Prepájam rozhranie s API, úložiskom a prevádzkovým prostredím a nekončím pri prvej obrazovke." },
      { title: "Automatizujem opakujúce sa úlohy", description: "Opakované úlohy nastavujem tak, aby boli zrozumiteľné, konfigurovateľné a ľahšie kontrolovateľné." },
    ],
  },
  contact: {
    label: "Začnime rozhovor",
    title: "Máte pre mňa zaujímavú pozíciu?",
    description: "Uvítam správy o pracovných príležitostiach v softvérovom vývoji a projektoch, do ktorých sa môžem zapojiť.",
    bestWay: "Najlepší spôsob, ako ma kontaktovať",
  },
  projectPage: {
    backToWork: "Všetky vybrané projekty",
    caseStudy: "Prípadová štúdia {number}",
    projectStack: "Technologický stack projektu",
    projectStackLabel: "Technologický stack projektu",
    source: "Zobraziť zdrojový kód",
    details: "Podrobnosti o projekte",
    notes: "Poznámky k projektu",
    notesDescription: "Čo projekt rieši, ako je zostavený a čo podľa repozitára zostáva mimo jeho rozsahu.",
    overview: "Prehľad",
    roleAndContributions: "Moja rola a prínos",
    myRole: "Moja rola:",
    myContributions: "Môj prínos",
    problem: "Riešený problém",
    capabilities: "Funkcie aplikácie",
    build: "Technické riešenie",
    limitations: "Rozsah a obmedzenia",
    readRepository: "Prejsť do repozitára",
    moreCaseStudies: "Ďalšie prípadové štúdie",
    nextToExplore: "Ďalší projekt",
    unknownTitle: "Projekt sa nenašiel",
    unknownDescription: "Požadovaná prípadová štúdia nie je súčasťou tohto portfólia.",
    backToPortfolio: "Späť na portfólio",
  },
  gallery: {
    label: "Galéria snímok projektu {name}",
    slide: "snímka",
    screenshots: "Ukážky aplikácie",
    screenshotOf: "Snímka {current} z {total}",
    show: "Zobraziť snímku {current} z {total}: {caption}",
    enlarge: "Zväčšiť snímku {current} z {total}: {caption}",
    openLarger: "Otvoriť vo väčšom zobrazení",
    original: "Originál na GitHube",
    previous: "Predchádzajúca snímka",
    next: "Ďalšia snímka",
    choose: "Vybrať snímku",
    close: "Zavrieť zväčšenú snímku",
    viewOriginal: "Zobraziť pôvodný obrázok na GitHube",
  },
  notFound: {
    label: "404 · Stránka sa nenašla",
    title: "Táto adresa sa tu končí.",
    description: "Pozrite si vybrané projekty alebo sa vráťte na úvodnú stránku.",
    back: "Späť na portfólio",
  },
  footer: {
    designedBy: "Navrhol a vytvoril",
    githubLabel: "Profil používateľa {name} na GitHube",
  },
  metadata: {
    homeTitle: "Full-stack vývojár a absolvent informatiky",
    homeDescription: "{name} je absolvent informatiky a študent inžinierskeho štúdia v Košiciach. Venuje sa full-stack aplikáciám, automatizácii a výskumným projektom.",
    projectMissingTitle: "Projekt sa nenašiel",
    projectMissingDescription: "Požadovaná prípadová štúdia nie je súčasťou tohto portfólia.",
    pageMissingTitle: "Stránka sa nenašla",
    pageMissingDescription: "Táto stránka nie je súčasťou portfólia používateľa {name}.",
  },
  additionalWork: {
    "northline-storefront": { name: "E-shop Northline", description: "Prototyp e-shopu s rozhraním v angličtine a vlastným syntetickým katalógom. Nákupný proces, platby ani doprava nie sú súčasťou rozsahu." },
    "mvs-skills": { name: "MVS Skills", description: "Akademický katalóg zručností s vyhľadávaním a profilmi spravovanými ich vlastníkmi. Ukážkové profily sú syntetické a produkčné nasadenie nie je overené." },
    "citizen-reporting": { name: "Aplikácia na hlásenie problémov", description: "Prototyp mobilnej aplikácie na podávanie hlásení s offline frontom. Snímky v repozitári používajú označené syntetické hlásenia a lokality." },
    "personal-spending-log": { name: "Osobný prehľad výdavkov", description: "Lokálna aplikácia na evidenciu výdavkov a hmotnosti. Nemá nakonfigurované API, synchronizáciu s cloudom ani zálohovanie v aplikácii." },
    chess: { name: "Chess", description: "Desktopová hra v Qt s lokálnym režimom pre dvoch hráčov a režimom Stockfish. Súčasťou repozitára je binárny súbor šachového enginu." },
  },
  profile: {
    role: "Absolvent informatiky · študent inžinierskeho štúdia · full-stack vývoj · automatizácia",
    availability: "Zaujímajú ma juniorné, študentské a čiastočné úväzky",
    location: "Košice, Slovensko",
  },
  atlas: {
    label: "MAPA PRÁCE",
    title: "Mapa práce v softvérovom inžinierstve",
    description: "Schéma troch oblastí práce: vývoj, automatizácia a výskum",
    north: "S ↑",
    field: "TERÉN / 03",
    build: "Vyvíjať",
    applications: "aplikácie",
    automate: "Automatizovať",
    repeatableWork: "opakované úlohy",
    investigate: "Skúmať",
    dataSystems: "dáta a systémy",
    caption: "Zo zvedavosti vzniká niečo užitočné.",
  },
};

export const messages: Record<Locale, Messages> = { en: english, sk: slovak };

export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

export function projectCountMessage(locale: Locale, count: number): string {
  if (locale === "en") {
    return formatMessage(count === 1 ? english.home.countOne : english.home.countMany, { count });
  }
  const plural = new Intl.PluralRules("sk").select(count);
  const template = plural === "one" ? slovak.home.countOne : plural === "few" ? slovak.home.countFew : slovak.home.countMany;
  return formatMessage(template, { count });
}
