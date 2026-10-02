import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, personalRows, px } from "./parts";

const H = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="cv-h uppercase"
    style={{
      letterSpacing: "0.24em",
      textAlign: "center",
      marginBottom: px(7),
      paddingBottom: px(4),
      borderBottom: `${px(1)} solid var(--c-divider)`,
    }}
  >
    {children}
  </h2>
);

export function TemplateElegant({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex flex-col cv-pad" style={{ background: "var(--c-page)" }}>
      {/* Header */}
      <header className="flex flex-col items-center" style={{ textAlign: "center" }}>
        {data.withPhoto && (
          <div style={{ marginBottom: px(10) }}>
            <Photo d={data} w={96} h={96} ring="var(--c-accent)" />
          </div>
        )}
        <h1 className="cv-name" style={{ letterSpacing: "0.06em" }}>
          {fullName(data)}
        </h1>
        <div
          className="flex items-center"
          style={{ gap: px(10), marginTop: px(6), marginBottom: px(6), width: "100%" }}
        >
          <span style={{ flex: 1, height: px(1), background: "var(--c-divider)" }} />
          <span className="cv-role uppercase" style={{ letterSpacing: "0.3em", color: "var(--c-accent)" }}>
            {data.jobTitle || "Professional"}
          </span>
          <span style={{ flex: 1, height: px(1), background: "var(--c-divider)" }} />
        </div>
        <div className="cv-small flex flex-wrap justify-center" style={{ gap: `${px(2)} ${px(14)}` }}>
          {contactRows(data).map(([k, v]) => (
            <span key={k}>{v}</span>
          ))}
        </div>
      </header>

      {data.profile && (
        <section className="cv-sec" style={{ marginTop: px(14) }}>
          <H>Profile</H>
          <p className="cv-body text-justify">{data.profile}</p>
        </section>
      )}

      <div className="flex flex-1" style={{ gap: px(26), marginTop: px(12) }}>
        <main style={{ width: "60%" }}>
          <section className="cv-sec">
            <H>Experience</H>
            {data.isFresher || data.experience.length === 0 ? (
              <p className="cv-body">{fresherLine}</p>
            ) : (
              <div className="cv-stack">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="cv-sub">{e.role}</div>
                    <div className="cv-small italic" style={{ color: "var(--c-accent)" }}>
                      {[e.company, e.duration].filter(Boolean).join(" — ")}
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

          {data.education.length > 0 && (
            <section className="cv-sec">
              <H>Education</H>
              <div className="cv-stack">
                {data.education.map((e) => (
                  <div key={e.id}>
                    <div className="cv-sub">{e.degree}</div>
                    <div className="cv-small italic">{[e.institute, e.year].filter(Boolean).join(" — ")}</div>
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
        </main>

        <aside style={{ width: "40%" }}>
          {personalRows(data).length > 0 && (
            <section className="cv-sec">
              <H>Personal</H>
              <div className="cv-small cv-stack-sm">
                {personalRows(data).map(([k, v]) => (
                  <div key={k} className="flex justify-between" style={{ gap: px(6) }}>
                    <span style={{ color: "var(--c-muted)" }}>{k}</span>
                    <span className="text-right" style={{ color: "var(--c-sub)" }}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

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
        </aside>
      </div>
    </div>
  );
}
