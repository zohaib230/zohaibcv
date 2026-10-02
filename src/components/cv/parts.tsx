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
      ["Email", d.email],
      ["Address", d.address],
      ["Website", d.website],
      ["LinkedIn", d.linkedin],
      ["Portfolio", d.portfolio],
    ] as [string, string][]
  ).filter(([, v]) => !!v);


export const fresherLine =
  "Fresh candidate — no prior work experience, highly motivated, disciplined and ready to learn quickly from day one.";
