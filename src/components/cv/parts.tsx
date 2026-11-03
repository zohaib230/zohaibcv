import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";

export const px = (n: number) => `calc(${n}px * var(--fill))`;

export const initials = (d: CVData) =>
  `${d.firstName?.[0] ?? ""}${d.lastName?.[0] ?? ""}`.toUpperCase() || "CV";

export function Photo({
  d,
  w = 112,
  h = 132,
  ring,
}: {
  d: CVData;
  w?: number;
  h?: number;
  ring?: string;
}) {
  if (!d.withPhoto) return null;
  const radius = d.photoShape === "circle"
      ? "50%"
      : d.photoShape === "rounded"
        ? px(8)
        : "0px";
  return (
    <div
      style={{
        width: px(w),
        height: px(d.photoShape === "circle" ? w : h),
        borderRadius: radius,
        overflow: "hidden",
        flexShrink: 0,
        background: "color-mix(in srgb, var(--c-accent) 18%, #ffffff)",
        boxShadow: ring ? `0 0 0 ${px(3)} ${ring}` : undefined,
      }}
    >
      {d.photo ? (
        <img
          src={d.photo}
          alt={fullName(d)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: `${d.photoX}% ${d.photoY}%`,
            transform: `scale(${d.photoZoom})`,
            transformOrigin: `${d.photoX}% ${d.photoY}%`,
            display: "block",
          }}
        />
      ) : (
        <div
          className="cv-name flex h-full w-full items-center justify-center"
          style={{ color: "var(--c-accent)" }}
        >
          {initials(d)}
        </div>
      )}
    </div>
  );
}

/** Turns free-text details into clean bullet points. */
export const bullets = (text: string) =>
  text
    .split(/\n|(?<=\.)\s+/)
    .map((t) => t.trim().replace(/\.$/, ""))
    .filter(Boolean);

export const personalRows = (d: CVData): [string, string][] =>
  (
    [
      ["Father's Name", d.fatherName],
      ["Gender", d.gender],
      ["Date of Birth", d.dob],
      ["Age", d.age],
      ["CNIC", d.cnic],
      ["Nationality", d.nationality],
      ["Religion", d.religion],
      ["Marital Status", d.maritalStatus],
      ["Driving Licence", d.drivingLicence],
      ["Visa / Work Status", d.visaStatus],
      ["Notice Period", d.noticePeriod],
      ["Expected Salary", d.expectedSalary],
    ] as [string, string][]
  ).filter(([, v]) => !!v);

export const contactRows = (d: CVData): [string, string][] =>
  (
    [
      ["Phone", d.phone],
      ["Phone 2", d.phone2],
      ["Email", d.email],
      ["Address", d.address],
      ["Website", d.website],
      ["LinkedIn", d.linkedin],
      ["Portfolio", d.portfolio],
    ] as [string, string][]
  ).filter(([, v]) => !!v);

/** The user's own added sections (heading + detail lines) for the CV. */
export const customList = (d: CVData): { heading: string; points: string[] }[] =>
  (d.customSections ?? [])
    .filter((s) => s.heading.trim() || s.details.trim())
    .map((s) => ({ heading: s.heading.trim() || "Additional Details", points: bullets(s.details) }));

export const DECLARATION_TEXT =
  "I declare that the information provided in this CV is true and complete to the best of my knowledge.";


export const fresherLine =
  "Fresh candidate — no prior work experience, highly motivated, disciplined and ready to learn quickly from day one.";

/* ---- Shared, style-adaptable section blocks (used by every template) ---- */

export function BulletSection({
  head,
  title,
  items,
  listClass = "cv-bullets cv-body",
  sectionClass = "cv-sec",
}: {
  head: (title: string) => React.ReactNode;
  title: string;
  items: string[];
  listClass?: string;
  sectionClass?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className={sectionClass}>
      {head(title)}
      <ul className={listClass}>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}

/** The user's own added sections (heading + detail lines) in the template's style. */
export function CustomSections({
  d,
  head,
  listClass = "cv-bullets cv-body",
  sectionClass = "cv-sec",
}: {
  d: CVData;
  head: (title: string) => React.ReactNode;
  listClass?: string;
  sectionClass?: string;
}) {
  const list = customList(d);
  if (list.length === 0) return null;
  return (
    <>
      {list.map((s) => (
        <section key={s.heading} className={sectionClass}>
          {head(s.heading)}
          <ul className={listClass}>
            {s.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

export function DeclarationSection({
  d,
  head,
  bodyClass = "cv-body",
  sectionClass = "cv-sec",
}: {
  d: CVData;
  head: (title: string) => React.ReactNode;
  bodyClass?: string;
  sectionClass?: string;
}) {
  if (!d.declaration) return null;
  return (
    <section className={sectionClass}>
      {head("Declaration")}
      <p className={bodyClass}>{DECLARATION_TEXT}</p>
    </section>
  );
}

export function ReferencesSection({
  d,
  head,
  listClass = "cv-bullets cv-body",
  bodyClass = "cv-body",
  sectionClass = "cv-sec",
}: {
  d: CVData;
  head: (title: string) => React.ReactNode;
  listClass?: string;
  bodyClass?: string;
  sectionClass?: string;
}) {
  if (d.references.length === 0 && !d.referencesOnRequest) return null;
  return (
    <section className={sectionClass}>
      {head("References")}
      {d.references.length > 0 ? (
        <ul className={listClass}>
          {d.references.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      ) : (
        <p className={bodyClass}>References available on request.</p>
      )}
    </section>
  );
}
