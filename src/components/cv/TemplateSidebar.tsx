import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <div className="mb-2 flex items-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5C518] text-[11px] font-bold text-[#26272b]">
        ●
      </span>
      <h2 className="font-display text-[19px] font-bold uppercase tracking-wide text-[#26272b]">
        {title}
      </h2>
    </div>
    <div className="text-[10.5px] leading-[1.45] text-[#333]">{children}</div>
  </div>
);

const SideHeading = ({ title }: { title: string }) => (
  <div className="mb-2 mt-5 flex items-center gap-2">
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5C518] text-[11px] text-[#26272b]">
      ●
    </span>
    <h3 className="font-display text-[16px] font-bold uppercase text-[#F5C518]">{title}</h3>
  </div>
);

export function TemplateSidebar({ data }: { data: CVData }) {
  return (
    <div className="cv-page flex text-[11px]">
      {/* Left column */}
      <aside className="w-[38%] bg-[#26272b] px-6 pb-8 text-white">
        {data.withPhoto && (
          <div className="-mx-6 mb-5 bg-[#F5C518] px-6 pb-8 pt-7">
            <div className="mx-auto h-[135px] w-[135px] overflow-hidden rounded-full border-4 border-white/90 bg-[#26272b]">
              {data.photo ? (
                <img src={data.photo} alt={fullName(data)} className="h-full w-full object-cover" />
              ) : null}
            </div>
          </div>
        )}
        <h1 className="mt-2 text-center font-display text-[26px] font-bold uppercase leading-tight">
          {fullName(data)}
        </h1>

        <SideHeading title="Contact" />
        <div className="space-y-2 text-[10.5px]">
          {data.email && (
            <div>
              <div className="text-[#F5C518]">Email</div>
              <div className="break-all">{data.email}</div>
            </div>
          )}
          {data.phone && (
            <div>
              <div className="text-[#F5C518]">Phone</div>
              <div>{data.phone}</div>
            </div>
          )}
          {data.dob && (
            <div>
              <div className="text-[#F5C518]">Date of Birth</div>
              <div>
                {data.dob}
                {data.age ? ` (${data.age} years)` : ""}
              </div>
            </div>
          )}
          {data.address && (
            <div>
              <div className="text-[#F5C518]">Address</div>
              <div>{data.address}</div>
            </div>
          )}
        </div>

        <SideHeading title="Personal" />
        <div className="space-y-1 text-[10.5px]">
          {data.fatherName && <div>Father: {data.fatherName}</div>}
          {data.gender && <div>Gender: {data.gender}</div>}
          {data.cnic && <div>CNIC: {data.cnic}</div>}
          {data.nationality && <div>Nationality: {data.nationality}</div>}
          {data.religion && <div>Religion: {data.religion}</div>}
          {data.maritalStatus && <div>Marital Status: {data.maritalStatus}</div>}
        </div>

        {data.languages.length > 0 && (
          <>
            <SideHeading title="Languages" />
            <ul className="space-y-1 text-[10.5px]">
              {data.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </>
        )}

        {data.interests.length > 0 && (
          <>
            <SideHeading title="Interests" />
            <ul className="space-y-1 text-[10.5px]">
              {data.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </>
        )}
      </aside>

      {/* Right column */}
      <main className="flex-1 px-7 py-7">
        {data.profile && (
          <Section title="Profile">
            <p className="text-justify">{data.profile}</p>
          </Section>
        )}

        <Section title="Experience">
          {data.isFresher || data.experience.length === 0 ? (
            <p>Fresh candidate — eager to start a professional career.</p>
          ) : (
            <ul className="list-disc space-y-1 pl-4">
              {data.experience.map((e) => (
                <li key={e.id}>
                  <span className="font-semibold">{e.duration}</span>
                  {e.duration && " — "}
                  {e.role}
                  {e.company && ` at ${e.company}`}
                  {e.details && <span className="block text-[#555]">{e.details}</span>}
                </li>
              ))}
            </ul>
          )}
        </Section>

        {data.education.length > 0 && (
          <Section title="Education">
            {data.education.map((e) => (
              <div key={e.id} className="mb-1.5">
                <div className="font-bold">{e.institute}</div>
                <div className="italic">
                  {e.degree}
                  {e.year ? ` · ${e.year}` : ""}
                </div>
              </div>
            ))}
          </Section>
        )}

        {data.skills.length > 0 && (
          <Section title="Skills">
            <ul className="list-disc space-y-0.5 pl-4">
              {data.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>
        )}
      </main>
    </div>
  );
}
