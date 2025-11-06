import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './YellowHeaderLayout.css';

const YellowHeaderLayout = () => {
    const { resumeData } = useResume();
    const { personal: personalInfo, summary: professionalSummary, experience, education, skills, languages, projects, volunteer: volunteering, certifications, references } = resumeData;

    // Helper functions for conditional rendering
    const hasSummary = professionalSummary && professionalSummary.trim() !== '';
    const hasContact = personalInfo && (personalInfo.email || personalInfo.phone || personalInfo.linkedIn);
    const hasSkills = skills && skills.some(s => s.skill);
    const hasLanguages = languages && languages.some(l => l);
    const hasExperience = experience && experience.some(e => e.role || e.company || e.dates || (e.achievements && e.achievements.some(a => a)));
    const hasEducation = education && education.some(e => e.university || e.degree || e.major || e.year || (e.achievements && e.achievements.some(a => a)));
    const hasProjects = projects && projects.some(p => p.title || p.dates || p.description || p.technologies || (p.achievements && p.achievements.some(a => a)));
    const hasVolunteering = volunteering && volunteering.some(v => v.organization || v.role || v.dates || v.description || (v.achievements && v.achievements.some(a => a)));
    const hasCertifications = certifications && certifications.length > 0;
    const hasReferences = references && references.some(r => r.name || r.title || r.company || r.email || r.phone);

    return (
        <div className="yellow-header-layout">
            {/* Black Header Bar */}
            {personalInfo && (
                <div className="yh-header-block">
                    <div></div> {/* Spacer Div */}
                    <div className="yh-header-text-container">
                        <h1>{personalInfo.fullName}</h1>
                        <h2>{personalInfo.jobTitle}</h2>
                    </div>
                </div>
            )}

            {/* Yellow Sidebar */}
            <div className="yh-left-column">
                {hasSummary && (
                    <section className="yh-section">
                        <h3>PROFILE</h3>
                        <p>{professionalSummary}</p>
                    </section>
                )}
                {hasContact && (
                    <section className="yh-section">
                        <h3>CONTACT</h3>
                        {personalInfo.email && <div className="yh-contact-item"><span>{personalInfo.email}</span></div>}
                        {personalInfo.phone && <div className="yh-contact-item"><span>{personalInfo.phone}</span></div>}
                        {personalInfo.linkedIn && <div className="yh-contact-item"><span>{personalInfo.linkedIn}</span></div>}
                        {personalInfo.location && <div className="yh-contact-item"><span>{personalInfo.location}</span></div>}
                    </section>
                )}
                {hasSkills && (
                    <section className="yh-section">
                        <h3>SKILLS</h3>
                        <ul>{skills.map((s, i) => s.skill && <li key={i}>{s.skill}</li>)}</ul>
                    </section>
                )}
                {hasLanguages && (
                    <section className="yh-section">
                        <h3>LANGUAGES</h3>
                        <ul>{languages.map((l, i) => l && <li key={i}>{l}</li>)}</ul>
                    </section>
                )}
            </div>

            {/* Profile Picture - Overlapping */}
            {personalInfo && personalInfo.profilePicture && (
                <div className="yh-profile-picture-container">
                    <img src={personalInfo.profilePicture} alt="Profile" className="yh-profile-picture" />
                </div>
            )}

            {/* Main Content Area */}
            <div className="yh-right-column">
                {hasExperience && (
                    <section className="yh-section">
                        <h3>EXPERIENCE</h3>
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <h4>{exp.role}</h4>
                                <p><strong>{exp.company}</strong> | {exp.dates}</p>
                                {exp.achievements && <ul>{exp.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </section>
                )}
                {hasEducation && (
                    <section className="yh-section">
                        <h3>EDUCATION</h3>
                        {education.map((edu, index) => (
                            <div key={index}>
                                <h4>{edu.degree} {edu.major && `in ${edu.major}`}</h4>
                                <p>{edu.university} | {edu.year}</p>
                                {edu.achievements && <ul>{edu.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </section>
                )}
                {hasProjects && (
                    <section className="yh-section">
                        <h3>PROJECTS/RESEARCH</h3>
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
                    <section className="yh-section">
                        <h3>VOLUNTEERING</h3>
                        {volunteering.map((vol, index) => (
                            <div key={index}>
                                <h4>{vol.role}</h4>
                                <p><strong>{vol.organization}</strong> | {vol.dates}</p>
                                {vol.achievements && <ul>{vol.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </section>
                )}
                {hasCertifications && (
                    <section className="yh-section">
                        <h3>CERTIFICATIONS</h3>
                        <ul>{certifications.map((cert, i) => cert && <li key={i}>{cert}</li>)}</ul>
                    </section>
                )}
                {hasReferences && (
                    <section className="yh-section">
                        <h3>REFERENCES</h3>
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

export default YellowHeaderLayout;