import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-2 text-center font-display text-[20px] font-bold uppercase tracking-wide text-[#111]">
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
    <div className="cv-page flex flex-col px-10 py-9 text-[11px]">
      <h1 className="text-center font-display text-[42px] font-bold uppercase tracking-wide text-[#111]">
        {fullName(data)}
      </h1>

      <div className="mt-4 flex gap-5 bg-[#111] p-5 text-white">
        {data.withPhoto && data.photo && (
          <img
            src={data.photo}
            alt={fullName(data)}
            className="h-[105px] w-[95px] shrink-0 object-cover"
          />
        )}
        <div>
          <div className="font-display text-[16px] font-bold uppercase tracking-wide">Profile</div>
          <p className="mt-1 text-[10.5px] leading-relaxed">{data.profile}</p>
        </div>
      </div>

      <div className="mt-7 grid flex-1 grid-cols-2 gap-x-9 gap-y-6">
        <section>
          <H>Bio Data</H>
          <div className="text-[10.5px]">
            <Row label="Father's Name" value={data.fatherName} />
            <Row label="Gender" value={data.gender} />
            <Row label="Date of Birth" value={data.dob} />
            <Row label="Age" value={data.age} />
            <Row label="CNIC No" value={data.cnic} />
            <Row label="Nationality" value={data.nationality} />
            <Row label="Religion" value={data.religion} />
            <Row label="Marital Status" value={data.maritalStatus} />
            <Row label="Call No" value={data.phone} />
            <Row label="Email" value={data.email} />
          </div>
        </section>

        {data.skills.length > 0 && (
          <section>
            <H>Skills</H>
            <ul className="list-disc space-y-1 pl-5 text-[10.5px]">
              {data.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <H>Education</H>
            <ul className="list-disc space-y-1 pl-5 text-[10.5px]">
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
            <p className="text-[10.5px]">Fresh candidate — no prior work experience.</p>
          ) : (
            <ul className="list-disc space-y-1 pl-5 text-[10.5px]">
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
            <ul className="list-disc space-y-1 pl-5 text-[10.5px]">
              {data.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        )}

        {data.interests.length > 0 && (
          <section>
            <H>Interests</H>
            <ul className="list-disc space-y-1 pl-5 text-[10.5px]">
              {data.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {data.address && (
        <div className="mt-6 bg-[#111] px-4 py-2 text-[11px] text-white">{data.address}</div>
      )}
    </div>
  );
}
