import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './SidebarLayout.css'; // We can reuse the same CSS if it's general enough

const CreativePurpleSidebarLayout = () => {
  const { resumeData } = useResume();
  const {
    personalInfo,
    professionalSummary,
    experience,
    education,
    skills,
    languages,
    certifications,
    projects,
    volunteering,
    references,
  } = resumeData;

  const sidebarStyle = {
    backgroundColor: '#F2E7FE',
    color: '#3C006B',
  };

  const mainContentStyle = {
    backgroundColor: '#FFFFFF',
    color: '#333333',
  };

  const sectionTitleStyle = {
    color: '#3C006B',
  };

  return (
    <div className="sidebar-layout">
      {/* Left Column (Sidebar) */}
      <div className="sidebar-col" style={sidebarStyle}>
        {personalInfo && (
          <div className="header-section text-center mb-4">
            <h1>{personalInfo.fullName}</h1>
            <p className="job-title">{personalInfo.jobTitle}</p>
          </div>
        )}

        {personalInfo && (personalInfo.email || personalInfo.phone || personalInfo.linkedin) && (
          <div className="contact-section section">
            <h2 className="section-title" style={sectionTitleStyle}>Contact</h2>
            {personalInfo.email && <p><strong>Email:</strong> {personalInfo.email}</p>}
            {personalInfo.phone && <p><strong>Phone:</strong> {personalInfo.phone}</p>}
            {personalInfo.linkedin && <p><strong>LinkedIn:</strong> {personalInfo.linkedin}</p>}
            {personalInfo.location && <p><strong>Location:</strong> {personalInfo.location}</p>}
          </div>
        )}

        {education && education.length > 0 && (
          <div className="education-section section">
            <h2 className="section-title" style={sectionTitleStyle}>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item mb-2">
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                <p>{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className="skills-section section">
            <h2 className="section-title" style={sectionTitleStyle}>Skills</h2>
            <ul className="list-disc pl-5">
              {skills.map((skill, index) => (
                <li key={index}>{skill.skill}</li>
              ))}
            </ul>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div className="languages-section section">
            <h2 className="section-title" style={sectionTitleStyle}>Languages</h2>
            <ul>
              {languages.map((lang, index) => (
                <li key={index}>{lang.language} ({lang.proficiency})</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column (Main Content) */}
      <div className="main-col" style={mainContentStyle}>
        {professionalSummary && (
          <div className="summary-section section">
            <h2 className="section-title" style={sectionTitleStyle}>Professional Summary</h2>
            <p>{professionalSummary}</p>
          </div>
        )}

        {experience && experience.length > 0 && (
          <div className="experience-section section">
            <h2 className="section-title" style={sectionTitleStyle}>Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="job mb-3">
                <h3>{exp.title}</h3>
                <p className="company-location-date">{exp.company} | {exp.location} | {exp.date}</p>
                <ul>
                  {(exp.description || '').split('\n').map((item, i) => item && <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {projects && projects.length > 0 && (
          <div className="projects-section section">
            <h2 className="section-title" style={sectionTitleStyle}>Projects/Research</h2>
            {projects.map((proj, index) => (
              <div key={index} className="project mb-3">
                <h3>{proj.name}</h3>
                <p>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {volunteering && volunteering.length > 0 && (
          <div className="volunteering-section section">
            <h2 className="section-title" style={sectionTitleStyle}>Volunteer/Student Activities</h2>
            {volunteering.map((vol, index) => (
              <div key={index} className="volunteering-item mb-3">
                <h3>{vol.organization}</h3>
                <p>{vol.role} | {vol.date}</p>
                <p>{vol.description}</p>
              </div>
            ))}
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div className="certifications-section section">
            <h2 className="section-title" style={sectionTitleStyle}>Certifications</h2>
            {certifications.map((cert, index) => (
              <div key={index} className="certification-item mb-2">
                <p>{cert.name} ({cert.year})</p>
              </div>
            ))}
          </div>
        )}

        {references && references.length > 0 && (
          <div className="references-section section">
            <h2 className="section-title" style={sectionTitleStyle}>References</h2>
            {references.map((ref, index) => (
              <div key={index} className="reference-item mb-2">
                <p><strong>{ref.name}</strong>, {ref.relationship}</p>
                <p>{ref.contact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativePurpleSidebarLayout;
