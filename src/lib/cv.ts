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
  | "navy";

export type FontId = "sans" | "serif" | "condensed" | "mono" | "elegant";

export type CVData = {
  withPhoto: boolean;
  photo: string | null;
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
  template: TemplateId;
  accent: string;
  font: FontId;
  fontScale: number;
};

export const uid = () => Math.random().toString(36).slice(2, 9);

export const emptyCV: CVData = {
  withPhoto: true,
  photo: null,
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
  template: "elevate",
  accent: "#F5C518",
  font: "sans",
  fontScale: 1,
};

/** Merges a stored/partial CV with the defaults so old saves keep working. */
export const normalizeCV = (raw: unknown): CVData => ({
  ...emptyCV,
  ...(typeof raw === "object" && raw ? (raw as Partial<CVData>) : {}),
});

export const FONTS: Record<FontId, { label: string; stack: string }> = {
  sans: { label: "Modern Sans", stack: '"Manrope", "Segoe UI", sans-serif' },
  condensed: { label: "Condensed", stack: '"Barlow Condensed", "Arial Narrow", sans-serif' },
  serif: { label: "Classic Serif", stack: 'Georgia, "Times New Roman", serif' },
  elegant: { label: "Elegant", stack: '"Palatino Linotype", Palatino, Garamond, serif' },
  mono: { label: "Technical", stack: '"JetBrains Mono", "Courier New", monospace' },
};

export const ACCENTS = [
  { name: "Gold", value: "#F5C518" },
  { name: "Ocean", value: "#2E6B8A" },
  { name: "Emerald", value: "#2F6F4E" },
  { name: "Peach", value: "#F0A176" },
  { name: "Crimson", value: "#C0392B" },
  { name: "Violet", value: "#6C5CE7" },
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
