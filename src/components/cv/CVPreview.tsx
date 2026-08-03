import type { CVData } from "@/lib/cv";
import { FONTS } from "@/lib/cv";
import { TemplateSidebar } from "./TemplateSidebar";
import { TemplateClassic } from "./TemplateClassic";
import { TemplateModern } from "./TemplateModern";
import { TemplateElevate } from "./TemplateElevate";
import { TemplateTimeline } from "./TemplateTimeline";
import { TemplatePeach } from "./TemplatePeach";
import { TemplateNavy } from "./TemplateNavy";

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
    default:
      return <TemplateElevate data={data} />;
  }
}

export function CVPreview({ data }: { data: CVData }) {
  return (
    <div
      id="cv-root"
      className="cv-root"
      style={
        {
          "--cv-accent": data.accent,
          "--fs": String(data.fontScale),
          fontFamily: FONTS[data.font]?.stack ?? FONTS.sans.stack,
        } as React.CSSProperties
      }
    >
      <Inner data={data} />
    </div>
  );
}
