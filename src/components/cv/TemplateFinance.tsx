import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, personalRows, px } from "./parts";

const H = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="cv-h uppercase"
    style={{
      letterSpacing: "0.18em",
      color: "var(--c-accent)",
      marginBottom: px(6),
      paddingBottom: px(3),
      borderBottom: `${px(2)} solid var(--c-accent)`,
    }}
  >
    {children}
  </h2>
);

/** Finance Pro — top contact strip, oversized name, strong rule-led sections. */
export function TemplateFinance({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex flex-col cv-pad">
      <div
        className="cv-small flex flex-wrap"
        style={{
          gap: `${px(2)} ${px(16)}`,
          paddingBottom: px(8),
          borderBottom: `${px(1)} solid var(--c-divider)`,
        }}
      >
        {contactRows(data).map(([k, v]) => (
          <span key={k}>{v}</span>
        ))}
      </div>

      <header className="flex items-center" style={{ gap: px(18), marginTop: px(14) }}>
        {data.withPhoto && <Photo d={data} w={92} h={108} />}
        <div style={{ flex: 1 }}>
          {data.profile && (
            <p className="cv-body text-justify" style={{ marginBottom: px(10) }}>
              {data.profile}
            </p>
          )}
          <h1 className="cv-name uppercase" style={{ letterSpacing: "0.02em" }}>
            {fullName(data)}
          </h1>
          <div className="cv-role uppercase" style={{ letterSpacing: "0.22em", color: "var(--c-accent)" }}>
            {data.jobTitle || "Professional"}
          </div>
        </div>
      </header>

      <div style={{ height: px(4), background: "var(--c-accent)", marginTop: px(12) }} />

      <section className="cv-sec" style={{ marginTop: px(14) }}>
        <H>Experience</H>
        {data.isFresher || data.experience.length === 0 ? (
          <p className="cv-body">{fresherLine}</p>
        ) : (
          <div className="cv-stack">
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="cv-sub uppercase">
                  {e.role}
                  {e.duration ? ` — ${e.duration}` : ""}
                </div>
                <div className="cv-small uppercase" style={{ letterSpacing: "0.08em" }}>
                  {e.company}
                </div>
                {e.details && (
                  <ul className="cv-bullets cv-body" style={{ marginTop: px(3) }}>
                    {bullets(e.details).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="flex flex-1" style={{ gap: px(26), marginTop: px(12) }}>
        <div style={{ width: "52%" }}>
          {data.skills.length > 0 && (
            <section className="cv-sec">
              <H>Skills</H>
              <ul className="cv-bullets cv-body">
                {data.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          )}
          {data.softSkills.length > 0 && (
            <section className="cv-sec">
              <H>Soft Skills</H>
              <ul className="cv-bullets cv-body">
                {data.softSkills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          )}
          {data.achievements.length > 0 && (
            <section className="cv-sec">
              <H>Achievements</H>
              <ul className="cv-bullets cv-body">
                {data.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div style={{ width: "48%" }}>
          {data.education.length > 0 && (
            <section className="cv-sec">
              <H>Education</H>
              <div className="cv-stack">
                {data.education.map((e) => (
                  <div key={e.id}>
                    <div className="cv-sub uppercase">{e.degree}</div>
                    <div className="cv-small">{[e.institute, e.year].filter(Boolean).join(" — ")}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {personalRows(data).length > 0 && (
            <section className="cv-sec">
              <H>Personal</H>
              <div className="cv-small cv-stack-sm">
                {personalRows(data).map(([k, v]) => (
                  <div key={k} className="flex justify-between" style={{ gap: px(6) }}>
                    <span style={{ color: "var(--c-muted)" }}>{k}</span>
                    <span style={{ color: "var(--c-sub)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {data.certificates.length > 0 && (
            <section className="cv-sec">
              <H>Certificates</H>
              <ul className="cv-bullets cv-body">
                {data.certificates.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}
          {data.languages.length > 0 && (
            <section className="cv-sec">
              <H>Languages</H>
              <ul className="cv-bullets cv-body">
                {data.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>
          )}
          {data.interests.length > 0 && (
            <section className="cv-sec">
              <H>Interests</H>
              <ul className="cv-bullets cv-body">
                {data.interests.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          )}
          {data.references.length > 0 && (
            <section className="cv-sec">
              <H>References</H>
              <ul className="cv-bullets cv-body">
                {data.references.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
