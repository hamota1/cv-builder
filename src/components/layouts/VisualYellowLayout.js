
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './VisualYellowLayout.css';

// Helper for section titles with icons
const SectionTitle = ({ title, icon }) => (
    <div className="vyl-section-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
        <h2>{title}</h2>
    </div>
);

const VisualYellowLayout = () => {
    const { resumeData } = useResume();
    const { personal: personalInfo, summary: professionalSummary, experience, education, skills, languages, projects, volunteer: volunteering, certifications, references } = resumeData;

    // Comprehensive helper functions
    const hasContact = personalInfo && (personalInfo.email || personalInfo.phone || personalInfo.linkedIn);
    const hasSkills = skills && skills.some(s => s.skill);
    const hasLanguages = languages && languages.some(l => l);
    const hasSummary = professionalSummary && professionalSummary.trim() !== '';
    const hasExperience = experience && experience.some(e => e.role || e.company);
    const hasEducation = education && education.some(e => e.university || e.degree);
    const hasProjects = projects && projects.some(p => p.title);
    const hasVolunteering = volunteering && volunteering.some(v => v.organization || v.role);
    const hasCertifications = certifications && certifications.length > 0;
    const hasReferences = references && references.some(r => r.name);

    return (
        <div className="visual-yellow-layout">
            {/* --- Left Column --- */}
            <div className="vyl-left-column">
                <div className="vyl-sidebar-header"></div>

                {personalInfo && personalInfo.profilePicture && (
                    <div className="vyl-profile-picture-container">
                        <img src={personalInfo.profilePicture} alt="Profile" className="vyl-profile-picture" />
                    </div>
                )}

                <div className="vyl-sidebar-content">
                    {hasContact && (
                        <section className="vyl-section">
                            <SectionTitle title="Contact" icon={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />} />
                            <p>{personalInfo.email}</p>
                            <p>{personalInfo.phone}</p>
                            <p>{personalInfo.linkedIn}</p>
                            {personalInfo.location && <p>{personalInfo.location}</p>}
                        </section>
                    )}
                    {hasSkills && (
                        <section className="vyl-section">
                            <SectionTitle title="Skills" icon={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />} />
                            <ul className="vyl-skills-list">{
                                skills.map((skill, index) => skill.skill && (
                                    <li key={index}>
                                        <span className="vyl-skill-name">{skill.skill}</span>
                                        <div className="vyl-skill-bar-container">
                                            <div className="vyl-skill-level-bar" style={{ width: `${skill.percentage || 0}%` }}></div>
                                        </div>
                                    </li>
                                ))
                            }</ul>
                        </section>
                    )}
                    {hasLanguages && (
                        <section className="vyl-section">
                             <SectionTitle title="Languages" icon={<circle cx="12" cy="12" r="10" />} />
                             <ul>{languages.map((lang, i) => lang && <li key={i}>{lang}</li>)}</ul>
                        </section>
                    )}
                    {hasCertifications && (
                        <section className="vyl-section">
                            <SectionTitle title="Certifications" icon={<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />} />
                            <ul>{certifications.map((cert, i) => cert && <li key={i}>{cert}</li>)}</ul>
                        </section>
                    )}
                </div>
            </div>

            {/* --- Right Column --- */}
            <div className="vyl-right-column">
                {hasSummary && (
                    <section className="vyl-section">
                        <SectionTitle title="Professional Summary" icon={<><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>} />
                        <p>{professionalSummary}</p>
                    </section>
                )}
                {hasExperience && (
                    <section className="vyl-section">
                        <SectionTitle title="Experience" icon={<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>} />
                        <div className="vyl-timeline">
                            {experience.map((exp, index) => (
                                <div key={index} className="vyl-timeline-item">
                                    <h3>{exp.role}</h3>
                                    <p><strong>{exp.company}</strong> | {exp.dates}</p>
                                    {exp.achievements && <ul>{exp.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {hasEducation && (
                    <section className="vyl-section">
                        <SectionTitle title="Education" icon={<><path d="M22 10v6M2 10v6" /><path d="M6 10v10M18 10v10" /><path d="M2 10h20v2H2z" /><path d="M5 12v8" /><path d="M19 12v8" /><path d="M12 12v8" /><path d="M2 10l10-8 10 8" /></>} />
                        {education.map((edu, index) => (
                            <div key={index}>
                                <h3>{edu.degree} in {edu.major}</h3>
                                <p>{edu.university} | {edu.year}</p>
                            </div>
                        ))}
                    </section>
                )}
                {hasProjects && (
                    <section className="vyl-section">
                        <SectionTitle title="Portfolio" icon={<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />} />
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <h4>{proj.title}</h4>
                                <p>{proj.dates}</p>
                                {proj.achievements && <ul>{proj.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </section>
                )}
                 {hasVolunteering && (
                    <section className="vyl-section">
                        <SectionTitle title="Volunteering" icon={<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />} />
                        {volunteering.map((vol, index) => (
                            <div key={index}>
                                <h4>{vol.role}</h4>
                                <p><strong>{vol.organization}</strong> | {vol.dates}</p>
                                {vol.achievements && <ul>{vol.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </section>
                )}
                {hasReferences && (
                    <section className="vyl-section">
                        <SectionTitle title="References" icon={<circle cx="12" cy="12" r="4" />} />
                        {references.map((ref, index) => (
                            <div key={index}>
                                <p><strong>{ref.name}</strong>, {ref.title}</p>
                                <p>{ref.contact}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default VisualYellowLayout;
