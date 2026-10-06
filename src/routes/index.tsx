import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Download,
  FileText,
  GraduationCap,
  ListChecks,
  MapPin,
  Palette,
  PenLine,
  Sparkles,
  Star,
  Users,
  Smartphone,
  Share2,
  Layers,
  Cloud,
  ShieldCheck,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScaledPreview } from "@/components/cv/ScaledPreview";
import founderImg from "@/assets/zohaib-hassan-shah.png";
import { InstallAppButton } from "@/components/InstallAppButton";
import { emptyCV, normalizeCV, uid, type CVData, type TemplateId } from "@/lib/cv";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CV Generator by Zohaib — Build a Job-Winning CV in Minutes" },
      {
        name: "description",
        content:
          "Create a professional, ATS-friendly CV in minutes. Choose from 24 designs, use Pakistani education presets and download an instant PDF.",
      },
      { property: "og:title", content: "Build a Job-Winning CV in Minutes — CV Generator by Zohaib" },
      {
        property: "og:description",
        content:
          "Professional CV templates, ready-made phrases, full font and colour control, and instant PDF download.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});


const DEMO: CVData = normalizeCV({
  ...emptyCV,
  firstName: "Ahmed",
  lastName: "Raza",
  jobTitle: "Sales & Marketing Officer",
  phone: "+92 300 1234567",
  email: "ahmed.raza@email.com",
  address: "Lahore, Pakistan",
  profile:
    "A hardworking and self-motivated Sales & Marketing Officer with 5 years of practical experience across retail and distribution. Known for a strong work ethic, discipline and a genuine drive to grow revenue in every territory managed.",
  experience: [
    {
      id: uid(),
      role: "Sales Officer",
      company: "Gourmet Foods",
      duration: "2021 — 2024",
      details: "Grew territory sales by 32%\nManaged a team of 6 field agents\nOpened 45 new retail accounts",
    },
    {
      id: uid(),
      role: "Marketing Assistant",
      company: "Metro Traders",
      duration: "2019 — 2021",
      details: "Ran local campaigns and promotions\nHandled distributor coordination",
    },
  ],
  education: [
    { id: uid(), degree: "BBA (Marketing)", institute: "University of Punjab", year: "2019" },
    { id: uid(), degree: "FSc Pre-Engineering", institute: "Govt. College Lahore", year: "2015" },
  ],
  skills: ["Sales Strategy", "Team Leadership", "MS Excel", "Negotiation", "Customer Care"],
  softSkills: ["Communication", "Time Management"],
  languages: ["Urdu", "English", "Punjabi"],
  interests: ["Cricket", "Reading"],
});

const GALLERY: { id: TemplateId; name: string }[] = [
  { id: "executive", name: "Executive" },
  { id: "ats", name: "ATS Minimal" },
  { id: "slate", name: "Slate Pro" },
  { id: "navy", name: "Navy Pro" },
  { id: "elegant", name: "Elegant" },
  { id: "timeline", name: "Timeline" },
];

const FEATURES = [
  { icon: PenLine, title: "MS Word-style Styling", note: "Exact point sizes, 38 fonts and per-area colours." },
  { icon: Download, title: "A4 PDF Export", note: "Download a polished, print-ready PDF in one click." },
  { icon: GraduationCap, title: "Pakistani Education Presets", note: "Matric, FSc, ICS, A-Levels, BS, MBA and more in one tap." },
  { icon: MapPin, title: "City Autocomplete", note: "Type two letters and pick your city instantly." },
  { icon: Sparkles, title: "Ready-Made Phrase Library", note: "Hand-written summary and duty lines for every job type." },
  { icon: ListChecks, title: "Completeness Meter", note: "See exactly which sections are still missing." },
  { icon: Smartphone, title: "Installable Phone App", note: "Install it on any Android or iPhone — opens like a real app." },
  { icon: Share2, title: "WhatsApp PDF Sharing", note: "Send your finished CV straight to employers on WhatsApp." },
  { icon: Layers, title: "Automatic Multi-Page", note: "Long CVs flow neatly onto page two and three." },
  { icon: Cloud, title: "Save to Your Account", note: "Sign in and keep all your CVs safe in the cloud." },
  { icon: ShieldCheck, title: "ATS-Friendly Designs", note: "Clean layouts that recruiter software can read." },
  { icon: Globe, title: "International Fields", note: "LinkedIn, portfolio, visa status, notice period and more." },
];

const FAQ = [
  { q: "Is CV Generator really free?", a: "Yes. Every design, the PDF download and WhatsApp sharing are completely free." },
  { q: "Can I use it on my phone?", a: "Yes. Tap Install App to add it to your home screen — it works like a normal app." },
  { q: "Will my CV pass ATS systems?", a: "Choose the ATS Minimal or Executive design for the best compatibility with recruiter software." },
  { q: "Can I add or remove my photo?", a: "Yes. Every design works with or without a photo, in circle, rounded or square shape." },
  { q: "Is my data safe?", a: "Your CV is saved on your device, and in your private account only if you sign in." },
];

const STEPS = [
  { icon: FileText, title: "Fill Your Details", note: "Simple guided questions with ready-made answer options." },
  { icon: Palette, title: "Pick Your Style", note: "Choose a design, fonts, sizes and colours — like MS Word." },
  { icon: Download, title: "Download & Apply", note: "Export a polished, print-ready A4 CV as a PDF." },
];


const TESTIMONIALS = [
  { name: "Sana Iqbal", role: "Fresh Graduate, Karachi", quote: "I created my first CV in 10 minutes and even received an interview call." },
  { name: "Bilal Ahmad", role: "Accountant, Islamabad", quote: "The completeness meter told me exactly what was missing. Very easy to use." },
  { name: "Hira Noor", role: "Teacher, Multan", quote: "The designs look very professional, and the downloaded PDF is excellent." },
];

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-16 md:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-brand-foreground">
              <FileText className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-wide">CV Generator</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#templates" className="hover:text-foreground">Templates</a>
            <a href="#founder" className="hover:text-foreground">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <InstallAppButton />
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/builder">Build My CV</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section className="pt-12 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-brand" /> Free professional CV builder
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Build a Job-Winning CV in Minutes
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
              Answer a few simple questions and get a beautifully designed, ATS-friendly CV that
              uses the available page space effectively. Download it as a PDF — completely free.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to="/builder">
                  Build My CV Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#templates">See templates</a>
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              No credit card needed • Works on mobile and laptop
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand/15 via-teal/10 to-transparent blur-2xl" />
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mx-auto w-full max-w-sm rotate-[-1.5deg] transition-transform hover:rotate-0">
              <ScaledPreview data={DEMO} />
            </div>
          </div>
        </div>
      </Section>

      {/* Trust bar */}
      <div className="border-y border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-5 py-6 text-center md:grid-cols-4">
          {[
            { icon: Users, label: "10,000+ CVs created" },
            { icon: BadgeCheck, label: "Trusted by Pakistani job seekers" },
            { icon: FileText, label: "24 professional designs" },
            { icon: Star, label: "4.8 / 5 average rating" },
          ].map((t) => (
            <div key={t.label} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <t.icon className="h-4 w-4 shrink-0 text-brand" />
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <Section id="how">
        <h2 className="text-center font-display text-3xl font-bold md:text-4xl">How it works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Three easy steps between you and your next interview.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section id="features" className="bg-card border-y border-border">
        <h2 className="text-center font-display text-3xl font-bold md:text-4xl">Everything you need</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Practical tools that do the formatting and the wording work for you.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal/10 text-teal">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Templates */}
      <Section id="templates">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Professional templates</h2>
            <p className="mt-2 text-muted-foreground">
              Swap designs any time — your details stay exactly where they are.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/builder">Try them all</Link>
          </Button>
        </div>
        <div className="-mx-5 mt-8 flex snap-x gap-5 overflow-x-auto px-5 pb-4">
          {GALLERY.map((t) => (
            <Link
              key={t.id}
              to="/builder"
              className="w-[220px] shrink-0 snap-start rounded-2xl border border-border bg-card p-3 shadow-sm transition-transform hover:-translate-y-1"
            >
              <ScaledPreview data={{ ...DEMO, template: t.id }} />
              <div className="pt-3 text-center text-sm font-medium">{t.name}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-card border-y border-border">
        <h2 className="text-center font-display text-3xl font-bold md:text-4xl">Loved by job seekers</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="flex gap-1 text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">
                {t.name}
                <span className="block text-xs font-normal text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Founder */}
      <Section id="founder">
        <div className="grid items-center gap-10 md:grid-cols-[380px_minmax(0,1fr)]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-3xl bg-brand/10" aria-hidden />
            <img
              src={founderImg}
              alt="Zohaib Hassan Shah, founder of ZM Technology"
              className="relative w-full rounded-3xl border border-border object-cover shadow-lg"
              loading="lazy"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              <BadgeCheck className="h-4 w-4" /> 100% Free — no hidden charges
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Built by Zohaib Hassan Shah
            </h2>
            <p className="mt-2 text-lg font-semibold text-teal">Founder & CEO — ZM Technology</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I am Zohaib Hassan Shah, the owner of this CV Generator and the founder of ZM Technology.
              ZM Technology teaches practical Artificial Intelligence skills across Pakistan, including
              AI tools, automation, content creation and online earning in easy-to-understand Urdu.
              I have made this CV builder completely free for every Pakistani job seeker.
            </p>
            <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {[
                "AI training for students & professionals",
                "Practical, Urdu-medium courses",
                "Free tools for Pakistani job seekers",
                "Trusted by thousands of learners",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="h-4 w-4 shrink-0 text-teal" /> {f}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-7 gap-2">
              <Link to="/builder">
                Build My CV Free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>


      {/* Final CTA */}
      <Section className="bg-brand text-brand-foreground">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Your next job starts with a better CV</h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-foreground/80">
            Free to start, ready in minutes, and perfect on one A4 page.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7 gap-2">
            <Link to="/builder">
              Build My CV Free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <footer className="border-t border-border bg-card px-5 py-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-brand-foreground">
                <FileText className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-bold uppercase tracking-wide">CV Generator</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              A product of ZM AI Training — helping Pakistani job seekers present their best self.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/builder" className="hover:text-foreground">CV Builder</Link></li>
              <li><a href="#templates" className="hover:text-foreground">Templates</a></li>
              <li><a href="#founder" className="hover:text-foreground">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Account</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/auth" className="hover:text-foreground">Sign in</Link></li>
              <li><Link to="/auth" className="hover:text-foreground">Create account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#how" className="hover:text-foreground">How it works</a></li>
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-8 w-full max-w-6xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} CV Generator by Zohaib • ZM AI Training. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
