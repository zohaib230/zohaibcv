import { useEffect, useRef, useState } from "react";
import {
  AlignJustify, AlignLeft, AlignCenter, AlignRight, Undo2, Redo2, Paintbrush, Strikethrough, Highlighter, Copy, ZoomIn, ZoomOut, Image as ImageIcon,
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
import { toast } from "sonner";
import { replaceCVText } from "@/lib/cv-editing";
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
      aria-label={title}
      aria-pressed={on}
      variant={on ? "default" : "outline"}
      className="h-8 w-8"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function StyleRibbon({ data, onChange, part, onPartChange, zoom, onZoomChange }: {
  data: CVData; onChange: (data: CVData) => void; part: TypoPart; onPartChange: (part: TypoPart) => void;
  zoom: number; onZoomChange: (zoom: number) => void;
}) {
  const [tab, setTab] = useState<"home" | "design" | "colours" | "layout" | "picture" | "editing">("home");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [paint, setPaint] = useState<TypoStyle | null>(null);
  const [past, setPast] = useState<CVData[]>([]);
  const [future, setFuture] = useState<CVData[]>([]);
  const current = useRef(data);
  current.current = data;
  const t = data.typo[part];
  const commit = (next: CVData) => {
    if (JSON.stringify(next) === JSON.stringify(current.current)) return;
    const previous = current.current;
    setPast(p => [...p.slice(-39), previous]);
    setFuture([]);
    current.current = next;
    onChange(next);
  };
  const set: SetFn = (key, value) => commit({ ...current.current, [key]: value });
  const undo = () => {
    const previous = past.at(-1);
    if (!previous) return;
    setFuture(f => [...f, current.current]); setPast(p => p.slice(0, -1)); onChange(previous);
  };
  const redo = () => {
    const next = future.at(-1);
    if (!next) return;
    setPast(p => [...p, current.current]); setFuture(f => f.slice(0, -1)); onChange(next);
  };
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return;
      if (event.key.toLowerCase() === "z") { event.preventDefault(); event.shiftKey ? redo() : undo(); }
      if (event.key.toLowerCase() === "y") { event.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
  const setTypo = (p: TypoPart, patch: Partial<TypoStyle>) =>
    set("typo", { ...current.current.typo, [p]: { ...current.current.typo[p], ...patch } });
  const setPage = (patch: Partial<PageSetup>) => set("page", { ...current.current.page, ...patch });
  const setColor = (key: keyof ThemeColors, value: string) => {
    const target = TYPO_PARTS.find(p => PART_COLOR[p.id] === key)?.id;
    commit({ ...current.current, colors: { ...current.current.colors, [key]: value },
      ...(key === "accent" ? { accent: value } : {}),
      ...(target ? { textColorOverrides: [...new Set([...(current.current.textColorOverrides ?? []), target])] } : {}) });
  };
  const scaleAll = (delta: number) => set("typo", Object.fromEntries(
    (Object.keys(data.typo) as TypoPart[]).map(k => [k, { ...data.typo[k], size: Math.min(72, Math.max(6, data.typo[k].size + delta)) }])
  ) as CVData["typo"]);
  const runReplace = () => {
    const result = replaceCVText(current.current, find, replace, matchCase, wholeWord);
    if (result.count) { commit(result.data); toast.success(`${result.count} replacements made`); }
    else toast.info("No matches found");
  };
  const TABS = [
    { id: "home", label: "Home" },
    { id: "design", label: "Design" },
    { id: "colours", label: "Colours" },
    { id: "layout", label: "Layout" },
    { id: "picture", label: "Picture" },
    { id: "editing", label: "Editing" },
  ] as const;

  return (
    <div className="no-print sticky top-[68px] z-20 border-b border-border bg-card shadow-sm">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-1 overflow-x-auto px-3 pt-2" role="tablist" aria-label="Formatting tabs">
          {TABS.map((x) => (
            <Button
              key={x.id}
              type="button"
              role="tab" aria-selected={tab === x.id}
              variant="ghost"
              onClick={() => setTab(x.id)}
              className={`rounded-t-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                tab === x.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60"
              }`}
            >
              {x.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2">
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" title="Undo" aria-label="Undo" disabled={!past.length} onClick={undo}><Undo2 className="h-4 w-4" /></Button>
            <Button size="icon" variant="ghost" title="Redo" aria-label="Redo" disabled={!future.length} onClick={redo}><Redo2 className="h-4 w-4" /></Button>
            <span className="ml-2 text-xs font-medium">{TYPO_PARTS.find(p => p.id === part)?.label}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" title="Zoom out" aria-label="Zoom out" disabled={zoom <= .5} onClick={() => onZoomChange(Math.max(.5, zoom - .1))}><ZoomOut className="h-4 w-4" /></Button>
            <select aria-label="Preview zoom" value={Number(zoom.toFixed(1))} onChange={e => onZoomChange(Number(e.target.value))} className="h-8 rounded border border-input bg-background text-xs">
              {[.5,.6,.7,.8,.9,1,1.1,1.2,1.3,1.4,1.5].map(z => <option key={z} value={z}>{Math.round(z*100)}%</option>)}
            </select>
            <Button size="icon" variant="ghost" title="Zoom in" aria-label="Zoom in" disabled={zoom >= 1.5} onClick={() => onZoomChange(Math.min(1.5, zoom + .1))}><ZoomIn className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="flex items-stretch gap-1 overflow-x-auto bg-secondary/60 px-2 py-2 max-sm:max-h-[190px]">
          {tab === "home" && (
            <>
              <Group label="Apply to">
                <select
                  value={part}
                  aria-label="Apply formatting to"
                  onChange={(e) => onPartChange(e.target.value as TypoPart)}
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
                  aria-label="Font family"
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
                    aria-label="Font size"
                    value={t.size}
                    onChange={(e) => setTypo(part, { size: Math.min(72, Math.max(6, Number(e.target.value) || 6)) })}
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
                  <TypeIcon className="h-3.5 w-3.5" /> A+
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
                    commit({ ...data, typo: defaultTypography, page: defaultPage, textColorOverrides: [] });
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
              </Group>

              <Group label="Styles">
                {STYLE_PRESETS.map((p) => (
                  <Button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      commit({ ...data, typo: p.typo, page: p.page });
                    }}
                    className="flex h-12 w-20 flex-col items-center justify-center rounded-md border border-border bg-background text-[11px] hover:bg-secondary"
                  >
                    <span style={{ fontFamily: fontStack(p.typo.heading.font), fontWeight: 700 }}>
                      AaBbCc
                    </span>
                    <span className="text-[9px] text-muted-foreground">{p.name}</span>
                  </Button>
                ))}
              </Group>

              <Group label="Paragraph">
                {([{ id: "left", icon: AlignLeft }, { id: "center", icon: AlignCenter }, { id: "right", icon: AlignRight }, { id: "justify", icon: AlignJustify }] as const).map(a =>
                  <Toggle key={a.id} on={t.align === a.id} title={`Align ${a.id}`} onClick={() => setTypo(part, { align: a.id })}><a.icon className="h-4 w-4" /></Toggle>
                )}
                <Toggle on={!!t.strike} title="Strikethrough" onClick={() => setTypo(part, { strike: !t.strike })}><Strikethrough className="h-4 w-4" /></Toggle>
                <label title="Text highlight" className="flex items-center gap-1"><Highlighter className="h-4 w-4" /><input aria-label="Text highlight" type="color" value={t.highlight || data.colors.accent} onChange={e => setTypo(part, { highlight: e.target.value })} className="h-6 w-6" /></label>
                <Button size="sm" variant="ghost" onClick={() => setTypo(part, { highlight: undefined })}>Clear highlight</Button>
              </Group>
              <Group label="Format painter">
                <Button title="Copy formatting" size="icon" variant="outline" onClick={() => { setPaint({ ...t }); toast.success("Formatting copied"); }}><Copy className="h-4 w-4" /></Button>
                <Button title="Apply copied formatting" size="icon" variant="outline" disabled={!paint} onClick={() => { if (paint) setTypo(part, paint); }}><Paintbrush className="h-4 w-4" /></Button>
                <Button title="Clear selected formatting" size="icon" variant="outline" onClick={() => setTypo(part, { ...defaultTypography[part], align: undefined, strike: false, highlight: undefined })}><RotateCcw className="h-4 w-4" /></Button>
              </Group>
            </>
          )}

          {tab === "design" && (
            <Group label="Template — works with every style setting">
              {TEMPLATES.map((tpl) => (
                <Button
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
                </Button>
              ))}
            </Group>
          )}

          {tab === "colours" && (
            <>
              <Group label="Themes">
                {COLOR_PRESETS.map((p) => (
                  <Button
                    key={p.name}
                    type="button"
                    title={p.name}
                    onClick={() => {
                      commit({ ...data, colors: { ...data.colors, ...p.colors }, accent: p.colors.accent ?? data.accent, textColorOverrides: [] });
                    }}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] hover:bg-secondary"
                  >
                    <span className="h-3.5 w-3.5 rounded-full" style={{ background: p.colors.accent }} />
                    {p.name}
                  </Button>
                ))}
              </Group>

              <Group label="Accent">
                {ACCENTS.map((a) => (
                  <Button
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
                  <Switch aria-label="Fill the whole A4 page" checked={data.autoFit} onCheckedChange={(v) => set("autoFit", v)} />
                  Fill the whole A4 page
                </div>
              </Group>

              <Group label="Paragraph">
                <label className="flex items-center gap-1 text-[11px]" title="Line spacing">
                  <AlignJustify className="h-3.5 w-3.5 text-muted-foreground" />
                  <select
                    aria-label="Line spacing"
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
                    aria-label="Bullet style"
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
                    aria-label="Section spacing"
                    value={data.page.sectionGap}
                    onChange={(e) => setPage({ sectionGap: Math.min(40, Math.max(4, Number(e.target.value) || 4)) })}
                    className="h-8 w-16 text-center"
                  />
                </div>
                <div className="flex items-center gap-1 text-[11px]">
                  Margins
                  <Input
                    type="number"
                    min={12}
                    max={60}
                    aria-label="Page margins"
                    value={data.page.margin}
                    onChange={(e) => setPage({ margin: Math.min(60, Math.max(12, Number(e.target.value) || 12)) })}
                    className="h-8 w-16 text-center"
                  />
                </div>
              </Group>

              <Group label="Paragraph spacing">
                <label className="flex items-center gap-1 text-xs">After<Input aria-label="Paragraph spacing" type="number" min={0} max={30} value={data.page.paragraphGap ?? 0} onChange={e => setPage({ paragraphGap: Math.max(0, Math.min(30, Number(e.target.value))) })} className="h-8 w-16" /></label>
                <label className="flex items-center gap-1 text-xs">First line<Input aria-label="First line indent" type="number" min={0} max={60} value={data.page.indent ?? 0} onChange={e => setPage({ indent: Math.max(0, Math.min(60, Number(e.target.value))) })} className="h-8 w-16" /></label>
                <Button variant="outline" size="sm" onClick={() => set("page", defaultPage)}><RotateCcw className="h-4 w-4" />Reset layout</Button>
              </Group>
            </>
          )}
          {tab === "picture" && <>
              <Group label="Photo">
                <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 text-xs">
                  <Switch aria-label="Show picture" checked={data.withPhoto} onCheckedChange={(v) => set("withPhoto", v)} />
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
            <Group label="Crop and position">
              {([{ key: "photoZoom", label: "Photo zoom", min: 1, max: 3, step: .05 }, { key: "photoX", label: "Horizontal position", min: 0, max: 100, step: 1 }, { key: "photoY", label: "Vertical position", min: 0, max: 100, step: 1 }] as const).map(x => <label key={x.key} className="flex flex-col gap-1 text-[11px]">{x.label}<input aria-label={x.label} type="range" min={x.min} max={x.max} step={x.step} value={data[x.key]} onChange={e => set(x.key, Number(e.target.value))} className="w-28 accent-primary" /></label>)}
              <Button size="icon" variant="outline" title="Reset photo crop" onClick={() => commit({ ...data, photoX: 50, photoY: 50, photoZoom: 1 })}><ImageIcon className="h-4 w-4" /></Button>
            </Group>
          </>}
          {tab === "editing" && <Group label="Find and replace">
            <Input aria-label="Find text" value={find} onChange={e => setFind(e.target.value)} placeholder="Find" className="h-8 w-32" />
            <Input aria-label="Replacement text" value={replace} onChange={e => setReplace(e.target.value)} placeholder="Replace with" className="h-8 w-32" />
            <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={matchCase} onChange={e => setMatchCase(e.target.checked)} />Match case</label>
            <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={wholeWord} onChange={e => setWholeWord(e.target.checked)} />Whole words</label>
            <Button size="sm" variant="outline" disabled={!find} onClick={runReplace}><Replace className="h-4 w-4" />Replace all</Button>
          </Group>}
        </div>
      </div>
    </div>
  );
}
