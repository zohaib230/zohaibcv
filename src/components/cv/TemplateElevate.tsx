import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, personalRows, px } from "./parts";

const H = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="cv-h uppercase"
    style={{
      letterSpacing: "0.12em",
      borderBottom: `${px(2)} solid var(--c-accent)`,
      paddingBottom: px(3),
      marginBottom: px(6),
    }}
  >
    {children}
  </h2>
);

export function TemplateElevate({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex flex-col" style={{ background: "var(--c-page)" }}>
      <header
        className="flex items-center cv-pad"
        style={{ gap: px(20), borderBottom: `${px(1)} solid var(--c-divider)`, paddingBottom: px(18) }}
      >
        <Photo d={data} w={100} h={116} />
        <div className="min-w-0 flex-1">
          <h1 className="cv-name uppercase">{fullName(data)}</h1>
          <p className="cv-role uppercase" style={{ letterSpacing: "0.26em", marginTop: px(4) }}>
            {data.jobTitle || "Professional"}
          </p>
        </div>
        <div className="cv-small text-right">
          {contactRows(data).map(([k, v]) => (
            <div key={k} style={{ marginTop: px(2) }}>
              <span style={{ color: "var(--c-accent)" }}>{k}: </span>
              {v}
            </div>
          ))}
        </div>
      </header>

      <div className="flex flex-1" style={{ gap: px(24), padding: `${px(18)} ${px(34)} ${px(28)}` }}>
        <main style={{ width: "62%" }}>
          {data.profile && (
            <section className="cv-sec">
              <H>Profile</H>
              <p className="cv-body text-justify">{data.profile}</p>
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
                    <div className="cv-sub">{e.role}</div>
                    <div className="cv-small" style={{ color: "var(--c-accent)" }}>
                      {[e.company, e.duration].filter(Boolean).join("  ·  ")}
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
                    <div className="cv-small">{[e.institute, e.year].filter(Boolean).join("  ·  ")}</div>
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

        <aside style={{ width: "38%" }}>
          {personalRows(data).length > 0 && (
            <section className="cv-sec">
              <H>Personal</H>
              <div className="cv-small cv-stack-sm">
                {personalRows(data).map(([k, v]) => (
                  <div key={k}>
                    <span style={{ color: "var(--c-muted)" }}>{k}: </span>
                    <span style={{ color: "var(--c-sub)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section className="cv-sec">
              <H>Skills</H>
              <div className="flex flex-wrap" style={{ gap: px(4) }}>
                {data.skills.map((s) => (
                  <span
                    key={s}
                    className="cv-chip cv-small"
                    style={{ background: "color-mix(in srgb, var(--c-accent) 18%, #ffffff)", color: "var(--c-sub)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
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
        </aside>
      </div>
    </div>
  );
}
