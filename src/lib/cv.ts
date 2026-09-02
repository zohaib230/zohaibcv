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

export type Typography = Record<TypoPart, { font: string; size: number }>;

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
  languages: string[];
  profile: string;
  isFresher: boolean;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  softSkills: string[];
  certificates: string[];
  interests: string[];
  achievements: string[];
  references: string[];
  template: TemplateId;
  accent: string;
  colors: ThemeColors;
  typo: Typography;
  autoFit: boolean;
};

export const uid = () => Math.random().toString(36).slice(2, 9);

export const defaultTypography: Typography = {
  name: { font: "montserrat", size: 30 },
  role: { font: "montserrat", size: 12 },
  heading: { font: "montserrat", size: 12 },
  sub: { font: "manrope", size: 10 },
  body: { font: "manrope", size: 9.5 },
  small: { font: "manrope", size: 8.5 },
};

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
  languages: [],
  profile: "",
  isFresher: false,
  experience: [],
  education: [],
  skills: [],
  softSkills: [],
  certificates: [],
  interests: [],
  achievements: [],
  references: [],
  template: "executive",
  accent: "#C8A24A",
  colors: defaultColors,
  typo: defaultTypography,
  autoFit: false,
};

/** Merges a stored/partial CV with the defaults so old saves keep working. */
export const normalizeCV = (raw: unknown): CVData => {
  const p = (typeof raw === "object" && raw ? raw : {}) as Partial<CVData> & { font?: string };
  return {
    ...emptyCV,
    ...p,
    colors: { ...defaultColors, ...(p.colors ?? {}) },
    typo: { ...defaultTypography, ...(p.typo ?? {}) },
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
