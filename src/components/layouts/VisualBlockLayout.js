import React from 'react';

import './VisualBlockLayout.css';

const VisualBlockLayout = ({ data, theme }) => {
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
    <div className={`visual-block-grid theme-${theme}`}>
      <div className="top-left-cell">
        {personal.fullName && <h1>{personal.fullName}</h1>}
        {personal.jobTitle && <p className="job-title">{personal.jobTitle}</p>}
        {summary && <p>{summary}</p>}
      </div>

      <div className="photo-block">
        {personal.profilePicture && (
          <img
            src={personal.profilePicture}
            alt={personal.fullName}
            className="profile-picture"
          />
        )}
      </div>

      <div className="bottom-left-cell">
        {experience && experience.length > 0 && (
          <section>
            <h2>Experience</h2>
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
          </section>
        )}
        {projects && projects.length > 0 && (
          <section>
            <h2>Projects</h2>
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
          </section>
        )}
      </div>

      <div className="bottom-right-cell">
        {education && education.length > 0 && (
          <section>
            <h2>Education</h2>
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
          </section>
        )}
        {skills && skills.length > 0 && (
          <section>
            <h2>Skills</h2>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill.skill}</li>
              ))}
            </ul>
          </section>
        )}
        {languages && languages.length > 0 && (
          <section>
            <h2>Languages</h2>
            <ul>
              {languages.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          </section>
        )}
        {certifications && certifications.length > 0 && (
          <section>
            <h2>Certifications</h2>
            <ul>
              {certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}
        {volunteer && volunteer.length > 0 && (
          <section>
            <h2>Volunteer</h2>
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
          </section>
        )}
        {references && references.length > 0 && (
          <section>
            <h2>References</h2>
            <ul>
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
            </ul>
          </section>
        )}
        <section>
          <h2>Contact</h2>
          <p>{personal.email}</p>
          <p>{personal.phone}</p>
          <p>{personal.linkedIn}</p>
          {personal.location && <p>{personal.location}</p>}
        </section>
      </div>
    </div>
  );
};

export default VisualBlockLayout;
