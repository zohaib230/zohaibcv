import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, initials, personalRows, px } from "./parts";

const H = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center" style={{ gap: px(8), marginBottom: px(6) }}>
    <h2 className="cv-h uppercase" style={{ letterSpacing: "0.2em" }}>
      {children}
    </h2>
    <span style={{ flex: 1, height: px(2), background: "var(--c-accent)", opacity: 0.35 }} />
  </div>
);

/** Monogram — accent stripe, initials badge and an airy editorial layout. */
export function TemplateMonogram({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex">
      <div style={{ width: px(16), background: "var(--c-accent)" }} />

      <div className="cv-pad flex-1 flex flex-col" style={{ minWidth: 0 }}>
        <header className="flex items-center" style={{ gap: px(16) }}>
          {data.withPhoto ? (
            <Photo d={data} w={96} h={96} ring="var(--c-accent)" />
          ) : (
            <div
              className="cv-name flex items-center justify-center"
              style={{
                width: px(84),
                height: px(84),
                borderRadius: "50%",
                border: `${px(3)} solid var(--c-accent)`,
                color: "var(--c-accent)",
                flexShrink: 0,
              }}
            >
              {initials(data)}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className="cv-name">{fullName(data)}</h1>
            <div className="cv-role uppercase" style={{ letterSpacing: "0.24em", color: "var(--c-accent)" }}>
              {data.jobTitle || "Professional"}
            </div>
            <div className="cv-small flex flex-wrap" style={{ gap: `${px(2)} ${px(14)}`, marginTop: px(5) }}>
              {contactRows(data).map(([k, v]) => (
                <span key={k}>{v}</span>
              ))}
            </div>
          </div>
        </header>

        {data.profile && (
          <section className="cv-sec" style={{ marginTop: px(14) }}>
            <H>About Me</H>
            <p className="cv-body text-justify">{data.profile}</p>
          </section>
        )}

        <div className="flex flex-1" style={{ gap: px(26), marginTop: px(12) }}>
          <main style={{ width: "62%", minWidth: 0 }}>
            <section className="cv-sec">
              <H>Experience</H>
              {data.isFresher || data.experience.length === 0 ? (
                <p className="cv-body">{fresherLine}</p>
              ) : (
                <div className="cv-stack">
                  {data.experience.map((e) => (
                    <div key={e.id}>
                      <div className="cv-sub">{e.role}</div>
                      <div className="cv-small">{[e.company, e.duration].filter(Boolean).join(" · ")}</div>
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

            {data.education.length > 0 && (
              <section className="cv-sec">
                <H>Education</H>
                <div className="cv-stack">
                  {data.education.map((e) => (
                    <div key={e.id}>
                      <div className="cv-sub">{e.degree}</div>
                      <div className="cv-small">{[e.institute, e.year].filter(Boolean).join(" · ")}</div>
                    </div>
                  ))}
                </div>
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
          </main>

          <aside style={{ width: "38%", minWidth: 0 }}>
            {data.skills.length > 0 && (
              <section className="cv-sec">
                <H>Skills</H>
                <div className="flex flex-wrap" style={{ gap: px(5) }}>
                  {data.skills.map((s) => (
                    <span
                      key={s}
                      className="cv-chip cv-small"
                      style={{
                        background: "color-mix(in srgb, var(--c-accent) 14%, #ffffff)",
                        color: "var(--c-sub)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.softSkills.length > 0 && (
              <section className="cv-sec">
                <H>Strengths</H>
                <ul className="cv-bullets cv-body">
                  {data.softSkills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
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
          </aside>
        </div>
      </div>
    </div>
  );
}
