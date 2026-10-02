import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, personalRows, px } from "./parts";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="cv-sec"
      style={{
        background: "color-mix(in srgb, var(--c-accent) 7%, #ffffff)",
        borderLeft: `${px(4)} solid var(--c-accent)`,
        borderRadius: px(4),
        padding: `${px(10)} ${px(12)}`,
      }}
    >
      <h2 className="cv-h uppercase" style={{ letterSpacing: "0.16em", marginBottom: px(5) }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Grid Cards — modern card-based sections in a balanced two-column grid. */
export function TemplateGrid({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex flex-col">
      <header
        className="cv-pad-sm flex items-center"
        style={{ gap: px(16), background: "var(--c-header-bg)", color: "var(--c-header-text)" }}
      >
        {data.withPhoto && <Photo d={data} w={92} h={92} ring="var(--c-header-text)" />}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 className="cv-name" style={{ color: "var(--c-header-text)" }}>
            {fullName(data)}
          </h1>
          <div className="cv-role uppercase" style={{ letterSpacing: "0.22em", color: "var(--c-header-text)", opacity: 0.85 }}>
            {data.jobTitle || "Professional"}
          </div>
          <div
            className="cv-small flex flex-wrap"
            style={{ gap: `${px(2)} ${px(14)}`, marginTop: px(5), color: "var(--c-header-text)", opacity: 0.9 }}
          >
            {contactRows(data).map(([k, v]) => (
              <span key={k}>{v}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="cv-pad-sm flex-1 flex flex-col">
        {data.profile && (
          <Card title="Profile">
            <p className="cv-body text-justify">{data.profile}</p>
          </Card>
        )}

        <div className="flex flex-1" style={{ gap: px(14), marginTop: px(12) }}>
          <div style={{ width: "58%", minWidth: 0 }}>
            <Card title="Experience">
              {data.isFresher || data.experience.length === 0 ? (
                <p className="cv-body">{fresherLine}</p>
              ) : (
                <div className="cv-stack">
                  {data.experience.map((e) => (
                    <div key={e.id}>
                      <div className="cv-sub">{e.role}</div>
                      <div className="cv-small" style={{ color: "var(--c-accent)" }}>
                        {[e.company, e.duration].filter(Boolean).join(" · ")}
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
            </Card>

            {data.education.length > 0 && (
              <Card title="Education">
                <div className="cv-stack">
                  {data.education.map((e) => (
                    <div key={e.id}>
                      <div className="cv-sub">{e.degree}</div>
                      <div className="cv-small">{[e.institute, e.year].filter(Boolean).join(" · ")}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {data.achievements.length > 0 && (
              <Card title="Achievements">
                <ul className="cv-bullets cv-body">
                  {data.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </Card>
            )}

            {data.references.length > 0 && (
              <Card title="References">
                <ul className="cv-bullets cv-body">
                  {data.references.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          <div style={{ width: "42%", minWidth: 0 }}>
            {data.skills.length > 0 && (
              <Card title="Skills">
                <div className="flex flex-wrap" style={{ gap: px(5) }}>
                  {data.skills.map((s) => (
                    <span
                      key={s}
                      className="cv-chip cv-small"
                      style={{ background: "var(--c-accent)", color: "var(--c-header-text)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {data.softSkills.length > 0 && (
              <Card title="Soft Skills">
                <ul className="cv-bullets cv-body">
                  {data.softSkills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Card>
            )}

            {personalRows(data).length > 0 && (
              <Card title="Personal">
                <div className="cv-small cv-stack-sm">
                  {personalRows(data).map(([k, v]) => (
                    <div key={k} className="flex justify-between" style={{ gap: px(6) }}>
                      <span style={{ color: "var(--c-muted)" }}>{k}</span>
                      <span style={{ color: "var(--c-sub)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {data.languages.length > 0 && (
              <Card title="Languages">
                <ul className="cv-bullets cv-body">
                  {data.languages.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </Card>
            )}

            {data.certificates.length > 0 && (
              <Card title="Certificates">
                <ul className="cv-bullets cv-body">
                  {data.certificates.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </Card>
            )}

            {data.interests.length > 0 && (
              <Card title="Interests">
                <ul className="cv-bullets cv-body">
                  {data.interests.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
