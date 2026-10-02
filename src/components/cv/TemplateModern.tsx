import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo } from "./parts";

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-5">
    <div className="mb-2 flex items-center gap-3">
      <h2 className="font-display text-[length:calc(17px*var(--fs))] font-bold uppercase tracking-[0.12em] text-[#1b1c1f]">
        {title}
      </h2>
      <div className="h-[2px] flex-1 bg-[var(--cv-accent)]" />
    </div>
    <div className="text-[length:calc(10.5px*var(--fs))] leading-[1.5] text-[#3a3a3a]">{children}</div>
  </section>
);

export function TemplateModern({ data }: { data: CVData }) {
  const initials = `${data.firstName?.[0] ?? ""}${data.lastName?.[0] ?? ""}`.toUpperCase();
  return (
    <div className="cv-page flex flex-col text-[length:calc(11px*var(--fs))]">
      {/* Header band */}
      <header className="flex items-center gap-6 border-b-[6px] border-[var(--cv-accent)] bg-[#1b1c1f] px-10 py-7 text-white">
        <Photo d={data} w={110} h={110} ring="var(--cv-accent)" />
        <div className="min-w-0">
          <h1 className="font-display text-[length:calc(38px*var(--fs))] font-bold uppercase leading-none tracking-wide">
            {fullName(data)}
          </h1>
          <p className="mt-2 text-[length:calc(10.5px*var(--fs))] text-white/70">
            {[data.phone, data.email, data.address].filter(Boolean).join("  ·  ")}
          </p>
        </div>
      </header>

      <div className="flex flex-1">
        <main className="w-[62%] px-9 py-7">
          {data.profile && (
            <Block title="Profile">
              <p className="text-justify">{data.profile}</p>
            </Block>
          )}

          <Block title="Work Experience">
            {data.isFresher || data.experience.length === 0 ? (
              <p>Fresh candidate — ready to learn and contribute from day one.</p>
            ) : (
              <div className="space-y-2.5">
                {data.experience.map((e) => (
                  <div key={e.id} className="border-l-2 border-[var(--cv-accent)] pl-3">
                    <div className="font-semibold text-[#1b1c1f]">{e.role}</div>
                    <div className="text-[length:calc(10px*var(--fs))] uppercase tracking-wide text-[#777]">
                      {[e.company, e.duration].filter(Boolean).join(" · ")}
                    </div>
                    {e.details && <p className="mt-0.5">{e.details}</p>}
                  </div>
                ))}
              </div>
            )}
          </Block>

          {data.education.length > 0 && (
            <Block title="Education">
              <div className="space-y-2">
                {data.education.map((e) => (
                  <div key={e.id} className="border-l-2 border-[var(--cv-accent)] pl-3">
                    <div className="font-semibold text-[#1b1c1f]">{e.degree}</div>
                    <div className="text-[length:calc(10px*var(--fs))] uppercase tracking-wide text-[#777]">
                      {[e.institute, e.year].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          )}
        </main>

        <aside className="w-[38%] bg-[#f4f2ec] px-7 py-7">
          <Block title="Personal">
            <div className="space-y-1">
              {data.fatherName && <div>Father: {data.fatherName}</div>}
              {data.gender && <div>Gender: {data.gender}</div>}
              {data.dob && <div>D.O.B: {data.dob}</div>}
              {data.age && <div>Age: {data.age}</div>}
              {data.cnic && <div>CNIC: {data.cnic}</div>}
              {data.nationality && <div>Nationality: {data.nationality}</div>}
              {data.religion && <div>Religion: {data.religion}</div>}
              {data.maritalStatus && <div>Status: {data.maritalStatus}</div>}
            </div>
          </Block>

          {data.skills.length > 0 && (
            <Block title="Skills">
              <div className="flex flex-wrap gap-1">
                {data.skills.map((s) => (
                  <span key={s} className="bg-[#1b1c1f] px-2 py-[3px] text-[length:calc(9.5px*var(--fs))] text-white">
                    {s}
                  </span>
                ))}
              </div>
            </Block>
          )}

          {data.languages.length > 0 && (
            <Block title="Languages">
              <ul className="space-y-1">
                {data.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Block>
          )}

          {data.interests.length > 0 && (
            <Block title="Interests">
              <ul className="space-y-1">
                {data.interests.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </Block>
          )}
        </aside>
      </div>
    </div>
  );
}
