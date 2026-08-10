import type { CVData } from "./cv";

/* ------------------------------------------------------------------
   Pakistani cities — used by the location autocomplete.
   ------------------------------------------------------------------ */
export const PAK_CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Gujrat",
  "Hyderabad",
  "Sargodha",
  "Bahawalpur",
  "Sukkur",
  "Larkana",
  "Sheikhupura",
  "Rahim Yar Khan",
  "Jhang",
  "Dera Ghazi Khan",
  "Mardan",
  "Abbottabad",
  "Mirpur (AJK)",
  "Muzaffarabad",
  "Gilgit",
  "Skardu",
  "Okara",
  "Sahiwal",
  "Kasur",
  "Wah Cantt",
  "Nowshera",
  "Chiniot",
  "Kamoke",
  "Hafizabad",
  "Attock",
  "Vehari",
  "Khanewal",
  "Mianwali",
  "Turbat",
  "Gwadar",
  "Dubai, UAE",
  "Abu Dhabi, UAE",
  "Riyadh, Saudi Arabia",
  "Jeddah, Saudi Arabia",
  "Doha, Qatar",
  "Muscat, Oman",
];

/* ------------------------------------------------------------------
   Pakistani education presets, grouped like real qualifications.
   ------------------------------------------------------------------ */
export const EDU_PRESETS: { group: string; items: string[] }[] = [
  {
    group: "School",
    items: [
      "Matric (Science)",
      "Matric (Arts)",
      "Matric (Computer Science)",
      "O-Levels",
      "Middle / Class 8",
    ],
  },
  {
    group: "Intermediate",
    items: [
      "FSc (Pre-Medical)",
      "FSc (Pre-Engineering)",
      "ICS (Computer Science)",
      "I.Com (Commerce)",
      "FA (Arts)",
      "A-Levels",
      "DAE (Diploma of Associate Engineering)",
    ],
  },
  {
    group: "Bachelors",
    items: [
      "BA",
      "BSc",
      "BS (Computer Science)",
      "BS (Software Engineering)",
      "BBA",
      "B.Com",
      "BE / B.Tech",
      "LLB",
      "MBBS",
      "Pharm-D",
      "B.Ed",
      "BS (Nursing)",
    ],
  },
  {
    group: "Masters & above",
    items: ["MA", "MSc", "MBA", "MS", "M.Com", "LLM", "M.Ed", "M.Phil", "PhD"],
  },
  {
    group: "Short courses",
    items: [
      "Computer Short Course",
      "DigiSkills Certification",
      "English Language Course",
      "Certificate in Accounting",
      "Other",
    ],
  },
];

export const EDU_FLAT = EDU_PRESETS.flatMap((g) => g.items);

/* ------------------------------------------------------------------
   Ready-made professional profile summaries (hand written, no AI).
   ------------------------------------------------------------------ */
export const PROFILE_LIBRARY: { label: string; text: string }[] = [
  {
    label: "Fresh Graduate / Entry Level",
    text:
      "Motivated and detail-oriented recent graduate with a strong foundation in my field of study and a passion for continuous learning. Eager to apply academic knowledge and problem-solving skills in a professional environment. Known for adaptability, strong work ethic, and a proactive approach to new challenges.",
  },
  {
    label: "Early Career Professional",
    text:
      "Results-driven professional with practical experience delivering quality work in fast-paced environments. Skilled at managing multiple priorities while maintaining attention to detail and meeting deadlines. Committed to contributing positively to team goals and organizational growth.",
  },
  {
    label: "Mid-Level Professional",
    text:
      "Experienced professional with a proven track record in my industry, known for combining technical expertise with strong interpersonal skills. Adept at identifying process improvements and driving efficient outcomes. Seeking to leverage a diverse skill set to add measurable value to a growing organization.",
  },
  {
    label: "Senior / Experienced",
    text:
      "Accomplished professional with several years of experience leading projects and teams to successful outcomes. Strong background in strategic planning, problem-solving, and stakeholder communication. Recognized for consistently delivering results while mentoring junior team members.",
  },
  {
    label: "Management / Leadership",
    text:
      "Results-oriented leader with extensive experience managing teams and operations to achieve organizational objectives. Strong decision-making abilities combined with a collaborative leadership style that fosters growth and accountability. Proven ability to balance strategic vision with day-to-day execution.",
  },
  {
    label: "Career Changer",
    text:
      "Versatile professional bringing a unique blend of transferable skills from a diverse background, now transitioning into a new field. Quick learner with strong adaptability and a genuine enthusiasm for new challenges. Brings a fresh perspective along with proven dedication and reliability.",
  },
  {
    label: "Technical / Skilled",
    text:
      "Detail-oriented professional with hands-on experience in my technical field. Strong analytical and problem-solving abilities, with a track record of delivering accurate and efficient results. Committed to staying updated with industry best practices and continuous skill development.",
  },
  {
    label: "Customer-Facing / Service",
    text:
      "Friendly and dependable professional with a strong background in customer service and client relations. Known for excellent communication skills, patience, and a genuine commitment to solving problems effectively. Consistently praised for building positive relationships and ensuring customer satisfaction.",
  },
  {
    label: "Freelancer / Self-Employed",
    text:
      "Self-motivated professional with experience delivering high-quality work independently across various projects. Strong time-management and organizational skills, with the ability to handle multiple clients and deadlines simultaneously. Focused on building long-term, reliable working relationships.",
  },
  {
    label: "General / All-Purpose",
    text:
      "Dedicated and hardworking individual with a strong commitment to quality and professional growth. Brings a positive attitude, reliability, and a willingness to learn in any environment. Focused on contributing effectively to team success while continuing to develop new skills.",
  },
];

/* ------------------------------------------------------------------
   Ready-made experience bullet points, by job category.
   ------------------------------------------------------------------ */
export const PHRASE_LIBRARY: { category: string; lines: string[] }[] = [
  {
    category: "Sales & Marketing",
    lines: [
      "Achieved and regularly exceeded monthly sales targets set by management.",
      "Built and maintained strong relationships with 100+ regular customers.",
      "Opened new retail accounts and expanded the assigned territory.",
      "Prepared daily sales reports and shared them with the head office.",
      "Handled product display, promotions and in-store branding.",
      "Followed up on payments and reduced outstanding recoveries.",
    ],
  },
  {
    category: "Admin & Office",
    lines: [
      "Managed daily office correspondence, filing and record keeping.",
      "Scheduled meetings, maintained calendars and prepared minutes.",
      "Handled petty cash, purchase requests and vendor coordination.",
      "Maintained employee attendance and leave records.",
      "Prepared official letters, memos and monthly reports in MS Word and Excel.",
    ],
  },
  {
    category: "Teaching & Education",
    lines: [
      "Planned and delivered daily lessons according to the approved syllabus.",
      "Prepared worksheets, tests and monthly assessment reports.",
      "Maintained classroom discipline and a positive learning environment.",
      "Held regular parent meetings to discuss student progress.",
      "Supervised extra-curricular activities and school events.",
    ],
  },
  {
    category: "IT & Computer",
    lines: [
      "Developed and maintained responsive websites and web applications.",
      "Provided hardware and software support to more than 50 users.",
      "Managed data backup, antivirus updates and network troubleshooting.",
      "Created and maintained technical documentation for internal systems.",
      "Worked with the team to test, debug and deploy new features.",
    ],
  },
  {
    category: "Customer Service",
    lines: [
      "Answered customer calls, emails and walk-in queries professionally.",
      "Resolved complaints quickly and escalated complex issues to seniors.",
      "Maintained a customer satisfaction record above 90%.",
      "Updated customer information in the CRM after every interaction.",
      "Guided customers about products, prices and after-sales service.",
    ],
  },
  {
    category: "Accounts & Finance",
    lines: [
      "Recorded daily vouchers, invoices and bank transactions.",
      "Prepared monthly bank reconciliation and expense statements.",
      "Assisted in preparing annual audit files and tax documents.",
      "Managed payables, receivables and petty cash records.",
      "Maintained accounts data in Excel and accounting software.",
    ],
  },
  {
    category: "Technical & Field Work",
    lines: [
      "Carried out installation, repair and routine maintenance work on site.",
      "Followed all safety procedures and completed jobs within deadline.",
      "Inspected equipment and reported faults to the supervisor.",
      "Maintained tools, spare parts and job completion records.",
      "Trained junior staff on safe working practices.",
    ],
  },
  {
    category: "Fresh / Internship",
    lines: [
      "Completed a professional internship and learned real workplace procedures.",
      "Assisted senior staff with daily tasks and record keeping.",
      "Prepared reports and presentations for the department.",
      "Learned to work under pressure and meet given deadlines.",
    ],
  },
];

/* ------------------------------------------------------------------
   Skill chips suggested from the job title the user typed.
   ------------------------------------------------------------------ */
const SKILL_MAP: { match: string[]; skills: string[] }[] = [
  {
    match: ["sales", "marketing", "business development", "bd"],
    skills: ["Negotiation", "CRM", "Target Achievement", "Field Sales", "Lead Generation", "Client Follow-up", "Market Survey"],
  },
  {
    match: ["accountant", "accounts", "finance", "audit", "cashier"],
    skills: ["Bookkeeping", "MS Excel", "Bank Reconciliation", "Ledger Management", "Taxation Basics", "QuickBooks", "Invoicing"],
  },
  {
    match: ["teacher", "lecturer", "tutor", "education"],
    skills: ["Lesson Planning", "Classroom Management", "Student Assessment", "Curriculum Design", "Parent Communication"],
  },
  {
    match: ["developer", "software", "web", "programmer", "engineer", "it"],
    skills: ["HTML & CSS", "JavaScript", "React", "Git", "SQL", "Problem Solving", "API Integration"],
  },
  {
    match: ["designer", "graphic", "creative"],
    skills: ["Adobe Photoshop", "Illustrator", "Canva", "Branding", "Social Media Creatives", "Typography"],
  },
  {
    match: ["customer", "support", "call center", "csr"],
    skills: ["Complaint Handling", "Active Listening", "CRM", "Email Etiquette", "Product Knowledge", "Patience"],
  },
  {
    match: ["admin", "office", "assistant", "clerk", "receptionist", "data entry"],
    skills: ["MS Word", "MS Excel", "Typing Speed", "Filing & Records", "Scheduling", "Email Handling"],
  },
  {
    match: ["driver", "rider", "delivery"],
    skills: ["Safe Driving", "Route Planning", "Valid Licence", "Vehicle Maintenance", "Time Management"],
  },
  {
    match: ["nurse", "medical", "doctor", "pharmacy", "health"],
    skills: ["Patient Care", "First Aid", "Medical Records", "Hygiene Standards", "Team Coordination"],
  },
  {
    match: ["electrician", "technician", "mechanic", "plumber", "operator"],
    skills: ["Fault Diagnosis", "Preventive Maintenance", "Safety Procedures", "Wiring & Installation", "Tool Handling"],
  },
  {
    match: ["hr", "human resource", "recruit"],
    skills: ["Recruitment", "Payroll", "Employee Records", "Interviewing", "HR Policies"],
  },
];

const DEFAULT_SKILLS = [
  "MS Word",
  "MS Excel",
  "Communication",
  "Teamwork",
  "Time Management",
  "Computer Basics",
  "Internet & Email",
];

export function skillsForRole(jobTitle: string): string[] {
  const t = jobTitle.toLowerCase();
  const hit = SKILL_MAP.find((s) => s.match.some((m) => t.includes(m)));
  return hit ? hit.skills : DEFAULT_SKILLS;
}

/* ------------------------------------------------------------------
   CV completeness meter — simple section counter, no scoring magic.
   ------------------------------------------------------------------ */
export type CompletenessItem = { label: string; done: boolean };

export function completeness(d: CVData): { percent: number; items: CompletenessItem[] } {
  const items: CompletenessItem[] = [
    { label: "Name & job title", done: !!(d.firstName && d.lastName && d.jobTitle) },
    { label: "Contact details", done: !!(d.phone && d.email) },
    { label: "Photo", done: !d.withPhoto || !!d.photo },
    { label: "Profile summary", done: d.profile.trim().length > 60 },
    { label: "Experience", done: d.isFresher || d.experience.length > 0 },
    { label: "Education", done: d.education.length > 0 },
    { label: "Skills", done: d.skills.length >= 3 },
  ];
  const done = items.filter((i) => i.done).length;
  return { percent: Math.round((done / items.length) * 100), items };
}

/* ------------------------------------------------------------------
   WhatsApp share link.
   ------------------------------------------------------------------ */
export function whatsappShareUrl(text: string, phone?: string) {
  const msg = encodeURIComponent(text.slice(0, 900));
  const to = (phone ?? "").replace(/[^0-9]/g, "");
  return to ? `https://wa.me/${to}?text=${msg}` : `https://wa.me/?text=${msg}`;
}
