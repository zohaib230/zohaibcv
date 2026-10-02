import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, personalRows, px } from "./parts";

const SH = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="cv-h uppercase"
    style={{
      color: "var(--c-side-heading)",
      letterSpacing: "0.18em",
      marginBottom: px(5),
    }}
  >
    {children}
  </h2>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="cv-h uppercase"
    style={{
      letterSpacing: "0.16em",
      marginBottom: px(6),
      paddingBottom: px(3),
      borderBottom: `${px(1)} solid var(--c-divider)`,
    }}
  >
    {children}
  </h2>
);

/** Contact Sidebar — soft tinted left rail with contact, languages, hobbies. */
export function TemplateContactSide({ data }: { data: CVData }) {
  const half = Math.ceil(data.skills.length / 2);
  return (
    <div className="cv-page flex">
      <aside
        className="cv-pad-sm"
        style={{
          width: "33%",
          background: "var(--c-side-bg)",
          color: "var(--c-side-text)",
        }}
      >
        {data.withPhoto && (
          <div style={{ marginBottom: px(14) }}>
            <Photo d={data} w={110} h={110} ring="var(--c-accent)" />
          </div>
        )}

        <section className="cv-sec">
          <SH>Contact</SH>
          <div className="cv-small cv-stack-sm" style={{ color: "var(--c-side-text)" }}>
            {contactRows(data).map(([k, v]) => (
              <div key={k}>
                <div style={{ opacity: 0.7 }}>{k}:</div>
                <div>{v}</div>
              </div>
            ))}
          </div>
        </section>

        {personalRows(data).length > 0 && (
          <section className="cv-sec">
            <SH>Personal</SH>
            <div className="cv-small cv-stack-sm" style={{ color: "var(--c-side-text)" }}>
              {personalRows(data).map(([k, v]) => (
                <div key={k}>
                  <span style={{ opacity: 0.7 }}>{k}: </span>
                  {v}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.languages.length > 0 && (
          <section className="cv-sec">
            <SH>Languages</SH>
            <ul className="cv-bullets cv-small" style={{ color: "var(--c-side-text)" }}>
              {data.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        )}

        {data.interests.length > 0 && (
          <section className="cv-sec">
            <SH>Hobbies</SH>
            <ul className="cv-bullets cv-small" style={{ color: "var(--c-side-text)" }}>
              {data.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        )}

        {data.certificates.length > 0 && (
          <section className="cv-sec">
            <SH>Certificates</SH>
            <ul className="cv-bullets cv-small" style={{ color: "var(--c-side-text)" }}>
              {data.certificates.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      <main className="cv-pad-sm flex-1" style={{ minWidth: 0 }}>
        <header style={{ marginBottom: px(12) }}>
          <h1 className="cv-name">{fullName(data)}</h1>
          <div className="cv-role uppercase" style={{ letterSpacing: "0.2em", color: "var(--c-accent)" }}>
            {data.jobTitle || "Professional"}
          </div>
        </header>

        {data.profile && (
          <section className="cv-sec">
            <H>Summary</H>
            <p className="cv-body text-justify">{data.profile}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="cv-sec">
            <H>Skill Highlights</H>
            <div className="flex" style={{ gap: px(18) }}>
              {[data.skills.slice(0, half), data.skills.slice(half)].map((col, i) => (
                <ul key={i} className="cv-bullets cv-body" style={{ width: "50%" }}>
                  {col.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              ))}
            </div>
          </section>
        )}

        <section className="cv-sec">
          <H>Experience</H>
          {data.isFresher || data.experience.length === 0 ? (
            <p className="cv-body">{fresherLine}</p>
          ) : (
            <div className="cv-stack">
              {data.experience.map((e) => (
                <div key={e.id}>
                  <div className="cv-sub">
                    {e.role}
                    {e.duration ? ` - ${e.duration}` : ""}
                  </div>
                  <div className="cv-small" style={{ color: "var(--c-accent)" }}>
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

        {data.education.length > 0 && (
          <section className="cv-sec">
            <H>Education</H>
            <div className="cv-stack">
              {data.education.map((e) => (
                <div key={e.id}>
                  <div className="cv-sub">
                    {e.degree}
                    {e.year ? ` - ${e.year}` : ""}
                  </div>
                  <div className="cv-small">{e.institute}</div>
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
    </div>
  );
}
