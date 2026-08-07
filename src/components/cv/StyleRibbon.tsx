import { useState } from "react";
import { Bold, Palette, RotateCcw, Type as TypeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  ACCENTS,
  COLOR_PRESETS,
  FONT_LIST,
  defaultTypography,
  fontStack,
  type CVData,
  type ThemeColors,
  type TypoPart,
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

export function StyleRibbon({ data, set }: { data: CVData; set: SetFn }) {
  const [tab, setTab] = useState<"text" | "colours" | "page">("text");
  const [part, setPart] = useState<TypoPart>("body");
  const t = data.typo[part];

  const setTypo = (p: TypoPart, patch: Partial<{ font: string; size: number }>) =>
    set("typo", { ...data.typo, [p]: { ...data.typo[p], ...patch } });

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

  const TABS = [
    { id: "text", label: "Font" },
    { id: "colours", label: "Colours" },
    { id: "page", label: "Page" },
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
          {tab === "text" && (
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
                  className="h-8 w-44 rounded-md border border-input bg-background px-2 text-sm"
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
              </Group>

              <Group label="Whole CV">
                <Button type="button" size="sm" variant="outline" className="h-8" onClick={() => scaleAll(-0.5)}>
                  <TypeIcon className="h-3 w-3" /> A−
                </Button>
                <Button type="button" size="sm" variant="outline" className="h-8" onClick={() => scaleAll(0.5)}>
                  <Bold className="h-3.5 w-3.5" /> A+
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8"
                  onClick={() => set("typo", defaultTypography)}
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
              </Group>

              <Group label="Same font everywhere">
                <select
                  value=""
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
                  className="h-8 w-40 rounded-md border border-input bg-background px-2 text-sm"
                >
                  <option value="">Choose a font…</option>
                  {FONT_LIST.map((f) => (
                    <option key={f.id} value={f.id} style={{ fontFamily: f.stack }}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </Group>
            </>
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

          {tab === "page" && (
            <>
              <Group label="Fit to page">
                <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 text-xs">
                  <Switch checked={data.autoFit} onCheckedChange={(v) => set("autoFit", v)} />
                  Auto-fill one A4 page
                </div>
              </Group>
              <Group label="Photo shape">
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
              <Group label="Photo">
                <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 text-xs">
                  <Switch checked={data.withPhoto} onCheckedChange={(v) => set("withPhoto", v)} />
                  Show picture
                </div>
              </Group>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
