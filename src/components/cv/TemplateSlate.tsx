import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, personalRows, px } from "./parts";

const H = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center" style={{ gap: px(8), marginBottom: px(6) }}>
    <span style={{ width: px(14), height: px(3), background: "var(--c-accent)" }} />
    <h2 className="cv-h uppercase" style={{ letterSpacing: "0.16em" }}>
      {children}
    </h2>
    <span style={{ flex: 1, height: px(1), background: "var(--c-divider)" }} />
  </div>
);

export function TemplateSlate({ data }: { data: CVData }) {
  const left = [
    data.profile && (
      <section className="cv-sec" key="p">
        <H>Profile</H>
        <p className="cv-body text-justify">{data.profile}</p>
      </section>
    ),
    <section className="cv-sec" key="x">
      <H>Experience</H>
      {data.isFresher || data.experience.length === 0 ? (
        <p className="cv-body">{fresherLine}</p>
      ) : (
        <div className="cv-stack">
          {data.experience.map((e) => (
            <div key={e.id} style={{ paddingLeft: px(12), borderLeft: `${px(2)} solid var(--c-accent)` }}>
              <div className="cv-sub uppercase">{e.role}</div>
              <div className="cv-small">
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
    </section>,
    data.education.length > 0 && (
      <section className="cv-sec" key="e">
        <H>Education</H>
        <div className="cv-stack">
          {data.education.map((e) => (
            <div key={e.id} style={{ paddingLeft: px(12), borderLeft: `${px(2)} solid var(--c-accent)` }}>
              <div className="cv-sub">{e.degree}</div>
              <div className="cv-small">{[e.institute, e.year].filter(Boolean).join("  ·  ")}</div>
            </div>
          ))}
        </div>
      </section>
    ),
    data.achievements.length > 0 && (
      <section className="cv-sec" key="a">
        <H>Achievements</H>
        <ul className="cv-bullets cv-body">
          {data.achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
    ),
  ].filter(Boolean);

  return (
    <div className="cv-page flex flex-col">
      <header
        className="flex items-center"
        style={{
          gap: px(20),
          background: "var(--c-header-bg)",
          color: "var(--c-header-text)",
          padding: `${px(24)} ${px(32)}`,
        }}
      >
        <Photo d={data} w={100} h={118} />
        <div className="min-w-0 flex-1">
          <h1 className="cv-name" style={{ color: "var(--c-header-text)" }}>
            {fullName(data)}
          </h1>
          <p className="cv-role uppercase" style={{ color: "var(--c-accent)", letterSpacing: "0.22em", marginTop: px(4) }}>
            {data.jobTitle || "Professional"}
          </p>
          <div
            className="cv-small flex flex-wrap"
            style={{ gap: `${px(3)} ${px(14)}`, marginTop: px(8), color: "var(--c-header-text)", opacity: 0.85 }}
          >
            {contactRows(data).map(([k, v]) => (
              <span key={k}>{v}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <main className="cv-pad" style={{ width: "64%" }}>
          {left}
        </main>
        <aside
          className="cv-pad-sm"
          style={{ width: "36%", background: "color-mix(in srgb, var(--c-accent) 10%, #ffffff)" }}
        >
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
              <H>Hard Skills</H>
              <div className="flex flex-wrap" style={{ gap: px(4) }}>
                {data.skills.map((s) => (
                  <span
                    key={s}
                    className="cv-chip cv-small"
                    style={{ background: "var(--c-accent)", color: "#fff" }}
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
