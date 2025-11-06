import React from 'react';

const NarrowSidebarLayout = ({ data, theme }) => {
  return (
    <div className={`resume-container theme-${theme}`}>
      <div className="content-wrapper">
        {/* Narrow Sidebar */}
        <aside className="narrow-sidebar">
          {/* Profile Picture */}
          {data.personal.profilePicture && (
            <div className="profile-section">
              <img 
                src={data.personal.profilePicture}
                alt={data.personal.fullName}
              />
            </div>
          )}
          <div className="contact-section">
            <h2>Contact</h2>
            <div className="contact-details">
              <p><strong>Email:</strong><br />{data.personal.email}</p>
              <p><strong>Phone:</strong><br />{data.personal.phone}</p>
              <p><strong>Location:</strong><br />{data.personal.location}</p>
              <p><strong>LinkedIn:</strong><br />{data.personal.linkedIn}</p>
            </div>
          </div>

          <div className="skills-section">
            <h2>Skills</h2>
            <ul className="skills-list">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill.skill}</li>
              ))}
            </ul>
          </div>

          {data.languages.length > 0 && (
            <div className="languages-section">
              <h2>Languages</h2>
              <ul className="languages-list">
                {data.languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>
          )}

          {data.certifications?.length > 0 && (
            <div className="certifications-section">
              <h2>Certifications</h2>
              <ul className="certifications-list">
                {data.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <header className="main-header">
            <h1>{data.personal.fullName}</h1>
            <p className="job-title">{data.personal.jobTitle}</p>
          </header>

          {/* Professional Summary */}
          <section className="summary-section">
            <h2>Professional Summary</h2>
            <p>{data.summary}</p>
          </section>

          {/* Experience */}
          <section className="experience-section">
            <h2>Professional Experience</h2>
            {data.experience.map((exp, index) => (
              <article key={index} className="experience-item">
                <header className="experience-header">
                  <h3>{exp.role}</h3>
                  <p className="company">{exp.company}</p>
                  <p className="dates">{exp.dates}</p>
                </header>
                <div className="achievements">
                  {exp.achievements && exp.achievements.length > 0 ? (
                    <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  ) : (
                    <p className="no-achievements">No achievements added</p>
                  )}
                </div>
              </article>
            ))}
          </section>

          {/* Education */}
          <section className="education-section">
            <h2>Education</h2>
            {data.education.map((edu, index) => (
              <article key={index} className="education-item">
                <header className="education-header">
                  <h3>{edu.degree}</h3>
                  <p className="year">{edu.year}</p>
                </header>
                <p className="major">{edu.major}</p>
                <p className="university">{edu.university}</p>
              </article>
            ))}
          </section>

          {data.preferredIndustry && (
            <section className="industry-section">
              <h2>Industry Focus</h2>
              <p>{data.preferredIndustry}</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default NarrowSidebarLayout;