export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  duration: string;
  details: string;
};

export type EducationItem = {
  id: string;
  degree: string;
  institute: string;
  year: string;
};

export type TemplateId =
  | "sidebar"
  | "classic"
  | "modern"
  | "elevate"
  | "timeline"
  | "peach"
  | "navy"
  | "executive"
  | "slate"
  | "elegant"
  | "ats"
  | "finance"
  | "contactside"
  | "headline"
  | "monogram"
  | "grid";


/** Font families available for every single part of the CV (MS-Word style list). */
export const FONT_LIST: { id: string; label: string; stack: string; google?: string }[] = [
  { id: "manrope", label: "Manrope", stack: '"Manrope", sans-serif', google: "Manrope:wght@300;400;500;600;700;800" },
  { id: "inter", label: "Inter", stack: '"Inter", sans-serif', google: "Inter:wght@300;400;500;600;700" },
  { id: "roboto", label: "Roboto", stack: '"Roboto", sans-serif', google: "Roboto:wght@300;400;500;700;900" },
  { id: "opensans", label: "Open Sans", stack: '"Open Sans", sans-serif', google: "Open+Sans:wght@300;400;600;700;800" },
  { id: "lato", label: "Lato", stack: '"Lato", sans-serif', google: "Lato:wght@300;400;700;900" },
  { id: "montserrat", label: "Montserrat", stack: '"Montserrat", sans-serif', google: "Montserrat:wght@300;400;500;600;700;800" },
  { id: "poppins", label: "Poppins", stack: '"Poppins", sans-serif', google: "Poppins:wght@300;400;500;600;700" },
  { id: "raleway", label: "Raleway", stack: '"Raleway", sans-serif', google: "Raleway:wght@300;400;500;600;700;800" },
  { id: "nunito", label: "Nunito Sans", stack: '"Nunito Sans", sans-serif', google: "Nunito+Sans:wght@300;400;600;700;800" },
  { id: "worksans", label: "Work Sans", stack: '"Work Sans", sans-serif', google: "Work+Sans:wght@300;400;500;600;700" },
  { id: "rubik", label: "Rubik", stack: '"Rubik", sans-serif', google: "Rubik:wght@300;400;500;600;700" },
  { id: "mulish", label: "Mulish", stack: '"Mulish", sans-serif', google: "Mulish:wght@300;400;600;700;800" },
  { id: "karla", label: "Karla", stack: '"Karla", sans-serif', google: "Karla:wght@300;400;600;700" },
  { id: "cabin", label: "Cabin", stack: '"Cabin", sans-serif', google: "Cabin:wght@400;500;600;700" },
  { id: "sourcesans", label: "Source Sans 3", stack: '"Source Sans 3", sans-serif', google: "Source+Sans+3:wght@300;400;600;700;900" },
  { id: "ibmplex", label: "IBM Plex Sans", stack: '"IBM Plex Sans", sans-serif', google: "IBM+Plex+Sans:wght@300;400;500;600;700" },
  { id: "figtree", label: "Figtree", stack: '"Figtree", sans-serif', google: "Figtree:wght@300;400;500;600;700;800" },
  { id: "barlowc", label: "Barlow Condensed", stack: '"Barlow Condensed", sans-serif', google: "Barlow+Condensed:wght@400;500;600;700" },
  { id: "oswald", label: "Oswald", stack: '"Oswald", sans-serif', google: "Oswald:wght@300;400;500;600;700" },
  { id: "bebas", label: "Bebas Neue", stack: '"Bebas Neue", sans-serif', google: "Bebas+Neue" },
  { id: "archivo", label: "Archivo", stack: '"Archivo", sans-serif', google: "Archivo:wght@400;500;600;700;800" },
  { id: "playfair", label: "Playfair Display", stack: '"Playfair Display", serif', google: "Playfair+Display:wght@400;500;600;700;800" },
  { id: "merriweather", label: "Merriweather", stack: '"Merriweather", serif', google: "Merriweather:wght@300;400;700;900" },
  { id: "lora", label: "Lora", stack: '"Lora", serif', google: "Lora:wght@400;500;600;700" },
  { id: "ptserif", label: "PT Serif", stack: '"PT Serif", serif', google: "PT+Serif:wght@400;700" },
  { id: "garamond", label: "EB Garamond", stack: '"EB Garamond", serif', google: "EB+Garamond:wght@400;500;600;700" },
  { id: "baskerville", label: "Libre Baskerville", stack: '"Libre Baskerville", serif', google: "Libre+Baskerville:wght@400;700" },
  { id: "crimson", label: "Crimson Text", stack: '"Crimson Text", serif', google: "Crimson+Text:wght@400;600;700" },
  { id: "cormorant", label: "Cormorant Garamond", stack: '"Cormorant Garamond", serif', google: "Cormorant+Garamond:wght@400;500;600;700" },
  { id: "jetbrains", label: "JetBrains Mono", stack: '"JetBrains Mono", monospace', google: "JetBrains+Mono:wght@400;500;700" },
  { id: "greatvibes", label: "Great Vibes (script)", stack: '"Great Vibes", cursive', google: "Great+Vibes" },
  { id: "dancing", label: "Dancing Script", stack: '"Dancing Script", cursive', google: "Dancing+Script:wght@400;600;700" },
  { id: "arial", label: "Arial (system)", stack: "Arial, Helvetica, sans-serif" },
  { id: "times", label: "Times New Roman (system)", stack: '"Times New Roman", Times, serif' },
  { id: "georgia", label: "Georgia (system)", stack: "Georgia, serif" },
  { id: "verdana", label: "Verdana (system)", stack: "Verdana, Geneva, sans-serif" },
  { id: "tahoma", label: "Tahoma (system)", stack: "Tahoma, Geneva, sans-serif" },
  { id: "courier", label: "Courier New (system)", stack: '"Courier New", monospace' },
];

export const GOOGLE_FONT_HREF = `https://fonts.googleapis.com/css2?${FONT_LIST.filter((f) => f.google)
  .map((f) => `family=${f.google}`)
  .join("&")}&display=swap`;

export const fontStack = (id: string) =>
  FONT_LIST.find((f) => f.id === id)?.stack ?? FONT_LIST[0]!.stack;

/** Every text part of the CV can pick its own family + point size (like MS Word). */
export type TypoPart = "name" | "role" | "heading" | "sub" | "body" | "small";

export type TypoStyle = {
  font: string;
  size: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  caps: boolean;
  /** letter spacing in px */
  spacing: number;
};

export type Typography = Record<TypoPart, TypoStyle>;

/** Page / paragraph layout settings (MS Word "Paragraph" + "Layout" groups). */
export type PageSetup = {
  lineHeight: number;
  sectionGap: number;
  margin: number;
  bullet: "disc" | "circle" | "square" | "dash" | "none";
};

/** Every coloured area of the CV can be changed independently. */
export type ThemeColors = {
  accent: string;
  pageBg: string;
  headerBg: string;
  headerText: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarHeading: string;
  name: string;
  role: string;
  heading: string;
  sub: string;
  body: string;
  muted: string;
  divider: string;
};

export type CVData = {
  withPhoto: boolean;
  photo: string | null;
  photoShape: "circle" | "rounded" | "square";
  photoZoom: number;
  photoX: number;
  photoY: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  gender: string;
  fatherName: string;
  cnic: string;
  nationality: string;
  maritalStatus: string;
  religion: string;
  dob: string;
  age: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  linkedin: string;
  portfolio: string;
  drivingLicence: string;
  visaStatus: string;
  noticePeriod: string;
  expectedSalary: string;
  languages: string[];
  profile: string;
  isFresher: boolean;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  softSkills: string[];
  certificates: string[];
  projects: string[];
  volunteer: string[];
  interests: string[];
  achievements: string[];
  references: string[];
  referencesOnRequest: boolean;
  declaration: boolean;
  template: TemplateId;
  accent: string;
  colors: ThemeColors;
  typo: Typography;
  page: PageSetup;
  autoFit: boolean;
};


export const uid = () => Math.random().toString(36).slice(2, 9);

const typo = (font: string, size: number, extra: Partial<TypoStyle> = {}): TypoStyle => ({
  font,
  size,
  bold: false,
  italic: false,
  underline: false,
  caps: false,
  spacing: 0,
  ...extra,
});

export const defaultTypography: Typography = {
  name: typo("montserrat", 30, { bold: true }),
  role: typo("montserrat", 12),
  heading: typo("montserrat", 12, { bold: true }),
  sub: typo("manrope", 10, { bold: true }),
  body: typo("manrope", 9.5),
  small: typo("manrope", 8.5),
};

export const defaultPage: PageSetup = {
  lineHeight: 1.42,
  sectionGap: 15,
  margin: 30,
  bullet: "disc",
};

/** MS-Word style "Styles" gallery — one click restyles the whole CV. */
export const STYLE_PRESETS: {
  name: string;
  typo: Typography;
  page: PageSetup;
}[] = [
  { name: "Normal", typo: defaultTypography, page: defaultPage },
  {
    name: "Compact",
    typo: {
      name: typo("inter", 26, { bold: true }),
      role: typo("inter", 11),
      heading: typo("inter", 10.5, { bold: true, caps: true, spacing: 0.6 }),
      sub: typo("inter", 9.5, { bold: true }),
      body: typo("inter", 8.8),
      small: typo("inter", 8),
    },
    page: { lineHeight: 1.3, sectionGap: 11, margin: 24, bullet: "disc" },
  },
  {
    name: "Formal",
    typo: {
      name: typo("playfair", 30, { bold: true }),
      role: typo("lora", 12, { italic: true }),
      heading: typo("playfair", 12.5, { bold: true, caps: true, spacing: 1 }),
      sub: typo("lora", 10, { bold: true }),
      body: typo("lora", 9.5),
      small: typo("lora", 8.5),
    },
    page: { lineHeight: 1.5, sectionGap: 16, margin: 32, bullet: "dash" },
  },
  {
    name: "Modern",
    typo: {
      name: typo("poppins", 32, { bold: true, spacing: -0.5 }),
      role: typo("poppins", 11.5, { caps: true, spacing: 2 }),
      heading: typo("poppins", 11, { bold: true, caps: true, spacing: 1.4 }),
      sub: typo("worksans", 10, { bold: true }),
      body: typo("worksans", 9.5),
      small: typo("worksans", 8.5),
    },
    page: { lineHeight: 1.45, sectionGap: 16, margin: 30, bullet: "square" },
  },
  {
    name: "Elegant",
    typo: {
      name: typo("cormorant", 36, { bold: true }),
      role: typo("montserrat", 10.5, { caps: true, spacing: 3 }),
      heading: typo("montserrat", 10.5, { bold: true, caps: true, spacing: 2 }),
      sub: typo("cormorant", 11, { bold: true }),
      body: typo("karla", 9.4),
      small: typo("karla", 8.4),
    },
    page: { lineHeight: 1.5, sectionGap: 18, margin: 34, bullet: "circle" },
  },
  {
    name: "ATS Safe",
    typo: {
      name: typo("arial", 26, { bold: true }),
      role: typo("arial", 11.5),
      heading: typo("arial", 11.5, { bold: true, caps: true }),
      sub: typo("arial", 10, { bold: true }),
      body: typo("arial", 10),
      small: typo("arial", 9),
    },
    page: { lineHeight: 1.4, sectionGap: 14, margin: 28, bullet: "disc" },
  },
];

export const defaultColors: ThemeColors = {
  accent: "#C8A24A",
  pageBg: "#ffffff",
  headerBg: "#1d2733",
  headerText: "#ffffff",
  sidebarBg: "#1d2733",
  sidebarText: "#e8edf3",
  sidebarHeading: "#C8A24A",
  name: "#16202b",
  role: "#7c848f",
  heading: "#16202b",
  sub: "#39424e",
  body: "#454c56",
  muted: "#8a9099",
  divider: "#d8dde3",
};

export const emptyCV: CVData = {
  withPhoto: true,
  photo: null,
  photoShape: "rounded",
  photoZoom: 1,
  photoX: 50,
  photoY: 50,
  firstName: "",
  lastName: "",
  jobTitle: "",
  gender: "",
  fatherName: "",
  cnic: "",
  nationality: "Pakistani",
  maritalStatus: "",
  religion: "",
  dob: "",
  age: "",
  phone: "",
  email: "",
  address: "",
  website: "",
  linkedin: "",
  portfolio: "",
  drivingLicence: "",
  visaStatus: "",
  noticePeriod: "",
  expectedSalary: "",
  languages: [],
  profile: "",
  isFresher: false,
  experience: [],
  education: [],
  skills: [],
  softSkills: [],
  certificates: [],
  projects: [],
  volunteer: [],
  interests: [],
  achievements: [],
  references: [],
  referencesOnRequest: true,
  declaration: false,
  template: "executive",
  accent: "#C8A24A",
  colors: defaultColors,
  typo: defaultTypography,
  page: defaultPage,
  autoFit: false,
};

/** Merges a stored/partial CV with the defaults so old saves keep working. */
export const normalizeCV = (raw: unknown): CVData => {
  const p = (typeof raw === "object" && raw ? raw : {}) as Partial<CVData> & { font?: string };
  const parts = Object.fromEntries(
    (Object.keys(defaultTypography) as TypoPart[]).map((k) => [
      k,
      { ...defaultTypography[k], ...((p.typo?.[k] ?? {}) as Partial<TypoStyle>) },
    ]),
  ) as Typography;
  return {
    ...emptyCV,
    ...p,
    colors: { ...defaultColors, ...(p.colors ?? {}) },
    typo: parts,
    page: { ...defaultPage, ...(p.page ?? {}) },
  };
};


/** Presets that recolour every area of the CV in one click. */
export const COLOR_PRESETS: { name: string; colors: Partial<ThemeColors> }[] = [
  {
    name: "Executive Gold",
    colors: { accent: "#C8A24A", headerBg: "#1d2733", sidebarBg: "#1d2733", sidebarHeading: "#C8A24A", name: "#16202b" },
  },
  {
    name: "Corporate Navy",
    colors: { accent: "#2E6B8A", headerBg: "#12314a", sidebarBg: "#12314a", sidebarHeading: "#8ecae6", name: "#12314a" },
  },
  {
    name: "Forest",
    colors: { accent: "#2F6F4E", headerBg: "#1d3b2c", sidebarBg: "#1d3b2c", sidebarHeading: "#a8d5b5", name: "#1d3b2c" },
  },
  {
    name: "Crimson",
    colors: { accent: "#B23A2F", headerBg: "#2b1a18", sidebarBg: "#2b1a18", sidebarHeading: "#e8a49b", name: "#2b1a18" },
  },
  {
    name: "Royal Violet",
    colors: { accent: "#6C5CE7", headerBg: "#221d3d", sidebarBg: "#221d3d", sidebarHeading: "#bdb4ff", name: "#221d3d" },
  },
  {
    name: "Peach Warm",
    colors: { accent: "#E58B5B", headerBg: "#F4C9AC", headerText: "#3b2317", sidebarBg: "#f1e6dd", sidebarText: "#3b2317", sidebarHeading: "#b05c2c", name: "#3b2317" },
  },
  {
    name: "Rose Elegant",
    colors: { accent: "#C98A9B", headerBg: "#f6e9ec", headerText: "#4a2d34", sidebarBg: "#f6e9ec", sidebarText: "#4a2d34", sidebarHeading: "#a75f74", name: "#4a2d34" },
  },
  {
    name: "Graphite",
    colors: { accent: "#4A5560", headerBg: "#222629", sidebarBg: "#222629", sidebarHeading: "#c9ced4", name: "#1a1d20" },
  },
];

export const ACCENTS = [
  { name: "Gold", value: "#C8A24A" },
  { name: "Ocean", value: "#2E6B8A" },
  { name: "Emerald", value: "#2F6F4E" },
  { name: "Peach", value: "#E58B5B" },
  { name: "Crimson", value: "#B23A2F" },
  { name: "Violet", value: "#6C5CE7" },
  { name: "Rose", value: "#C98A9B" },
  { name: "Graphite", value: "#3A3A3A" },
];

export const fullName = (d: CVData) => `${d.firstName} ${d.lastName}`.trim() || "Your Name";

export function ageFromDob(dob: string): string {
  if (!dob) return "";
  const b = new Date(dob);
  if (Number.isNaN(b.getTime())) return "";
  const now = new Date();
  let a = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a--;
  return a > 0 ? String(a) : "";
}

/** Builds a professional profile summary from the answers the user already gave. */
export function generateProfile(d: CVData): string {
  const name = `${d.firstName} ${d.lastName}`.trim() || "A dedicated professional";
  const topSkills = d.skills.slice(0, 3).join(", ");
  const years = d.experience
    .map((e) => parseInt(e.duration, 10))
    .filter((n) => !Number.isNaN(n))
    .reduce((a, b) => a + b, 0);
  const field = d.jobTitle || d.experience[0]?.role || d.education[0]?.degree || "my field";

  if (d.isFresher || d.experience.length === 0) {
    return `${name} is a motivated and quick-learning individual with a strong academic foundation${
      d.education[0] ? ` in ${d.education[0].degree}` : ""
    }. Eager to begin a professional career, bringing discipline, honesty and a genuine willingness to learn${
      topSkills ? `, along with practical knowledge of ${topSkills}` : ""
    }. Committed to contributing positively to any team and growing into a reliable, results-oriented professional.`;
  }

  return `A hardworking and self-motivated professional${
    years ? ` with around ${years} years of practical experience` : " with solid hands-on experience"
  } as ${field}. Known for a strong work ethic, discipline and a genuine drive to succeed in every task undertaken${
    topSkills ? `, with proven strengths in ${topSkills}` : ""
  }. Passionate about growth and committed to delivering quality work with honesty and dedication.`;
}

/** CV strength score (0-100) used by the progress meter. */
export function cvScore(d: CVData): { score: number; tips: string[] } {
  const tips: string[] = [];
  let score = 0;
  const add = (ok: boolean, pts: number, tip: string) => {
    if (ok) score += pts;
    else tips.push(tip);
  };
  add(!!(d.firstName && d.lastName), 10, "Add your full name");
  add(!!d.jobTitle, 8, "Add a job title (e.g. Sales Officer)");
  add(!!(d.phone && d.email), 12, "Add phone number and email");
  add(!!d.address, 5, "Add your address");
  add(d.profile.length > 80, 15, "Write a longer profile summary");
  add(d.isFresher || d.experience.length > 0, 15, "Add your work experience");
  add(d.education.length > 0, 12, "Add your education");
  add(d.skills.length >= 4, 10, "Add at least 4 skills");
  add(d.languages.length > 0, 5, "Add the languages you speak");
  add(d.interests.length > 0 || d.certificates.length > 0, 4, "Add interests or certificates");
  add(!d.withPhoto || !!d.photo, 4, "Upload your photo");
  return { score: Math.min(100, score), tips };
}

/** Kept for backwards compatibility with older saved drafts. */
export const FONTS = {
  sans: { label: "Modern Sans", stack: '"Manrope", sans-serif' },
} as const;
export type FontId = keyof typeof FONTS;

/** Every design the builder and the style ribbon can offer. */
export const TEMPLATES: { id: TemplateId; name: string; note: string; preview: string[] }[] = [
  { id: "executive", name: "Executive", note: "Premium header + skill bars", preview: ["#1d2733", "#ffffff", "#C8A24A"] },
  { id: "ats", name: "ATS Minimal", note: "Plain, no graphics — ATS safe", preview: ["#ffffff", "#ffffff", "#e2e5e9"] },
  { id: "slate", name: "Slate Pro", note: "Clean corporate two-column", preview: ["#1d2733", "#f6f2ea", "#8a8f96"] },
  { id: "elegant", name: "Elegant", note: "Centred serif, classy lines", preview: ["#ffffff", "#ffffff", "#c8a24a"] },
  { id: "elevate", name: "Elevate", note: "Two-column with skill chips", preview: ["#ffffff", "#eceef1", "#8a8f96"] },
  { id: "timeline", name: "Timeline", note: "Dark sidebar + timeline dots", preview: ["#1f2833", "#ffffff", "#6b7078"] },
  { id: "navy", name: "Navy Pro", note: "Deep navy left panel", preview: ["#22313f", "#ffffff", "#cfe1ef"] },
  { id: "peach", name: "Curved", note: "Curved header + skill bars", preview: ["#f1f1f1", "#ffffff", "#c9c9c9"] },
  { id: "sidebar", name: "Bold Sidebar", note: "Round photo, big headings", preview: ["#26272b", "#ffffff", "#5a5a5a"] },
  { id: "modern", name: "Modern Band", note: "Header band, clean grid", preview: ["#1b1c1f", "#f4f2ec", "#777777"] },
  { id: "classic", name: "Classic Black", note: "Formal bio-data style", preview: ["#111111", "#ffffff", "#888888"] },
  { id: "finance", name: "Finance Pro", note: "Boxed sections, banker style", preview: ["#12314a", "#ffffff", "#2E6B8A"] },
  { id: "contactside", name: "Contact Side", note: "Right contact rail", preview: ["#ffffff", "#eef1f4", "#1d2733"] },
  { id: "headline", name: "Headline", note: "Big name headline, wide bars", preview: ["#ffffff", "#1d2733", "#C8A24A"] },
  { id: "monogram", name: "Monogram", note: "Initials badge, refined serif", preview: ["#ffffff", "#f4f2ec", "#8a6d3b"] },
  { id: "grid", name: "Grid Cards", note: "Card grid for skills & info", preview: ["#f6f7f9", "#ffffff", "#2F6F4E"] },
];
