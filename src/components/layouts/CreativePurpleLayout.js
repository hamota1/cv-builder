import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './CreativePurpleLayout.css';

// --- Icon Components ---
const MailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3C006B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3C006B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const LinkedInIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3C006B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const LocationIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3C006B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;

const CreativePurpleLayout = () => {
  const { resumeData } = useResume();
  const {
    personalInfo,
    professionalSummary,
    skills,
    experience,
    education,
    languages,
    certifications,
    projects,
    volunteering,
    references
  } = resumeData;

  return (
    <div className="creative-grid-container">
      {/* a. Top-Left Quadrant */}
      <div className="grid-top-left">
        {personalInfo && (
          <>
            <h2>{personalInfo.fullName}</h2>
            <p className="job-title">{personalInfo.jobTitle}</p>
            <div className="contact-info">
              {personalInfo.email && <p><MailIcon /> <span>{personalInfo.email}</span></p>}
              {personalInfo.phone && <p><PhoneIcon /> <span>{personalInfo.phone}</span></p>}
              {personalInfo.linkedin && <p><LinkedInIcon /> <span>{personalInfo.linkedin}</span></p>}
              {personalInfo.location && <p><LocationIcon /> <span>{personalInfo.location}</span></p>}
            </div>
          </>
        )}
      </div>

      {/* b. Top-Right Quadrant */}
      <div className="grid-top-right">
        {professionalSummary && (
          <section>
            <h3>PROFESSIONAL SUMMARY</h3>
            <p>{professionalSummary}</p>
          </section>
        )}
      </div>

      {/* c. Bottom-Left Quadrant */}
      <div className="grid-bottom-left">
        {education && education.length > 0 && (
          <section>
            <h3>EDUCATION</h3>
            {education.map((edu, index) => (
              <div key={index} className="item">
                <strong>{edu.degree}</strong>
                <p>{edu.institution} ({edu.year})</p>
              </div>
            ))}
          </section>
        )}
        {skills && skills.length > 0 && (
          <section>
            <h3>SKILLS</h3>
            <ul className="skills-list">
              {skills.map((skill, index) => (
                <li key={index}>{skill.skill}</li>
              ))}
            </ul>
          </section>
        )}
        {languages && languages.length > 0 && (
          <section>
            <h3>LANGUAGES</h3>
            {languages.map((lang, index) => (
              <p key={index} className="item">{lang.language} ({lang.proficiency})</p>
            ))}
          </section>
        )}
        {certifications && certifications.length > 0 && (
          <section>
            <h3>CERTIFICATIONS</h3>
            {certifications.map((cert, index) => (
              <p key={index} className="item">{cert.name} ({cert.year})</p>
            ))}
          </section>
        )}
      </div>

      {/* d. Bottom-Right Quadrant */}
      <div className="grid-bottom-right">
        {experience && experience.length > 0 && (
          <section>
            <h3>EXPERIENCE</h3>
            {experience.map((exp, index) => (
              <div key={index} className="item">
                <strong>{exp.title}</strong>
                <p className="sub-heading">{exp.company} | {exp.date}</p>
                <ul>
                    {(exp.description || '').split('\n').map((item, i) => item && <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}
        {projects && projects.length > 0 && (
          <section>
            <h3>PROJECTS</h3>
            {projects.map((proj, index) => (
              <div key={index} className="item">
                <strong>{proj.name}</strong>
                <p>{proj.description}</p>
              </div>
            ))}
          </section>
        )}
        {volunteering && volunteering.length > 0 && (
          <section>
            <h3>VOLUNTEERING</h3>
            {volunteering.map((vol, index) => (
              <div key={index} className="item">
                <strong>{vol.role}</strong>
                <p className="sub-heading">{vol.organization} | {vol.date}</p>
                <p>{vol.description}</p>
              </div>
            ))}
          </section>
        )}
        {references && references.length > 0 && (
          <section>
            <h3>REFERENCES</h3>
            {references.map((ref, index) => (
              <p key={index} className="item"><strong>{ref.name}</strong>, {ref.contact}</p>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativePurpleLayout;