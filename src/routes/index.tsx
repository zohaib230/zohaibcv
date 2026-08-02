import { useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Download,
  FileText,
  Plus,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/cv/TagInput";
import { CVPreview } from "@/components/cv/CVPreview";
import {
  ageFromDob,
  emptyCV,
  generateProfile,
  uid,
  type CVData,
  type TemplateId,
} from "@/lib/cv";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CV Generator by Zohaib — Free Professional CV Maker" },
      {
        name: "description",
        content:
          "Create a professional CV in minutes, with or without a photo. Pick a design, answer a few questions and download your CV as PDF.",
      },
      { property: "og:title", content: "CV Generator by Zohaib" },
      {
        property: "og:description",
        content: "Create a professional CV in minutes — with or without a photo.",
      },
    ],
  }),
  component: App,
});

const STEPS = [
  "Photo",
  "Personal",
  "Contact",
  "Profile",
  "Experience",
  "Education",
  "Skills",
  "Preview",
];

function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CVData>(emptyCV);
  const [autoProfile, setAutoProfile] = useState(true);

  const set = <K extends keyof CVData>(key: K, value: CVData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const profileText = useMemo(
    () => (autoProfile ? generateProfile(data) : data.profile),
    [autoProfile, data],
  );
  const preview: CVData = { ...data, profile: profileText };

  if (!started) return <Splash onStart={() => setStarted(true)} />;

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print border-b border-border bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand" />
            <span className="font-display text-xl uppercase tracking-wide">
              CV Generator <span className="text-brand">by Zohaib</span>
            </span>
          </div>
          <span className="text-xs text-ink-foreground/60">
            Step {step + 1} / {STEPS.length} · {STEPS[step]}
          </span>
        </div>
        <div className="h-1 w-full bg-white/10">
          <div
            className="h-full bg-brand transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="no-print">
          {step === 0 && <StepPhoto data={data} set={set} />}
          {step === 1 && <StepPersonal data={data} set={set} />}
          {step === 2 && <StepContact data={data} set={set} />}
          {step === 3 && (
            <StepProfile
              data={data}
              set={set}
              auto={autoProfile}
              setAuto={setAutoProfile}
              generated={generateProfile(data)}
            />
          )}
          {step === 4 && <StepExperience data={data} set={set} />}
          {step === 5 && <StepEducation data={data} set={set} />}
          {step === 6 && <StepSkills data={data} set={set} />}
          {step === 7 && <StepFinish data={preview} set={set} />}

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)}>
                Next <ArrowRight />
              </Button>
            ) : (
              <Button onClick={() => window.print()}>
                <Download /> Download / Print PDF
              </Button>
            )}
          </div>
        </div>

        <aside>
          <p className="no-print mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Live preview
          </p>
          <div className="print-area origin-top-left overflow-hidden rounded-md border border-border shadow-lg lg:w-[420px]">
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
        Answer a few simple questions and get a clean, professional CV — with a photo or without
        one. Ready to print or save as PDF.
      </p>
      <Button size="lg" className="mt-8 bg-brand text-brand-foreground hover:bg-brand/90" onClick={onStart}>
        Start building <ArrowRight />
      </Button>
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
            data.withPhoto ? "border-accent bg-accent/10" : "border-border hover:bg-secondary"
          }`}
        >
          <Camera className="mb-2 h-6 w-6" />
          <div className="font-semibold">With picture</div>
          <p className="text-sm text-muted-foreground">Photo CV, like the yellow sidebar design.</p>
        </button>
        <button
          type="button"
          onClick={() => set("withPhoto", false)}
          className={`rounded-lg border-2 p-5 text-left transition-colors ${
            !data.withPhoto ? "border-accent bg-accent/10" : "border-border hover:bg-secondary"
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
    <Card title="Personal details" hint="Basic information that appears on every CV.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name">
          <Input value={data.firstName} onChange={(e) => set("firstName", e.target.value)} />
        </Field>
        <Field label="Last name">
          <Input value={data.lastName} onChange={(e) => set("lastName", e.target.value)} />
        </Field>
        <Field label="Gender">
          <Select value={data.gender} onValueChange={(v) => set("gender", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Father's name">
          <Input value={data.fatherName} onChange={(e) => set("fatherName", e.target.value)} />
        </Field>
        <Field label="CNIC number">
          <Input
            value={data.cnic}
            placeholder="35202-1234567-1"
            onChange={(e) => set("cnic", e.target.value)}
          />
        </Field>
        <Field label="Nationality">
          <Input value={data.nationality} onChange={(e) => set("nationality", e.target.value)} />
        </Field>
        <Field label="Religion">
          <Input value={data.religion} onChange={(e) => set("religion", e.target.value)} />
        </Field>
        <Field label="Marital status">
          <Select value={data.maritalStatus} onValueChange={(v) => set("maritalStatus", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
              <SelectItem value="Widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </Field>
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
      <Field label="Address">
        <Textarea rows={2} value={data.address} onChange={(e) => set("address", e.target.value)} />
      </Field>
      <Field label="Languages">
        <TagInput
          value={data.languages}
          onChange={(v) => set("languages", v)}
          placeholder="Type a language and press Enter"
          suggestions={["Urdu", "English", "Punjabi", "Saraiki", "Pashto", "Sindhi", "Arabic"]}
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
          <Sparkles className="h-4 w-4 text-accent-foreground" />
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
        <Textarea
          rows={7}
          value={data.profile}
          placeholder="Write about yourself…"
          onChange={(e) => set("profile", e.target.value)}
        />
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
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Job title / role">
                  <Input value={e.role} placeholder="Shop Manager" onChange={(ev) => update(e.id, { role: ev.target.value })} />
                </Field>
                <Field label="Company">
                  <Input value={e.company} onChange={(ev) => update(e.id, { company: ev.target.value })} />
                </Field>
                <Field label="Duration">
                  <Input value={e.duration} placeholder="2 Years" onChange={(ev) => update(e.id, { duration: ev.target.value })} />
                </Field>
              </div>
              <Field label="What did you do?">
                <Textarea rows={2} value={e.details} onChange={(ev) => update(e.id, { details: ev.target.value })} />
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
        <div key={e.id} className="grid gap-3 rounded-lg border border-border p-4 sm:grid-cols-3">
          <Field label="Degree / course">
            <Input value={e.degree} placeholder="Matric" onChange={(ev) => update(e.id, { degree: ev.target.value })} />
          </Field>
          <Field label="Institute / board">
            <Input value={e.institute} placeholder="BISE Lahore" onChange={(ev) => update(e.id, { institute: ev.target.value })} />
          </Field>
          <Field label="Year">
            <Input value={e.year} placeholder="2022" onChange={(ev) => update(e.id, { year: ev.target.value })} />
          </Field>
          <div className="sm:col-span-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => set("education", data.education.filter((x) => x.id !== e.id))}
            >
              <Trash2 /> Remove
            </Button>
          </div>
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
    <Card title="Skills & interests" hint="Optional — add them only if you want.">
      <Field label="Skills">
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
            "AI Content Creation",
            "Prompt Engineering",
          ]}
        />
      </Field>
      <Field label="Interests">
        <TagInput
          value={data.interests}
          onChange={(v) => set("interests", v)}
          placeholder="Type an interest and press Enter"
          suggestions={["Business", "E-Commerce", "Reading", "Sports", "Artificial Intelligence"]}
        />
      </Field>
    </Card>
  );
}

const TEMPLATES: { id: TemplateId; name: string; note: string }[] = [
  { id: "sidebar", name: "Yellow Sidebar", note: "Bold photo CV" },
  { id: "modern", name: "Modern Band", note: "Clean two-column" },
  { id: "classic", name: "Classic Black", note: "Text-only style" },
];

function StepFinish({ data, set }: { data: CVData; set: SetFn }) {
  return (
    <Card title="Choose a design" hint="Pick a template, then download or print your CV.">
      <div className="grid gap-3 sm:grid-cols-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => set("template", t.id)}
            className={`rounded-lg border-2 p-4 text-left transition-colors ${
              data.template === t.id ? "border-accent bg-accent/10" : "border-border hover:bg-secondary"
            }`}
          >
            <div className="font-semibold">{t.name}</div>
            <p className="text-xs text-muted-foreground">{t.note}</p>
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Tip: in the print dialog choose “Save as PDF”, set margins to <em>None</em> and enable
        background graphics for the best result.
      </p>
    </Card>
  );
}
