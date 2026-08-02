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

export type CVData = {
  withPhoto: boolean;
  photo: string | null;
  firstName: string;
  lastName: string;
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
  languages: string[];
  profile: string;
  isFresher: boolean;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  interests: string[];
  template: TemplateId;
};

export type TemplateId = "sidebar" | "classic" | "modern";

export const uid = () => Math.random().toString(36).slice(2, 9);

export const emptyCV: CVData = {
  withPhoto: true,
  photo: null,
  firstName: "",
  lastName: "",
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
  languages: [],
  profile: "",
  isFresher: false,
  experience: [],
  education: [],
  skills: [],
  interests: [],
  template: "sidebar",
};

export const fullName = (d: CVData) => `${d.firstName} ${d.lastName}`.trim();

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
  const name = fullName(d) || "A dedicated professional";
  const topSkills = d.skills.slice(0, 3).join(", ");
  const years = d.experience
    .map((e) => parseInt(e.duration, 10))
    .filter((n) => !Number.isNaN(n))
    .reduce((a, b) => a + b, 0);
  const field = d.experience[0]?.role || d.education[0]?.degree || "my field";

  if (d.isFresher || d.experience.length === 0) {
    return `${name} is a motivated and quick-learning individual with a strong academic foundation${
      d.education[0] ? ` in ${d.education[0].degree}` : ""
    }. Eager to begin a professional career, bringing discipline, honesty and a genuine willingness to learn${
      topSkills ? `, along with practical knowledge of ${topSkills}` : ""
    }. Committed to contributing positively to any team and growing into a reliable, results-oriented professional.`;
  }

  return `A hardworking and self-motivated professional${
    years ? ` with around ${years} years of practical experience` : " with solid hands-on experience"
  } as ${field}. Known for strong work ethic, discipline and a genuine drive to succeed in every task undertaken${
    topSkills ? `, with proven strengths in ${topSkills}` : ""
  }. Passionate about growth and committed to delivering quality work with honesty and dedication.`;
}
