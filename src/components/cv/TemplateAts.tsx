import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";

/**
 * ATS-safe minimal template: single column, no graphics, no colour blocks,
 * plain headings — the safest layout for resume-parsing software.
 */
const H = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="mb-[calc(4px*var(--fill))] border-b pb-[2px] font-bold uppercase tracking-[0.08em]"
    style={{
      fontFamily: "var(--ff-heading)",
      fontSize: "calc(var(--pt-heading) * 1.25px * var(--fill))",
      color: "var(--c-heading)",
      borderColor: "var(--c-divider)",
    }}
  >
    {children}
  </h2>
);

export function TemplateAts({ data }: { data: CVData }) {
  const contact = [data.phone, data.email, data.address, data.website].filter(Boolean).join("  |  ");

  return (
    <div
      className="cv-page flex flex-col"
      style={{
        background: "var(--c-page)",
        color: "var(--c-body)",
        padding: "calc(46px * var(--fill)) calc(52px * var(--fill))",
        fontFamily: "var(--ff-body)",
        fontSize: "calc(var(--pt-body) * 1.33px * var(--fill))",
        gap: "calc(14px * var(--fill))",
      }}
    >
      <header>
        <h1
          className="font-bold uppercase tracking-[0.06em]"
          style={{
            fontFamily: "var(--ff-name)",
            fontSize: "calc(var(--pt-name) * 1.15px * var(--fill))",
            color: "var(--c-name)",
          }}
        >
          {fullName(data)}
        </h1>
        {data.jobTitle && (
          <div
            style={{
              fontFamily: "var(--ff-role)",
              fontSize: "calc(var(--pt-role) * 1.33px * var(--fill))",
              color: "var(--c-role)",
            }}
          >
            {data.jobTitle}
          </div>
        )}
        {contact && (
          <div style={{ color: "var(--c-muted)", marginTop: "calc(4px * var(--fill))" }}>{contact}</div>
        )}
      </header>

      {data.profile && (
        <section>
          <H>Professional Summary</H>
          <p className="leading-relaxed">{data.profile}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <H>Work Experience</H>
          <div style={{ display: "grid", gap: "calc(8px * var(--fill))" }}>
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-bold" style={{ color: "var(--c-sub)" }}>
                    {e.role}
                    {e.company ? `, ${e.company}` : ""}
                  </span>
                  <span style={{ color: "var(--c-muted)" }}>{e.duration}</span>
                </div>
                {e.details && (
                  <ul className="ml-4 list-disc leading-relaxed">
                    {e.details
                      .split("\n")
                      .filter(Boolean)
                      .map((line, i) => (
                        <li key={i}>{line.replace(/^[-•]\s*/, "")}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <H>Education</H>
          {data.education.map((ed) => (
            <div key={ed.id} className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-bold" style={{ color: "var(--c-sub)" }}>
                {ed.degree}
                {ed.institute ? `, ${ed.institute}` : ""}
              </span>
              <span style={{ color: "var(--c-muted)" }}>{ed.year}</span>
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <H>Skills</H>
          <p>{data.skills.join(" • ")}</p>
        </section>
      )}

      {data.softSkills.length > 0 && (
        <section>
          <H>Soft Skills</H>
          <p>{data.softSkills.join(" • ")}</p>
        </section>
      )}

      {data.certificates.length > 0 && (
        <section>
          <H>Certificates</H>
          <ul className="ml-4 list-disc">
            {data.certificates.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {data.achievements.length > 0 && (
        <section>
          <H>Achievements</H>
          <ul className="ml-4 list-disc">
            {data.achievements.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {(data.languages.length > 0 || data.interests.length > 0) && (
        <section>
          <H>Additional Information</H>
          {data.languages.length > 0 && <p>Languages: {data.languages.join(", ")}</p>}
          {data.interests.length > 0 && <p>Interests: {data.interests.join(", ")}</p>}
        </section>
      )}

      {data.references.length > 0 && (
        <section>
          <H>References</H>
          {data.references.map((r, i) => (
            <p key={i}>{r}</p>
          ))}
        </section>
      )}
    </div>
  );
}
