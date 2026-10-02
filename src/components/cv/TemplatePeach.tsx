import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo } from "./parts";

const Head = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-1.5 font-display text-[length:calc(19px*var(--fs))] font-bold text-[#2b2b2b]">{children}</h2>
);

const Bar = ({ label, level }: { label: string; level: number }) => (
  <div className="mb-2">
    <div className="mb-1 text-[length:calc(9.5px*var(--fs))] text-[#3b3b3b]">{label}</div>
    <div className="h-[7px] w-full bg-white">
      <div className="h-full" style={{ width: `${level}%`, background: "var(--cv-accent)" }} />
    </div>
  </div>
);

export function TemplatePeach({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex flex-col bg-white px-8 py-8 text-[length:calc(11px*var(--fs))] text-[#3b3b3b]">
      <header className="relative mb-6 flex items-center gap-5">
        <Photo d={data} w={110} h={110} ring="var(--c-page)" />
        <div
          className="flex-1 rounded-l-[40px] rounded-r-[14px] px-8 py-5 text-[#2b2b2b]"
          style={{ background: "var(--cv-accent)" }}
        >
          <h1 className="font-display text-[length:calc(30px*var(--fs))] font-bold uppercase leading-none">{fullName(data)}</h1>
          {data.jobTitle && <p className="text-[length:calc(11px*var(--fs))] uppercase tracking-[0.2em]">{data.jobTitle}</p>}
          <div className="mt-2 space-y-[1px] text-[length:calc(9.5px*var(--fs))]">
            {data.phone && <div>{data.phone}</div>}
            {data.email && <div>{data.email}</div>}
            {data.website && <div>{data.website}</div>}
            {data.address && <div>{data.address}</div>}
          </div>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-[0.85fr_1.35fr] gap-7">
        <aside className="bg-[#f1f1f1] px-5 py-5">
          {data.profile && (
            <>
              <Head>Summary</Head>
              <p className="mb-4 text-justify text-[length:calc(9.5px*var(--fs))] leading-[1.5]">{data.profile}</p>
            </>
          )}

          {data.skills.length > 0 && (
            <>
              <Head>Tech Skills</Head>
              <div className="mb-4">
                {data.skills.slice(0, 6).map((s, i) => (
                  <Bar key={s} label={s} level={92 - i * 7} />
                ))}
              </div>
            </>
          )}

          <Head>Personal</Head>
          <div className="mb-4 space-y-0.5 text-[length:calc(9.5px*var(--fs))]">
            {data.fatherName && <div>Father: {data.fatherName}</div>}
            {data.gender && <div>Gender: {data.gender}</div>}
            {data.dob && <div>D.O.B: {data.dob}</div>}
            {data.age && <div>Age: {data.age}</div>}
            {data.cnic && <div>CNIC: {data.cnic}</div>}
            {data.nationality && <div>Nationality: {data.nationality}</div>}
            {data.religion && <div>Religion: {data.religion}</div>}
            {data.maritalStatus && <div>Status: {data.maritalStatus}</div>}
          </div>

          {data.languages.length > 0 && (
            <>
              <Head>Languages</Head>
              <ul className="mb-4 list-disc space-y-0.5 pl-4 text-[length:calc(9.5px*var(--fs))]">
                {data.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </>
          )}

          {data.interests.length > 0 && (
            <>
              <Head>Interests</Head>
              <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(9.5px*var(--fs))]">
                {data.interests.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </>
          )}
        </aside>

        <main className="pr-1">
          {(data.skills.length > 0 || data.softSkills.length > 0) && (
            <section className="mb-4">
              <Head>Skills</Head>
              <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))]">
                {[...data.skills, ...data.softSkills].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-4">
            <Head>Experience</Head>
            {data.isFresher || data.experience.length === 0 ? (
              <p className="text-[length:calc(10px*var(--fs))]">Fresh candidate — no prior work experience.</p>
            ) : (
              <div className="space-y-2.5">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="text-[length:calc(10px*var(--fs))] font-bold uppercase text-[#2b2b2b]">
                      {e.role}
                      {e.duration ? ` — ${e.duration}` : ""}
                    </div>
                    <div className="text-[length:calc(10px*var(--fs))] uppercase text-[#7a7a7a]">{e.company}</div>
                    {e.details && (
                      <ul className="mt-0.5 list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))] leading-[1.45]">
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
            <section className="mb-4">
              <Head>Education</Head>
              {data.education.map((e) => (
                <div key={e.id} className="mb-1.5 text-[length:calc(10px*var(--fs))]">
                  <div className="font-bold uppercase">{e.institute}</div>
                  <div>
                    {e.degree}
                    {e.year ? ` · ${e.year}` : ""}
                  </div>
                </div>
              ))}
            </section>
          )}

          {data.certificates.length > 0 && (
            <section className="mb-4">
              <Head>Certificates</Head>
              <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))]">
                {data.certificates.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}

          {data.achievements.length > 0 && (
            <section>
              <Head>Achievements</Head>
              <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))]">
                {data.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
