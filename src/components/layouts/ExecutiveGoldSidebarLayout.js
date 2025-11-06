import React from 'react';


const ExecutiveGoldSidebarLayout = ({ data, theme }) => {
  return (
    <div className={`resume-container theme-${theme}`}>
      <div className="sidebar">
        <div className="sidebar-content">
          {/* Personal Info with Profile Picture */}
          <div className="personal-info">
            {data.personal.profilePicture && (
              <div className="profile-image-rhombus-container">
                <div className="profile-image-rhombus-frame">
                  <img
                    src={data.personal.profilePicture}
                    alt={data.personal.fullName}
                    className="profile-image-rhombus"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <h2>CONTACT</h2>
            {data.personal.email && <p><i className="fas fa-envelope"></i> {data.personal.email}</p>}
            {data.personal.phone && <p><i className="fas fa-phone"></i> {data.personal.phone}</p>}
            {data.personal.location && <p><i className="fas fa-map-marker-alt"></i> {data.personal.location}</p>}
            {data.personal.linkedIn && <p><i className="fab fa-linkedin"></i> {data.personal.linkedIn}</p>}
          </div>

          {/* Skills */}
          <div className="skills">
            <h2>SKILLS</h2>
            {data.skills.map((skill, index) => (
              <div key={index} className="skill-item-gold">
                <p className="skill-name">{skill.skill}</p>
                <div className="skill-bar-gold-container">
                  <div className="skill-bar-gold-fill" style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          {data.languages.length > 0 && (
            <div className="languages">
              <h2>LANGUAGES</h2>
              <ul>
                {data.languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <h1>{data.personal.fullName}</h1>
        <p className="job-title">{data.personal.jobTitle}</p>
        {/* Professional Summary */}
        <div className="summary">
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>{data.summary}</p>
        </div>

        {/* Experience */}
        <div className="experience">
          <h2>EXPERIENCE</h2>
          <div className="timeline-container">
            {data.experience.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <p className="dates">{exp.dates}</p>
                  <h3>{exp.role}</h3>
                  <p className="company">{exp.company}</p>
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="education">
          <h2>EDUCATION</h2>
          <div className="timeline-container">
            {data.education.map((edu, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <p className="dates">{edu.year}</p>
                  <h3>{edu.degree} in {edu.major}</h3>
                  <p>{edu.university}</p>
                  <div className="achievements">
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul>
                        {edu.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects/Research */}
        {data.projects?.length > 0 && (
          <div className="projects">
            <h2>PROJECTS/RESEARCH</h2>
            {data.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3>{project.title}</h3>
                <p className="dates">{project.dates}</p>
                <p>{project.description}</p>
                {project.technologies && (
                  <p className="technologies"><strong>Technologies:</strong> {project.technologies}</p>
                )}
                {project.imageURL && (
                  <div className="project-images">
                    <img
                      src={project.imageURL}
                      alt={project.title}
                      className="project-image"
                    />
                  </div>
                )}
                <div className="achievements">
                  {project.achievements && project.achievements.length > 0 && (
                    <ul>
                      {project.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Volunteer Activities */}
        {data.volunteer?.length > 0 && (
          <div className="volunteer">
            <h2>VOLUNTEER/STUDENT ACTIVITIES</h2>
            {data.volunteer.map((activity, index) => (
              <div key={index} className="volunteer-item">
                <h3>{activity.role}</h3>
                <p className="organization">{activity.organization}</p>
                <p className="dates">{activity.dates}</p>
                <p>{activity.description}</p>
                <div className="achievements">
                  {activity.achievements && activity.achievements.length > 0 && (
                    <ul>
                      {activity.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {data.references?.length > 0 && (
          <div className="references">
            <h2>REFERENCES</h2>
            {data.references.map((reference, index) => (
              <div key={index} className="reference-item">
                <h3>{reference.name}</h3>
                <p className="position">{reference.position}</p>
                <p className="company">{reference.company}</p>
                <p className="email">{reference.email}</p>
                <p className="phone">{reference.phone}</p>
                <div className="achievements">
                  {reference.achievements && reference.achievements.length > 0 && (
                    <ul>
                      {reference.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications?.length > 0 && (
          <div className="certifications">
            <h2>CERTIFICATIONS</h2>
            <ul>
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveGoldSidebarLayout;
