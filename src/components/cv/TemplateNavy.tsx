import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo } from "./parts";

const SideHead = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2 mt-5">
    <h3 className="font-display text-[length:calc(16px*var(--fs))] font-bold text-white">{children}</h3>
    <div className="mt-1 h-[2px] w-8" style={{ background: "var(--cv-accent)" }} />
  </div>
);

const MainHead = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2">
    <h2 className="font-display text-[length:calc(19px*var(--fs))] font-bold text-[#22313f]">{children}</h2>
    <div className="mt-1 h-[2px] w-10" style={{ background: "var(--cv-accent)" }} />
  </div>
);

export function TemplateNavy({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex text-[length:calc(11px*var(--fs))] text-[#3a4048]">
      <aside className="w-[33%] bg-[#22313f] px-6 pb-8 pt-8 text-white">
        {data.withPhoto && <div className="mx-auto mb-4"><Photo d={data} w={115} h={115} /></div>}

        <SideHead>Contact</SideHead>
        <div className="space-y-2 text-[length:calc(10px*var(--fs))] text-white/85">
          {data.address && (
            <div>
              <div className="font-semibold text-white">Address</div>
              <div>{data.address}</div>
            </div>
          )}
          {data.phone && (
            <div>
              <div className="font-semibold text-white">Phone</div>
              <div>{data.phone}</div>
            </div>
          )}
          {data.email && (
            <div>
              <div className="font-semibold text-white">Email</div>
              <div className="break-all">{data.email}</div>
            </div>
          )}
          {data.website && (
            <div>
              <div className="font-semibold text-white">Website</div>
              <div className="break-all">{data.website}</div>
            </div>
          )}
        </div>

        <SideHead>Personal</SideHead>
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
            <SideHead>Skills</SideHead>
            <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))] text-white/85">
              {data.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {data.languages.length > 0 && (
          <>
            <SideHead>Languages</SideHead>
            <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))] text-white/85">
              {data.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </>
        )}

        {data.interests.length > 0 && (
          <>
            <SideHead>Hobbies</SideHead>
            <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))] text-white/85">
              {data.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </>
        )}
      </aside>

      <main className="flex-1 px-8 py-8">
        <h1 className="font-display text-[length:calc(34px*var(--fs))] font-bold uppercase leading-none text-[#22313f]">
          {fullName(data)}
        </h1>
        <p className="mb-5 mt-1 text-[length:calc(13px*var(--fs))] text-[#6f7780]">{data.jobTitle || "Professional"}</p>

        {data.profile && (
          <section className="mb-5">
            <MainHead>Profile</MainHead>
            <p className="text-justify text-[length:calc(10px*var(--fs))] leading-[1.55]">{data.profile}</p>
          </section>
        )}

        <section className="mb-5">
          <MainHead>Work Experience</MainHead>
          {data.isFresher || data.experience.length === 0 ? (
            <p className="text-[length:calc(10px*var(--fs))]">Fresh candidate — motivated to begin a professional career.</p>
          ) : (
            <div className="space-y-3">
              {data.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[length:calc(11px*var(--fs))] font-bold text-[#22313f]">{e.role}</span>
                    <span className="text-[length:calc(9.5px*var(--fs))] text-[#8a9099]">{e.duration}</span>
                  </div>
                  <div className="text-[length:calc(10px*var(--fs))] text-[#6f7780]">{e.company}</div>
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
          <section className="mb-5">
            <MainHead>Education</MainHead>
            <div className="space-y-2">
              {data.education.map((e) => (
                <div key={e.id} className="flex items-baseline justify-between gap-3">
                  <div>
                    <div className="text-[length:calc(11px*var(--fs))] font-bold text-[#22313f]">{e.degree}</div>
                    <div className="text-[length:calc(10px*var(--fs))] text-[#6f7780]">{e.institute}</div>
                  </div>
                  <span className="text-[length:calc(9.5px*var(--fs))] text-[#8a9099]">{e.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certificates.length > 0 && (
          <section className="mb-5">
            <MainHead>Certificates</MainHead>
            <ul className="list-disc space-y-0.5 pl-4 text-[length:calc(10px*var(--fs))]">
              {data.certificates.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        )}

        {data.achievements.length > 0 && (
          <section>
            <MainHead>Achievements</MainHead>
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
