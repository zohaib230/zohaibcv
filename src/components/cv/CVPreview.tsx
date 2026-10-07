import { useEffect, useLayoutEffect, useRef } from "react";
import type { CVData, TypoPart } from "@/lib/cv";
import { fontStack } from "@/lib/cv";
import { TemplateSidebar } from "./TemplateSidebar";
import { TemplateClassic } from "./TemplateClassic";
import { TemplateModern } from "./TemplateModern";
import { TemplateElevate } from "./TemplateElevate";
import { TemplateTimeline } from "./TemplateTimeline";
import { TemplatePeach } from "./TemplatePeach";
import { TemplateNavy } from "./TemplateNavy";
import { TemplateExecutive } from "./TemplateExecutive";
import { TemplateSlate } from "./TemplateSlate";
import { TemplateElegant } from "./TemplateElegant";
import { TemplateAts } from "./TemplateAts";
import { TemplateFinance } from "./TemplateFinance";
import { TemplateContactSide } from "./TemplateContactSide";
import { TemplateHeadline } from "./TemplateHeadline";
import { TemplateMonogram } from "./TemplateMonogram";
import { TemplateGrid } from "./TemplateGrid";
import { TemplateReferences } from "./TemplateReferences";

function Inner({ data }: { data: CVData }) {
  switch (data.template) {
    case "classic":
      return <TemplateClassic data={data} />;
    case "modern":
      return <TemplateModern data={data} />;
    case "timeline":
      return <TemplateTimeline data={data} />;
    case "peach":
      return <TemplatePeach data={data} />;
    case "navy":
      return <TemplateNavy data={data} />;
    case "sidebar":
      return <TemplateSidebar data={data} />;
    case "elevate":
      return <TemplateElevate data={data} />;
    case "slate":
      return <TemplateSlate data={data} />;
    case "elegant":
      return <TemplateElegant data={data} />;
    case "ats":
      return <TemplateAts data={data} />;
    case "finance":
      return <TemplateFinance data={data} />;
    case "contactside":
      return <TemplateContactSide data={data} />;
    case "headline":
      return <TemplateHeadline data={data} />;
    case "monogram":
      return <TemplateMonogram data={data} />;
    case "grid":
      return <TemplateGrid data={data} />;
    case "reference02":
    case "reference03":
    case "reference05":
    case "reference0005":
    case "referencephoto":
    case "blob":
    case "metro":
    case "pakclassic":
      return <TemplateReferences data={data} design={data.template} />;
    default:
      return <TemplateExecutive data={data} />;
  }
}


/** A4 height in CSS pixels (297mm @ 96dpi). */
const PAGE_H = 1122;
const MAX_PAGES = 4;

export function CVPreview({ data, onSelectPart }: { data: CVData; onSelectPart?: ((part: TypoPart) => void) | undefined }) {
  const ref = useRef<HTMLDivElement>(null);

  // Auto-fit: grows or shrinks all type + spacing so every page is always
  // nicely filled. If there is genuinely too much content for one A4 page,
  // the CV automatically continues onto a second (or third) page.
  const fit = () => {
    const el = ref.current;
    if (!el) return;
    const page = el.querySelector<HTMLElement>(".cv-page");
    if (!page) return;

    if (!data.autoFit) {
      el.style.setProperty("--fill", "1");
      page.style.height = "";
      page.style.minHeight = "";
      el.dataset["pages"] = String(Math.max(1, Math.ceil(page.scrollHeight / PAGE_H)));
      return;
    }

    const prevMin = page.style.minHeight;
    page.style.minHeight = "0px";
    page.style.height = "auto";

    // How many A4 pages does the content really need at normal size?
    el.style.setProperty("--fill", "1");
    const natural = page.scrollHeight || PAGE_H;
    const pages = Math.min(MAX_PAGES, Math.max(1, Math.ceil((natural * 0.9) / PAGE_H)));
    const target = pages * PAGE_H;

    let f = 1;
    for (let i = 0; i < 8; i++) {
      el.style.setProperty("--fill", String(f));
      const h = page.scrollHeight;
      if (!h) break;
      const ratio = target / h;
      if (ratio > 0.985 && ratio <= 1.005) break;
      f = Math.min(1.5, Math.max(0.7, f * Math.min(1.22, Math.max(0.82, ratio))));
    }
    // safety: never let the content spill past the last page
    for (let i = 0; i < 20 && page.scrollHeight > target; i++) {
      f = Math.max(0.6, f * 0.975);
      el.style.setProperty("--fill", String(f));
    }

    page.style.minHeight = prevMin;
    page.style.height = `${target}px`;
    el.dataset['pages'] = String(pages);
  };

  useLayoutEffect(fit, [data]);

  useEffect(() => {
    const t = setTimeout(fit, 250);
    document.fonts?.ready.then(fit).catch(() => undefined);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);


  const c = data.colors;
  const t = data.typo;
  const pg = data.page;
  const bullet =
    pg.bullet === "dash" ? '"–  "' : pg.bullet === "none" ? "none" : pg.bullet;

  const partVars: Record<string, string> = {};
  (Object.keys(t) as (keyof typeof t)[]).forEach((k) => {
    const s = t[k];
    partVars[`--ff-${k}`] = fontStack(s.font);
    partVars[`--pt-${k}`] = String(s.size);
    partVars[`--fw-${k}`] = s.bold ? "800" : k === "name" || k === "heading" ? "500" : "400";
    partVars[`--fi-${k}`] = s.italic ? "italic" : "normal";
    partVars[`--fu-${k}`] = [s.underline && "underline", s.strike && "line-through"].filter(Boolean).join(" ") || "none";
    partVars[`--fc-${k}`] = s.caps ? "uppercase" : "none";
    partVars[`--ls-${k}`] = `${s.spacing}px`;
    if (s.align) partVars[`--align-${k}`] = s.align;
    partVars[`--highlight-${k}`] = s.highlight || "transparent";
  });

  return (
    <div
      id="cv-root"
      className="cv-root"
      ref={ref}
      data-color-overrides={data.textColorOverrides?.join(" ")}
      onClick={onSelectPart ? (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const node = target.closest(".cv-name, .cv-role, .cv-h, .cv-sub, .cv-body, .cv-small");
        if (!node) return;
        const match = (["name", "role", "heading", "sub", "body", "small"] as const).find(p => node.classList.contains(p === "heading" ? "cv-h" : `cv-${p}`));
        if (match) onSelectPart(match);
      } : undefined}
      style={
        {
          ...partVars,
          "--lh-body": String(pg.lineHeight),
          "--sec-gap": `${pg.sectionGap}px`,
          "--pg-margin": `${pg.margin}px`,
          "--bullet": bullet,
          "--paragraph-gap": `${pg.paragraphGap ?? 0}px`,
          "--paragraph-indent": `${pg.indent ?? 0}px`,
          "--c-accent": c.accent,
          "--cv-accent": c.accent,
          "--fs": String(t.body.size / 9.5),
          "--c-page": c.pageBg,
          "--c-header-bg": c.headerBg,
          "--c-header-text": c.headerText,
          "--c-side-bg": c.sidebarBg,
          "--c-side-text": c.sidebarText,
          "--c-side-heading": c.sidebarHeading,
          "--c-name": c.name,
          "--c-role": c.role,
          "--c-heading": c.heading,
          "--c-sub": c.sub,
          "--c-body": c.body,
          "--c-muted": c.muted,
          "--c-divider": c.divider,
          fontFamily: fontStack(t.body.font),
        } as React.CSSProperties
      }
    >

      <Inner data={data} />
    </div>
  );
}
