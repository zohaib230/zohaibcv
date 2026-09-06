import { useState } from "react";
import {
  AlignJustify,
  Bold,
  CaseUpper,
  Italic,
  List,
  Palette,
  Replace,
  RotateCcw,
  Type as TypeIcon,
  Underline,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  ACCENTS,
  COLOR_PRESETS,
  FONT_LIST,
  STYLE_PRESETS,
  TEMPLATES,
  defaultPage,
  defaultTypography,
  fontStack,
  type CVData,
  type PageSetup,
  type ThemeColors,
  type TypoPart,
  type TypoStyle,
} from "@/lib/cv";

type SetFn = <K extends keyof CVData>(key: K, value: CVData[K]) => void;

const TYPO_PARTS: { id: TypoPart; label: string }[] = [
  { id: "name", label: "Name" },
  { id: "role", label: "Job title" },
  { id: "heading", label: "Section headings" },
  { id: "sub", label: "Sub headings" },
  { id: "body", label: "Body text" },
  { id: "small", label: "Small text" },
];

const PART_COLOR: Record<TypoPart, keyof ThemeColors> = {
  name: "name",
  role: "role",
  heading: "heading",
  sub: "sub",
  body: "body",
  small: "muted",
};

const COLOR_FIELDS: { id: keyof ThemeColors; label: string }[] = [
  { id: "accent", label: "Accent" },
  { id: "pageBg", label: "Page" },
  { id: "headerBg", label: "Header" },
  { id: "headerText", label: "Header text" },
  { id: "sidebarBg", label: "Sidebar" },
  { id: "sidebarText", label: "Sidebar text" },
  { id: "sidebarHeading", label: "Sidebar titles" },
  { id: "name", label: "Name" },
  { id: "role", label: "Job title" },
  { id: "heading", label: "Headings" },
  { id: "sub", label: "Sub headings" },
  { id: "body", label: "Body" },
  { id: "muted", label: "Muted" },
  { id: "divider", label: "Lines" },
];

const SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48];
const LINE_SPACING = [1, 1.15, 1.3, 1.42, 1.5, 1.75, 2];

/** One ribbon group with a caption underneath, exactly like MS Word. */
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex shrink-0 flex-col gap-1 border-r border-border px-3 last:border-r-0">
      <div className="flex flex-wrap items-center gap-1.5">{children}</div>
      <span className="text-center text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function Toggle({
  on,
  onClick,
  title,
  children,
}: {
  on: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="icon"
      title={title}
      variant={on ? "default" : "outline"}
      className="h-8 w-8"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function StyleRibbon({ data, set }: { data: CVData; set: SetFn }) {
  const [tab, setTab] = useState<"home" | "design" | "colours" | "layout">("home");
  const [part, setPart] = useState<TypoPart>("body");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const t = data.typo[part];

  const setTypo = (p: TypoPart, patch: Partial<TypoStyle>) =>
    set("typo", { ...data.typo, [p]: { ...data.typo[p], ...patch } });

  const setPage = (patch: Partial<PageSetup>) => set("page", { ...data.page, ...patch });

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

  /** Find & replace across every piece of written text in the CV. */
  const runReplace = () => {
    if (!find) return;
    const re = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    const s = (v: string) => v.replace(re, replace);
    const list = (v: string[]) => v.map(s);
    set("firstName", s(data.firstName));
    set("lastName", s(data.lastName));
    set("jobTitle", s(data.jobTitle));
    set("profile", s(data.profile));
    set("address", s(data.address));
    set("skills", list(data.skills));
    set("softSkills", list(data.softSkills));
    set("certificates", list(data.certificates));
    set("achievements", list(data.achievements));
    set("interests", list(data.interests));
    set("projects", list(data.projects));
    set("volunteer", list(data.volunteer));
    set("references", list(data.references));
    set(
      "experience",
      data.experience.map((e) => ({
        ...e,
        role: s(e.role),
        company: s(e.company),
        duration: s(e.duration),
        details: s(e.details),
      })),
    );
    set(
      "education",
      data.education.map((e) => ({
        ...e,
        degree: s(e.degree),
        institute: s(e.institute),
        year: s(e.year),
      })),
    );
  };

  const TABS = [
    { id: "home", label: "Home" },
    { id: "design", label: "Design" },
    { id: "colours", label: "Colours" },
    { id: "layout", label: "Layout" },
  ] as const;

  return (
    <div className="no-print sticky top-[68px] z-20 border-b border-border bg-card shadow-sm">
      <div className="mx-auto max-w-6xl">
        <div className="flex gap-1 px-3 pt-2">
          {TABS.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setTab(x.id)}
              className={`rounded-t-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                tab === x.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <div className="flex items-stretch gap-1 overflow-x-auto bg-secondary/60 px-2 py-2">
          {tab === "home" && (
            <>
              <Group label="Apply to">
                <select
                  value={part}
                  onChange={(e) => setPart(e.target.value as TypoPart)}
                  className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                >
                  {TYPO_PARTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </Group>

              <Group label="Font">
                <select
                  value={t.font}
                  onChange={(e) => setTypo(part, { font: e.target.value })}
                  style={{ fontFamily: fontStack(t.font) }}
                  className="h-8 w-40 rounded-md border border-input bg-background px-2 text-sm"
                >
                  {FONT_LIST.map((f) => (
                    <option key={f.id} value={f.id} style={{ fontFamily: f.stack }}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    title="Shrink font"
                    className="h-8 w-8"
                    onClick={() => setTypo(part, { size: Math.max(6, t.size - 0.5) })}
                  >
                    −
                  </Button>
                  <Input
                    type="number"
                    step="0.5"
                    min={6}
                    max={72}
                    value={t.size}
                    onChange={(e) => setTypo(part, { size: Number(e.target.value) || 10 })}
                    className="h-8 w-16 text-center"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    title="Grow font"
                    className="h-8 w-8"
                    onClick={() => setTypo(part, { size: Math.min(72, t.size + 0.5) })}
                  >
                    +
                  </Button>
                  <select
                    value=""
                    onChange={(e) => e.target.value && setTypo(part, { size: Number(e.target.value) })}
                    className="h-8 rounded-md border border-input bg-background px-1 text-xs"
                  >
                    <option value="">pt</option>
                    {SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <Toggle on={t.bold} title="Bold" onClick={() => setTypo(part, { bold: !t.bold })}>
                  <Bold className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle on={t.italic} title="Italic" onClick={() => setTypo(part, { italic: !t.italic })}>
                  <Italic className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle
                  on={t.underline}
                  title="Underline"
                  onClick={() => setTypo(part, { underline: !t.underline })}
                >
                  <Underline className="h-3.5 w-3.5" />
                </Toggle>
                <Toggle on={t.caps} title="UPPERCASE" onClick={() => setTypo(part, { caps: !t.caps })}>
                  <CaseUpper className="h-4 w-4" />
                </Toggle>
                <label
                  title="Text colour"
                  className="flex h-8 items-center gap-1 rounded-md border border-input bg-background px-2 text-[10px]"
                >
                  <Palette className="h-3 w-3 text-muted-foreground" />
                  <input
                    type="color"
                    value={data.colors[PART_COLOR[part]]}
                    onChange={(e) => setColor(PART_COLOR[part], e.target.value)}
                    className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
                  />
                </label>
                <div className="flex items-center gap-1" title="Letter spacing">
                  <span className="text-[10px] text-muted-foreground">A↔A</span>
                  <Input
                    type="number"
                    step="0.25"
                    value={t.spacing}
                    onChange={(e) => setTypo(part, { spacing: Number(e.target.value) || 0 })}
                    className="h-8 w-14 text-center"
                  />
                </div>
              </Group>

              <Group label="Whole CV">
                <Button type="button" size="sm" variant="outline" className="h-8" onClick={() => scaleAll(-0.5)}>
                  <TypeIcon className="h-3 w-3" /> A−
                </Button>
                <Button type="button" size="sm" variant="outline" className="h-8" onClick={() => scaleAll(0.5)}>
                  <Bold className="h-3.5 w-3.5" /> A+
                </Button>
                <select
                  value=""
                  title="Use the same font everywhere"
                  onChange={(e) => {
                    const f = e.target.value;
                    if (!f) return;
                    set(
                      "typo",
                      Object.fromEntries(
                        (Object.keys(data.typo) as TypoPart[]).map((k) => [k, { ...data.typo[k], font: f }]),
                      ) as typeof data.typo,
                    );
                  }}
                  className="h-8 w-36 rounded-md border border-input bg-background px-2 text-sm"
                >
                  <option value="">Same font everywhere…</option>
                  {FONT_LIST.map((f) => (
                    <option key={f.id} value={f.id} style={{ fontFamily: f.stack }}>
                      {f.label}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8"
                  onClick={() => {
                    set("typo", defaultTypography);
                    set("page", defaultPage);
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
              </Group>

              <Group label="Styles">
                {STYLE_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      set("typo", p.typo);
                      set("page", p.page);
                    }}
                    className="flex h-12 w-20 flex-col items-center justify-center rounded-md border border-border bg-background text-[11px] hover:bg-secondary"
                  >
                    <span style={{ fontFamily: fontStack(p.typo.heading.font), fontWeight: 700 }}>
                      AaBbCc
                    </span>
                    <span className="text-[9px] text-muted-foreground">{p.name}</span>
                  </button>
                ))}
              </Group>

              <Group label="Editing">
                <Input
                  value={find}
                  onChange={(e) => setFind(e.target.value)}
                  placeholder="Find"
                  className="h-8 w-24"
                />
                <Input
                  value={replace}
                  onChange={(e) => setReplace(e.target.value)}
                  placeholder="Replace with"
                  className="h-8 w-28"
                />
                <Button type="button" size="sm" variant="outline" className="h-8" onClick={runReplace}>
                  <Replace className="h-3.5 w-3.5" /> Replace all
                </Button>
              </Group>
            </>
          )}

          {tab === "design" && (
            <Group label="Template — works with every style setting">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  title={tpl.note}
                  onClick={() => set("template", tpl.id)}
                  className={`flex w-[86px] shrink-0 flex-col items-center gap-1 rounded-md border-2 p-1.5 text-[10px] transition-colors ${
                    data.template === tpl.id
                      ? "border-brand bg-brand/10"
                      : "border-border bg-background hover:bg-secondary"
                  }`}
                >
                  <span className="flex h-10 w-full overflow-hidden rounded border border-border">
                    <span className="w-1/3" style={{ background: tpl.preview[0] }} />
                    <span className="flex-1" style={{ background: tpl.preview[1] }}>
                      <span className="mx-1 mt-1 block h-1 rounded" style={{ background: data.colors.accent }} />
                      <span className="mx-1 mt-1 block h-[2px]" style={{ background: tpl.preview[2] }} />
                      <span className="mx-1 mt-1 block h-[2px]" style={{ background: tpl.preview[2] }} />
                    </span>
                  </span>
                  <span className="truncate">{tpl.name}</span>
                </button>
              ))}
            </Group>
          )}

          {tab === "colours" && (
            <>
              <Group label="Themes">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    title={p.name}
                    onClick={() => {
                      set("colors", { ...data.colors, ...p.colors });
                      if (p.colors.accent) set("accent", p.colors.accent);
                    }}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] hover:bg-secondary"
                  >
                    <span className="h-3.5 w-3.5 rounded-full" style={{ background: p.colors.accent }} />
                    {p.name}
                  </button>
                ))}
              </Group>

              <Group label="Accent">
                {ACCENTS.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    title={a.name}
                    onClick={() => setColor("accent", a.value)}
                    className={`h-7 w-7 rounded-full border-2 ${
                      data.colors.accent === a.value ? "scale-110 border-foreground" : "border-transparent"
                    }`}
                    style={{ background: a.value }}
                  />
                ))}
              </Group>

              <Group label="Every area">
                {COLOR_FIELDS.map((c) => (
                  <label
                    key={c.id}
                    title={c.label}
                    className="flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-1 text-[10px]"
                  >
                    <Palette className="h-3 w-3 text-muted-foreground" />
                    <span className="max-w-[70px] truncate">{c.label}</span>
                    <input
                      type="color"
                      value={data.colors[c.id]}
                      onChange={(e) => setColor(c.id, e.target.value)}
                      className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
                    />
                  </label>
                ))}
              </Group>
            </>
          )}

          {tab === "layout" && (
            <>
              <Group label="Auto-fill">
                <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 text-xs">
                  <Switch checked={data.autoFit} onCheckedChange={(v) => set("autoFit", v)} />
                  Fill the whole A4 page
                </div>
              </Group>

              <Group label="Paragraph">
                <label className="flex items-center gap-1 text-[11px]" title="Line spacing">
                  <AlignJustify className="h-3.5 w-3.5 text-muted-foreground" />
                  <select
                    value={data.page.lineHeight}
                    onChange={(e) => setPage({ lineHeight: Number(e.target.value) })}
                    className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                  >
                    {LINE_SPACING.map((l) => (
                      <option key={l} value={l}>
                        {l.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-1 text-[11px]" title="Bullet style">
                  <List className="h-3.5 w-3.5 text-muted-foreground" />
                  <select
                    value={data.page.bullet}
                    onChange={(e) => setPage({ bullet: e.target.value as PageSetup["bullet"] })}
                    className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                  >
                    <option value="disc">• Dot</option>
                    <option value="circle">◦ Circle</option>
                    <option value="square">▪ Square</option>
                    <option value="dash">– Dash</option>
                    <option value="none">No bullet</option>
                  </select>
                </label>
              </Group>

              <Group label="Spacing">
                <div className="flex items-center gap-1 text-[11px]">
                  Sections
                  <Input
                    type="number"
                    min={4}
                    max={40}
                    value={data.page.sectionGap}
                    onChange={(e) => setPage({ sectionGap: Number(e.target.value) || 12 })}
                    className="h-8 w-16 text-center"
                  />
                </div>
                <div className="flex items-center gap-1 text-[11px]">
                  Margins
                  <Input
                    type="number"
                    min={12}
                    max={60}
                    value={data.page.margin}
                    onChange={(e) => setPage({ margin: Number(e.target.value) || 30 })}
                    className="h-8 w-16 text-center"
                  />
                </div>
              </Group>

              <Group label="Photo">
                <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 text-xs">
                  <Switch checked={data.withPhoto} onCheckedChange={(v) => set("withPhoto", v)} />
                  Show picture
                </div>
                {(["circle", "rounded", "square"] as const).map((s) => (
                  <Button
                    key={s}
                    type="button"
                    size="sm"
                    variant={data.photoShape === s ? "default" : "outline"}
                    className="h-8 capitalize"
                    onClick={() => set("photoShape", s)}
                  >
                    {s}
                  </Button>
                ))}
              </Group>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
