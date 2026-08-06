import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CloudUpload,
  Code2,
  Download,
  FileText,
  FolderOpen,
  LogOut,
  Palette,
  Plus,
  Sparkles,
  Trash2,
  UserRound,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TagInput } from "@/components/cv/TagInput";
import { OptionChips } from "@/components/cv/OptionChips";
import { CVPreview } from "@/components/cv/CVPreview";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { downloadHtml } from "@/lib/export-html";
import {
  ACCENTS,
  FONTS,
  ageFromDob,
  cvScore,
  emptyCV,
  fullName,
  generateProfile,
  normalizeCV,
  uid,
  type CVData,
  type FontId,
  type TemplateId,
} from "@/lib/cv";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CV Generator by Zohaib — 7 Designs, Free CV Maker" },
      {
        name: "description",
        content:
          "Build a full-page professional CV in minutes: pick one of 7 designs, answer guided questions with ready-made options, choose fonts and colours, then download as PDF or HTML.",
      },
      { property: "og:title", content: "CV Generator by Zohaib" },
      {
        property: "og:description",
        content: "7 professional CV designs, guided questions, PDF and HTML download.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

const STEPS = [
  "Design",
  "Style",
  "Photo",
  "Personal",
  "Contact",
  "Profile",
  "Experience",
  "Education",
  "Skills",
  "Finish",
];

const DRAFT_KEY = "cv-generator-draft";

const TEMPLATES: { id: TemplateId; name: string; note: string; preview: string[] }[] = [
  { id: "elevate", name: "Elevate", note: "Two-column with skill chips", preview: ["#ffffff", "#eceef1", "#8a8f96"] },
  { id: "timeline", name: "Timeline", note: "Dark sidebar + timeline dots", preview: ["#1f2833", "#ffffff", "#6b7078"] },
  { id: "navy", name: "Navy Pro", note: "Deep navy left panel", preview: ["#22313f", "#ffffff", "#cfe1ef"] },
  { id: "peach", name: "Curved", note: "Curved header + skill bars", preview: ["#f1f1f1", "#ffffff", "#c9c9c9"] },
  { id: "sidebar", name: "Bold Sidebar", note: "Round photo, big headings", preview: ["#26272b", "#ffffff", "#5a5a5a"] },
  { id: "modern", name: "Modern Band", note: "Header band, clean grid", preview: ["#1b1c1f", "#f4f2ec", "#777777"] },
  { id: "classic", name: "Classic Black", note: "Formal bio-data style", preview: ["#111111", "#ffffff", "#888888"] },
];

const SAMPLE: Partial<CVData> = {
  firstName: "Ahmed",
  lastName: "Raza",
  jobTitle: "Sales & Marketing Officer",
  gender: "Male",
  fatherName: "Muhammad Raza",
  cnic: "35202-1234567-1",
  maritalStatus: "Single",
  religion: "Islam",
  dob: "1999-04-12",
  age: "26",
  phone: "+92 300 1234567",
  email: "ahmed.raza@gmail.com",
  address: "Model Town, Lahore, Pakistan",
  languages: ["Urdu", "English", "Punjabi"],
  skills: ["MS Excel", "Customer Handling", "Sales Reporting", "Social Media Marketing"],
  softSkills: ["Teamwork", "Communication", "Time Management"],
  interests: ["Cricket", "Reading", "Technology"],
  certificates: ["Digital Marketing — DigiSkills 2023"],
  achievements: ["Increased monthly shop sales by 30% in 6 months"],
  experience: [
    {
      id: uid(),
      role: "Sales Officer",
      company: "Al-Madina Traders, Lahore",
      duration: "2 Years (2023 – 2025)",
      details:
        "Handled daily customer sales and after-sales support.\nMaintained stock records and monthly sales reports.\nBuilt long-term relationships with 100+ regular clients.",
    },
  ],
  education: [
    { id: uid(), degree: "BS Commerce", institute: "University of Punjab", year: "2021 – 2025" },
    { id: uid(), degree: "Intermediate (I.Com)", institute: "Govt College Lahore", year: "2019 – 2021" },
  ],
};

function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CVData>(emptyCV);
  const [autoProfile, setAutoProfile] = useState(true);
  const { user, signOut } = useAuth();

  const set = <K extends keyof CVData>(key: K, value: CVData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  // Feature: local auto-save so nothing is lost on refresh
  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      try {
        setData(normalizeCV(JSON.parse(raw)));
      } catch {
        /* ignore broken draft */
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  }, [data]);

  const profileText = useMemo(
    () => (autoProfile ? generateProfile(data) : data.profile),
    [autoProfile, data],
  );
  const preview: CVData = { ...data, profile: profileText };
  const { score, tips } = cvScore(preview);

  if (!started) return <Splash onStart={() => setStarted(true)} />;

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print sticky top-0 z-30 border-b border-border bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand" />
            <span className="font-display text-xl uppercase tracking-wide">
              CV Generator <span className="text-brand">by Zohaib</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="hidden text-ink-foreground/60 sm:inline">
              Step {step + 1}/{STEPS.length} · {STEPS[step]}
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1">
              CV strength <b className="text-brand">{score}%</b>
            </span>
            <SavedCVsDialog user={user} data={preview} onLoad={setData} />
            {user ? (
              <Button size="sm" variant="ghost" className="text-ink-foreground" onClick={() => signOut()}>
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            ) : (
              <Button size="sm" variant="ghost" className="text-ink-foreground" asChild>
                <Link to="/auth">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-[2px] px-5 pb-2">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              title={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-brand" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="no-print">
          {step === 0 && <StepDesign data={data} set={set} />}
          {step === 1 && <StepStyle data={data} set={set} />}
          {step === 2 && <StepPhoto data={data} set={set} />}
          {step === 3 && <StepPersonal data={data} set={set} />}
          {step === 4 && <StepContact data={data} set={set} />}
          {step === 5 && (
            <StepProfile
              data={data}
              set={set}
              auto={autoProfile}
              setAuto={setAutoProfile}
              generated={generateProfile(data)}
            />
          )}
          {step === 6 && <StepExperience data={data} set={set} />}
          {step === 7 && <StepEducation data={data} set={set} />}
          {step === 8 && <StepSkills data={data} set={set} />}
          {step === 9 && <StepFinish data={preview} tips={tips} score={score} />}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft /> Back
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setData((d) => ({ ...d, ...SAMPLE }));
                toast.success("Sample data filled — now edit it with your own details");
              }}
            >
              <Wand2 /> Fill sample data
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)}>
                Next <ArrowRight />
              </Button>
            ) : (
              <Button onClick={() => window.print()}>
                <Download /> Download PDF
              </Button>
            )}
          </div>
        </div>

        <aside>
          <p className="no-print mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Live preview
          </p>
          <div className="print-area h-[158mm] w-full overflow-hidden rounded-md border border-border shadow-lg lg:w-[420px]">
            <div className="cv-scale w-[210mm] origin-top-left scale-[0.529]">
              <CVPreview data={preview} />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Splash({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-ink-foreground">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand">
        <FileText className="h-8 w-8 text-brand-foreground" />
      </div>
      <h1 className="font-display text-5xl uppercase leading-none tracking-wide sm:text-7xl">
        CV Generator
      </h1>
      <p className="mt-3 font-display text-2xl uppercase tracking-[0.3em] text-brand">by Zohaib</p>
      <p className="mt-6 max-w-md text-sm text-ink-foreground/70">
        Pick one of 7 professional designs, answer simple questions with ready-made options, choose
        your fonts and colours — then download your full-page CV as PDF or HTML.
      </p>
      <Button size="lg" className="mt-8 bg-brand text-brand-foreground hover:bg-brand/90" onClick={onStart}>
        Start building <ArrowRight />
      </Button>
      <Link to="/auth" className="mt-4 text-xs text-ink-foreground/50 underline">
        Sign in to save your CVs
      </Link>
    </div>
  );
}

type SetFn = <K extends keyof CVData>(key: K, value: CVData[K]) => void;

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="font-display text-2xl uppercase tracking-wide">{title}</h2>
      {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function StepDesign({ data, set }: { data: CVData; set: SetFn }) {
  return (
    <Card title="Choose your design" hint="Pick the CV layout first — you can change it any time.">
      <div className="grid gap-3 sm:grid-cols-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => set("template", t.id)}
            className={`flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-colors ${
              data.template === t.id ? "border-brand bg-brand/10" : "border-border hover:bg-secondary"
            }`}
          >
            <span className="flex h-14 w-11 shrink-0 overflow-hidden rounded border border-border">
              <span className="w-1/3" style={{ background: t.preview[0] }} />
              <span className="flex-1" style={{ background: t.preview[1] }}>
                <span className="mx-1 mt-1.5 block h-1 rounded" style={{ background: data.accent }} />
                <span className="mx-1 mt-1 block h-[2px]" style={{ background: t.preview[2] }} />
                <span className="mx-1 mt-1 block h-[2px]" style={{ background: t.preview[2] }} />
              </span>
            </span>
            <span>
              <span className="block font-semibold">{t.name}</span>
              <span className="block text-xs text-muted-foreground">{t.note}</span>
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}

const TYPO_PARTS: { id: TypoPart; label: string }[] = [
  { id: "name", label: "Name" },
  { id: "role", label: "Job title" },
  { id: "heading", label: "Section headings" },
  { id: "sub", label: "Sub headings" },
  { id: "body", label: "Body text" },
  { id: "small", label: "Small text" },
];

const COLOR_FIELDS: { id: keyof ThemeColors; label: string }[] = [
  { id: "accent", label: "Accent" },
  { id: "pageBg", label: "Page background" },
  { id: "headerBg", label: "Header background" },
  { id: "headerText", label: "Header text" },
  { id: "sidebarBg", label: "Sidebar background" },
  { id: "sidebarText", label: "Sidebar text" },
  { id: "sidebarHeading", label: "Sidebar headings" },
  { id: "name", label: "Name colour" },
  { id: "role", label: "Job title colour" },
  { id: "heading", label: "Headings colour" },
  { id: "sub", label: "Sub heading colour" },
  { id: "body", label: "Body text colour" },
  { id: "muted", label: "Muted text" },
  { id: "divider", label: "Lines / dividers" },
];

function StepStyle({ data, set }: { data: CVData; set: SetFn }) {
  const setTypo = (part: TypoPart, patch: Partial<{ font: string; size: number }>) =>
    set("typo", { ...data.typo, [part]: { ...data.typo[part], ...patch } });

  const setColor = (key: keyof ThemeColors, value: string) => {
    set("colors", { ...data.colors, [key]: value });
    if (key === "accent") set("accent", value);
  };

  const scaleAll = (delta: number) =>
    set(
      "typo",
      Object.fromEntries(
        (Object.keys(data.typo) as TypoPart[]).map((k) => [
          k,
          { ...data.typo[k], size: Math.max(6, Math.round((data.typo[k].size + delta) * 10) / 10) },
        ]),
      ) as typeof data.typo,
    );

  return (
    <Card title="Writing style" hint="Choose the font, exact point size and colour of every part — just like MS Word.">
      <Field label="Text size of the whole CV">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => scaleAll(-0.5)}>
            A− Smaller
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => scaleAll(0.5)}>
            A+ Bigger
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => set("typo", defaultTypography)}>
            Reset
          </Button>
        </div>
      </Field>

      <Field label="Fonts & point size — set each part on its own">
        <div className="space-y-2">
          {TYPO_PARTS.map((p) => (
            <div key={p.id} className="grid grid-cols-[1fr_auto] items-end gap-2 rounded-lg border border-border p-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">{p.label}</Label>
                <select
                  value={data.typo[p.id].font}
                  onChange={(e) => setTypo(p.id, { font: e.target.value })}
                  style={{ fontFamily: fontStack(data.typo[p.id].font) }}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                >
                  {FONT_LIST.map((f) => (
                    <option key={f.id} value={f.id} style={{ fontFamily: f.stack }}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Size (pt)</Label>
                <div className="flex items-center gap-1">
                  <Button type="button" size="icon" variant="outline" className="h-9 w-9"
                    onClick={() => setTypo(p.id, { size: Math.max(6, data.typo[p.id].size - 0.5) })}>
                    −
                  </Button>
                  <Input
                    type="number"
                    step="0.5"
                    min={6}
                    max={72}
                    value={data.typo[p.id].size}
                    onChange={(e) => setTypo(p.id, { size: Number(e.target.value) || 10 })}
                    className="h-9 w-20 text-center"
                  />
                  <Button type="button" size="icon" variant="outline" className="h-9 w-9"
                    onClick={() => setTypo(p.id, { size: Math.min(72, data.typo[p.id].size + 0.5) })}>
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Field>

      <Field label="Colour presets">
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => {
                set("colors", { ...data.colors, ...p.colors });
                if (p.colors.accent) set("accent", p.colors.accent);
              }}
              className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-secondary"
            >
              <span className="h-4 w-4 rounded-full" style={{ background: p.colors.accent }} />
              {p.name}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Change any area's colour">
        <div className="grid gap-2 sm:grid-cols-2">
          {COLOR_FIELDS.map((c) => (
            <label key={c.id} className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-sm">
              <span className="flex items-center gap-2">
                <Palette className="h-3.5 w-3.5 text-muted-foreground" />
                {c.label}
              </span>
              <input
                type="color"
                value={data.colors[c.id]}
                onChange={(e) => setColor(c.id, e.target.value)}
                className="h-7 w-10 cursor-pointer border-0 bg-transparent p-0"
              />
            </label>
          ))}
        </div>
      </Field>

      <Field label="Quick accents">
        <div className="flex flex-wrap gap-2">
          {ACCENTS.map((a) => (
            <button
              key={a.value}
              type="button"
              title={a.name}
              onClick={() => setColor("accent", a.value)}
              className={`h-9 w-9 rounded-full border-2 transition-transform ${
                data.colors.accent === a.value ? "scale-110 border-foreground" : "border-transparent"
              }`}
              style={{ background: a.value }}
            />
          ))}
        </div>
      </Field>

      <div className="flex items-center justify-between rounded-lg border border-border p-3">
        <div>
          <p className="text-sm font-medium">Auto-fill the page</p>
          <p className="text-xs text-muted-foreground">
            Automatically grows or shrinks everything so the CV always fills one full A4 page.
          </p>
        </div>
        <Switch checked={data.autoFit} onCheckedChange={(v) => set("autoFit", v)} />
      </div>
    </Card>
  );
}


function StepPhoto({ data, set }: { data: CVData; set: SetFn }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => set("photo", String(reader.result));
    reader.readAsDataURL(f);
  };

  return (
    <Card title="Photo or no photo?" hint="Choose whether your CV should include a picture.">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => set("withPhoto", true)}
          className={`rounded-lg border-2 p-5 text-left transition-colors ${
            data.withPhoto ? "border-brand bg-brand/10" : "border-border hover:bg-secondary"
          }`}
        >
          <Camera className="mb-2 h-6 w-6" />
          <div className="font-semibold">With picture</div>
          <p className="text-sm text-muted-foreground">Photo CV — friendly and personal.</p>
        </button>
        <button
          type="button"
          onClick={() => set("withPhoto", false)}
          className={`rounded-lg border-2 p-5 text-left transition-colors ${
            !data.withPhoto ? "border-brand bg-brand/10" : "border-border hover:bg-secondary"
          }`}
        >
          <UserRound className="mb-2 h-6 w-6" />
          <div className="font-semibold">Without picture</div>
          <p className="text-sm text-muted-foreground">Clean text-only CV, fully professional.</p>
        </button>
      </div>

      {data.withPhoto && (
        <div className="flex items-center gap-4 rounded-lg border border-border p-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-secondary">
            {data.photo && <img src={data.photo} alt="Selected" className="h-full w-full object-cover" />}
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            <Button variant="outline" onClick={() => fileRef.current?.click()}>
              {data.photo ? "Change photo" : "Upload photo"}
            </Button>
            {data.photo && (
              <Button variant="ghost" onClick={() => set("photo", null)}>
                Remove
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

function StepPersonal({ data, set }: { data: CVData; set: SetFn }) {
  return (
    <Card title="Personal details" hint="Tap an option or type your own answer.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name">
          <Input value={data.firstName} onChange={(e) => set("firstName", e.target.value)} />
        </Field>
        <Field label="Last name">
          <Input value={data.lastName} onChange={(e) => set("lastName", e.target.value)} />
        </Field>
      </div>

      <Field label="Job title / position you want">
        <Input
          value={data.jobTitle}
          placeholder="Sales Officer"
          onChange={(e) => set("jobTitle", e.target.value)}
        />
        <OptionChips
          value={data.jobTitle}
          onPick={(v) => set("jobTitle", v)}
          options={[
            "Sales Officer",
            "Office Assistant",
            "Accountant",
            "Graphic Designer",
            "Web Developer",
            "Customer Support",
            "Teacher",
            "Driver",
            "Electrician",
            "Data Entry Operator",
          ]}
        />
      </Field>

      <Field label="Gender">
        <OptionChips
          value={data.gender}
          onPick={(v) => set("gender", v)}
          options={["Male", "Female", "Other"]}
          className="mt-0"
        />
      </Field>

      <Field label="Father's name">
        <Input value={data.fatherName} onChange={(e) => set("fatherName", e.target.value)} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="CNIC number">
          <Input
            value={data.cnic}
            placeholder="35202-1234567-1"
            onChange={(e) => set("cnic", e.target.value)}
          />
        </Field>
        <Field label="Nationality">
          <Input value={data.nationality} onChange={(e) => set("nationality", e.target.value)} />
          <OptionChips
            value={data.nationality}
            onPick={(v) => set("nationality", v)}
            options={["Pakistani", "Indian", "Bangladeshi", "Emirati", "Saudi", "British"]}
          />
        </Field>
      </div>

      <Field label="Religion">
        <OptionChips
          value={data.religion}
          onPick={(v) => set("religion", v)}
          options={["Islam", "Christianity", "Hinduism", "Sikhism", "Prefer not to say"]}
          className="mt-0"
        />
      </Field>

      <Field label="Marital status">
        <OptionChips
          value={data.maritalStatus}
          onPick={(v) => set("maritalStatus", v)}
          options={["Single", "Married", "Divorced", "Widowed"]}
          className="mt-0"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date of birth">
          <Input
            type="date"
            value={data.dob}
            onChange={(e) => {
              set("dob", e.target.value);
              set("age", ageFromDob(e.target.value));
            }}
          />
        </Field>
        <Field label="Age">
          <Input value={data.age} onChange={(e) => set("age", e.target.value)} />
        </Field>
      </div>
    </Card>
  );
}

function StepContact({ data, set }: { data: CVData; set: SetFn }) {
  return (
    <Card title="Contact & languages" hint="How employers can reach you.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone number">
          <Input value={data.phone} placeholder="+92 300 1234567" onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            value={data.email}
            placeholder="name@gmail.com"
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
      </div>
      <Field label="Website / LinkedIn (optional)">
        <Input
          value={data.website}
          placeholder="linkedin.com/in/username"
          onChange={(e) => set("website", e.target.value)}
        />
      </Field>
      <Field label="Address">
        <Textarea rows={2} value={data.address} onChange={(e) => set("address", e.target.value)} />
        <OptionChips
          value={data.address}
          onPick={(v) => set("address", v)}
          options={["Lahore, Pakistan", "Karachi, Pakistan", "Islamabad, Pakistan", "Faisalabad, Pakistan", "Multan, Pakistan", "Dubai, UAE"]}
        />
      </Field>
      <Field label="Languages">
        <TagInput
          value={data.languages}
          onChange={(v) => set("languages", v)}
          placeholder="Type a language and press Enter"
          suggestions={["Urdu", "English", "Punjabi", "Saraiki", "Pashto", "Sindhi", "Arabic", "Balochi"]}
        />
      </Field>
    </Card>
  );
}

function StepProfile({
  data,
  set,
  auto,
  setAuto,
  generated,
}: {
  data: CVData;
  set: SetFn;
  auto: boolean;
  setAuto: (v: boolean) => void;
  generated: string;
}) {
  return (
    <Card title="Profile summary" hint="Let the app write it for you, or write your own.">
      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand" />
          <span className="text-sm font-medium">Write my profile automatically</span>
        </div>
        <Switch
          checked={auto}
          onCheckedChange={(v) => {
            setAuto(v);
            if (!v && !data.profile) set("profile", generated);
          }}
        />
      </div>
      {auto ? (
        <p className="rounded-lg bg-secondary p-4 text-sm leading-relaxed">{generated}</p>
      ) : (
        <>
          <Textarea
            rows={7}
            value={data.profile}
            placeholder="Write about yourself…"
            onChange={(e) => set("profile", e.target.value)}
          />
          <OptionChips
            onPick={(v) => set("profile", data.profile ? `${data.profile} ${v}` : v)}
            options={[
              "Hardworking and punctual.",
              "Quick learner with a positive attitude.",
              "Strong communication and teamwork skills.",
              "Able to work under pressure and meet deadlines.",
              "Honest, disciplined and result oriented.",
            ]}
          />
        </>
      )}
    </Card>
  );
}

function StepExperience({ data, set }: { data: CVData; set: SetFn }) {
  const update = (id: string, patch: Partial<CVData["experience"][number]>) =>
    set(
      "experience",
      data.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );

  return (
    <Card title="Work experience" hint="Where you worked, for how long and as what.">
      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <span className="text-sm font-medium">I am a fresh candidate (no experience)</span>
        <Switch checked={data.isFresher} onCheckedChange={(v) => set("isFresher", v)} />
      </div>

      {!data.isFresher && (
        <>
          {data.experience.map((e) => (
            <div key={e.id} className="space-y-3 rounded-lg border border-border p-4">
              <Field label="Job title / role">
                <Input value={e.role} placeholder="Shop Manager" onChange={(ev) => update(e.id, { role: ev.target.value })} />
                <OptionChips
                  value={e.role}
                  onPick={(v) => update(e.id, { role: v })}
                  options={["Sales Officer", "Shop Manager", "Office Assistant", "Accountant", "Technician", "Internee"]}
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Company">
                  <Input value={e.company} onChange={(ev) => update(e.id, { company: ev.target.value })} />
                </Field>
                <Field label="Duration">
                  <Input value={e.duration} placeholder="2 Years" onChange={(ev) => update(e.id, { duration: ev.target.value })} />
                  <OptionChips
                    value={e.duration}
                    onPick={(v) => update(e.id, { duration: v })}
                    options={["6 Months", "1 Year", "2 Years", "3 Years", "5+ Years"]}
                  />
                </Field>
              </div>
              <Field label="What did you do? (one point per line)">
                <Textarea rows={3} value={e.details} onChange={(ev) => update(e.id, { details: ev.target.value })} />
                <OptionChips
                  onPick={(v) => update(e.id, { details: e.details ? `${e.details}\n${v}` : v })}
                  options={[
                    "Handled daily customer sales and support.",
                    "Maintained stock and record files.",
                    "Prepared monthly reports for management.",
                    "Trained and supervised junior staff.",
                  ]}
                />
              </Field>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => set("experience", data.experience.filter((x) => x.id !== e.id))}
              >
                <Trash2 /> Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              set("experience", [
                ...data.experience,
                { id: uid(), role: "", company: "", duration: "", details: "" },
              ])
            }
          >
            <Plus /> Add experience
          </Button>
        </>
      )}
    </Card>
  );
}

function StepEducation({ data, set }: { data: CVData; set: SetFn }) {
  const update = (id: string, patch: Partial<CVData["education"][number]>) =>
    set(
      "education",
      data.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );

  return (
    <Card title="Education" hint="Your degrees, courses and institutes.">
      {data.education.map((e) => (
        <div key={e.id} className="space-y-3 rounded-lg border border-border p-4">
          <Field label="Degree / course">
            <Input value={e.degree} placeholder="Matric" onChange={(ev) => update(e.id, { degree: ev.target.value })} />
            <OptionChips
              value={e.degree}
              onPick={(v) => update(e.id, { degree: v })}
              options={["Matric", "Intermediate (F.Sc)", "Intermediate (I.Com)", "BA / BSc", "BS Computer Science", "BS Commerce", "MA / MSc", "Diploma (DAE)"]}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Institute / board">
              <Input value={e.institute} placeholder="BISE Lahore" onChange={(ev) => update(e.id, { institute: ev.target.value })} />
            </Field>
            <Field label="Year">
              <Input value={e.year} placeholder="2022" onChange={(ev) => update(e.id, { year: ev.target.value })} />
            </Field>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => set("education", data.education.filter((x) => x.id !== e.id))}
          >
            <Trash2 /> Remove
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={() => set("education", [...data.education, { id: uid(), degree: "", institute: "", year: "" }])}
      >
        <Plus /> Add education
      </Button>
    </Card>
  );
}

function StepSkills({ data, set }: { data: CVData; set: SetFn }) {
  return (
    <Card title="Skills & extras" hint="These fill your page and make the CV look complete.">
      <Field label="Hard skills">
        <TagInput
          value={data.skills}
          onChange={(v) => set("skills", v)}
          placeholder="Type a skill and press Enter"
          suggestions={[
            "MS Word",
            "MS Excel",
            "PowerPoint",
            "Internet & Email",
            "Typing",
            "Customer Handling",
            "Sales Reporting",
            "Social Media Marketing",
            "Graphic Design",
            "AI Tools",
          ]}
        />
      </Field>
      <Field label="Soft skills">
        <TagInput
          value={data.softSkills}
          onChange={(v) => set("softSkills", v)}
          placeholder="Type a soft skill and press Enter"
          suggestions={["Teamwork", "Communication", "Time Management", "Problem Solving", "Leadership", "Hard Working"]}
        />
      </Field>
      <Field label="Certificates / courses">
        <TagInput
          value={data.certificates}
          onChange={(v) => set("certificates", v)}
          placeholder="Type a certificate and press Enter"
          suggestions={["DigiSkills Freelancing", "Computer Short Course", "English Language Course", "Driving Licence"]}
        />
      </Field>
      <Field label="Achievements">
        <TagInput
          value={data.achievements}
          onChange={(v) => set("achievements", v)}
          placeholder="Type an achievement and press Enter"
          suggestions={["Employee of the month", "Increased sales by 30%", "Position holder in class", "Sports team captain"]}
        />
      </Field>
      <Field label="Interests / hobbies">
        <TagInput
          value={data.interests}
          onChange={(v) => set("interests", v)}
          placeholder="Type an interest and press Enter"
          suggestions={["Cricket", "Reading", "Travelling", "Technology", "Photography", "Cooking"]}
        />
      </Field>
    </Card>
  );
}

function StepFinish({ data, tips, score }: { data: CVData; tips: string[]; score: number }) {
  const exportHtml = () => {
    const node = document.getElementById("cv-root");
    if (!node) return;
    downloadHtml(node, `${fullName(data).replace(/\s+/g, "-") || "my"}-cv.html`, `${fullName(data)} — CV`);
    toast.success("HTML file downloaded");
  };

  return (
    <Card title="Your CV is ready" hint="Check the strength score, then download.">
      <div>
        <div className="mb-1 flex justify-between text-sm">
          <span>CV strength</span>
          <b>{score}%</b>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-brand transition-all" style={{ width: `${score}%` }} />
        </div>
      </div>

      {tips.length > 0 && (
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm font-medium">To make it even stronger:</p>
          <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm text-muted-foreground">
            {tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => window.print()}>
          <Download /> Download PDF
        </Button>
        <Button variant="outline" onClick={exportHtml}>
          <Code2 /> Download HTML file
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Tip: in the print dialog choose “Save as PDF”, set margins to <em>None</em> and enable
        background graphics for the best result.
      </p>
    </Card>
  );
}

function SavedCVsDialog({
  user,
  data,
  onLoad,
}: {
  user: { id: string } | null;
  data: CVData;
  onLoad: (d: CVData) => void;
}) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<{ id: string; title: string; updated_at: string; data: unknown }[]>([]);

  const load = async () => {
    const { data: list, error } = await supabase
      .from("cvs")
      .select("id,title,updated_at,data")
      .order("updated_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    setRows(list ?? []);
  };

  useEffect(() => {
    if (open && user) void load();
  }, [open, user]);

  const save = async () => {
    if (!user) return;
    const { error } = await supabase.from("cvs").insert({
      user_id: user.id,
      title: `${fullName(data)} — ${data.template}`,
      data: data as unknown as never,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("CV saved to your account");
    void load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("cvs").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRows((r) => r.filter((x) => x.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-ink-foreground">
          <FolderOpen className="h-4 w-4" /> My CVs
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>My saved CVs</DialogTitle>
        </DialogHeader>
        {!user ? (
          <p className="text-sm text-muted-foreground">
            <Link to="/auth" className="underline">
              Sign in
            </Link>{" "}
            to save your CVs in the cloud and open them from any device.
          </p>
        ) : (
          <div className="space-y-3">
            <Button onClick={save} className="w-full">
              <CloudUpload /> Save current CV
            </Button>
            <div className="max-h-72 space-y-2 overflow-auto">
              {rows.length === 0 && <p className="text-sm text-muted-foreground">No saved CVs yet.</p>}
              {rows.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-2 rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(r.updated_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        onLoad(normalizeCV(r.data));
                        setOpen(false);
                        toast.success("CV loaded");
                      }}
                    >
                      Open
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
