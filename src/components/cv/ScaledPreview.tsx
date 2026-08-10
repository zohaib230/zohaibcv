import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CVData } from "@/lib/cv";
import { CVPreview } from "./CVPreview";

const A4_W = 794;
const A4_H = 1123;

/** Shows the CV page scaled to whatever width it is given (responsive). */
export function ScaledPreview({ data, max = 1 }: { data: CVData; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0.5);
  const [h, setH] = useState(A4_H);

  useLayoutEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el) return;
    const measure = () => {
      setS(Math.min(max, Math.max(0.15, el.clientWidth / A4_W)));
      const page = inner?.querySelector<HTMLElement>(".cv-page");
      if (page) setH(Math.max(A4_H, page.getBoundingClientRect().height / (s || 1)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (inner) ro.observe(inner);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max]);

  useEffect(() => {
    const t = setTimeout(() => {
      const el = ref.current;
      if (el) setS(Math.min(max, Math.max(0.15, el.clientWidth / A4_W)));
      const page = innerRef.current?.querySelector<HTMLElement>(".cv-page");
      if (page) setH(Math.max(A4_H, page.offsetHeight));
    }, 120);
    return () => clearTimeout(t);
  }, [max, data]);

  return (
    <div
      ref={ref}
      className="print-area w-full overflow-hidden rounded-md border border-border bg-white shadow-lg"
      style={{ height: h * s }}
    >
      <div
        ref={innerRef}
        className="cv-scale origin-top-left"
        style={{ width: A4_W, transform: `scale(${s})` }}
      >
        <CVPreview data={data} />
      </div>
    </div>
  );
}
