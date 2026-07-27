/* ==================================================================
   VSA BESEDILA SPLETNE STRANI biroLovšin
   ------------------------------------------------------------------
   To je edina datoteka, ki jo je treba urejati za spremembo besedil.
   Vsak niz v narekovajih ("...") je besedilo, ki ga vidi obiskovalec.
   Kazalo:
     1. CONTACT   — podjetje, naslov, e-pošta, telefon
     2. SEO       — naslov in opis strani za Google / deljenje
     3. NAV       — meni v glavi in nogi
     4. HOME      — celotna domača stran (vključno z velikim naslovom)
     5. REFERENCE — stran /reference
     6. FOOTER    — noga na vsaki strani
     7. UI        — drobna besedila v komponentah
     8. SERVICES / PHASES / PROJECTS / STATS — seznami
   ================================================================== */

/* ---------- 1. KONTAKT ---------- *
 * Uporablja se v glavi, nogi, vseh gumbih z e-pošto in v SEO opisu. */
export const CONTACT = {
  company: "Biro Lovšin d.o.o.",
  tagline: "inženiring, projektiranje in svetovanje",
  street: "Ob grabnu 26",
  city: "SI-1217 Vodice",
  /** Kratek zapis kraja — uporabljen v hero oznaki in SEO. */
  place: "Vodice",
  email: "biro.lovsin@gmail.com",
  phone: "+386 (0)51 304 323",
};

/* ---------- 2. SEO ---------- *
 * Naslov zavihka v brskalniku, opis v Googlu, predogled ob deljenju. */
export const SEO = {
  /** Domena strani. */
  url: "https://birolovsin.si",
  /** Naslov domače strani. */
  title: "biroLovšin — elektro inženiring, projektiranje in svetovanje",
  /** Naslov podstrani: %s se nadomesti z imenom strani. */
  titleTemplate: "%s · biroLovšin",
  description:
    "Biro Lovšin d.o.o. — projektiranje električnih inštalacij za stanovanjske, poslovne in industrijske objekte. Močni tok, šibki tok, transformatorji, strelovodi, fotovoltaika, nadzor in svetovanje. Vodice.",
  keywords: [
    "elektro projektiranje",
    "električne inštalacije",
    "projektiranje razsvetljave",
    "strelovodna zaščita",
    "fotovoltaika",
    "elektro inženiring",
    "Vodice",
    "Biro Lovšin",
  ],
  /** Besedilo, ki se pokaže ob deljenju povezave (npr. na Facebooku). */
  shareTitle: "biroLovšin — elektro inženiring, projektiranje in svetovanje",
  shareDescription:
    "Projektiranje električnih inštalacij za stavbe vseh vrst. Natančno, pregledno, izvedljivo.",
};

/* ---------- 3. MENI ---------- *
 * Doda ali odstrani vrstico → spremeni se meni v glavi IN v nogi. */
export const NAV = [
  { href: "/", label: "Domov", idx: "01" },
  { href: "/reference", label: "Reference", idx: "02" },
];

/* ---------- 4. DOMAČA STRAN ---------- */
export const HOME = {
  hero: {
    /** Modra oznaka nad naslovom. */
    eyebrow: "Elektro inženiring",
    /** Kraj desno od oznake. */
    location: `${CONTACT.place}, SLO`,
    /* Veliki naslov je razdeljen na tri dele, ker je sredina obarvana modro:
       "Načrtujemo ELEKTRIKO / v vaših stavbah."                            */
    titleLead: "Načrtujemo",
    titleAccent: "električne inštalacije",
    titleRest: "v vaših stavbah.",
    intro:
      "Projektiramo električne inštalacije za stanovanjske, poslovne in industrijske objekte — od idejne zasnove do izvedenih načrtov. Natančno, pregledno in izvedljivo.",
    /** Besedilo drugega (svetlega) gumba — pelje na razdelek Potek dela. */
    secondaryCta: "Potek dela",
    /** Ključne besede pod gumbi. */
    specs: ["Močni tok", "Šibki tok", "Transformatorji", "Strelovod", "Fotovoltaika"],
    /** Napisi na okvirju sheme desno. */
    planTopLeft: "NAČRT · EL-01",
    planTopRight: "M 1:100",
    planBottomLeft: "biro Lovšin",
    planBottomRight: "rev. A",
  },
  services: {
    eyebrow: "Storitve",
    title: "Celovito projektiranje električnih inštalacij.",
    intro:
      "Vsa področja pod eno streho — usklajena, pregledna in pripravljena za izvedbo.",
  },
  process: {
    eyebrow: "Potek dela",
    title: "Od zasnove do izvedenih načrta.",
    intro:
      "Vsak projekt vodimo skozi jasno zaporedje faz. Veste, kje smo, kaj sledi in kaj boste prejeli.",
  },
  projects: {
    eyebrow: "Reference",
    title: "Izbrani projekti",
    /** Povezava desno od naslova. */
    linkLabel: "Vse reference →",
  },
  cta: {
    eyebrow: "Začnimo",
    title: "Imate objekt v načrtu? Poskrbimo za elektriko.",
    intro:
      "Pošljite nam osnovne podatke o projektu in pripravili vam bomo nezavezujočo ponudbo.",
  },
};

/* ---------- 5. STRAN /reference ---------- */
export const REFERENCE = {
  /** Naslov zavihka in Googla. */
  metaTitle: "Reference",
  metaDescription:
    "Izbor projektov Biro Lovšin — električne inštalacije za stanovanjske, poslovne in industrijske objekte ter fotovoltaične elektrarne.",
  /** Številka in oznaka nad naslovom. */
  index: "02 / REFERENCE",
  eyebrow: "Reference",
  title: "Projekti, ki delujejo.",
  intro:
    "Izbor izvedenih projektov različnih namembnosti in velikosti.",
  /** Temni pas na dnu strani. */
  ctaTitle: "Naj bo vaš objekt naslednji.",
};

/* ---------- 6. NOGA (na vsaki strani) ---------- */
export const FOOTER = {
  blurb:
    "Projektiranje električnih inštalacij za stavbe vseh vrst — od idejne zasnove do izvedenih del.",
  navHeading: "Strani",
  contactHeading: "Kontakt",
  /** Besedilo za letnico in imenom podjetja. */
  rights: "Vse pravice pridržane.",
  tagline: "inženiring · projektiranje · svetovanje",
};

/* ---------- 7. DROBNA BESEDILA ---------- */
export const UI = {
  /** Glava strani. */
  logoAlt: "biroLovšin",
  homeAriaLabel: "biroLovšin — domov",
  menuOpen: "Odpri meni",
  menuClose: "Zapri meni",
  /** Opis gumba z ikono ovojnice (na ozkih zaslonih namesto e-naslova). */
  emailAriaLabel: "Pošlji e-pošto",
  /** Filtri na strani Reference. */
  filterAll: "Vsi",
  noProjects: "Ni projektov v tej kategoriji.",
  /** Napis čez sivo polje, kjer še ni fotografije. */
  photoPlaceholder: "Fotografija projekta",
  /** Napisi prostorov na shemi v heroju. */
  planRooms: ["DNEVNA", "KUHINJA", "SPALNICA", "TEHNIČNI P."],
  planPlot: "12 400 mm",
  planPanel: "R-0",
  /** Namig pod shemo — pove, da je shema odzivna na dotik/miško. */
  planHint: "Izberite simbol za prikaz tokokroga",
  /** Opis sheme za bralnike zaslona. */
  planAriaLabel: "Shematski tloris električnih inštalacij",
  /**
   * Tokokrogi na shemi. Prikažejo se ob prehodu miške ali dotiku simbola.
   * `code` je oznaka tokokroga, `name` opis, `spec` pa zaščita in presek
   * vodnika. Vrednosti so ponazoritvene — po želji jih prilagodite.
   */
  planCircuits: [
    { code: "TK-01", name: "Razsvetljava — dnevna", spec: "10 A · 3×1,5 mm²" },
    { code: "TK-02", name: "Razsvetljava — spalnica", spec: "10 A · 3×1,5 mm²" },
    { code: "TK-03", name: "Vtičnice — kuhinja", spec: "16 A · 3×2,5 mm²" },
    { code: "TK-04", name: "Motorni izvod — TP", spec: "16 A · 5×2,5 mm²" },
  ],
};

/* ---------- 8a. STORITVE (kartice na domači strani) ---------- */
export type Service = {
  code: string;
  title: string;
  desc: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    code: "EL·01",
    title: "Projektiranje jakotočnih inštalacij",
    desc: "Napajanje, razdelilniki in razvodi za stanovanjske, poslovne in industrijske objekte.",
    points: ["Priključni in merilni razdelilniki", "Razvod moči in razsvetljave", "Rezervno napajanje"],
  },
  {
    code: "EL·02",
    title: "Projektiranje šibkotočnih inštalacij",
    desc: "Strukturirano ožičenje in sistemi, ki stavbo povežejo v celoto.",
    points: ["Strukturirano ožičenje (LAN)", "Tehnično varovanje", "Javljanje požara in vlomi"],
  },
  {
    code: "EL·03",
    title: "Transformatorske postaje in NN priključki",
    desc: "Notranja, zunanja in zasilna razsvetljava s svetlobno-tehničnimi izračuni.",
    points: ["Dimenziranje transformatorske postaje", "SN priključki", "NN priključki"],
  },
  {
    code: "EL·04",
    title: "Strelovod in ozemljitve",
    desc: "Zaščita pred udarom strele in prenapetostna zaščita po veljavnih standardih.",
    points: ["Ocena tveganja (SIST EN 62305)", "Zunanja in notranja zaščita", "Ozemljitveni sistemi"],
  },
  {
    code: "EL·05",
    title: "Fotovoltaika",
    desc: "Sončne elektrarne za samooskrbo — od zasnove do priključne dokumentacije.",
    points: ["Dimenzioniranje elektrarne", "Priključna dokumentacija", "Hranilniki energije"],
  },
  {
    code: "EL·06",
    title: "Nadzor in svetovanje",
    desc: "Strokovni nadzor med gradnjo ter svetovanje v vseh fazah projekta.",
    points: ["Strokovni nadzor", "Popisi in ocene vrednosti", "Meritve in pregledi"],
  },
];

/* ---------- 8b. FAZE (razdelek Potek dela) ---------- */
export type Phase = {
  idx: string;
  code: string;
  title: string;
  desc: string;
};

export const PHASES: Phase[] = [
  {
    idx: "01",
    code: "UVOD",
    title: "Uvodni sestanek in analiza potreb",
    desc: "Spoznamo objekt, namembnost in vaše želje. Uskladimo obseg, roke in tehnične zahteve ter opredelimo izhodišča projekta.",
  },
  {
    idx: "02",
    code: "IDZ",
    title: "Idejna zasnova",
    desc: "Pripravimo idejno zasnovo električnih inštalacij z osnovnimi rešitvami in oceno investicije za lažje odločitve.",
  },
  {
    idx: "03",
    code: "PZI",
    title: "Projekt za izvedbo",
    desc: "Podrobni načrti, sheme, popisi materiala in del — natančna podlaga za nemoteno in pregledno izvedbo na terenu.",
  },
  {
    idx: "04",
    code: "PID",
    title: "Projekt izvedenih del",
    desc: "Izvedbena dokumentacija, ki prikazuje dejansko izvedena dela za potrebe izvedbe periodičnih meritev in vzdrževanja objektov.",
  },
];

/* ---------- 8c. PROJEKTI (domača stran + stran Reference) ---------- */
export type Project = {
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  /** Path to a photo in /public, if available. */
  src?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Enodružinska vila",
    category: "Stanovanjski objekt",
    location: "Ljubljana",
    year: "2024",
    scope: "Jakotok · Šibki tok · Fotovoltaika",
  },
  {
    title: "Poslovno-upravna stavba",
    category: "Poslovni objekt",
    location: "Domžale",
    year: "2023",
    scope: "Razsvetljava · LAN · Javljanje požara",
  },
  {
    title: "Proizvodna hala",
    category: "Industrija",
    location: "Trzin",
    year: "2023",
    scope: "Napajanje strojev · Kompenzacija · Strelovod",
  },
  {
    title: "Večstanovanjski objekt",
    category: "Stanovanjski objekt",
    location: "Kamnik",
    year: "2022",
    scope: "Skupne inštalacije · Merilno mesto",
  },
  {
    title: "Trgovski lokal",
    category: "Poslovni objekt",
    location: "Kranj",
    year: "2022",
    scope: "Razsvetljava · Razvod moči",
  },
  {
    title: "Sončna elektrarna",
    category: "Fotovoltaika",
    location: "Mengeš",
    year: "2021",
    scope: "Samooskrba · Hranilnik energije",
  },
];

/* ---------- 8d. ŠTEVILKE (temni pas pod herojem) ---------- */
export const STATS = [
  { value: "20+", label: "let izkušenj" },
  { value: "3.000+", label: "izdelanih projektov" },
  { value: "400+", label: "izvedenih nadzorov" },
  { value: "100%", label: "usklajenih z izvedbo" },
];
