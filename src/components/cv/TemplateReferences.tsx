import type { CVData } from "@/lib/cv";
import { fullName } from "@/lib/cv";
import { Photo, bullets, contactRows, fresherLine, personalRows, px } from "./parts";

type ReferenceDesign = "reference02" | "reference03" | "reference05" | "reference0005" | "referencephoto" | "blob" | "metro" | "pakclassic";

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="cv-h reference-heading">{children}</h2>;
}

function List({ items }: { items: string[] }) {
  return items.length > 0 ? <ul className="cv-bullets cv-body reference-list">{items.map((item, i) => <li key={`${item}-${i}`}>{item}</li>)}</ul> : null;
}

function Contact({ data, labels = false }: { data: CVData; labels?: boolean }) {
  return <div className="cv-small reference-contact">{contactRows(data).map(([key, value]) => <div key={key}>{labels && <strong>{key}: </strong>}{value}</div>)}</div>;
}

function Experience({ data }: { data: CVData }) {
  return <section className="reference-section"><Heading>{data.template === "reference0005" ? "Work history" : "Experience"}</Heading>
    {data.isFresher || !data.experience.length ? <p className="cv-body">{fresherLine}</p> :
      <div className="cv-stack">{data.experience.map(e => <div key={e.id} className="reference-item">
        <div className="cv-small reference-date">{e.duration}</div>
        <div className="cv-sub">{e.role}</div>
        <div className="cv-small">{e.company}</div>
        {e.details && <List items={bullets(e.details)} />}
      </div>)}</div>}
  </section>;
}

function Education({ data }: { data: CVData }) {
  return data.education.length > 0 && <section className="reference-section"><Heading>Education</Heading><div className="cv-stack">{data.education.map(e => <div key={e.id}><div className="cv-sub">{e.degree}</div><div className="cv-small">{[e.institute, e.year].filter(Boolean).join(" · ")}</div></div>)}</div></section>;
}

function Extras({ data }: { data: CVData }) {
  return <>
    {data.certificates.length > 0 && <section className="reference-section"><Heading>Certifications</Heading><List items={data.certificates} /></section>}
    {data.achievements.length > 0 && <section className="reference-section"><Heading>Achievements</Heading><List items={data.achievements} /></section>}
    {data.projects.length > 0 && <section className="reference-section"><Heading>Projects</Heading><List items={data.projects} /></section>}
    {data.volunteer.length > 0 && <section className="reference-section"><Heading>Volunteer experience</Heading><List items={data.volunteer} /></section>}
  </>;
}

function Personal({ data }: { data: CVData }) {
  const rows = personalRows(data);
  return rows.length > 0 && <section className="reference-section"><Heading>Personal details</Heading><div className="cv-small reference-contact">{rows.map(([key, value]) => <div key={key}><strong>{key}: </strong>{value}</div>)}</div></section>;
}

function Summary({ data }: { data: CVData }) {
  return data.profile && <section className="reference-section"><Heading>Summary</Heading><p className="cv-body">{data.profile}</p></section>;
}

function Skills({ data, title = "Skill Highlights" }: { data: CVData; title?: string }) {
  return (data.skills.length > 0 || data.softSkills.length > 0) && <section className="reference-section"><Heading>{title}</Heading><List items={[...data.skills, ...data.softSkills]} /></section>;
}

function Languages({ data }: { data: CVData }) {
  return data.languages.length > 0 && <section className="reference-section"><Heading>Languages</Heading><div className="cv-small reference-contact">{data.languages.map(l => <div key={l}>{l}</div>)}</div></section>;
}

function Interests({ data }: { data: CVData }) {
  return data.interests.length > 0 && <section className="reference-section"><Heading>Interests</Heading><List items={data.interests} /></section>;
}

/** Editable layouts recreated from the uploaded A4 references. */
export function TemplateReferences({ data, design }: { data: CVData; design: ReferenceDesign }) {
  if (design === "reference02") return <div className="cv-page reference-page reference-02">
    <aside className="reference-rail">
      <div className="reference-02-name"><h1 className="cv-name">{data.firstName}<br /><em>{data.lastName}</em></h1><div className="cv-role">{data.jobTitle}</div></div>
      {data.withPhoto && <Photo d={data} w={200} h={170} />}
      <div className="reference-rail-body"><section className="reference-section"><Heading>Contact</Heading><Contact data={data} labels /></section><Personal data={data} /><Languages data={data} /><Interests data={data} /></div>
    </aside>
    <main className="reference-main"><Summary data={data} /><Skills data={data} /><Experience data={data} /><Education data={data} /><Extras data={data} /></main>
  </div>;

  if (design === "reference03") return <div className="cv-page reference-page reference-03">
    <header className="reference-banner"><div className="reference-banner-name"><h1 className="cv-name">{fullName(data)}</h1><div className="cv-role">{data.jobTitle}</div></div><Contact data={data} labels />{data.withPhoto && <Photo d={data} w={92} h={92} />}</header>
    <main className="reference-main"><Summary data={data} /><Skills data={data} /><Experience data={data} /><Education data={data} /><Languages data={data} /><Extras data={data} /><Personal data={data} /></main>
    <div className="reference-footer" />
  </div>;

  if (design === "reference05") return <div className="cv-page reference-page reference-05">
    <header className="reference-banner">{data.withPhoto && <Photo d={data} w={112} h={112} />}<div><h1 className="cv-name">{fullName(data)}</h1><div className="cv-role">{data.jobTitle}</div></div></header>
    <div className="reference-05-contact"><Contact data={data} /></div>
    <main className="reference-main"><Summary data={data} /><div className="reference-columns"><div><Experience data={data} /><Extras data={data} /></div><div><Skills data={data} title="Highlights" /><Education data={data} /><Languages data={data} /><Interests data={data} /><Personal data={data} /></div></div></main>
  </div>;

  if (design === "reference0005") return <div className="cv-page reference-page reference-0005">
    <header className="reference-banner"><div><h1 className="cv-name">{fullName(data)}</h1><div className="cv-role">{data.jobTitle}</div><Contact data={data} /></div>{data.withPhoto && <Photo d={data} w={100} h={100} />}</header>
    <div className="reference-columns"><aside className="reference-rail"><Summary data={data} /><Skills data={data} title="Skills" /><Languages data={data} /><Personal data={data} /></aside><main className="reference-main"><Experience data={data} /><Education data={data} /><Extras data={data} /><Interests data={data} /></main></div>
  </div>;

  if (design === "referencephoto") return <div className="cv-page reference-page reference-photo">
    <div className="reference-photo-top" /><div className="reference-columns"><aside className="reference-rail"><h1 className="cv-name">{fullName(data)}</h1><div className="cv-role">{data.jobTitle}</div>{data.withPhoto && <Photo d={data} w={190} h={190} />}<section className="reference-section"><Heading>Contact</Heading><Contact data={data} labels /></section><Languages data={data} /><Personal data={data} /><Interests data={data} /></aside><main className="reference-main"><Summary data={data} /><Skills data={data} /><Experience data={data} /><Education data={data} /><Extras data={data} /></main></div><div className="reference-footer" />
  </div>;

  // CV_TEMPLATE_0010 — circle photo + soft blob header, two-column body.
  if (design === "blob") return <div className="cv-page reference-page reference-blob cv-pad">
    <header className="reference-blob-head">
      <div className="reference-blob-shape" />
      {data.withPhoto && <Photo d={data} w={120} h={120} />}
      <div className="reference-blob-title">
        <h1 className="cv-name">{fullName(data)}</h1>
        <div className="cv-role">{data.jobTitle}</div>
        <div className="cv-small reference-blob-contact">{contactRows(data).map(([k, v]) => <div key={k}>{v}</div>)}</div>
      </div>
    </header>
    {data.profile && <p className="cv-body reference-blob-summary">{data.profile}</p>}
    <div className="reference-columns reference-blob-cols">
      <div className="reference-blob-left">
        <Skills data={data} title="Skills" />
        <Education data={data} />
        <Languages data={data} />
        <Interests data={data} />
      </div>
      <div className="reference-blob-right">
        <Experience data={data} />
        <Extras data={data} />
        <Personal data={data} />
      </div>
    </div>
  </div>;

  // CV_TEMPLATE_0017 — dark sidebar with gold accents, photo, highlights.
  if (design === "metro") return <div className="cv-page reference-page reference-metro">
    <aside className="reference-metro-rail">
      <h1 className="cv-name reference-metro-name">{data.firstName} <em>{data.lastName}</em></h1>
      {data.withPhoto && <Photo d={data} w={150} h={150} />}
      <Skills data={data} title="Highlights" />
      <Education data={data} />
      {data.certificates.length > 0 && <section className="reference-section"><Heading>Certifications</Heading><List items={data.certificates} /></section>}
      <Languages data={data} />
      <div className="reference-metro-bar" />
    </aside>
    <main className="reference-metro-main">
      <div className="reference-metro-top">
        <Contact data={data} />
        <div className="reference-metro-chip" />
      </div>
      <Summary data={data} />
      <Experience data={data} />
      <Extras data={data} />
      <Personal data={data} />
      <Interests data={data} />
    </main>
  </div>;

  // zohaib_hassan.pdf — classic Pakistani bio-data format.
  return <div className="cv-page reference-page reference-pak cv-pad">
    <header className="reference-pak-head">
      <div className="reference-pak-kicker">Curriculum Vitae</div>
      <h1 className="cv-name">{fullName(data)}</h1>
      <div className="reference-pak-rule" />
      <div className="cv-small reference-pak-contact">
        {data.address && <div><strong>Address:</strong> {data.address}</div>}
        {data.phone && <div><strong>Cell No:</strong> {data.phone}</div>}
        {data.email && <div><strong>Email:</strong> {data.email}</div>}
      </div>
    </header>
    {data.profile && <section className="reference-section"><h2 className="cv-h reference-pak-h">Objective</h2><p className="cv-body">{data.profile}</p></section>}
    {personalRows(data).length > 0 && <section className="reference-section"><h2 className="cv-h reference-pak-h">Personal Information</h2>
      <ul className="cv-body reference-pak-rows">{personalRows(data).map(([k, v]) => <li key={k}><span>{k}</span><strong>{v}</strong></li>)}</ul>
    </section>}
    {data.education.length > 0 && <section className="reference-section">
      <div className="reference-pak-tablehead">Qualifications</div>
      <div className="reference-pak-table">{data.education.map(e => <div key={e.id} className="reference-pak-trow"><strong>{e.degree}</strong><span>{[e.institute, e.year].filter(Boolean).join(" — ")}</span></div>)}</div>
    </section>}
    <section className="reference-section"><h2 className="cv-h reference-pak-h">Working Experience</h2>
      {data.isFresher || !data.experience.length ? <p className="cv-body">{fresherLine}</p> :
        <div className="cv-stack">{data.experience.map(e => <div key={e.id}>
          <div className="cv-sub">{e.role}{e.duration ? ` — ${e.duration}` : ""}</div>
          <div className="cv-small">{e.company}</div>
          {e.details && <List items={bullets(e.details)} />}
        </div>)}</div>}
    </section>
    <Skills data={data} title="Skills" />
    {data.languages.length > 0 && <section className="reference-section"><h2 className="cv-h reference-pak-h">Languages</h2><List items={data.languages} /></section>}
    <Extras data={data} />
    {(data.references.length > 0 || data.referencesOnRequest) && <section className="reference-section"><h2 className="cv-h reference-pak-h">Reference</h2>
      {data.references.length > 0 ? <List items={data.references} /> : <p className="cv-body">Reference will be provided on demand.</p>}
    </section>}
    {data.declaration && <section className="reference-section"><h2 className="cv-h reference-pak-h">Declaration</h2><p className="cv-body">I hereby declare that the above information is true and correct to the best of my knowledge.</p></section>}
  </div>;
}
