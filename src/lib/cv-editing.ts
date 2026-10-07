import type { CVData } from './cv';

/** Replace authored text only; IDs, photo URLs, colors and fonts are not content. */
export function replaceCVText(data: CVData, find: string, replacement: string, caseSensitive = false, wholeWord = false) {
  if (!find) return { data, count: 0 };
  const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const expression = new RegExp(wholeWord ? `\\b${escaped}\\b` : escaped, caseSensitive ? 'g' : 'gi');
  let count = 0;
  const replace = (text: string) => text.replace(expression, () => { count++; return replacement; });
  const next = { ...data };
  const fields = ['firstName', 'lastName', 'jobTitle', 'gender', 'fatherName', 'cnic', 'nationality', 'maritalStatus', 'religion', 'dob', 'age', 'phone', 'email', 'address', 'website', 'linkedin', 'portfolio', 'drivingLicence', 'visaStatus', 'noticePeriod', 'expectedSalary', 'profile'] as const;
  for (const key of fields) next[key] = replace(data[key]);
  const lists = ['languages', 'skills', 'softSkills', 'certificates', 'projects', 'volunteer', 'interests', 'achievements', 'references'] as const;
  for (const key of lists) next[key] = data[key].map(replace);
  next.experience = data.experience.map(e => ({ ...e, role: replace(e.role), company: replace(e.company), duration: replace(e.duration), details: replace(e.details) }));
  next.education = data.education.map(e => ({ ...e, degree: replace(e.degree), institute: replace(e.institute), year: replace(e.year) }));
  return { data: next, count };
}