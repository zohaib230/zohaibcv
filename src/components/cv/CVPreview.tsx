import { useEffect, useLayoutEffect, useRef } from "react";
import type { CVData } from "@/lib/cv";
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
    default:
      return <TemplateExecutive data={data} />;
  }
}


/** A4 height in CSS pixels (297mm @ 96dpi). */
const PAGE_H = 1122;

export function CVPreview({ data }: { data: CVData }) {
  const ref = useRef<HTMLDivElement>(null);

  // Auto-fit: grows or shrinks all type + spacing so the page is always
  // nicely filled, never empty at the bottom and never overflowing.
  const fit = () => {
    const el = ref.current;
    if (!el) return;
    const page = el.querySelector<HTMLElement>(".cv-page");
    if (!page) return;
    if (!data.autoFit) {
      el.style.setProperty("--fill", "1");
      return;
    }
    const prevMin = page.style.minHeight;
    page.style.minHeight = "0px";
    let f = 1;
    for (let i = 0; i < 8; i++) {
      el.style.setProperty("--fill", String(f));
      const h = page.scrollHeight;
      if (!h) break;
      const ratio = PAGE_H / h;
      if (ratio > 0.985 && ratio <= 1.005) break;
      f = Math.min(1.5, Math.max(0.7, f * Math.min(1.22, Math.max(0.82, ratio))));
    }
    // safety: never let the content spill onto a second page
    for (let i = 0; i < 20 && page.scrollHeight > PAGE_H; i++) {
      f = Math.max(0.6, f * 0.975);
      el.style.setProperty("--fill", String(f));
    }
    page.style.minHeight = prevMin;
  };

  useLayoutEffect(fit);

  useEffect(() => {
    const t = setTimeout(fit, 250);
    document.fonts?.ready.then(fit).catch(() => undefined);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const c = data.colors;
  const t = data.typo;

  return (
    <div
      id="cv-root"
      className="cv-root"
      ref={ref}
      style={
        {
          "--ff-name": fontStack(t.name.font),
          "--ff-role": fontStack(t.role.font),
          "--ff-heading": fontStack(t.heading.font),
          "--ff-sub": fontStack(t.sub.font),
          "--ff-body": fontStack(t.body.font),
          "--ff-small": fontStack(t.small.font),
          "--pt-name": t.name.size,
          "--pt-role": t.role.size,
          "--pt-heading": t.heading.size,
          "--pt-sub": t.sub.size,
          "--pt-body": t.body.size,
          "--pt-small": t.small.size,
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
