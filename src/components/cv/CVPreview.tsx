import type { CVData } from "@/lib/cv";
import { TemplateSidebar } from "./TemplateSidebar";
import { TemplateClassic } from "./TemplateClassic";
import { TemplateModern } from "./TemplateModern";

export function CVPreview({ data }: { data: CVData }) {
  if (data.template === "classic") return <TemplateClassic data={data} />;
  if (data.template === "modern") return <TemplateModern data={data} />;
  return <TemplateSidebar data={data} />;
}
