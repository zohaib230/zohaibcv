import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo } from "./parts";

const SideTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-2 mt-5 font-display text-[length:calc(15px*var(--fs))] font-bold uppercase tracking-[0.14em] text-white">
    {children}
  </h3>
);

const MainTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-2 font-display text-[length:calc(19px*var(--fs))] font-bold uppercase tracking-[0.1em] text-[#1f2833]">
    {children}
  </h2>
);

export function TemplateTimeline({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex text-[length:calc(11px*var(--fs))] text-[#3b3f45]">
      <aside className="flex w-[34%] flex-col bg-[#1f2833] px-6 pb-8 pt-8 text-white">
        {data.withPhoto && <div className="mx-auto mb-4"><Photo d={data} w={120} h={120} ring="var(--cv-accent)" /></div>}
        <h1 className="text-center font-display text-[length:calc(24px*var(--fs))] font-bold uppercase leading-tight">
          {fullName(data)}
        </h1>
        {data.jobTitle && (
          <p className="text-center text-[length:calc(10.5px*var(--fs))] uppercase tracking-[0.2em]" style={{ color: "var(--cv-accent)" }}>
            {data.jobTitle}
          </p>
        )}

        <SideTitle>Contact</SideTitle>
        <div className="space-y-1.5 text-[length:calc(10px*var(--fs))] text-white/85">
          {data.phone && <div>{data.phone}</div>}
          {data.email && <div className="break-all">{data.email}</div>}
          {data.website && <div className="break-all">{data.website}</div>}
          {data.address && <div>{data.address}</div>}
        </div>

        <SideTitle>Personal</SideTitle>
        <div className="space-y-1 text-[length:calc(10px*var(--fs))] text-white/85">
          {data.fatherName && <div>Father: {data.fatherName}</div>}
          {data.gender && <div>Gender: {data.gender}</div>}
          {data.dob && <div>D.O.B: {data.dob}</div>}
          {data.age && <div>Age: {data.age}</div>}
          {data.cnic && <div>CNIC: {data.cnic}</div>}
          {data.nationality && <div>Nationality: {data.nationality}</div>}
          {data.religion && <div>Religion: {data.religion}</div>}
          {data.maritalStatus && <div>Status: {data.maritalStatus}</div>}
        </div>

        {data.skills.length > 0 && (
          <>
            <SideTitle>Expertise</SideTitle>
            <ul className="space-y-1 text-[length:calc(10px*var(--fs))] text-white/85">
              {data.skills.map((s) => (
                <li key={s} className="flex gap-2">
                  <span style={{ color: "var(--cv-accent)" }}>▪</span>
                  {s}
                </li>
              ))}
            </ul>
          </>
        )}

        {data.languages.length > 0 && (
          <>
            <SideTitle>Language</SideTitle>
            <ul className="space-y-1 text-[length:calc(10px*var(--fs))] text-white/85">
              {data.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </>
        )}

        {data.interests.length > 0 && (
          <>
            <SideTitle>Interests</SideTitle>
            <ul className="space-y-1 text-[length:calc(10px*var(--fs))] text-white/85">
              {data.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </>
        )}
      </aside>

      <main className="flex-1 px-7 py-8">
        {data.profile && (
          <section className="mb-5">
            <MainTitle>Profile</MainTitle>
            <p className="text-justify text-[length:calc(10px*var(--fs))] leading-[1.55]">{data.profile}</p>
          </section>
        )}

        <section className="mb-5">
          <MainTitle>Experience</MainTitle>
          {data.isFresher || data.experience.length === 0 ? (
            <p className="text-[length:calc(10px*var(--fs))]">Fresh candidate — ready to start and grow professionally.</p>
          ) : (
            <div className="space-y-3 border-l-2 border-[#e3e5e8] pl-4">
              {data.experience.map((e) => (
                <div key={e.id} className="relative">
                  <span
                    className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full"
                    style={{ background: "var(--cv-accent)" }}
                  />
                  <div className="text-[length:calc(10px*var(--fs))] font-semibold" style={{ color: "var(--cv-accent)" }}>
                    {e.duration}
                  </div>
                  <div className="text-[length:calc(11.5px*var(--fs))] font-bold text-[#1f2833]">{e.role}</div>
                  <div className="text-[length:calc(10px*var(--fs))] text-[#6b7078]">{e.company}</div>
                  {e.details && <p className="mt-0.5 text-[length:calc(10px*var(--fs))] leading-[1.5]">{e.details}</p>}
                </div>
              ))}
            </div>
          )}
        </section>

        {data.education.length > 0 && (
          <section className="mb-5">
            <MainTitle>Education</MainTitle>
            <div className="space-y-2.5 border-l-2 border-[#e3e5e8] pl-4">
              {data.education.map((e) => (
                <div key={e.id} className="relative">
                  <span
                    className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full"
                    style={{ background: "var(--cv-accent)" }}
                  />
                  <div className="text-[length:calc(10px*var(--fs))] font-semibold" style={{ color: "var(--cv-accent)" }}>
                    {e.year}
                  </div>
                  <div className="text-[length:calc(11.5px*var(--fs))] font-bold text-[#1f2833]">{e.degree}</div>
                  <div className="text-[length:calc(10px*var(--fs))] text-[#6b7078]">{e.institute}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certificates.length > 0 && (
          <section className="mb-5">
            <MainTitle>Certificates</MainTitle>
            <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))]">
              {data.certificates.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        )}

        {data.achievements.length > 0 && (
          <section>
            <MainTitle>Achievements</MainTitle>
            <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))]">
              {data.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
