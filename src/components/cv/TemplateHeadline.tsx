import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, personalRows, px } from "./parts";

const H = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="cv-h uppercase"
    style={{
      letterSpacing: "0.2em",
      marginBottom: px(6),
      paddingBottom: px(3),
      borderBottom: `${px(1)} solid var(--c-divider)`,
    }}
  >
    {children}
  </h2>
);

/** Headline — contact block on the left, big centred name, single clean column. */
export function TemplateHeadline({ data }: { data: CVData }) {
  const half = Math.ceil(data.skills.length / 2);
  return (
    <div className="cv-page flex flex-col cv-pad">
      <header className="flex" style={{ gap: px(18), alignItems: "flex-start" }}>
        <div className="cv-small cv-stack-sm" style={{ width: "30%" }}>
          {contactRows(data).map(([k, v]) => (
            <div key={k}>
              <div style={{ color: "var(--c-muted)" }}>{k}:</div>
              <div style={{ color: "var(--c-sub)" }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, textAlign: "center" }}>
          <h1 className="cv-name uppercase" style={{ letterSpacing: "0.05em" }}>
            {fullName(data)}
          </h1>
          <div className="cv-role uppercase" style={{ letterSpacing: "0.26em", color: "var(--c-accent)" }}>
            {data.jobTitle || "Professional"}
          </div>
        </div>

        {data.withPhoto && <Photo d={data} w={86} h={102} />}
      </header>

      <div style={{ height: px(3), background: "var(--c-accent)", marginTop: px(12) }} />

      {data.profile && (
        <section className="cv-sec" style={{ marginTop: px(14) }}>
          <H>Summary</H>
          <p className="cv-body text-justify">{data.profile}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="cv-sec">
          <H>Skill Highlights</H>
          <div className="flex" style={{ gap: px(20) }}>
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
                <div className="flex justify-between" style={{ gap: px(10) }}>
                  <span className="cv-sub">{e.role}</span>
                  <span className="cv-small">{e.duration}</span>
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
              <div key={e.id} className="flex justify-between" style={{ gap: px(10) }}>
                <span>
                  <span className="cv-sub">{e.degree}</span>
                  <span className="cv-small" style={{ display: "block" }}>
                    {e.institute}
                  </span>
                </span>
                <span className="cv-small">{e.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-1" style={{ gap: px(24), marginTop: px(12) }}>
        <div style={{ width: "50%" }}>
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
        <div style={{ width: "50%" }}>
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
