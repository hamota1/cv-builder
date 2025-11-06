import React from 'react';
import './HeaderBlockLayout.css';

const Section = ({ title, icon, children }) => {
  if (!children || (Array.isArray(children) && children.length === 0)) {
    return null;
  }

  return (
    <section>
      <h2><i className={`fas fa-${icon}`}></i> {title}</h2>
      {children}
    </section>
  );
};

const HeaderBlockLayout = ({ data, theme }) => {
  const {
    personal,
    summary,
    experience,
    education,
    skills,
    languages,
    certifications,
    projects,
    volunteer,
    references
  } = data;

  return (
    <div className={`bold-header-container theme-${theme}`}>
      <header className="header-black-block">
        <h1>{personal.fullName}</h1>
        <p>{personal.jobTitle}</p>
      </header>

      <div className="content-grid">
        <div className="left-column">
          {summary && summary.length > 0 && (
            <Section title="PROFESSIONAL SUMMARY" icon="user">
              <p>{summary}</p>
            </Section>
          )}

          {experience && experience.length > 0 && (
            <Section title="EXPERIENCE" icon="briefcase">
              {experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h3>{exp.role}</h3>
                  <p>{exp.company} | {exp.dates}</p>
                  <ul>
                    {exp.achievements && exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {projects && projects.length > 0 && (
            <Section title="PROJECTS/RESEARCH" icon="flask">
              {projects.map((proj, index) => (
                <div key={index} className="project-item">
                  <h3>{proj.title}</h3>
                  <p>{proj.dates}</p>
                  <p>{proj.description}</p>
                  {proj.technologies && <p><strong>Technologies:</strong> {proj.technologies}</p>}
                  {proj.imageURL && <img src={proj.imageURL} alt={proj.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                  <ul>
                    {proj.achievements && proj.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {volunteer && volunteer.length > 0 && (
            <Section title="VOLUNTEER/STUDENT ACTIVITIES" icon="hands-helping">
              {volunteer.map((vol, index) => (
                <div key={index} className="volunteer-item">
                  <h3>{vol.role}</h3>
                  <p>{vol.organization} | {vol.dates}</p>
                  <p>{vol.description}</p>
                  <ul>
                    {vol.achievements && vol.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}
        </div>

        <div className="right-column">
          <Section title="CONTACT" icon="address-book">
            <p>{personal.email}</p>
            <p>{personal.phone}</p>
            <p>{personal.linkedIn}</p>
            <p>{personal.location}</p>
          </Section>

          {education && education.length > 0 && (
            <Section title="EDUCATION" icon="graduation-cap">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h3>{edu.degree}</h3>
                  <p>{edu.university} | {edu.year}</p>
                  <ul>
                    {edu.achievements && edu.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {skills && skills.length > 0 && (
            <Section title="SKILLS" icon="cogs">
              <ul>
                {skills.map((skill, index) => (
                  <li key={index}>{skill.skill}</li>
                ))}
              </ul>
            </Section>
          )}

          {languages && languages.length > 0 && (
            <Section title="LANGUAGES" icon="language">
              <ul>
                {languages.map((lang, index) => (
                  <li key={index}>{lang}</li>
                ))}
              </ul>
            </Section>
          )}

          {certifications && certifications.length > 0 && (
            <Section title="CERTIFICATIONS" icon="certificate">
              <ul>
                {certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </Section>
          )}

          {references && references.length > 0 && (
            <Section title="REFERENCES" icon="users">
              {references.map((ref, index) => (
                <li key={index}>
                  <h3>{ref.name}</h3>
                  <p>{ref.title}</p>
                  <p>{ref.company}</p>
                  <p>{ref.email}</p>
                  <p>{ref.phone}</p>
                  <ul>
                    {ref.achievements && ref.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBlockLayout;
