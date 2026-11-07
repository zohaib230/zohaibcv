import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { CustomSections, contactRows, personalRows } from "./parts";
import { Photo } from "./parts";

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-2 text-center font-display text-[length:calc(20px*var(--fs))] font-bold uppercase tracking-wide text-[#111]">
    {children}
  </h2>
);

const Row = ({ label, value }: { label: string; value: string }) =>
  value ? (
    <div className="flex gap-1 py-[1px]">
      <span className="w-[95px] shrink-0">{label}</span>
      <span className="w-2">:</span>
      <span className="font-medium">{value}</span>
    </div>
  ) : null;

export function TemplateClassic({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex flex-col px-10 py-9 text-[length:calc(11px*var(--fs))]">
      <h1 className="text-center font-display text-[length:calc(42px*var(--fs))] font-bold uppercase tracking-wide text-[#111]">
        {fullName(data)}
      </h1>

      <div className="mt-4 flex gap-5 bg-[#111] p-5 text-white">
        <Photo d={data} w={95} h={105} />
        <div>
          <div className="font-display text-[length:calc(16px*var(--fs))] font-bold uppercase tracking-wide">Profile</div>
          <p className="mt-1 text-[length:calc(10.5px*var(--fs))] leading-relaxed">{data.profile}</p>
        </div>
      </div>

      <div className="mt-7 grid flex-1 grid-cols-2 gap-x-9 gap-y-6">
        <section>
          <H>Bio Data</H>
          <div className="text-[length:calc(10.5px*var(--fs))]">
            {contactRows(data).map(([k, v]) => (
              <Row key={k} label={k} value={v} />
            ))}
            {personalRows(data).map(([k, v]) => (
              <Row key={k} label={k} value={v} />
            ))}
          </div>
        </section>

        {data.skills.length > 0 && (
          <section>
            <H>Skills</H>
            <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
              {[...data.skills, ...data.softSkills].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <H>Education</H>
            <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
              {data.education.map((e) => (
                <li key={e.id}>
                  {e.degree}
                  {e.institute ? ` (${e.institute})` : ""}
                  {e.year ? ` — ${e.year}` : ""}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <H>Experience</H>
          {data.isFresher || data.experience.length === 0 ? (
            <p className="text-[length:calc(10.5px*var(--fs))]">Fresh candidate — no prior work experience.</p>
          ) : (
            <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
              {data.experience.map((e) => (
                <li key={e.id}>
                  {e.duration ? `${e.duration} — ` : ""}
                  {e.role}
                  {e.company ? ` at ${e.company}` : ""}
                  {e.details ? `. ${e.details}` : ""}
                </li>
              ))}
            </ul>
          )}
        </section>

        {data.languages.length > 0 && (
          <section>
            <H>Languages</H>
            <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
              {data.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        )}

        {data.interests.length > 0 && (
          <section>
            <H>Interests</H>
            <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
              {data.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        )}

        {data.certificates.length > 0 && (
          <section>
            <H>Certificates</H>
            <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
              {data.certificates.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>
        )}

        {data.achievements.length > 0 && (
          <section>
            <H>Achievements</H>
            <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
              {data.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {data.projects.length > 0 && (
        <section className="mt-6">
          <H>Projects</H>
          <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
            {data.projects.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      {data.volunteer.length > 0 && (
        <section className="mt-5">
          <H>Volunteer Experience</H>
          <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
            {data.volunteer.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </section>
      )}

      <CustomSections
        d={data}
        head={(t) => <H>{t}</H>}
        sectionClass="mt-5"
        listClass="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]"
      />

      {(data.references.length > 0 || data.referencesOnRequest) && (
        <section className="mt-5">
          <H>References</H>
          {data.references.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-[length:calc(10.5px*var(--fs))]">
              {data.references.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[length:calc(10.5px*var(--fs))]">References available on request.</p>
          )}
        </section>
      )}

      {data.declaration && (
        <section className="mt-5">
          <H>Declaration</H>
          <p className="text-[length:calc(10.5px*var(--fs))]">
            I declare that the information provided in this CV is true and complete to the best of my knowledge.
          </p>
        </section>
      )}

      {data.address && (
        <div className="mt-6 bg-[#111] px-4 py-2 text-[length:calc(11px*var(--fs))] text-white">{data.address}</div>
      )}
    </div>
  );
}
