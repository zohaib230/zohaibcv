import { uid, type CVData, type EducationItem, type ExperienceItem } from "./cv";

/**
 * Parses a plain-text CV that the user pasted (copied from Word, PDF or an old
 * online CV) and returns the fields it could confidently detect. Everything is
 * best-effort: whatever is not found is simply left untouched.
 */
export function parsePastedCV(text: string): Partial<CVData> {
  const raw = text.replace(/\r/g, "");
  const lines = raw
    .split("\n")
    .map((l) => l.replace(/[•·▪●]/g, "").trim())
    .filter(Boolean);
  const out: Partial<CVData> = {};

  const email = raw.match(/[\w.+-]+@[\w-]+\.[\w.]+/)?.[0];
  if (email) out.email = email;

  const phone = raw.match(/(\+92|0)[\s-]?\d{3}[\s-]?\d{7}/)?.[0] ?? raw.match(/\+?\d[\d\s-]{8,15}\d/)?.[0];
  if (phone) out.phone = phone.trim();

  const cnic = raw.match(/\d{5}-\d{7}-\d/)?.[0];
  if (cnic) out.cnic = cnic;

  const website = raw.match(/(https?:\/\/|www\.)[^\s]+/)?.[0];
  if (website && !website.includes("@")) out.website = website;

  const dob = raw.match(/(?:date of birth|dob|d\.o\.b)\s*[:\-]?\s*([^\n]+)/i)?.[1];
  if (dob) out.dob = dob.trim();

  const grab = (label: RegExp) => raw.match(label)?.[1]?.trim();
  const father = grab(/(?:father'?s?\s*name)\s*[:\-]?\s*([^\n]+)/i);
  if (father) out.fatherName = father;
  const gender = grab(/gender\s*[:\-]?\s*([^\n]+)/i);
  if (gender) out.gender = gender;
  const marital = grab(/marital\s*status\s*[:\-]?\s*([^\n]+)/i);
  if (marital) out.maritalStatus = marital;
  const religion = grab(/religion\s*[:\-]?\s*([^\n]+)/i);
  if (religion) out.religion = religion;
  const nationality = grab(/nationality\s*[:\-]?\s*([^\n]+)/i);
  if (nationality) out.nationality = nationality;
  const address = grab(/(?:address|city)\s*[:\-]?\s*([^\n]+)/i);
  if (address) out.address = address;

  // Name: first meaningful line without contact details
  const nameLine = lines.find(
    (l) =>
      l.length < 45 &&
      !/[@\d]/.test(l) &&
      !/^(curriculum|resume|cv|profile|objective)/i.test(l) &&
      l.split(/\s+/).length <= 5,
  );
  if (nameLine) {
    const parts = nameLine.replace(/[^A-Za-z\s.'-]/g, "").trim().split(/\s+/);
    if (parts.length) {
      out.firstName = parts[0]!;
      if (parts.length > 1) out.lastName = parts.slice(1).join(" ");
    }
  }

  // Section splitting
  const HEAD = {
    profile: /^(profile|summary|objective|career objective|about me|personal statement)\b/i,
    experience: /^(work experience|experience|employment|professional experience|work history)\b/i,
    education: /^(education|academic|qualification|qualifications|academics)\b/i,
    skills: /^(skills|key skills|technical skills|core skills|expertise)\b/i,
    languages: /^(languages|language)\b/i,
    certificates: /^(certificates|certifications|courses|trainings?)\b/i,
    interests: /^(interests|hobbies)\b/i,
    references: /^(references?|referees?)\b/i,
    personal: /^(personal (details|information)|bio\s*-?\s*data)\b/i,
  } as const;

  type Key = keyof typeof HEAD;
  const sections: Partial<Record<Key, string[]>> = {};
  let current: Key | null = null;
  for (const line of lines) {
    const hit = (Object.keys(HEAD) as Key[]).find((k) => HEAD[k].test(line.replace(/[:.]$/, "")));
    if (hit) {
      current = hit;
      sections[hit] = sections[hit] ?? [];
      continue;
    }
    if (current) (sections[current] ??= []).push(line);
  }

  if (sections.profile?.length) out.profile = sections.profile.join(" ").trim();

  const splitList = (arr?: string[]) =>
    (arr ?? [])
      .flatMap((l) => l.split(/[,|;/]| {2,}/))
      .map((s) => s.replace(/^[-–—]\s*/, "").trim())
      .filter((s) => s.length > 1 && s.length < 40);

  const skills = splitList(sections.skills);
  if (skills.length) out.skills = Array.from(new Set(skills)).slice(0, 20);
  const langs = splitList(sections.languages);
  if (langs.length) out.languages = Array.from(new Set(langs)).slice(0, 8);
  const certs = (sections.certificates ?? []).map((s) => s.replace(/^[-–—]\s*/, "")).filter(Boolean);
  if (certs.length) out.certificates = certs.slice(0, 10);
  const interests = splitList(sections.interests);
  if (interests.length) out.interests = interests.slice(0, 10);
  const refs = (sections.references ?? []).filter(Boolean);
  if (refs.length) out.references = refs.slice(0, 5);

  // Experience: a line with a date range starts a new entry
  const DATE = /((19|20)\d{2}|present|current|to date)/i;
  const RANGE = /((19|20)\d{2}[^\n]{0,12}(–|-|to|—)[^\n]{0,12}((19|20)\d{2}|present|current))/i;
  const exp: ExperienceItem[] = [];
  for (const line of sections.experience ?? []) {
    const range = line.match(RANGE)?.[0];
    if (range || (DATE.test(line) && exp.length === 0)) {
      const head = line.replace(range ?? "", "").replace(/[|,–—-]\s*$/, "").trim();
      const [role, company] = head.split(/\s+(?:at|@|[|–—-])\s+/);
      exp.push({
        id: uid(),
        role: (role ?? head).trim(),
        company: (company ?? "").trim(),
        duration: (range ?? "").trim(),
        details: "",
      });
    } else if (exp.length) {
      const last = exp[exp.length - 1]!;
      last.details = last.details ? `${last.details}\n${line}` : line;
    }
  }
  if (exp.length) out.experience = exp.slice(0, 8);

  // Education: degree line, optional institute / year on the same or next line
  const edu: EducationItem[] = [];
  for (const line of sections.education ?? []) {
    const year = line.match(/((19|20)\d{2}\s*(?:[–—-]\s*((19|20)\d{2}|present))?)/i)?.[0] ?? "";
    const rest = line.replace(year, "").replace(/[|,–—-]\s*$/, "").trim();
    if (!rest && !year) continue;
    const [degree, institute] = rest.split(/\s*[|,]\s*|\s+(?:from|at)\s+/);
    edu.push({
      id: uid(),
      degree: (degree ?? rest).trim(),
      institute: (institute ?? "").trim(),
      year: year.trim(),
    });
  }
  if (edu.length) out.education = edu.slice(0, 6);

  if (out.experience?.length) out.isFresher = false;

  return out;
}
