import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './SingleColumnLayout.css'; // This will be the new CSS file

const SingleColumnLayout = () => {
  const { resumeData } = useResume();
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
  } = resumeData || {};

  const pInfo = personal || {};

  const renderSection = (title, content, renderItem) => {
    if (!content || (Array.isArray(content) && content.length === 0) || (typeof content === 'string' && content.trim() === '')) {
      return null;
    }
    return (
      <section className="sca-section">
        <h2 className="sca-section-title">{title}</h2>
        {renderItem(content)}
      </section>
    );
  };

  return (
    <div className="single-column-accent-layout">
      <header className="sca-header">
        <h1 className="sca-full-name">{pInfo.fullName || "YOUR NAME"}</h1>
        <p className="sca-job-title">{pInfo.jobTitle || "Job Title"}</p>
        <div className="sca-contact-info">
          {pInfo.email && <span className="sca-contact-item">{pInfo.email}</span>}
          {pInfo.phone && <span className="sca-contact-item">{pInfo.phone}</span>}
          {pInfo.linkedIn && <span className="sca-contact-item">{pInfo.linkedIn}</span>}
          {pInfo.location && <span className="sca-contact-item">{pInfo.location}</span>}
          {pInfo.website && <span className="sca-contact-item"><a href={pInfo.website} target="_blank" rel="noopener noreferrer">Website</a></span>}
        </div>
        <hr className="sca-divider" />
      </header>

      <div className="sca-content-area">
        {renderSection("PROFESSIONAL SUMMARY", summary, (content) => (
          <p>{content}</p>
        ))}

        {renderSection("EXPERIENCE", experience, (content) => (
          <ul>
            {content.map((exp, index) => (
              <li key={index} className="sca-item">
                <h3 className="sca-item-title">{exp.role}</h3>
                <p className="sca-item-subtitle">{exp.company} | {exp.dates}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="sca-achievements-list">
                    {exp.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ))}

        {renderSection("EDUCATION", education, (content) => (
          <ul>
            {content.map((edu, index) => (
              <li key={index} className="sca-item">
                <h3 className="sca-item-title">{edu.degree}</h3>
                <p className="sca-item-subtitle">{edu.university} | {edu.year}</p>
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="sca-achievements-list">
                    {edu.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ))}

        {renderSection("SKILLS", skills, (content) => (
          <ul className="sca-skills-list">
            {content.map((skill, index) => skill.skill && <li key={index}>{skill.skill}</li>)}
          </ul>
        ))}

        {renderSection("LANGUAGES", languages, (content) => (
          <ul className="sca-languages-list">
            {content.map((lang, index) => lang && <li key={index}>{lang}</li>)}
          </ul>
        ))}

        {renderSection("PROJECTS", projects, (content) => (
          <ul>
            {content.map((proj, index) => (
              <li key={index} className="sca-item">
                <h3 className="sca-item-title">{proj.title}</h3>
                <p className="sca-item-subtitle">{proj.dates}</p>
                <p>{proj.description}</p>
                {proj.technologies && <p><strong>Technologies:</strong> {proj.technologies}</p>}
                {proj.imageURL && <img src={proj.imageURL} alt={proj.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                {proj.achievements && proj.achievements.length > 0 && (
                  <ul className="sca-achievements-list">
                    {proj.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ))}

        {renderSection("VOLUNTEERING", volunteer, (content) => (
          <ul>
            {content.map((vol, index) => (
              <li key={index} className="sca-item">
                <h3 className="sca-item-title">{vol.role}</h3>
                <p className="sca-item-subtitle">{vol.organization} | {vol.dates}</p>
                <p>{vol.description}</p>
                {vol.achievements && vol.achievements.length > 0 && (
                  <ul className="sca-achievements-list">
                    {vol.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ))}

        {renderSection("CERTIFICATIONS", certifications, (content) => (
          <ul>
            {content.map((cert, index) => cert && <li key={index}>{cert}</li>)}
          </ul>
        ))}

        {renderSection("REFERENCES", references, (content) => (
          <ul>
            {content.map((ref, index) => (
              <li key={index} className="sca-item">
                <h3 className="sca-item-title">{ref.name}</h3>
                <p>{ref.title}</p>
                <p>{ref.company}</p>
                <p>{ref.email}</p>
                <p>{ref.phone}</p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default SingleColumnLayout;