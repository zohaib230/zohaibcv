import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";

const Title = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-1.5 font-display text-[length:calc(17px*var(--fs))] font-bold uppercase tracking-wide text-[#1b1c1f]">
    {children}
  </h2>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span
    className="rounded-sm px-2 py-[3px] text-[length:calc(9.5px*var(--fs))] text-[#1b1c1f]"
    style={{ background: "color-mix(in srgb, var(--cv-accent) 45%, #fff)" }}
  >
    {children}
  </span>
);

export function TemplateElevate({ data }: { data: CVData }) {
  const contacts = [data.email, data.phone, data.address, data.website].filter(Boolean);
  return (
    <div className="cv-page flex flex-col text-[length:calc(11px*var(--fs))] text-[#2f3237]">
      <header className="flex gap-5 border-b-4 px-9 pb-5 pt-8" style={{ borderColor: "var(--cv-accent)" }}>
        <div className="w-[8px] shrink-0" style={{ background: "var(--cv-accent)" }} />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[length:calc(38px*var(--fs))] font-bold leading-none" style={{ color: "var(--cv-accent)" }}>
            {fullName(data)}
          </h1>
          <p className="mt-1 text-[length:calc(15px*var(--fs))] text-[#8a8f96]">{data.jobTitle || "Professional"}</p>
          <p className="mt-3 text-[length:calc(10px*var(--fs))] leading-[1.55]">{data.profile}</p>
        </div>
        {data.withPhoto && (
          <div className="h-[125px] w-[115px] shrink-0 overflow-hidden rounded-md border border-[#d8dade] bg-[#eceef1]">
            {data.photo && <img src={data.photo} alt={fullName(data)} className="h-full w-full object-cover" />}
          </div>
        )}
        <div className="w-[150px] shrink-0 space-y-1 text-right text-[length:calc(9.5px*var(--fs))] text-[#4b4f55]">
          {contacts.map((c) => (
            <div key={c} className="break-words">
              {c}
            </div>
          ))}
        </div>
      </header>

      <div className="grid flex-1 grid-cols-[1.25fr_1fr] gap-7 px-9 py-6">
        <div className="space-y-5">
          <section>
            <Title>Work Experience</Title>
            {data.isFresher || data.experience.length === 0 ? (
              <p className="text-[length:calc(10px*var(--fs))]">
                Fresh candidate — no prior work experience, highly motivated to start and learn quickly.
              </p>
            ) : (
              <div className="space-y-3">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="text-[length:calc(12px*var(--fs))] font-bold text-[#1b1c1f]">{e.role}</div>
                    <div className="text-[length:calc(11px*var(--fs))] text-[#5b6067]">{e.company}</div>
                    <div className="text-[length:calc(9px*var(--fs))] italic text-[#8a8f96]">{e.duration}</div>
                    {e.details && (
                      <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))] leading-[1.45]">
                        {e.details.split(/\n|\. /).filter(Boolean).map((d, i) => (
                          <li key={i}>{d.replace(/\.$/, "")}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {data.education.length > 0 && (
            <section>
              <Title>Education</Title>
              <div className="space-y-2">
                {data.education.map((e) => (
                  <div key={e.id}>
                    <div className="text-[length:calc(11.5px*var(--fs))] font-bold text-[#1b1c1f]">{e.degree}</div>
                    <div className="text-[length:calc(10.5px*var(--fs))] text-[#5b6067]">{e.institute}</div>
                    <div className="text-[length:calc(9px*var(--fs))] italic text-[#8a8f96]">{e.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.achievements.length > 0 && (
            <section>
              <Title>Achievements</Title>
              <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))]">
                {data.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="space-y-5">
          {data.skills.length > 0 && (
            <section>
              <Title>Hard Skills</Title>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </section>
          )}

          {data.softSkills.length > 0 && (
            <section>
              <Title>Soft Skills</Title>
              <div className="flex flex-wrap gap-1.5">
                {data.softSkills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </section>
          )}

          {data.certificates.length > 0 && (
            <section>
              <Title>Certificates</Title>
              <ul className="space-y-1 text-[length:calc(10px*var(--fs))]">
                {data.certificates.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <Title>Personal</Title>
            <div className="space-y-0.5 text-[length:calc(10px*var(--fs))]">
              {data.fatherName && <div>Father: {data.fatherName}</div>}
              {data.gender && <div>Gender: {data.gender}</div>}
              {data.dob && <div>D.O.B: {data.dob}</div>}
              {data.age && <div>Age: {data.age}</div>}
              {data.cnic && <div>CNIC: {data.cnic}</div>}
              {data.nationality && <div>Nationality: {data.nationality}</div>}
              {data.religion && <div>Religion: {data.religion}</div>}
              {data.maritalStatus && <div>Marital status: {data.maritalStatus}</div>}
            </div>
          </section>

          {data.languages.length > 0 && (
            <section>
              <Title>Languages</Title>
              <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))]">
                {data.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>
          )}

          {data.interests.length > 0 && (
            <section>
              <Title>Interests</Title>
              <div className="flex flex-wrap gap-1.5">
                {data.interests.map((i) => (
                  <Chip key={i}>{i}</Chip>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
