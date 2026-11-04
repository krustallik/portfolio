import type { Project, ProjectSlug } from "../types";
import type { Locale } from "../i18n/messages";

type LocalizedGalleryText = Pick<Project["gallery"][number], "alt" | "caption">;

export type LocalizedProjectContent = Pick<
  Project,
  | "name"
  | "shortName"
  | "description"
  | "context"
  | "personalRole"
  | "contributions"
  | "highlights"
  | "galleryNote"
  | "overview"
  | "problem"
  | "capabilities"
  | "architecture"
  | "limitations"
  | "demoLabel"
> & { gallery: LocalizedGalleryText[] };

export const slovakProjectContent: Record<ProjectSlug, LocalizedProjectContent> = {
  "public-lighting-fault-reporting": {
    name: "Nahlasovanie porúch verejného osvetlenia",
    shortName: "Mapa osvetlenia",
    description: "Mapa košického verejného osvetlenia prepája hlásenia obyvateľov s pracovným priestorom na správu inventára.",
    context: "Záverečná práca · Full-stack aplikácia",
    personalRole: "Individuálna záverečná práca · full-stack vývoj",
    contributions: [
      "Vytvoril som verejnú mapu a viacstupňový formulár na hlásenie porúch vrátane overenia lokality a obsluhovanej oblasti.",
      "Implementoval som zabezpečený pracovný priestor na vyhľadávanie a úpravu inventára, import a export údajov a kontrolnú históriu.",
      "Prepojil som verejnú a administračnú aplikáciu so spoločným API v Node.js a dátovým modelom v PostgreSQL/PostGIS.",
    ],
    highlights: [
      "Vytvoril som verejnú mapu a viacstupňové hlásenie s overením lokality a obsluhovanej oblasti.",
      "Prepojil som zabezpečený administračný priestor s vyhľadávaním a úpravou inventára, importom, exportom a históriou zmien.",
      "Trvalá história porúch uchováva len schválené prevádzkové údaje, bez kontaktných údajov a voľného textu.",
    ],
    galleryNote: "Lokálne snímky z Dockeru používajú syntetický inventár. Administračná aplikácia momentálne používa slovenské popisky; dve jej snímky boli pre prezentáciu preložené v prehliadači. Žiadne hlásenie nebolo odoslané.",
    overview: "Záverečná práca sa venuje nahlasovaniu porúch pouličného osvetlenia v Košiciach. Spája mapu a formulár pre obyvateľov so samostatným nástrojom na správu inventára pre pracovníkov.",
    problem: "Užitočné hlásenie musí obsahovať dostatok informácií o polohe a svietidle, aby podľa neho mohol pracovník konať. Zároveň treba opatrne narábať s osobnými údajmi a nesľubovať, že externá služba hlásenie prijala.",
    capabilities: [
      "Zobraziť zoskupený inventár svietidiel na verejnej mape a vybrať polohu ručne alebo podľa polohy zariadenia.",
      "Pripraviť a overiť hlásenie pre službu číslo 2, uložiť rozpracovaný formulár lokálne a pridať prílohy.",
      "Spravovať inventár v zabezpečenom pracovnom priestore s filtrovaním, triedením, stránkovaním, importom, exportom a históriou zmien.",
    ],
    architecture: "Dve aplikácie v Reacte a TypeScripte využívajú spoločné API v Node.js. API ukladá inventár a históriu porúch s obmedzenými údajmi do PostgreSQL s PostGIS. Lokálne prostredie zabezpečuje Docker Compose a na produkčnom okraji sa používa Nginx.",
    limitations: "Repozitár opisuje projekt ako záverečnú prácu a riešenie s vlastnosťami produkčného systému. Lokálne ukladanie je explicitné a závisí od konfigurácie prostredia; aktívny adaptér na odosielanie hlásení do AUSEMIO nie je implementovaný a aplikácia netvrdí, že mesto hlásenie oficiálne prijalo.",
    demoLabel: undefined,
    gallery: [
      { alt: "Verejná mapa so syntetickými značkami pouličného osvetlenia v okolí Košíc", caption: "Verejná mapa · anglické rozhranie · syntetický inventár" },
      { alt: "Anglický formulár hlásenia so syntetickou lokalitou v Košiciach a podrobnosťami o poruche", caption: "Formulár hlásenia · Podrobnosti o poruche · Syntetická ukážka" },
      { alt: "Krok formulára na kontaktné údaje s ukážkovou prílohou", caption: "Formulár hlásenia · Kontakt a príloha · Hlásenie nebolo odoslané" },
      { alt: "Administračný panel so syntetickým inventárom a anglickými popiskami upravenými pre prezentáciu", caption: "Administračný panel · Slovenské popisky preložené pre prezentáciu" },
      { alt: "Tabuľka inventára v administrácii so 48 syntetickými záznamami a anglickými popiskami upravenými pre prezentáciu", caption: "Inventár · Slovenské popisky preložené pre prezentáciu" },
    ],
  },
  "booktop-marketplace": {
    name: "Knižné trhovisko Booktop",
    shortName: "Booktop",
    description: "Internetový obchod zameraný na knihy s vrstveným API v .NET a lokálnym prostredím Docker.",
    context: "Frontend Developer · päťčlenný tím",
    personalRole: "Frontend vývojár",
    contributions: [
      "V päťčlennom tíme som sa venoval frontend vývoju a spolupracoval s backend vývojárom, dvoma dizajnérmi a DevOps inžinierom.",
      "Snímky zobrazujú produktové a nákupné postupy širšej aplikácie; API v .NET ani backendové funkcie neuvádzam ako svoju prácu.",
    ],
    highlights: [
      "Prispel som k frontendu v päťčlennom tíme, v ktorom boli zastúpené aj backend, dizajn a DevOps.",
      "Pracoval som na obchode s prehliadaním katalógu, vyhľadávaním, filtrovaním, detailom produktu a tematickými výbermi.",
      "Širší systém oddeľuje vrstvy API, aplikácie, domény a infraštruktúry.",
    ],
    galleryNote: "Aktuálne snímky z repozitára používajú syntetické lokálne testovacie údaje a zobrazujú ukrajinské rozhranie aplikácie. V overenom commite nie je anglická sada snímok ani potvrdená verejná demo adresa.",
    overview: "Booktop je knižné trhovisko s webovým obchodom a viacvrstvovým API v .NET. Projekt vytvoril päťčlenný tím v IT STEP Academy.",
    problem: "Produkt mal prepojiť zákaznícke prehliadanie katalógu s používateľskými a firemnými procesmi. Študentský tím zároveň potreboval reálny spôsob koordinácie frontendovej, backendovej, dizajnérskej a infraštruktúrnej práce.",
    capabilities: [
      "Prehliadať kategórie, vyhľadávať a filtrovať katalóg a otvárať stránky s podrobnosťami o produktoch.",
      "Zobrazovať výbery nových a obľúbených titulov či akciových ponúk spolu s podobnými produktmi.",
      "Podporovať používateľské a firemné procesy prostredníctvom frontendu a API.",
    ],
    architecture: "Klient v Next.js a TypeScripte sa pripája k API v ASP.NET Core, ktoré je rozdelené na projekty Domain, Application, Infrastructure a API. Širší systém využíva PostgreSQL, Redis, úlohy na pozadí a Docker Compose; backendový stack patrí projektu a nie je súčasťou môjho doloženého osobného prínosu.",
    limitations: "Môj doložený prínos sa sústreďoval na frontend. Snímky používajú lokálne vývojové testovacie údaje a repozitár neobsahuje overenú verejnú demo adresu.",
    demoLabel: undefined,
    gallery: [
      { alt: "Úvodná stránka obchodu Booktop pre počítač", caption: "Úvodná stránka obchodu · Počítač · Lokálne testovacie údaje" },
      { alt: "Mobilný katalóg produktov v Booktope", caption: "Katalóg produktov · Mobil · Lokálne testovacie údaje" },
      { alt: "Stránka s podrobnosťami o produkte v Booktope pre počítač", caption: "Podrobnosti o produkte · Počítač" },
      { alt: "Mobilný nákupný košík Booktop s produktmi", caption: "Nákupný košík · Mobil" },
      { alt: "Formulár objednávky Booktop s možnosťami platby", caption: "Objednávka a platba · Počítač · Snímka rozhrania, nejde o skutočnú transakciu" },
    ],
  },
  "gymbeam-shifts": {
    name: "Automatizácia pracovných zmien GymBeam",
    shortName: "Automatizácia zmien",
    description: "Konfigurovateľný nástroj v C# sleduje zmeny v prehliadači, posiela upozornenia a ponúka správu prevádzky.",
    context: "Samostatný automatizačný projekt",
    personalRole: "Samostatný vývojár",
    contributions: [
      "Vytvoril som nástroj v C#, ktorý podľa nastaviteľných pravidiel pre dátum, čas, sviatky, predstih a lokalitu sleduje zmeny na portáli tretej strany.",
      "Vytvoril som správcu v ASP.NET Core na zabezpečenú obsluhu izolovaných inštancií botov vrátane kontroly stavu, ohraničených logov a riadenia životného cyklu s ohľadom na obnovu.",
    ],
    highlights: [
      "Pravidlá výberu explicitne definujú časové intervaly, výnimky pre dni v týždni, sviatky, predstih a prioritu zmien.",
      "Používajú sa stabilné identifikátory zmien a zoznamy sa obnovujú po akciách, ktoré môžu zmeniť stránkovanie.",
      "Správca obsluhuje oddelené inštancie botov pomocou zabezpečených ovládacích prvkov a postupov na obnovu prevádzky.",
    ],
    galleryNote: "Lokálne snímky aplikácie používajú syntetické ukážkové nastavenia a údaje o stave. Nezobrazujú živý účet ani produkčné údaje.",
    overview: "Automatizačný systém v C# sleduje portál tretej strany, uplatňuje nastaviteľné pravidlá a pokúša sa zaregistrovať vhodné zmeny. Samostatný správca obsluhuje viacero inštancií botov.",
    problem: "Opakované hľadanie vhodnej pracovnej zmeny v prehliadači si vyžaduje zohľadniť viacero pravidiel. Projekt prevádza preferencie na explicitnú konfiguráciu a poskytuje prehľad o každej spustenej inštancii.",
    capabilities: [
      "Prehľadávať stránkované ponuky a filtrovať ich podľa dátumu, dňa v týždni, sviatku, času začiatku, predstihu, typu a lokality.",
      "Posielať upozornenia o stave a zmenách prostredníctvom Telegramu.",
      "Kontrolovať stav inštancií a ohraničené logy a cez správcu riadiť životný cyklus kontajnera každého bota.",
    ],
    architecture: "Pracovník v C# so Selenium beží v samostatnom kontajneri pre každého bota. Správca v ASP.NET Core obsluhuje zabezpečené akcie a životný cyklus kontajnerov; GitHub Actions overuje riešenie a konfiguráciu nasadenia.",
    limitations: "Ide o samostatný projekt bez prepojenia so spoločnosťou GymBeam a bez jej podpory. Snímka v portfóliu používa syntetické ukážkové nastavenia a údaje o stave, nie živý účet.",
    demoLabel: undefined,
    gallery: [
      { alt: "Panel správcu s ukážkovými syntetickými stavmi botov", caption: "Panel prevádzky viacerých inštancií · Syntetické ukážkové stavy" },
      { alt: "Konfigurácia bota s pravidlami a výnimkami času začiatku pre jednotlivé dni v týždni", caption: "Pravidlá pracovných zmien pre bota · Syntetické ukážkové nastavenia" },
    ],
  },
  bodycast: {
    name: "Zdravotná analytika BodyCast",
    shortName: "BodyCast",
    description: "Časová os zdravia a tréningu zobrazuje pôvod údajov aj mieru neistoty modelov.",
    context: "Osobná full-stack aplikácia",
    personalRole: "Osobná full-stack aplikácia",
    contributions: [
      "Vytvoril som aplikáciu v Next.js a jej vrstvy pre routy, služby jednotlivých funkcií, repozitáre a prácu s dátami cez Prisma.",
      "Implementoval som zdravotnú históriu, tréningové záznamy, diagnostiku kvality údajov a scenáre, ktoré rozlišujú pozorované údaje od odvodených odhadov.",
    ],
    highlights: [
      "Neznáme merania zostávajú neznáme a pri odhadoch energie z tréningu je zaznamenaný ich pôvod.",
      "Pokrytie vstupných údajov, ich aktuálnosť a chýbajúce hodnoty modelu možno skontrolovať namiesto zobrazenia nevysvetleného skóre.",
      "Jedna aplikácia spája zdravotnú históriu, tréningy, plánovanie scenárov a anatomické zobrazenie.",
    ],
    galleryNote: "Snímky zobrazujú anglické rozhranie a syntetické záznamy z izolovanej lokálnej databázy. Snímky pre počítač používajú šírku 1 600 px a snímky telefónu šírku 390 px.",
    overview: "BodyCast spája zdravotné merania, históriu tréningov a modelové odhady zloženia tela do prehľadnej časovej osi. Namerané údaje odlišuje od odvodených odhadov.",
    problem: "Zdravotné prehľady môžu skrývať chýbajúce údaje alebo zobrazovať odvodené hodnoty bez vysvetlenia ich pôvodu. BodyCast preto zobrazuje kvalitu dát a stav modelu spolu s výsledkom.",
    capabilities: [
      "Sledovať merania, vzorky s časovou pečiatkou, tréningy, spánok, aktivitu a výživu.",
      "Prijímať overené dáta zo zdravotnej synchronizácie a podľa dostupnosti zachovať časové údaje zdroja.",
      "Kontrolovať pokrytie modelu a skúmať predikčné scenáre, keď to aktuálny stav nadväzujúceho modelu umožňuje.",
    ],
    architecture: "Aplikácia v Next.js App Router overuje požiadavky na hraniciach rout a odovzdáva spracovanie službám jednotlivých funkcií a repozitárom. Prisma ukladá zdrojové záznamy a verzované odvodené výsledky v PostgreSQL.",
    limitations: "Predikcie závisia od aktuálneho stavu nadväzujúceho modelu; README uvádza, že lokálna fixture snímky nedokáže vypočítať nový scenár. Verejná adresa momentálne otvára prihlasovaciu stránku a demo účet nie je k dispozícii. Výstupy sú odhady a plánovacie scenáre, nie zdravotné odporúčania.",
    demoLabel: "Otvoriť verejnú prihlasovaciu stránku",
    gallery: [
      { alt: "Panel BodyCast so syntetickými dennými zdravotnými a pohybovými údajmi", caption: "Denný prehľad · Počítač · Syntetické lokálne údaje" },
      { alt: "História BodyCast so syntetickými trendmi hmotnosti, srdcovej frekvencie a výživy", caption: "Zdravotná história · Počítač · Syntetické lokálne údaje" },
      { alt: "Interaktívne trojrozmerné anatomické zobrazenie v aplikácii BodyCast", caption: "Mapa tela · Počítač · V tejto ukážke nie je prepojená tréningová záťaž" },
      { alt: "Graf predikcie BodyCast s nedávnou históriou, projekciou a pásmami neistoty", caption: "Predikcia a neistota · Syntetická ukážka vytvorená aplikáciou" },
      { alt: "Tréningový denník BodyCast prispôsobený obrazovke telefónu", caption: "Tréningový denník · Telefón · Syntetické lokálne údaje" },
      { alt: "Aktívne silové cvičenie na telefóne s ilustráciou a ovládacími prvkami na zaznamenanie série", caption: "Aktívny silový tréning · Telefón · Syntetické lokálne údaje" },
      { alt: "Stav modelu a pokrytie vstupných údajov v aplikácii BodyCast na telefóne", caption: "Diagnostika modelu · Telefón · Syntetické lokálne údaje" },
      { alt: "Diagnostika Stepperu na telefóne so zaznamenanými krokmi a aktívnou energiou", caption: "Diagnostika energie Stepperu · Telefón · Syntetické lokálne údaje" },
    ],
  },
  "building-management-app": {
    name: "Aplikácia na správu budov",
    shortName: "Správa budov",
    description: "Multiplatformová aplikácia na správu budov s rolami a oprávneniami, API procesmi a upozorneniami.",
    context: "Full-stack vývojár a koordinátor projektu · päťčlenný tím",
    personalRole: "Full-stack vývojár a koordinátor projektu",
    contributions: [
      "Podieľal som sa na vývoji frontendu aj backendu, pomáhal s UI/UX a technickými problémami a podľa potreby podporoval ostatných členov tímu.",
      "Koordinoval som päťčlenný študentský tím: vytváral a prideľoval úlohy, sledoval termíny a pokrok a pomáhal zosúladiť prácu účastníkov.",
      "Zúčastňoval som sa tímových stretnutí a prezentácií so zástupcami spoločnosti a pomáhal zapracovať ich spätnú väzbu do ďalších úprav.",
    ],
    highlights: [
      "Aplikáciu vytvoril päťčlenný študentský tím v rámci univerzitnej spolupráce so spoločnosťou AT&T.",
      "Obsahuje oddelené oprávnenia pre administrátorov, správcov budov a obyvateľov.",
      "Spája mobilnú administráciu s upozorneniami, plánovanými správami a hromadným spracovaním údajov.",
    ],
    galleryNote: "Snímky z emulátora Androidu používajú lokálne syntetické testovacie údaje. Zobrazené formuláre na vytvorenie používateľa a upozornenia sú rozpracované a neboli odoslané.",
    overview: "Multiplatformová mobilná aplikácia a REST API na správu budov, používateľov a komunikácie s obyvateľmi. Päťčlenný študentský tím projekt vyvíjal v rámci univerzitnej spolupráce so spoločnosťou AT&T. Tím sa každý týždeň stretával so zástupcami spoločnosti a zapracovával ich spätnú väzbu.",
    problem: "Správcovia budov potrebujú udržiavať spoločné záznamy a komunikovať s obyvateľmi. Zároveň musí byť prístup správcov obmedzený na budovy, za ktoré zodpovedajú.",
    capabilities: [
      "Spravovať budovy, používateľov, priradenia a fotografie a hromadne importovať či exportovať CSV/JSON.",
      "Odosielať oznámenia a plánované upozornenia s históriou doručenia a stavom prečítania.",
      "Voliteľne vyhľadávať adresy, ak je nakonfigurovaný kľúč poskytovateľa služby.",
    ],
    architecture: "Aplikácia v Expo a React Native komunikuje s modulárnym API v NestJS. Routy chránené pomocou JWT uplatňujú kontrolu rolí; Prisma a PostgreSQL zabezpečujú ukladanie údajov a migrácie.",
    limitations: "Ide o spoločnú prácu päťčlenného študentského tímu. Snímky používajú syntetické lokálne testovacie údaje. Univerzitná spolupráca neznamená, že som bol zamestnancom AT&T, ani nepredstavuje podporu či vlastníctvo aplikácie zo strany AT&T.",
    demoLabel: "Pozrieť tímovú prezentáciu",
    gallery: [
      { alt: "História upozornení pre obyvateľa so syntetickými oznámeniami", caption: "Pohľad obyvateľa · História upozornení · Syntetické údaje" },
      { alt: "Profil obyvateľa a priradené budovy", caption: "Pohľad obyvateľa · Profil a priradené budovy" },
      { alt: "Správca budovy si prezerá používateľov dostupných v demo účte", caption: "Správca budovy · Používatelia v priradených budovách · Zobrazenie bez úprav" },
      { alt: "Správca budovy pripravuje neodoslané upozornenie", caption: "Správca budovy · Rozpracovaný koncept upozornenia" },
      { alt: "Obrazovka správy budov pre hlavného administrátora", caption: "Hlavný administrátor · Správa budov" },
      { alt: "Zoznam používateľov s administračnými ovládacími prvkami pre hlavného administrátora", caption: "Hlavný administrátor · Zoznam používateľov" },
      { alt: "Hlavný administrátor vypĺňa neuložený používateľský záznam", caption: "Hlavný administrátor · Neuložený formulár používateľa" },
    ],
  },
  "missing-data-tabular-models": {
    name: "Tabuľkové modely s chýbajúcimi údajmi",
    shortName: "Výskum chýbajúcich údajov",
    description: "Spoluautorská štúdia a experimentálny postup na predikciu bankrotu pri neúplných údajoch.",
    context: "Spoluautorská technická správa · Aplikovaný výskum",
    personalRole: "Spoluautor · integrácia a analýza experimentov",
    contributions: [
      "Štúdiu som spoluautoril s Tarasom Havryliukom. Viedol som veľkú časť integrácie modulov, refaktoringu a koordinácie experimentov.",
      "Hlavné výpočty som spúšťal na dvoch počítačoch a prevažne som viedol porovnávanie modelov a dátových súborov, analýzu a neskoršie opravy.",
      "Obaja autori zostávajú uvedení ako spoluautori. Počet commitov ani výpočtov nevystihuje celý spoločný výskum, preto prínos nevyjadrujeme percentami.",
    ],
    highlights: [
      "Simuluje chýbanie údajov typu MCAR, MAR a MNAR pre kontrolované experimenty.",
      "Obsahuje prípravu dát, porovnanie metód imputácie, spúšťanie experimentov a náhodné vyhľadávanie.",
      "Oddeľuje aktuálny hlavný experiment len s dátami z Taiwanu od samostatného postupu náhodného vyhľadávania na troch súboroch údajov.",
      "Obsahuje grafy prekreslené podľa historických hodnôt zo spoluautorskej správy a jasne ich odlišuje od výsledkov aktuálneho checkoutu.",
    ],
    galleryNote: "Prehľad súborov údajov sa počíta z commitnutých spracovaných súborov CSV. Grafy PR-AUC zobrazujú historické hodnoty zo správy; v tomto checkoute sa výpočty neopakovali.",
    overview: "Spoluautorská štúdia porovnáva klasické a predtrénované tabuľkové modely pri klasifikácii bankrotu s neúplnými vstupnými údajmi. Repozitár obsahuje experimentálny postup a vstupné dáta; samostatná technická správa zaznamenáva staršie výsledky.",
    problem: "V dátach o bankrotoch môžu byť triedy výrazne nevyvážené a niektoré príznaky chýbať. Užitočné porovnanie si vyžaduje jasne definované scenáre chýbania, opakovateľnú prípravu dát a transparentné hranice každého experimentálneho postupu.",
    capabilities: [
      "Obsahuje tri spracované súbory údajov so zaznamenaným pôvodom a pôvodne chýbajúcimi hodnotami.",
      "Simuluje masky MCAR, MAR a MNAR a porovnáva stratégie dopĺňania údajov.",
      "Spúšťa nakonfigurovanú maticu experimentov a samostatný postup náhodného hľadania hyperparametrov.",
    ],
    architecture: "Projekt v Pythone oddeľuje konfiguráciu a načítanie dát od simulácie chýbajúcich údajov, prípravy rozdelení, spúšťania experimentov a náhodného vyhľadávania. Hlavný spúšťač experimentov je nakonfigurovaný pre Taiwan; samostatný skript náhodného vyhľadávania pracuje s tromi súbormi údajov.",
    limitations: "Spoluautorská správa nie je v tomto repozitári zverejnená. Jej výsledky sa v aktuálnom checkoute nepodarilo zopakovať: hlavný experimentálny postup momentálne používa iba dáta z Taiwanu a chýbajú súhrnné tabuľky benchmarkov. Klasické a predtrénované modely navyše používali rôzny rozsah ladenia, preto ich tu neporovnávame ako modely s rovnakým rozpočtom.",
    demoLabel: undefined,
    gallery: [
      { alt: "Graf prehľadu dát zobrazujúci pomer tried, počet príznakov a pôvodne chýbajúce údaje v troch spracovaných súboroch", caption: "Prehľad dát · Výpočet z commitnutých spracovaných súborov CSV" },
      { alt: "Historické porovnanie priemerného PR-AUC podľa skupín medzi základnými a klasickými modelmi na troch súboroch údajov", caption: "Uvedené PR-AUC · Historické hodnoty zo spoluautorskej správy · V tomto checkoute sa výpočty neopakovali" },
      { alt: "Historický priemer PR-AUC zo správy pre šesť stratégií práce s chýbajúcimi údajmi", caption: "Porovnanie imputácie · Historické hodnoty zo spoluautorskej správy · V tomto checkoute sa výpočty neopakovali" },
      { alt: "Vybrané historické hodnoty PR-AUC zo správy pri krajných úrovniach chýbania údajov a podľa mechanizmu", caption: "Vplyv chýbajúcich údajov · Historické hodnoty zo spoluautorskej správy · V tomto checkoute sa výpočty neopakovali" },
    ],
  },
};

export function getLocalizedProject(project: Project, locale: Locale): Project {
  if (locale === "en") return project;
  const localized = slovakProjectContent[project.slug];
  if (!localized) return project;

  return {
    ...project,
    ...localized,
    gallery: project.gallery.map((image, index) => ({
      ...image,
      ...(localized.gallery[index] ?? {}),
    })),
  };
}

export function mergeEnglishFallback<T extends object>(english: T, localized?: Partial<T>): T {
  return { ...english, ...localized };
}
