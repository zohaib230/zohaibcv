import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, personalRows, px } from "./parts";

const Rule = () => (
  <div style={{ height: px(2), background: "var(--c-accent)", marginTop: px(4), marginBottom: px(7) }} />
);

const H = ({ children }: { children: React.ReactNode }) => (
  <div>
    <h2 className="cv-h uppercase" style={{ letterSpacing: "0.14em" }}>
      {children}
    </h2>
    <Rule />
  </div>
);

const SideH = ({ children }: { children: React.ReactNode }) => (
  <h3
    className="cv-h uppercase"
    style={{
      letterSpacing: "0.14em",
      color: "var(--c-side-heading)",
      borderBottom: `${px(1)} solid color-mix(in srgb, var(--c-side-heading) 45%, transparent)`,
      paddingBottom: px(3),
      marginBottom: px(6),
    }}
  >
    {children}
  </h3>
);

export function TemplateExecutive({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex flex-col">
      {/* Header */}
      <header
        className="flex items-center"
        style={{
          gap: px(22),
          background: "var(--c-header-bg)",
          color: "var(--c-header-text)",
          padding: `${px(26)} ${px(34)}`,
          borderBottom: `${px(5)} solid var(--c-accent)`,
        }}
      >
        <Photo d={data} w={104} round ring="color-mix(in srgb, var(--c-accent) 90%, transparent)" />
        <div className="min-w-0 flex-1">
          <h1 className="cv-name uppercase" style={{ color: "var(--c-header-text)", letterSpacing: "0.04em" }}>
            {fullName(data)}
          </h1>
          <p
            className="cv-role uppercase"
            style={{ color: "var(--c-accent)", letterSpacing: "0.28em", marginTop: px(5) }}
          >
            {data.jobTitle || "Professional"}
          </p>
        </div>
        <div className="cv-small shrink-0 text-right" style={{ color: "var(--c-header-text)", opacity: 0.9 }}>
          {contactRows(data).map(([k, v]) => (
            <div key={k} style={{ marginTop: px(2) }}>
              {v}
            </div>
          ))}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main */}
        <main className="cv-pad flex-1" style={{ width: "63%" }}>
          {data.profile && (
            <section className="cv-sec">
              <H>Profile</H>
              <p className="cv-body text-justify">{data.profile}</p>
            </section>
          )}

          <section className="cv-sec">
            <H>Work Experience</H>
            {data.isFresher || data.experience.length === 0 ? (
              <p className="cv-body">{fresherLine}</p>
            ) : (
              <div className="cv-stack">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between" style={{ gap: px(8) }}>
                      <span className="cv-sub uppercase">{e.role}</span>
                      <span className="cv-small" style={{ color: "var(--c-accent)" }}>
                        {e.duration}
                      </span>
                    </div>
                    <div className="cv-small italic">{e.company}</div>
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
                  <div key={e.id} className="flex items-baseline justify-between" style={{ gap: px(8) }}>
                    <div>
                      <div className="cv-sub">{e.degree}</div>
                      <div className="cv-small">{e.institute}</div>
                    </div>
                    <span className="cv-small" style={{ color: "var(--c-accent)" }}>
                      {e.year}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.achievements.length > 0 && (
            <section className="cv-sec">
              <H>Key Achievements</H>
              <ul className="cv-bullets cv-body">
                {data.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          )}

          {data.certificates.length > 0 && (
            <section className="cv-sec">
              <H>Certificates & Courses</H>
              <ul className="cv-bullets cv-body">
                {data.certificates.map((c) => (
                  <li key={c}>{c}</li>
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

        {/* Sidebar */}
        <aside
          className="cv-pad-sm"
          style={{ width: "37%", background: "var(--c-side-bg)", color: "var(--c-side-text)" }}
        >
          {personalRows(data).length > 0 && (
            <section className="cv-sec">
              <SideH>Personal</SideH>
              <div className="cv-small cv-stack-sm" style={{ color: "var(--c-side-text)" }}>
                {personalRows(data).map(([k, v]) => (
                  <div key={k} className="flex justify-between" style={{ gap: px(6) }}>
                    <span style={{ opacity: 0.68 }}>{k}</span>
                    <span className="text-right">{v}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section className="cv-sec">
              <SideH>Skills</SideH>
              <div className="cv-stack-sm">
                {data.skills.map((s) => (
                  <div key={s}>
                    <div className="cv-small" style={{ color: "var(--c-side-text)" }}>
                      {s}
                    </div>
                    <div
                      style={{
                        height: px(3),
                        marginTop: px(2),
                        background: "color-mix(in srgb, var(--c-side-text) 22%, transparent)",
                      }}
                    >
                      <div style={{ width: "85%", height: "100%", background: "var(--c-accent)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.softSkills.length > 0 && (
            <section className="cv-sec">
              <SideH>Soft Skills</SideH>
              <div className="flex flex-wrap" style={{ gap: px(4) }}>
                {data.softSkills.map((s) => (
                  <span
                    key={s}
                    className="cv-chip cv-small"
                    style={{
                      color: "var(--c-side-text)",
                      background: "color-mix(in srgb, var(--c-side-text) 14%, transparent)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.languages.length > 0 && (
            <section className="cv-sec">
              <SideH>Languages</SideH>
              <ul className="cv-bullets cv-small" style={{ color: "var(--c-side-text)" }}>
                {data.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>
          )}

          {data.interests.length > 0 && (
            <section className="cv-sec">
              <SideH>Interests</SideH>
              <ul className="cv-bullets cv-small" style={{ color: "var(--c-side-text)" }}>
                {data.interests.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
